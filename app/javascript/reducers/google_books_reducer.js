const initialState = {
  bookData: null,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_BOOK_DATA': {
      const newBookData = action.bookData;

      return {
        ...state,
        bookData: newBookData,
      };
    }

    default: {
      return state;
    }
  }
}
