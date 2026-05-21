-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Admin credentials table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
-- No policies = no client access. Only SECURITY DEFINER functions can read/write.

CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Verify login credentials securely (constant-ish time via crypt())
CREATE OR REPLACE FUNCTION public.verify_admin_login(_username text, _password text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash text;
BEGIN
  SELECT password_hash INTO stored_hash
  FROM public.admin_users
  WHERE username = _username;

  IF stored_hash IS NULL THEN
    RETURN false;
  END IF;

  RETURN stored_hash = crypt(_password, stored_hash);
END;
$$;

-- Update password (used by admin to rotate). SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.update_admin_password(_username text, _current_password text, _new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash text;
BEGIN
  SELECT password_hash INTO stored_hash FROM public.admin_users WHERE username = _username;
  IF stored_hash IS NULL OR stored_hash <> crypt(_current_password, stored_hash) THEN
    RETURN false;
  END IF;
  UPDATE public.admin_users
  SET password_hash = crypt(_new_password, gen_salt('bf', 10))
  WHERE username = _username;
  RETURN true;
END;
$$;

-- Seed initial admin user (only if not exists)
INSERT INTO public.admin_users (username, password_hash)
SELECT 'admin', crypt('jmb2024', gen_salt('bf', 10))
WHERE NOT EXISTS (SELECT 1 FROM public.admin_users WHERE username = 'admin');