-- ============================================================
-- SAKURA ECLIPSE TCG - SUPABASE DATABASE MIGRATION & CONTRACT
-- Date: 2026-09-23
-- Description: Complete schema, RLS policies & RPC functions
-- ============================================================

-- 1. USER COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.user_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    card_id TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 1,
    first_obtained_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_card UNIQUE(user_id, card_id)
);

-- Enable RLS
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_collections
CREATE POLICY "Users can read own collection" 
    ON public.user_collections FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own collection" 
    ON public.user_collections FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own collection" 
    ON public.user_collections FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own collection" 
    ON public.user_collections FOR DELETE 
    USING (auth.uid() = user_id);


-- 2. USER PACKS & ESSENCE TABLE
CREATE TABLE IF NOT EXISTS public.user_packs (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    packs_available INTEGER NOT NULL DEFAULT 3,
    essence_balance INTEGER NOT NULL DEFAULT 150,
    last_daily_claim TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own pack balance" 
    ON public.user_packs FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own pack balance" 
    ON public.user_packs FOR UPDATE 
    USING (auth.uid() = user_id);


-- 3. ACCOUNT DELETION REQUESTS (AUDIT TABLE)
CREATE TABLE IF NOT EXISTS public.account_deletion_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processed', 'failed'
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.account_deletion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own deletion requests" 
    ON public.account_deletion_requests FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deletion request" 
    ON public.account_deletion_requests FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);


-- 4. RPC: CARD UPSERT FUNCTION
CREATE OR REPLACE FUNCTION public.upsert_user_card(p_user_id UUID, p_card_id TEXT)
RETURNS VOID AS $$
BEGIN
    IF auth.uid() <> p_user_id THEN
        RAISE EXCEPTION 'Acceso no autorizado';
    END IF;

    INSERT INTO public.user_collections (user_id, card_id, count, first_obtained_at, last_updated_at)
    VALUES (p_user_id, p_card_id, 1, NOW(), NOW())
    ON CONFLICT (user_id, card_id) 
    DO UPDATE SET 
        count = public.user_collections.count + 1,
        last_updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 5. RPC: ACCOUNT DELETION CONTRACT
CREATE OR REPLACE FUNCTION public.request_account_deletion(p_reason TEXT, p_confirmation TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT;
BEGIN
    v_user_id := auth.uid();
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Debes haber iniciado sesión para solicitar la eliminación.';
    END IF;

    IF p_confirmation <> 'ELIMINAR MI CUENTA' THEN
        RAISE EXCEPTION 'Confirmación inválida. Debes escribir ELIMINAR MI CUENTA.';
    END IF;

    -- Fetch email
    SELECT email INTO v_user_email FROM auth.users WHERE id = v_user_id;

    -- Insert deletion audit record
    INSERT INTO public.account_deletion_requests (user_id, user_email, reason, status, requested_at)
    VALUES (v_user_id, COALESCE(v_user_email, 'desconocido@sakuraeclipse.com'), p_reason, 'pending', NOW());

    -- Remove user collections and pack records
    DELETE FROM public.user_collections WHERE user_id = v_user_id;
    DELETE FROM public.user_packs WHERE user_id = v_user_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
