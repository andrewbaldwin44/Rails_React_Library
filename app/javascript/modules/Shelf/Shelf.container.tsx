import { connect } from 'react-redux';

import type { IRootState } from 'redux/store';
import { IShelf, SHELVES } from 'modules/Shelf/shelf.constants';
import Shelf from 'modules/Shelf/Shelf';
import Book from 'components/Book/Book';
import type { IBookData } from 'components/BookMenu/types';

interface IUserShelf extends IShelf {
  books: IBookData[];
}

interface IShelves {
  userShelves: IUserShelf[];
}

function Shelves({ userShelves }: IShelves) {
  return (
    <>
      {userShelves.map(({ title, className, books }, index) => {
        return (
          <Shelf key={`shelf${index}`} title={title} className={className}>
            {books.map(book => (
              <Book {...book} />
            ))}
          </Shelf>
        );
      })}
    </>
  );
}

const storeConnector = ({ shelf: userShelves }: IRootState) => ({
  userShelves: SHELVES.map(({ key, ...shelfProps }) => ({
    ...shelfProps,
    key,
    books: userShelves[key],
  })),
});

export default connect(storeConnector)(Shelves);
