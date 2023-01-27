import useAsync from 'hooks/useAsync';
import { asyncRequest } from 'api/asyncRequest';

import BookMenu from 'components/BookMenu/BookMenu';

interface IBookMenuContainer {
  openMenu: () => void;
}

function BookMenuContainer({ openMenu }: IBookMenuContainer) {
  const { execute: onBookSearch, value: bookData } = useAsync((searchValue: string) =>
    asyncRequest('book_search', { query: { search: searchValue } }),
  );
  console.log({ bookData });

  return <BookMenu openMenu={openMenu} onBookSearch={onBookSearch} bookData={bookData} />;
}

export default BookMenuContainer;
