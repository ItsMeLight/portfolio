-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text, -- Web | Mobile | System | Game
  tags text[],
  image_url text,
  link text,
  created_at timestamptz default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table messages enable row level security;
alter table projects enable row level security;
alter table certificates enable row level security;

-- Anyone can submit a contact message
create policy "Anyone can insert messages"
  on messages for insert
  with check (true);

-- Only you (via service role key on the server) can read messages
-- No select policy is added for the anon role on purpose.

-- Public read access for projects & certificates (so the site can show them)
create policy "Public can view projects"
  on projects for select
  using (true);

create policy "Public can view certificates"
  on certificates for select
  using (true);
