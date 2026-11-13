/* Swing Hook: an offline shell scoped to this repository, including project subpaths. */
'use strict';
const VERSION='3-d674ea442d02';
const ROOT=new URL('./',self.registration.scope).href;
const PREFIX='swinghook:'+new URL(ROOT).pathname+':';
const CACHE=PREFIX+VERSION;
const ASSETS=['./','./index.html','./swing-hook-offline.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png'].map(path=>new URL(path,ROOT).href);
const INDEX=new URL('./index.html',ROOT).href;
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  // An existing installation stays in control until the player chooses to update.
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==new URL(ROOT).origin||!url.href.startsWith(ROOT))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(req,{ignoreSearch:true});
    if(cached)return cached;
    if(req.mode==='navigate'){
      const shell=await cache.match(INDEX);
      if(shell)return shell;
    }
    try{return await fetch(req)}catch(error){
      return new Response('This file is not available offline. Open Swing Hook online once, or use the downloaded offline HTML.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});
    }
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING'){self.skipWaiting();return;}
  if(event.data?.type==='OFFLINE_STATUS')event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    const files=await Promise.all(ASSETS.map(url=>cache.match(url)));
    event.ports[0]?.postMessage({ready:files.every(Boolean),version:VERSION});
  })());
});
