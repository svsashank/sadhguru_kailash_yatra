// Bakes the road-snapped route to route.json so visitors don't hit OSRM live.
// Run once:  node build-route.mjs   (Node 18+, needs internet)
const ANCHORS = [
  [83.3732,26.7606],[83.4163,27.5057],[83.4484,27.7006],[84.4300,27.6900],
  [84.5630,27.8570],[85.3240,27.7172],[85.4298,27.6710],[85.5417,27.6221],
  [85.9000,27.7900],[85.9610,27.9737],[85.9800,27.9910],[85.9820,28.1550],
  [85.8500,28.5500],[85.6000,28.9000],[85.2325,29.3288],[84.0300,29.7700],
  [83.4500,30.0700],[82.3000,30.4700],[81.7500,30.7500],[81.3000,30.7800],
  [81.2900,30.9800]
];
const OSRM='https://router.project-osrm.org/route/v1/driving/';
const coords=[ANCHORS[0].slice()], anchorIdx=[0];
for(let k=0;k<ANCHORS.length-1;k++){
  const [a,b]=[ANCHORS[k],ANCHORS[k+1]];
  let leg=[a,b];
  try{
    const r=await fetch(OSRM+`${a[0]},${a[1]};${b[0]},${b[1]}?overview=full&geometries=geojson&steps=false`);
    const j=await r.json();
    if(j.code==='Ok') leg=j.routes[0].geometry.coordinates;
    else console.warn(`leg ${k}: ${j.code} — straight-line fallback`);
  }catch(e){ console.warn(`leg ${k}: ${e.message} — straight-line fallback`); }
  for(let i=1;i<leg.length;i++) coords.push(leg[i]);
  anchorIdx.push(coords.length-1);
  await new Promise(r=>setTimeout(r,600)); // be polite to the demo server
}
const fs=await import('fs');
fs.writeFileSync('route.json',JSON.stringify({coords,anchorIdx}));
console.log(`route.json written: ${coords.length} road points`);
