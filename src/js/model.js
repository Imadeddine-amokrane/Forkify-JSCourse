// import { getJSON, sendJSON } from './helper.js';
import { AJAX } from './helper.js';
import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    publisher: recipe.publisher,
    ...(recipe.key && { key: recipe.key }),
    // bookmarked: state.bookmarks.find(bookmark => bookmark.id === id) ? true : false,
  };
};

export const loadRecipe = async function (id) {
  try {
    // getJSON(url) return a promise ;

    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);

    // data === data returned from the promise
    // console.log(data);
    state.recipe = createRecipeObject(data);
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );

    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadResearchResults = async function (query) {
  try {
    state.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        title: rec.title,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);

    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const addBookmarkToLocalStorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add recipe to bookMark
  state.bookmarks.push(recipe);
  console.log(state.bookmarks);
  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  addBookmarkToLocalStorage();
};

export const removeBookmark = function (recipe) {
  // Remove recipe to bookMark
  const index = state.bookmarks.findIndex(element => element.id === recipe.id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;

  addBookmarkToLocalStorage();
};

const initLocalStorage = function () {
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
};

initLocalStorage();

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);

    const ingredients = Object.entries(newRecipe)
      .filter(el => el[0].startsWith('ingredient') && el[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(e => e.trim());

        if (ingArr.length !== 3) throw new Error('Invalid Input Format');
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      // id: newRecipe.id,
      ingredients,
      bookmarked: true,
    };
    const sendedData = await AJAX(
      `https://forkify-api.herokuapp.com/api/v2/recipes?key=${API_KEY}`,
      recipe
    );
    state.recipe = createRecipeObject(sendedData);
    addBookmark(state.recipe);
    console.log(sendedData);
  } catch (err) {
    throw err;
  }
};
