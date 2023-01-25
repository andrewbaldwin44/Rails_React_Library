import { connect } from 'react-redux';
import { searchBook } from '../../actions';
import BookMenu from './BookMenu';

const bookSearch = {
  searchBook,
};

export default connect(null, bookSearch)(BookMenu);
