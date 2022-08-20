import { View } from './View';
// import icons from '../img/icons.svg'//Parcel 1
// import icons from 'url:../../img/icons.svg'; //Parcel 2

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
