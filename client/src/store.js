import { createStore, applyMiddleware, compose } from 'redux'; // Compose is brought in so that we can combine the reducer with what is required by chrome to add the Redux extension
import thunk from 'redux-thunk'; // Middleware
import rootReducer from './reducers/index'; // Step 1. This is where we will combine all other reducers and be able to bring it into one file as clean as possible

const initialState = {}; // Step 2

// Create the store
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

// Exporting the store to bring into main App.js file and be able to use across the entired app.
export default store;
