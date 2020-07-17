import { FETCH_PRODUCTS, FETCH_SUCCEEDED, FETCH_FAILED } from '../../sagas/actions';

const initialState = {
  productList: [],
  fetching: false,
  error: null,
};

export const productData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        fetching: true,
        error: false,
      };
    case FETCH_SUCCEEDED:
      return {
        ...state,
        fetching: false,
        productList: action.products,
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case 'CREATE_PRODUCT':
      return {
        ...state,
        productList: [
          ...state.productList,
          {
            title: action.title,
            description: action.description,
            amount: action.amount,
            price: action.price,
          },
        ],
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        productList: state.productList.filter((product) => product.id !== action.id),
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        productList: state.productList.map((product) => {
          if (product.id === action.id) {
            return {
              ...product,
              title: action.title,
              description: action.description,
              amount: action.amount,
              price: action.price,
            };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};
