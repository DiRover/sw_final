/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { pluck } from 'rxjs/operators';
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator"

export default class RenderWidget {// класс для списка проектов
  constructor(store, container) {
    this.store = store;// экземпляр класса Store
    this.container = container;// корневой элемент для отображения
  }

  init() { // метод для отрисовки
    this.store.state$// берём поток store$ у экземпляра класса Store
      .pipe(
        pluck('info'), // оператором pluck ловим в нём объект с проектами по ключу data
      )
      .subscribe((info) => { this.render(info); });// подписываемся на поток и рендерим список
  }

  render(info) { // метод для рендера списка
    const { data } = info;
    const { status } = info;
    if (data === null) return //в начальном state ещё не определена data
    console.log('status');
    console.log(status);
    console.log('status');
    this.container.innerHTML = '';
    const widget = document.createElement('div');
    widget.setAttribute('class', 'widget');
    const btn = document.createElement('button');
    const msg = document.createElement('div');
    btn.setAttribute('class', 'btn-refresh');
    msg.setAttribute('class', 'msg');
    btn.innerHTML = 'Refresh';
    msg.innerHTML = `<div class = '${status}'>Error: failed to connect, server not responding. You are  seeing data from cache.</div>`
    
    widget.append(btn);
    widget.append(msg);
    console.log(data)
    data.forEach((i) => {
        const filmBox = document.createElement('div');
        filmBox.setAttribute('class', 'film-box');
        const avatar = getRandomAvatar();
        let elem = `<img src= data:image/svg+xml;base64,${btoa(avatar)} alt='avatar'/>`;
        
        filmBox.innerHTML = `
        <div class = 'film-name'>${i.name}</div>
        <div class = 'film-body'>
            ${elem}
            <div class = 'film-text'>
                <div class = 'text'><span class = 'genre'>Genre:</span> ${i.genre}</div>
                <div class = 'text'><span class = 'description'>description:</span> ${i.description}</div>
            </div>
        </div>
        `
        widget.append(filmBox);
    })

    this.container.append(widget)
  }
}
