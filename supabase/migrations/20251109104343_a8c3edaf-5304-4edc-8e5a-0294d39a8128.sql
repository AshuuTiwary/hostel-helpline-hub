-- Create app_role enum (without IF NOT EXISTS)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Table to store user roles (separate from profiles)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Policies for user_roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Complaints table
CREATE TABLE IF NOT EXISTS public.complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  priority text NOT NULL DEFAULT 'Medium',
  status text NOT NULL DEFAULT 'pending',
  is_anonymous boolean NOT NULL DEFAULT false,
  branch text,
  semester int,
  roll_number text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for complaints updated_at
DROP TRIGGER IF EXISTS update_complaints_updated_at ON public.complaints;
CREATE TRIGGER update_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS policies for complaints
DROP POLICY IF EXISTS "Users can view own complaints" ON public.complaints;
CREATE POLICY "Users can view own complaints"
  ON public.complaints
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own complaints" ON public.complaints;
CREATE POLICY "Users can insert own complaints"
  ON public.complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own complaints" ON public.complaints;
CREATE POLICY "Users can update own complaints"
  ON public.complaints
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own complaints" ON public.complaints;
CREATE POLICY "Users can delete own complaints"
  ON public.complaints
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all complaints" ON public.complaints;
CREATE POLICY "Admins can view all complaints"
  ON public.complaints
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update all complaints" ON public.complaints;
CREATE POLICY "Admins can update all complaints"
  ON public.complaints
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete all complaints" ON public.complaints;
CREATE POLICY "Admins can delete all complaints"
  ON public.complaints
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));