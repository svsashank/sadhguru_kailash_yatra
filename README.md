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

The route is snapped to real roads via OSRM (OpenStreetMap routing), leg by leg
between 21 anchor waypoints. Resolution order on page load:

1. `route.json` if committed (baked geometry — preferred for production)
2. Live OSRM snap in the browser (~20 quick requests, cached fallback per leg)
3. Straight anchor-to-anchor lines if OSRM is unreachable

**Bake it for production** (one command, then commit the output):

```
node build-route.mjs
git add route.json && git commit -m "bake road geometry" && git push
```

If OSM can't route a leg (e.g. the closed Kodari–Zhangmu border crossing), that
single short leg falls back to a straight line — everything else stays road-exact.
Elevations are interpolated between anchor altitudes along each leg.

## Next layers (2026 live mode)

1. `position.json` polled every 60s → move the rider marker off replay onto live feed
2. Garmin inReach MapShare KML → small serverless function → `position.json`
3. Updates feed (Telegram bot → Supabase → static JSON) below the fold
