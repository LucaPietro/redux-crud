import { createStore, compose, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';
import createSagaMiddleware from 'redux-saga';

import { watchFetchProducts } from '../../sagas/sagas';

const reduxtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(Reducers, compose(applyMiddleware(sagaMiddleware), reduxtools));

sagaMiddleware.run(watchFetchProducts);

export default store;
