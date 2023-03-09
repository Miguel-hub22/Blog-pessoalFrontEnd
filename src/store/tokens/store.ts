import { createStore } from 'redux';
import { tokenReducer } from './tokensReducer';



const store = createStore(tokenReducer);

export default store;