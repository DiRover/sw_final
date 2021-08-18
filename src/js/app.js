import { fromEvent } from 'rxjs';
import { url } from './constans';
import Store from './Store';
import RenderWidget from './RenderWidget';
import handler from './handler';

const container = document.querySelector('.container');//получаем основной контейнер для отрисовки приложения

const store = new Store();//класс для создания и управления потоками RxJS
const renderWidget = new RenderWidget(store, container)//класс для отрисовки страницы потомками


if (navigator.serviceWorker) {//проверяем наличие в браузере сервис воркера
  window.addEventListener('load', async () => {
    try {//после загрузки страницы пытаемся зарегистрировать сервис воркер
      await navigator.serviceWorker.register('./service.worker.js');//регистрируем сервис воркер
    } catch (e) {//отлавливаем ошибку
      console.log(e);
    }
    store.fetchData(url);//отправляем запрос на сервер для получения данных
    renderWidget.init(); //запускаем рендер страниы
  });

  navigator.serviceWorker.addEventListener('message', evt => {//получаем сообщения от сервис воркера
    console.log('message!!')
    store.getNetworkData(evt.data);//обрабатываем сообщения от сервис воркера
  });

}

fromEvent(document, 'click').subscribe((e) => { // обрабатваем все клики на странице технологией RxJS
  handler(e.target, store, url);// отработчик кликов
});

