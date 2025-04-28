const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'DELETE_CATEGORY':
      return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
    default:
      return state;
  }
};

export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories });
export const addCategory = (category) => ({ type: 'ADD_CATEGORY', payload: category });
export const deleteCategory = (id) => ({ type: 'DELETE_CATEGORY', payload: id });

export default categoryReducer;