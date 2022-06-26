import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import loadingReducer from "./loadingReducer";
import { giftCardReducer } from "./giftCardReducer";

const rootReducers = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  giftCard: giftCardReducer,
});

export default rootReducers;
