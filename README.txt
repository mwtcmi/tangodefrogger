
FreePBX Frogger — Tango Edition (Theming Pack)
=============================================

What this is
------------
A drop-in theming pack to reskin the open-source HTML5 Frogger demo with FreePBX/Tango branding.
It does not replace the game's core logic; it swaps art/sfx and adds a tiny HUD + score helper.

Contents
--------
- index.html                 -> Adds HUD/footer and includes the theme + score scripts.
- scripts/theme-freepbx.js   -> Swaps image/audio assets and updates on-page copy.
- scripts/score.js           -> Local score + high-score HUD (via localStorage).
- images/freepbx/*           -> Placeholder images (replace later with final art).
- sounds/*                   -> Placeholder tones (ringback, fast-busy, DTMF-1).

How to use with denodell/frogger
--------------------------------
1) Clone the original repo (or your fork) locally:
   git clone https://github.com/denodell/frogger.git
   cd frogger

2) Copy these files into the project root, preserving folders:
   - index.html          (you may merge with upstream if it already has its own scripts/canvas)
   - scripts/*           (new files)
   - images/freepbx/*    (new files)
   - sounds/*            (new files)

   If upstream already has an index.html that loads its own engine/app scripts,
   keep those intact and simply ensure the following two lines are present AFTER them:

     <script src="scripts/score.js"></script>
     <script src="scripts/theme-freepbx.js"></script>

3) Run locally:
     python3 -m http.server 8080
   Open http://localhost:8080

4) Deploy (any static host works):
   - GitHub Pages: push to gh-pages and enable Pages in repo settings
   - Netlify/Vercel: drag-and-drop or connect repo (no build step)
   - Docker/Nginx: serve the folder under /usr/share/nginx/html

Replacing placeholders later
----------------------------
Replace the PNGs in images/freepbx/ with your final marketing art using the same filenames.
For Tango, keep a 4-frame horizontal sprite strip 128x32 (32x32 per frame) named "tango-sprite.png".

License & credits
-----------------
This theming pack is provided as-is for use on top of the public demo by denodell/frogger.
Keep an attribution line in the footer (fine to style it subtly).
