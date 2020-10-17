import { takeEvery, call, put } from 'redux-saga/effects';
import { getData } from '../utils/request';

function* handleGoogleBookSearch({ searchValue }) {
  const bookData = yield call(getData, `/book_search?search=${searchValue}`);

  yield put({
    type: 'UPDATE_BOOK_DATA',
    bookData
  });
}

export function* watchTwitterFeed() {
  yield takeEvery('SEARCH_BOOK', handleGoogleBookSearch);
}
