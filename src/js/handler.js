export default function handler(target, store, url) { // обработчик кликов получает цель клика и экземпляр класса Store
  if (target.classList.contains('btn-refresh')) {//должны попасть по кнопке
    store.fetchData(url);//попали по кнопке и отправляем запрос
  }
}
