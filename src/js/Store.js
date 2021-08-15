/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
import { BehaviorSubject } from 'rxjs';

export default class Store {
  constructor(data) {
    this.state$ = new BehaviorSubject();// сабжект (обсёрвал) с возможностью задания начального значения
    this.data = null;// записваем общий список проектов и задач
    this.status = null;
    this.state$.next({info: { data: this.data, status: this.status }});// эмитим (или задаём хз как там) первоначальный стейт
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    this.data = data;
    this.state$.next({info: { data: this.data, status: this.status }});
  }

  getNetworkData(status) {
    console.log('status')
    console.log(status)
    console.log('status')
    this.status = status;
    this.state$.next({info: { data: this.data, status: this.status }});
  }


/*
  selectProject(project) { // метод для изменения выбранного проекта
    const newCurrentProject = this.data.filter((item) => { // ищем по полученному из обработчика кликов названию
      if (item.name === project) { // выбранный проект в общем списке проектов и задач
        return item; // получаем его в виде массива с 1 объектом
      }
    });
    this.currerntProject = newCurrentProject[0];// записываем найденный проект в текущий проект
    this.state$.next({ projects: this.data, currerntProject: this.currerntProject });// эмитим (или задаём хз как там) новый стейт
  }// после этого стейт в store изменился, запускается метод init() у экземпляров классов рендеров, и далее подписка на поток, в котором запускается функция рендер

  doneTask(id) { // метод для установки/снятия галочки (задача выполнена/невыполнена)
    this.currerntProject.tasks.map((item) => { // ищем задачу по айди (именно этот блок кода не нужен, т.к. он меняет значение только в текущем проекте, но не в общем списке проектов и задач)
      if (item.id === Number(id)) item.done = !item.done;// айди приходит в виде строки, нужно привести к числу, далее просто меняем значени true или false
    });
    this.data.forEach((item) => { // делаем всё тоже самое что описано выше, только меняем статус выполнения задачи
      if (item.name === this.currerntProject) { // в общем списке проектов и задач
        item.tasks.map((i) => {
          if (i.id === Number(id)) i.done = !i.done;
        });
      }
    });
    this.state$.next({ projects: this.data, currerntProject: this.currerntProject });// эмитим (или задаём хз как там) новый стейт
  }// после этого стейт в store изменился, запускается метод init() у экземпляров классов рендеров, и далее подписка на поток, в котором запускается функция рендер
  */
}
