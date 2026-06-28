# Christian I. Asuncion — Portfolio

Built with **Next.js (App Router) + React + Tailwind CSS**, with **Supabase** for data
and **EmailJS** so contact-form messages land straight in your Gmail inbox. An optional
**Node.js + Express** API is included for anything you'd rather keep server-side.

## 1. Install

```bash
npm install
```

## 2. Add your photos

Drop these files in (any image format, just keep the names or update `src/data/content.ts`):

- `public/images/profile.jpg` — the circular hero photo
- `public/images/about.jpg` — the About section photo
- `public/images/project-*.png` — one per project (see `src/data/content.ts`)
- `public/certificates/cert-*.png` — your certificate images
- `public/cv/Christian-Asuncion-CV.pdf` — your downloadable CV

## 3. Edit your content

Everything text-based (name, bio, skills, projects, experience, contact info) lives in
one file: `src/data/content.ts`. Edit that and the whole site updates.

## 4. Set up EmailJS (so messages reach your Gmail)

1. Go to https://www.emailjs.com and sign up (free tier is fine).
2. **Email Services** → Add a new service → choose **Gmail** → connect your Gmail account.
3. **Email Templates** → create a template, e.g.:
   - Subject: `New portfolio message: {{subject}}`
   - Body:
     ```
     From: {{full_name}} ({{email}})
     Subject: {{subject}}

     {{message}}
     ```
   - Set "To email" in the template settings to your own Gmail address.
4. Copy your **Service ID**, **Template ID**, and **Public Key** (Account → API Keys).
5. Put them in `.env.local` (copy `.env.local.example` to `.env.local` first):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

That's it — the Contact form (`src/components/Contact.tsx`) calls EmailJS directly from
the browser, no backend required, and every submission shows up in your Gmail.

## 5. Set up Supabase

1. Create a project at https://supabase.com.
2. In the SQL editor, run `supabase/schema.sql` from this repo — it creates `messages`,
   `projects`, and `certificates` tables with sensible Row Level Security policies.
3. Copy your project URL and anon key (Project Settings → API) into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

The Contact form also logs every message into the `messages` table as a backup record
(in addition to emailing you via EmailJS) — safe to delete that part of
`src/components/Contact.tsx` if you don't want it.

## 6. (Optional) Run the Express API

Only needed if you want a private server endpoint, e.g. to read messages with the
Supabase **service role** key (never expose that key in the browser):

```bash
# add SUPABASE_SERVICE_ROLE_KEY to .env.local first
npm run server
```

This starts an API on `http://localhost:4000` with:
- `GET /api/projects`
- `GET /api/certificates`
- `POST /api/messages`

## 7. Run the site

```bash
npm run dev
```

Visit http://localhost:3000.

## 8. Deploy

- **Frontend**: deploy to [Vercel](https://vercel.com) (made for Next.js) — push to GitHub,
  import the repo, add the same env vars from `.env.local` in the Vercel dashboard.
- **Express API** (if used): deploy separately to something like Render or Railway, and
  add its URL as `NEXT_PUBLIC_API_URL` for the frontend to call.

## Project structure

```
src/
  app/            Next.js App Router (layout, page, globals.css)
  components/     Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer
  data/content.ts Single source of truth for all portfolio text/content
  lib/            Supabase client
server/           Optional Express API (uses Supabase service role key)
supabase/         SQL schema to run in Supabase
```
 
