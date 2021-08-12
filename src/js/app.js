import getPage from './getPage';
import { url } from './constans';
import Store from './Store';
import RenderWidget from './RenderWidget';

const container = document.querySelector('.container');

const page = new getPage(container);

const store = new Store();
const renderWidget = new RenderWidget(store, container)


if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service.worker.js');
    } catch (e) {
      console.log(e);
    }
    //page.fetchData(url);
    store.fetchData(url);
    renderWidget.init()
  });

  navigator.serviceWorker.addEventListener('message', evt => {
    //page.render(evt.data, null);
    store.getNetworkData(evt.data);
  });

}
