import { connect } from 'react-redux';

import { SHELVES } from 'modules/Shelf/shelf.constants';
import Shelf from 'modules/Shelf/Shelf';
import Book from 'components/Book/Book.component';

function Shelves({ userShelves }) {
  return userShelves.map(({ title, className, books }, index) => {
    return (
      <Shelf key={`shelf${index}`} title={title} className={className}>
        {books.map(book => (
          <Book {...book} />
        ))}
      </Shelf>
    );
  });
}

const storeConnector = ({ shelf: userShelves }) => ({
  userShelves: SHELVES.map(({ key, ...shelfProps }) => ({
    ...shelfProps,
    books: userShelves[key],
  })),
});

export default connect(storeConnector)(Shelves);
