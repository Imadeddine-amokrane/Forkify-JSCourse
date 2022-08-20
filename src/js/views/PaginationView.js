// import icons from '../img/icons.svg'//Parcel 1
import icons from 'url:../../img/icons.svg'; //Parcel 2
import { View } from './View';

class PaginationView extends View {
  _parenElement = document.querySelector('.pagination');

  addHandlerRender(handler) {
    this._parenElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const pageTogoTO = +btn.dataset.page;

      handler(pageTogoTO);
    });
  }

  _generateMarkUp() {
    // console.log(this._data);
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // console.log(numberOfPages, currentPage);

    if (currentPage === 1 && numberOfPages === 1) {
      return '';
    }

    if (currentPage === 1 && numberOfPages > 1) {
      return `
        <button data-page=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> `;
    }

    if (currentPage < numberOfPages) {
      return `
         <button data-page=${
           currentPage - 1
         } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href=""${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-page=${
            currentPage + 1
          } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
       `;
    }

    if (currentPage === numberOfPages) {
      return `
          <button data-page=${
            currentPage - 1
          } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href=""${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
       `;
    }
  }
}

export default new PaginationView();
