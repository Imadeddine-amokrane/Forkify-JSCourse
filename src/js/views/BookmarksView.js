import { View } from './View';
// import icons from '../img/icons.svg'//Parcel 1
// import icons from 'url:../../img/icons.svg'; //Parcel 2
import PreviewView from './PreviewView.js';

class BookmarksView extends View {
  _parenElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHAndlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkUp() {
    // this._data = bookmarks[] coming from controller
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
    //PreviewView.render(bookmark, false) return markup string foreach bookmark
    // preview.render() on View class to set this.data to bookmark then call _generateMarkUp() PreviewView forEach one
  }
}

export default new BookmarksView();
