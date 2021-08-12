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
        pluck('data'), // оператором pluck ловим в нём объект с проектами по ключу data
      )
      .subscribe((data) => { this.render(data); });// подписываемся на поток и рендерим список
  }

  render(data) { // метод для рендера списка
    if (data === null) return //в начальном state ещё не определена data
    this.container.innerHTML = '';
    const widget = document.createElement('div');
    widget.setAttribute('class', 'widget');
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn-refresh');
    btn.innerHTML = 'Refresh';
    widget.append(btn);

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
