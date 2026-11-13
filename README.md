# Swing Hook — Offline Arcade

A complete, dependency-free swinging game: 500 levels in 20 worlds, three daily flights, unlockable characters, optional best-run ghosts, flight trails, and a level editor.

## Play offline right now

Download **[swing-hook-offline.html](./swing-hook-offline.html)** using GitHub’s **Download raw file** button. Open the downloaded file in a modern browser. It contains the entire game, including sounds and the level editor. No server, installation, or internet connection is needed.

On phones, opening a downloaded HTML file depends on the operating system. Installing the hosted game is the more reliable mobile option.

## Install the hosted game

Serve this repository with GitHub Pages or another HTTPS static host. If Pages is not enabled, open the repository’s **Settings → Pages**, choose **Deploy from a branch**, and select **main / (root)**.

1. Open the hosted game once while online.
2. Wait for **READY TO PLAY OFFLINE** in the menu. The game verifies that its full offline shell was saved.
3. Choose **Install / Offline**. Use the browser’s installation option, or Safari’s **Share → Add to Home Screen** on iPhone/iPad.
4. Open the installed app or revisit the same hosted address with the network off.

The service worker and web manifest use relative paths, so both root domains and GitHub Pages project subdirectories work. An update waits until you select **Load the new version**; it does not interrupt a run. Offline support needs the first online visit, browser storage, and all files in this repository. Uploading only `index.html` provides a working online game, but does not provide hosted offline caching.

## Controls

- Hold mouse, touch, or **Space** to grapple; release to fly.
- **R** restarts, **P / Escape** pauses.
- Lime pads bounce; dark blocks are solid; coral spikes reset you to the last checkpoint.
- Earn stars by finishing, beating the target time, and completing the level without a fall.
- Ghosts show your best run for your 12 most recently improved campaign levels. They are optional and have no collision.

## Level lab

Choose tools to place hooks, angled bounce pads, platforms, hazards, diamonds, checkpoints, a start point, and a finish line. Drag objects to move them; drag empty space with Block or Hazard selected to draw a rectangle. Use the inspector to set sizes, angles, bounce power, and moving-hook range. Grid snapping is optional.

- Pan with the Pan tool, the mouse wheel, arrow keys, or the desktop overview map.
- **Ctrl/Cmd Z** undoes; **Ctrl/Cmd Shift Z** redoes; **Delete** removes the selection.
- **Ctrl/Cmd D** duplicates; **Ctrl/Cmd S** saves a named course; **Space** tests it.
- Drafts autosave locally and restore on reopening. Named courses stay in the course collection.
- Export/import course JSON files offline, or share an encoded course link from the hosted version. Links contain the course itself; no sharing server is used.

## Keep your progress

Use **Settings → Progress & backups** to export or merge a JSON backup. Backups contain campaign records, skins/settings, daily records, the course collection, ghosts, and the editor draft. A restore keeps the higher stars and faster time for each level. Local-file play and hosted/installed play can have different browser storage; use a backup to transfer between them. Clearing browser data can remove saves and cached app files.

## Development / checks

No build step or runtime dependencies are required. Edit `index.html`; copy it to `swing-hook-offline.html`; change `VERSION` in `sw.js` whenever the offline shell changes. Commit the HTML, manifest, worker, and icons together. The included tests need only Node.js:

```sh
node --test tests/*.test.cjs
```

The tests exercise gameplay, editor operations, validated saves, and an offline service-worker simulation. They do not replace browser installation and device testing.

Artwork, sound synthesis, and game code are self-contained. No ads, analytics, external fonts, CDNs, accounts, or paid services.
