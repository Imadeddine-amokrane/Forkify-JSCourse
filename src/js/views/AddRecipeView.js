import { View } from './View';
// import icons from '../img/icons.svg'//Parcel 1
import icons from 'url:../../img/icons.svg'; //Parcel 2

class AddRecipeView extends View {
  _parenElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded ;)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    super();
    this._addHAndlerShowWindow();
    this._addHAndlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHAndlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleWindow();
    });
  }

  _addHAndlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parenElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  // renderError(message = this._errorMessage) {
  //   const markUp = `<div class="error">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-alert-triangle"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //         </div>`;

  //   this._parenElement.insertAdjacentHTML('beforeEnd', markUp);
  // }
}
export default new AddRecipeView();
