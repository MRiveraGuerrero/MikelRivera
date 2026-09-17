import { useCallback, useEffect, useRef, useState } from 'react';

export default function useMouseFlight(setPaused, { weaponsEnabled = true } = {}) {
  const surface = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const weapons = useRef({ primaryHeld: false, primary: 0, missile: 0 });
  const [locked, setLocked] = useState(false);
  const [failed, setFailed] = useState(false);
  const release = useCallback(() => {
    mouse.current.x = 0;
    mouse.current.y = 0;
    if (document.pointerLockElement === surface.current) document.exitPointerLock();
  }, []);
  const capture = useCallback(async () => {
    if (!surface.current?.requestPointerLock) { setFailed(true); return; }
    try {
      await surface.current.requestPointerLock();
    } catch {
      setFailed(true);
    }
  }, []);
  useEffect(() => {
    const element = surface.current;
    const movement = mouse.current;
    const weaponState = weapons.current;
    let owned = false;
    let drag = null;
    const change = () => {
      const active = document.pointerLockElement === element;
      setLocked(active);
      movement.x = 0;
      movement.y = 0;
      if (active) { setPaused(false); setFailed(false); }
      else if (owned) { weaponState.primaryHeld = false; setPaused(true); }
      owned = active;
    };
    const move = e => {
      if (document.pointerLockElement !== element) return;
      // Accumulate deltas once; the frame loop consumes them without React renders.
      movement.x += e.movementX;
      movement.y += e.movementY;
    };
    const startDrag = e => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.tagName !== 'CANVAS' || document.pointerLockElement) return;
      drag = { x: e.clientX, y: e.clientY };
    };
    const dragMove = e => {
      if (!drag || document.pointerLockElement) return;
      movement.x += e.clientX - drag.x;
      movement.y += e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
    };
    const endDrag = () => { drag = null; movement.x = 0; movement.y = 0; weaponState.primaryHeld = false; };
    const error = () => setFailed(true);
    const fire = e => {
      if (!weaponsEnabled) return;
      const isPlayingSurface = document.pointerLockElement === element || e.target.tagName === 'CANVAS';
      if (!isPlayingSurface) return;
      if (e.button === 0) {
        weaponState.primaryHeld = true;
        // Preserve quick clicks that begin and end between rendered frames.
        weaponState.primary++;
      }
      if (e.button === 2) weaponState.missile++;
    };
    const stopFire = e => { if (e.button === 0) weaponState.primaryHeld = false; };
    const blockContextMenu = e => {
      if (document.pointerLockElement === element || e.target.tagName === 'CANVAS') e.preventDefault();
    };
    document.addEventListener('pointerdown', startDrag);
    document.addEventListener('pointermove', dragMove);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', endDrag);
    document.addEventListener('pointerlockchange', change);
    document.addEventListener('pointerlockerror', error);
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', fire);
    document.addEventListener('mouseup', stopFire);
    document.addEventListener('contextmenu', blockContextMenu);
    return () => {
      document.removeEventListener('pointerdown', startDrag);
      document.removeEventListener('pointermove', dragMove);
      document.removeEventListener('pointerup', endDrag);
      document.removeEventListener('pointercancel', endDrag);
      window.removeEventListener('blur', endDrag);
      document.removeEventListener('pointerlockchange', change);
      document.removeEventListener('pointerlockerror', error);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', fire);
      document.removeEventListener('mouseup', stopFire);
      document.removeEventListener('contextmenu', blockContextMenu);
      if (document.pointerLockElement === element) document.exitPointerLock();
      movement.x = 0;
      movement.y = 0;
      weaponState.primaryHeld = false;
    };
  }, [setPaused, weaponsEnabled]);
  return { surface, mouse, weapons, locked, failed, capture, release };
}

