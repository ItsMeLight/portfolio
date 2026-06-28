// Optional Node.js + Express backend.
//
// The contact form already works on its own (it calls EmailJS directly
// from the browser, so messages land in your Gmail with no server
// required). Use this Express server only if you want a private API
// for things like: listing projects/certificates from Supabase, or
// saving contact messages with the Supabase *service role* key
// (which must never be exposed to the browser).
//
// Run with: npm run server   (after setting SUPABASE_SERVICE_ROLE_KEY
// and NEXT_PUBLIC_SUPABASE_URL in your .env.local)

require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Get all projects (stored in a "projects" table in Supabase)
app.get("/api/projects", async (_req, res) => {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", {
    ascending: false,
  });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all certificates
app.get("/api/certificates", async (_req, res) => {
  const { data, error } = await supabase.from("certificates").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Save a contact message (backup path if you don't want to rely on the
// browser calling Supabase directly with the anon key)
app.post("/api/messages", async (req, res) => {
  const { full_name, email, subject, message } = req.body;
  if (!full_name || !email || !message) {
    return res.status(400).json({ error: "full_name, email, and message are required." });
  }
  const { data, error } = await supabase
    .from("messages")
    .insert({ full_name, email, subject, message })
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
