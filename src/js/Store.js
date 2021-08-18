import { BehaviorSubject } from 'rxjs';

export default class Store {
  constructor() {
    this.state$ = new BehaviorSubject();// сабжект (обсёрвал) с возможностью задания начального значения
    this.data = null;// объявляем начальный список, можно сразу взять заглушку, но лень
    this.status = null;//объяляем начальный статос, можно использовать для начальной заглушки как серые полоски, но лень
    this.state$.next({info: { data: this.data, status: this.status }});// эмитим (или задаём хз как там) первоначальный стейт
  }

  async fetchData(url) {//метод для отправки и обработки запросов
    const response = await fetch(url);//получаем ответ либо сеть либо кэш, мы тут не знаем
    const data = await response.json();//вытаскиваем информацию
    this.data = data;//записываем её
    this.state$.next({info: { data: this.data, status: this.status }});//запускаем поток для обновления
  }

  getNetworkData(status) {//метод для получения и обработки статуса запроса, из сети он или из кэша
    this.status = status;//записываем запрос
    this.state$.next({info: { data: this.data, status: this.status }});//запускаем поток для обновления
  }
}
