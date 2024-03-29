import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { IBookData } from "~/components/BookMenu/types";
import { SHELF_KEYS } from "~/modules/Shelf/shelf.constants";
import { updateStateWithPayload } from "~/redux/utils";
import { merge } from "~/utils/object";

export interface IShelfState {
  [key: (typeof SHELF_KEYS)[keyof typeof SHELF_KEYS]]: IBookData[];
}

export interface IAddBooksToShelf {
  shelf: (typeof SHELF_KEYS)[keyof typeof SHELF_KEYS];
  books: IBookData[];
}

export type ShelfAction = PayloadAction<IAddBooksToShelf>;

const initialState = Object.values(SHELF_KEYS).reduce(
  (shelfInitialState, shelfKey) => ({
    ...shelfInitialState,
    [shelfKey]: [],
  }),
  {}
);

const addBooksToShelf = (state: IShelfState, { payload }: ShelfAction) => ({
  ...state,
  [payload.shelf]: merge(payload.books, state[payload.shelf] || []),
});

const shelfSlice = createSlice({
  name: "shelf",
  initialState,
  reducers: {
    setShelves: updateStateWithPayload<IShelfState>,
    addBooksToShelf,
  },
});

export const shelfActions = shelfSlice.actions;
export default shelfSlice.reducer;
