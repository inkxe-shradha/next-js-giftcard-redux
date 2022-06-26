import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducers from "./reducers";
import reduxImmutableStateVariant from "redux-immutable-state-invariant";

// initial states here
const initalState = {};

// middleware
const middleware =
  process.env.NODE_ENV !== "production"
    ? [reduxImmutableStateVariant(), thunk]
    : [thunk];

// creating store
export const store = createStore(
  rootReducers,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
