export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED';
export const FETCH_FAILED = 'FETCH_FAILED';

export const fetchProducts = (token, user_id) => {
  return {
    type: FETCH_PRODUCTS,
    token,
    user_id,
  };
};

export const fetchSucceeded = (products) => {
  return {
    type: FETCH_SUCCEEDED,
    products,
  };
};

export const fetchFailed = (error) => {
  return {
    type: FETCH_FAILED,
    error,
  };
};
