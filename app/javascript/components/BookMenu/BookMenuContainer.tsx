import useAsync from 'hooks/useAsync';
import { asyncRequest } from 'api/asyncRequest';

import BookMenu from 'components/BookMenu/BookMenu';
import type { IBookData, IBookMenuProps } from 'components/BookMenu/types';

type BookSearch = (serachValue: string) => Promise<void>;
interface IBookSearchResponse {
  result: IBookData[];
}

function BookMenuContainer({ openMenu, setOpenMenu }: IBookMenuProps) {
  const { execute: onBookSearch, value: bookSearch } = useAsync<BookSearch, IBookSearchResponse>(
    (searchValue: string) => asyncRequest('book_search', { query: { search: searchValue } }),
  );

  return (
    <BookMenu
      setOpenMenu={setOpenMenu}
      openMenu={openMenu}
      onBookSearch={onBookSearch}
      bookData={bookSearch?.result}
    />
  );
}

export default BookMenuContainer;
