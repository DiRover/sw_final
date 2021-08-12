export default function handler(target, store) { // обработчик кликов получает цель клика и экземпляр класс Store
  
}










/*
const stateList = document.querySelector('.state-list');// поп ап со списком проектов, просто здесь его удобней получать
  if (target.classList.contains('current-project')) { // поп ап появляется при выборе текущего проекта, для отобрадения задач данного проекта
    stateList.classList.toggle('hidden');// кликнули на текущий проект, поп ап появился, снова туда кликнули, поп ап пропал
  } else if (target.classList.contains('state-select')) { // кликнули на другом проекте в поп апе
    stateList.classList.toggle('hidden');// закрываем поп ап
    const project = target.textContent;// получаем название нового текщего проекта для отображения задач
    store.selectProject(project);// отправляем название в обработчик, метод экземпляра класса Store
  } else if (target.classList.contains('cycle')) { // кликнули на пустой кружок, чтоб галочку поставить, тип задача выполнена
    const { id } = target;// получаем айди задачи, прописан у самого элемента, по которому кликнули
    store.doneTask(id);// отправляем айди в обработчик, метод экземпляра класса Store
  } else if (target.classList.contains('check')) { // кликнули на галочку, тип задача всё-таки не выполнена
    const { id } = target.closest('.cycle');// получаем айди задачи, прописан у самого элемента, по которому кликнули
    store.doneTask(id);// отправляем айди в обработчик, метод экземпляра класса Store
  } else if (!stateList.classList.contains('hidden')) { // клик по любому месту страницы
    stateList.classList.add('hidden');// чтобы закрыть поп ап со списком проектов для выбора
  }
*/