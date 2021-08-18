import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { data } from './data';
import { url } from './constans';//берём отдельно!

precacheAndRoute(self.__WB_MANIFEST);//необязательная строка, нужна чтобы кэшировать файлы

const CACHE_NAME = 'v1';//имя кэша

const responseCache = new Response(JSON.stringify(data));//для записи в кэш, т.к. это инфа из файла, а не сам файл, то из неё нужно создать запрос

self.addEventListener('install', (evt) => {//устанавливаем сервис воркер
  console.log('install')
  evt.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);//создаём кэш
    await cache.put(url, responseCache);//записываем в кэш заглушку для первого запуска, урл это ключ - запрос это значение
    await self.skipWaiting();//скидываем ожидание, если сервис воркер ждёт пока клиент отпишется от его старой версии (версии сервис воркера)
  })());
});
  
self.addEventListener('activate', (evt) => {//активируем сервис воркер
  console.log('activate')
  evt.waitUntil((async () => {
    await self.clients.claim();//обновляем сервис воркер для всех клиентов
  })());
});

self.addEventListener('fetch', (evt) => {//отлавливаем событие фетч
  const requestUrl = new URL(evt.request.url);//получаем адрес, по которому отправился запрос
  if (!requestUrl.pathname.startsWith('/data')) return;//если это не нужный для кэширования путь, то выходим
  
  evt.respondWith((async () => {//подменяем запрос

    const cache = await caches.open(CACHE_NAME);//открываем кэш
    const client = await clients.get(evt.clientId);//получаем клиента, от которого пошёл запрос
    
    try {
      const response = await fetch(evt.request); //пытаемся получить ответ

      if (response.ok) {//если получили ответ
        evt.waitUntil(cache.put(evt.request, response.clone()));//получили ответ из сети, сразу записали в кэш
        client.postMessage('network');//отправляем сообщение клиенту, что ответ из сети
        return response;//отправили ответ из сети на страницу

      } else {

        const responseCache = await cache.match(evt.request);//находим подходящий ответ в кэше

        if (responseCache) {//если ответ в кэше есть для данного адреса
            client.postMessage('cache');//отправляем сообщение клиенту, что ответ из кэша
            return responseCache;//возвращаем ответ из кэша на страницу
        }
      }    
    } catch(e) {
      console.log(e);//ловим какую-нить ошибку
    }
  })());
});
