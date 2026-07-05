# Kailash by Road — 2025 Route Replay

Single-file cinematic flythrough of Sadhguru's 2025 motorcycle yatra route:
Gorakhpur → Bhairahawa → Kathmandu → Zhangmu → Nyalam → Saga → Lake Manasarovar → Darchen.

## Run it

Just open `index.html` in a browser (needs internet — it pulls satellite and
terrain tiles live). No build step, no API keys.

## Deploy

Push the folder to any static host:
- **GitHub Pages** — same flow as hunch-app
- **Cloudflare Pages / Vercel** — drag and drop, done

## Stack (all free, no tokens)

- **MapLibre GL JS** — 3D map engine
- **Esri World Imagery** — satellite tiles (covers Tibet fully, attribution included)
- **AWS/Mapzen Terrarium tiles** — elevation for 3D terrain

## Route accuracy

The route is a hand-plotted approximation (~60 points) of the actual highways
(NH-727, Prithvi Hwy, Araniko Hwy, G219). At flythrough zoom this reads correctly.
For road-exact geometry, replace the `ROUTE` array in `index.html` with rows of
`[lng, lat, elevation_m]` from a GPX/OSRM trace — everything else (camera, ribbon,
stages) recomputes automatically. Stage anchors reference route indices via
`STAGES[n].i`, so re-anchor those after swapping.

## Next layers (2026 live mode)

1. `position.json` polled every 60s → move the rider marker off replay onto live feed
2. Garmin inReach MapShare KML → small serverless function → `position.json`
3. Updates feed (Telegram bot → Supabase → static JSON) below the fold
