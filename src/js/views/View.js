// import icons from '../img/icons.svg'//Parcel 1
import icons from 'url:../../img/icons.svg'; //Parcel 2

export class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markUp = this._generateMarkUp();

    if (!render) return markUp;
    this.renderSpinner();

    this._parenElement.innerHTML = '';
    this._parenElement.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkUp();
    // console.log(newMarkUp);
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parenElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      // console.log(newElement);
      // console.log(currentElement);
      // console.log(currentElement.isEqualNode(newElement));
      // console.log(currentElement.firstChild?.nodeValue.trim());

      if (
        !currentElement.isEqualNode(newElement) &&
        currentElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!currentElement.isEqualNode(newElement)) {
        // console.log(newElement.attributes, Array.from(newElement.attributes));
        Array.from(newElement.attributes).forEach(attribute => {
          currentElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markUp = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;

    this._parenElement.innerHTML = '';
    this._parenElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;

    this._parenElement.innerHTML = '';
    this._parenElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderSpinner() {
    const markUp = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;

    this._parenElement.innerHTML = '';
    this._parenElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
