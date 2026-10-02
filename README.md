# Japan 2026 planner — putting it online

Six files, no build step, no dependencies. Upload the folder anywhere that serves static files and it works.

```
index.html              the planner
manifest.webmanifest    makes it installable on a phone
sw.js                   caches it for offline use
icon-192.png
icon-512.png
apple-touch-icon.png
```

---

## Option 1 — Netlify Drop (fastest, about 60 seconds)

1. Go to **app.netlify.com/drop**
2. Drag this whole folder onto the page.
3. You get a URL immediately, something like `fuji-planner-a1b2c3.netlify.app`.
4. Sign in with GitHub or email to keep it permanently and rename the site.

Best if you just want it working now. To update later, drag the folder again.

## Option 2 — GitHub Pages (most permanent, free forever)

No git or command line needed — the web interface is enough.

1. Create a GitHub account if you don't have one.
2. **New repository** → name it `japan-2026` → **Public** → Create.
3. On the repo page, **Add file → Upload files**, drag all six files in, Commit.
4. **Settings → Pages** → under *Source* pick **Deploy from a branch**, branch `main`, folder `/ (root)` → Save.
5. Wait two or three minutes. Your URL is `https://<your-username>.github.io/japan-2026/`.

To update: upload a new `index.html` over the old one and bump `CACHE = "japan-2026-v1"` to `v2` in `sw.js`, otherwise the service worker keeps serving the old copy.

**Note:** free GitHub accounts can only serve Pages from a *public* repository. That's fine here — the files contain no personal data. Everything you type lives in your browser, not in the repo.

## Option 3 — Cloudflare Pages

Same idea as Netlify: **pages.cloudflare.com** → Create → Upload assets → drag the folder. Generous free tier, fast worldwide.

---

## Put it on your phone's home screen

Once it's live, open the URL on your phone.

- **iPhone, Safari:** Share → *Add to Home Screen*
- **Android, Chrome:** menu → *Install app* or *Add to Home screen*

It opens full screen with no browser chrome, and the service worker means **it keeps working with no signal** — useful on the Shinkansen, up Mt Misen, or when your eSIM data runs out. Load it once on wifi before you fly.

---

## Two things worth knowing

**Your data is tied to one address.** The planner saves to browser storage, which is scoped to the exact origin. Anything you typed into the file on your laptop (`file:///...`) will **not** appear at the hosted URL, and vice versa. Pick one and stay there.

Use **Export data** in the strip under the tabs to download everything as JSON, then **Import** it on the other device. Do this before you switch, and again before the trip as a backup.

**The page is public; your data is not.** The hosted files contain no personal information. Your passport number, dates, notes, budget figures and attached documents never leave your device — there's no server and no account. The trade-off is that the itinerary itself is readable by anyone with the URL, which is unlikely to matter but is worth knowing.

Attached files are the exception to persistence: browsers won't let a page re-open a file from disk without you picking it again, so attachments survive the session but not a reload. Keep the real documents in Google Drive and treat the planner as the index.
