import useAsync from 'hooks/useAsync';
import { asyncRequest } from 'api/asyncRequest';

import BookMenu from 'components/BookMenu/BookMenu';

interface IBookMenuContainer {
  openMenu: () => void;
}

function BookMenuContainer({ openMenu }: IBookMenuContainer) {
  const { execute: onBookSearch, value: bookSearch } = useAsync((searchValue: string) =>
    asyncRequest('book_search', { query: { search: searchValue } }),
  );

  return (
    <BookMenu
      openMenu={openMenu}
      onBookSearch={onBookSearch}
      bookData={bookSearch && bookSearch.result}
    />
  );
}

export default BookMenuContainer;
