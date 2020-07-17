import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_PRODUCTS, fetchSucceeded, fetchFailed } from './actions';
import api from '../services/api';

export function* watchFetchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}

export function* fetchProducts({ token, user_id }) {
  try {
    const products = yield call(api.get, `products/${user_id}`, {
      headers: {
        token,
      },
    });
    yield put(fetchSucceeded(products.data));
  } catch (error) {
    yield put(fetchFailed(error));
  }
}
