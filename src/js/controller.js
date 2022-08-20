import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import searchResultView from './views/SearchResultView.js';
import paginationView from './views/PaginationView.js';
import bookmarksView from './views/BookmarksView.js';
import addRecipeView from './views/AddRecipeView.js';
import { CLOSE_MODAL_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    //0-Rendering the results
    searchResultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1 Loading recipe
    await model.loadRecipe(id);

    // console.log(model.state.recipe);
    // 2-Rendering Recipe
    recipeView.render(model.state.recipe);
    //
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    searchResultView.renderSpinner();
    // get query
    const query = searchView.getQuery();

    if (!query) return searchResultView.renderError();

    //1-Loading Research Results
    await model.loadResearchResults(query);

    //2-Rendering the results
    searchResultView.render(model.getSearchResultsPage());
    // console.log(model.getSearchResultsPage());

    //3 Render initial Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    searchResultView.renderError();
  }
};

const paginationControl = function (pageTogoTO) {
  //1-Rendering NEW results
  searchResultView.render(model.getSearchResultsPage(pageTogoTO));
  //1-Rendering NEW pagination
  paginationView.render(model.state.search);
};

const servingsControl = function (updateToServings) {
  model.updateServings(updateToServings);
  recipeView.update(model.state.recipe);
};

const bookmarkControl = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
  console.log('BookMarked');
};

const loadBookmarkcontrol = function () {
  bookmarksView.render(model.state.bookmarks);
};

const uploadControl = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);

    // Change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.location.hash = `#${model.state.recipe.id}`;

    addRecipeView.renderMessage();

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHAndlerRender(loadBookmarkcontrol);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdate(servingsControl);
  recipeView.addHandlerBookMark(bookmarkControl);

  searchView.addHandlerRender(controlSearch);
  paginationView.addHandlerRender(paginationControl);

  addRecipeView.addHandlerUpload(uploadControl);
};

init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
