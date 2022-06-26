import { BEGINS_LOADING, ENDS_LOADING } from "../types";

export const beginsLoading = () => ({ type: BEGINS_LOADING });

export const endsLoading = () => ({ type: ENDS_LOADING });
