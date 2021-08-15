import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { data } from './data';
import { url } from './constans';

precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'v1';

const responseCache = new Response(JSON.stringify(data));

self.addEventListener('install', (evt) => {
  console.log('install')
  evt.waitUntil((async () => {
    console.log('install waitUntil')
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, responseCache);
    await self.skipWaiting();
  })());
});
  
self.addEventListener('activate', (evt) => {
  console.log('activate')
  evt.waitUntil((async () => {
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (evt) => {
  //console.log('sw fetch')
  const requestUrl = new URL(evt.request.url);
  if (!requestUrl.pathname.startsWith('/data')) return;
  
  evt.respondWith((async () => {

    const cache = await caches.open(CACHE_NAME);
    const client = await clients.get(evt.clientId);
    
    try {

      console.log('response')
      const response = await fetch(evt.request);

      if (response.ok) {

        console.log('response from network')
        evt.waitUntil(cache.put(evt.request, response.clone()));
        client.postMessage('network');
        return response;

      } else {

        console.log('response from cache')
        const responseCache = await cache.match(evt.request);
        if (responseCache) {
          client.postMessage('cache');
          return responseCache;
        }

      }    
    } catch(e) {
      console.log(e);
    }
  })());
});

















//const cache = await caches.open(CACHE_NAME);
    //const client = await clients.get(evt.clientId);
    //let response = await fetch(evt.request);
/*
    if (!response) {
      response = await cache.match(evt.request);
      client.postMessage('delay');
      return response;
    }
    
    try {
      console.log('response')
      response = await fetch(evt.request);
      console.log(response)
      if (response.ok) {
        console.log('response from network')
        evt.waitUntil(cache.put(evt.request, response.clone()));
        return response;
      } else {
        console.log('response from cache')
        response = await cache.match(evt.request);
        if (response) {
          console.log(response)
          return response;
        }
      }    
    } catch(e) {
      console.log(e);
    }*/