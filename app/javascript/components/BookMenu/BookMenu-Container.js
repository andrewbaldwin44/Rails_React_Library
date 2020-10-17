import { connect } from 'react-redux';
import { searchBook } from '../../actions';
import BookMenu from './BookMenu';

const bookData = state => ({
  bookData: state.google_books.bookData
});

const bookSearch = {
  searchBook,
}

export default connect(bookData, bookSearch)(BookMenu);
