import { View } from './View';
// import icons from '../img/icons.svg'//Parcel 1
// import icons from 'url:../../img/icons.svg'; //Parcel 2
import PreviewView from './PreviewView.js';

class SearchResultView extends View {
  _parenElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  _generateMarkUp() {
    // this._data = results[] coming from controller
    return this._data.map(result => PreviewView.render(result, false)).join('');
    //PreviewView.render(result, false) return markup string foreach result
    // preview.render() on View class to set this.data to result then call _generateMarkUp() PreviewView forEach one
  }
}

export default new SearchResultView();
