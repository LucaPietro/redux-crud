export const createProduct = (title, description, amount, price) => ({
  type: 'CREATE_PRODUCT',
  title,
  description,
  amount,
  price,
});

export const deleteProduct = (id) => ({
  type: 'DELETE_PRODUCT',
  id,
});

export const updateProduct = (id, title, description, amount, price) => ({
  type: 'UPDATE_PRODUCT',
  id,
  title,
  description,
  amount,
  price,
});
