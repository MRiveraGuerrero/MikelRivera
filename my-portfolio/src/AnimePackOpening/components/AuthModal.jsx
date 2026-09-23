import React, { useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import styles from "./AuthModal.module.css";

export default function AuthModal({ user, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setErrorMsg("Servicio Supabase no configurado en entorno local. Configura SUPABASE_URL en el servidor.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setMsg(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMsg("¡Registro iniciado! Revisa tu correo electrónico para confirmar la cuenta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMsg("¡Sesión iniciada correctamente!");
        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      setErrorMsg(err.message || "Error al autenticar. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Cerrar modal">✕</button>

        {user ? (
          <div className={styles.userProfile}>
            <div className={styles.avatarCircle}>👤</div>
            <h2 id="auth-title" className={styles.title}>Sesión Activa</h2>
            <p className={styles.emailText}>{user.email}</p>

            <div className={styles.securityPill}>
              🔒 Autenticado mediante Supabase Auth con RLS
            </div>

            <button onClick={handleSignOut} className={styles.btnDanger}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div>
            <h2 id="auth-title" className={styles.title}>
              {isSignUp ? "Crear Cuenta TCG" : "Conectar Cuenta"}
            </h2>
            <p className={styles.subTitle}>
              Guarda tu colección de cartas y tu Esencia en la nube mediante Supabase.
            </p>

            {msg && <div className={styles.alertSuccess}>{msg}</div>}
            {errorMsg && <div className={styles.alertDanger}>{errorMsg}</div>}

            <form onSubmit={handleAuth} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Contraseña</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={styles.input}
                />
              </div>

              <button type="submit" disabled={loading} className={styles.btnPrimary}>
                {loading ? "Procesando..." : (isSignUp ? "Registrarse" : "Iniciar Sesión")}
              </button>
            </form>

            <div className={styles.toggleRow}>
              <span>{isSignUp ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</span>
              <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleBtn}>
                {isSignUp ? "Iniciar Sesión" : "Crear una gratis"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
