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
        pluck('info'), // оператором pluck ловим в нём объект с проектами по ключу info
      )
      .subscribe((info) => { this.render(info); });// подписываемся на поток и рендерим список
  }

  render(info) { // метод для рендера страницы
    const { data } = info; //методом деструктуризации получаем объекты с нужной информацией
    const { status } = info;//статус показывает от куда получили ответ (сеть или кэш), также это css класс по которому отображается или нет сообщение от том, что нет связи
    if (data === null) return //в начальном state ещё не определена data и равна нулл
    
    this.container.innerHTML = '';//чистим контейнер для каждого нового рендера, иначе будет бесконечный список
    const widget = document.createElement('div');//создаём всякие нужные элементы
    widget.setAttribute('class', 'widget');
    const btn = document.createElement('button');
    const msg = document.createElement('div');
    btn.setAttribute('class', 'btn-refresh');
    msg.setAttribute('class', 'msg');
    btn.innerHTML = 'Refresh';
    msg.innerHTML = `<div class = '${status}'>Error: failed to connect, server not responding. You are  seeing data from cache.</div>`
    
    widget.append(btn);//прикручиваем кнопку
    widget.append(msg);//прикручиваем сообщения с информацией, что нет соединения с сервером
    data.forEach((i) => {//создаём список
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
        widget.append(filmBox);//прикручиваем список
    })

    this.container.append(widget)//прикручиваем виджет к контейнеру
  }
}
