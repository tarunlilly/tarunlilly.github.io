# Japan 2026 — your travel workspace

A redesigned, dependency-free version of the existing Japan planner. Vanilla HTML, CSS and JavaScript: no account, build step, package installation or backend.

## Start here

The `japan-planner-site` folder in the ZIP is the upload-ready website. Keep these files together:

```text
index.html               interface, original itinerary, inline styles and scripts
manifest.webmanifest     optional home-screen installation metadata
sw.js                    offline interface caching
icon-192.png
icon-512.png
apple-touch-icon.png
README.md                this guide
```

Open `index.html` for a quick look. **For reliable browser storage and offline caching, serve the folder on localhost or HTTPS.** For example, if Python is already installed, open a terminal in the website folder and run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://localhost:8000`. Direct `file://` behaviour differs between browsers; service workers do not run there.

To use an existing static host, replace the site's assets with this folder's contents. No site has been deployed as part of this redesign. Do not upload your personal backup files or documents with the site.

## What's included

- **Overview:** the actual 19 November–5 December 2026 itinerary, 17 days, 16 nights and four bases; a live estimate from the existing budget; checklist readiness; available files; useful next steps.
- **Itinerary:** searchable day plans, base-city filter, previous/next day navigation, a month calendar and a saved note for each day.
- **Route & maps:** the original route map, city maps, travel legs and day-trip details. Route animation is opt-in, not automatic, and pauses when you leave its section.
- **Budget:** the original JPY/INR model, editable exchange rate, nightly rates, food, flights, transport, entries, pre-departure costs and shopping. Negative amounts and zero exchange rates are rejected. Totals are estimates, not tracked spending or live quotes.
- **Flights & stays:** preserved recommendations and source links, accommodation notes shared with the schedule, plus flight booking notes. Suggestions and notes do not establish a reservation.
- **Documents:** choose multiple files, categorise them, search filenames/categories/visa references, download or remove files. Up to 20 MB per file, 50 MB of available files and 200 entries per workspace.
- **Visa checklist:** preserved sections and guidance, accessible expandable rows, search and status filters, notes, readiness tracking, optional/N/A status and persistent attachments. Attaching a file does **not** automatically mark it ready.
- **Letters:** editable traveller fields, draft cover-letter and schedule downloads, plus folder-structure downloads. The `.doc` downloads are Word-compatible HTML documents, not native `.docx` files. Review the drafts and replace every bracketed prompt before use.
- **Backups & storage:** complete file backups, lighter planner-only exports, validated import, browser-persistence requests, and a confirmed reset.
- Responsive sidebar/compact scrollable mobile navigation, keyboard focus, labelled controls, reduced-motion support, light/dark themes and print styling.

The original travel data, recommendations and external links are retained. Incorrect “15 nights” summary text was corrected or replaced with counts derived from the itinerary. The overview's editable travel-window note does **not** change the fixed itinerary dates.

## Where your information lives

Planner entries are saved in **localStorage** using the original key, `japan-2026-planner-v1`, to retain compatible existing data. Document contents are stored as blobs in **IndexedDB** (`japan-2026-documents`).

This is **browser/device-only storage**:

- No cloud sync, login, encryption, server upload or remote document storage.
- Data belongs to the website **origin**: scheme, hostname and port. A different URL, browser, profile or device has a different workspace. Moving from `file://` to localhost or a hosted address does not move your entries.
- Normal reloads retain document files. Browser cleanup, site-data deletion, private browsing, storage limits or browser eviction can remove them.
- “Ask browser to retain files” is a best-effort browser request. Even if granted, it is not a backup and does not prevent manual deletion.
- Anyone with access to the browser profile may be able to access these entries. Avoid saving sensitive identity documents on a shared device.
- External source links open their own websites. Adding a Drive/folder link does not sync files or grant the planner access to that folder.
- Save failures are surfaced in the header. If the browser cannot save, download a backup before closing the page.
- Concurrent changes in another tab block further autosaving in this tab; reload before continuing. This is not a collaborative editor.

The website files themselves contain the original itinerary but no personal data added in your browser. A public host makes that itinerary public. Personal information may be included in any backups you choose to download or share.

## Back up before switching devices or updating

Open **Backups & storage**.

### Complete backup

“Download complete backup” produces one unencrypted JSON file containing:

- applicant details, travel/submission notes and external-folder link;
- checklist status and notes;
- daily notes, accommodation and flight notes;
- budget edits and letter fields;
- document metadata **and file contents**, encoded inside the JSON.

If files are unavailable, the planner warns you before exporting; those entries are included as metadata only. A backup cannot recover a file that is already missing. Check your browser's downloads after clicking, then keep the backup somewhere private and independent of this browser.

### Planner-only export

Includes the same planner entries and document metadata, **but no document file contents**. It is smaller, but not sufficient to move the document library to another device.

### Restore

Choose a backup JSON and confirm the replacement after validation.

- A **complete restore replaces both planner entries and document files**. Files absent from that backup are removed. Export first if you need the existing workspace.
- A **planner-only or legacy JSON import replaces planner entries but retains existing local document files**. On a new device, referenced files will be marked unavailable until you attach the original or restore a complete backup.
- Imports validate the format, known fields, numbers, statuses, document metadata, file sizes and encoded file contents before applying changes. The import limit is 75 MB.
- A malformed or unsupported backup is rejected without merging arbitrary fields.
- If old saved entries cannot be read, autosaving is blocked to avoid silently overwriting them. Use **Download unreadable saved data** in Backups & storage before restoring or resetting.

The old website stored attachments only as temporary blob URLs. **Those old file contents cannot be recovered from its JSON.** Their metadata and checklist status are retained, but the library identifies the missing originals. Reattach each original in the visa checklist. New attachments persist through normal reloads and appear in Documents.

## Remove or reset safely

Removing a document asks for confirmation. If it is the current attachment for a visa checklist item, that item returns to “To do.” Replacing a visa attachment retains the previous file separately in Documents, so it can be backed up or removed deliberately.

Reset asks for confirmation before clearing all entries and document files from this browser. The fixed itinerary and original recommendations remain. **There is no undo without a backup.**

## Offline use and updates

When served over HTTPS or localhost, the service worker caches the interface and packaged assets. Load the site once, let installation finish, then test a reload without internet before you travel. Existing local documents are available offline. External websites are not.

The worker caches only this app's listed assets. Cache cleanup is scoped to this app's cache prefix and registration scope; it does not delete unrelated origin caches. Older legacy cache names are deliberately left alone rather than risking other data.

When changing packaged assets, bump the worker's version suffix. The worker uses network-first loading with an offline cache fallback. Refresh open pages after updating. Export a complete backup before replacing an older site.

## Planning guidance, not verification

Travel times, attraction details, prices, visa and customs guidance remain the original, **unverified planning guidance**. No new live travel research was performed. Check the current official sources before booking or applying.

Readiness counts required checklist items outside the pre-departure section; it is **not visa approval**, a submission status, or proof that attached documents meet current requirements. The letter drafts intentionally contain review prompts rather than inventing confirmed bookings, leave approval or evidence. The generated schedule flags unconfirmed accommodation suggestions.

## Checks performed on this revision

29 automated checks passed using installed headless Chromium and local validation tools, without installing dependencies:

- all eight primary sections, desktop and 390/320 px phone widths;
- itinerary search/filter and daily-note persistence;
- budget updates and invalid exchange-rate rejection;
- checklist controls, status filtering and keyboard expansion;
- document upload, category search and byte-identical download after reload;
- persistent visa attachments and readiness independent of attachment;
- complete backup, cancelled reset, actual reset and file restoration;
- malformed import rejection and unsafe external-folder URL rejection;
- accommodation/letter integration and schedule download;
- labelled visible controls, offline reload and absence of runtime console errors/off-host asset requests.
- exact preservation of the original structured itinerary, recommendations, maps and links;
- legacy saved-data migration, planner-only imports retaining files, and missing-file messages;
- document-removal cancellation, linked checklist reset and oversized-file rejection;
- byte-identical restore of a 5 MB binary document, corrupted-backup rejection and unsafe-property rejection;
- visible storage-quota errors, unreadable-data recovery, scoped service-worker cache cleanup, dark mode and reduced motion.

The packaged HTML validator also passed with zero errors and warnings in multi-file mode. Testing was in Chromium; Safari/iOS and Firefox were not tested. Browser storage and installation behaviour can differ.

The supplied screenshots are from a clean workspace; test entries are not included in the website.
