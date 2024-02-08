import { useState, useCallback, useRef } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { BsBook } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { connect } from "react-redux";
import styled from "styled-components";

import { asyncRequest, REQUEST_METHODS } from "~/api/asyncRequest";
import Autocomplete from "~/components/Autocomplete/Autocomplete";
import type { IBookData, IBookMenuProps } from "~/components/BookMenu/types";
import Form from "~/components/Form/Form";
import Modal from "~/components/Modal/Modal";
import useAsync from "~/hooks/useAsync";
import { SHELF_KEYS } from "~/modules/Shelf/shelf.constants";
import { shelfActions } from "~/modules/Shelf/shelf.slice";
import type { IAddBooksToShelf } from "~/modules/Shelf/shelf.slice";

interface IBookMenu extends IBookMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBookSearch: (search: string) => void;
  bookData?: IBookData[];
  userID: string;
  addBooksToShelf: (payload: IAddBooksToShelf) => void;
}

interface IBookSuggestion extends IBookData {
  updateNewBooks: (newBook: IBookData) => void;
  onCloseAutocomplete: () => void;
  isHighlightedSuggestion: boolean;
  onMouseOver: () => void;
}

type BookSearch = (serachValue: string) => Promise<void>;
interface IBookSearchResponse {
  result: IBookData[];
}

function BookSuggestion({
  updateNewBooks,
  onMouseOver,
  isHighlightedSuggestion,
  ...bookData
}: IBookSuggestion) {
  const { authors, title, imageLinks } = bookData;

  const onBookSuggestionClick = () => {
    updateNewBooks(bookData);
  };

  return (
    <AutocompleteItem
      onMouseOver={onMouseOver}
      isHighlightedSuggestion={isHighlightedSuggestion}
      onClick={onBookSuggestionClick}
    >
      {imageLinks && <img src={imageLinks.smallThumbnail} alt={title} />}
      <div>
        <span>{title}</span>
        <span className="author">{`By ${authors}`}</span>
      </div>
    </AutocompleteItem>
  );
}

function BookToAdd({ authors, title, imageLinks }: IBookData) {
  return (
    <Item>
      {imageLinks && <img src={imageLinks.smallThumbnail} alt={title} />}
      <div>
        <span>{title}</span>
        <span className="author">{`By ${authors}`}</span>
      </div>
      <fieldset className="centered-field">
        <ReadBook
          control={
            <Checkbox
              icon={<BsBook />}
              checkedIcon={<FaBookOpen className="checked" />}
              name="isRead"
            />
          }
          label="Read"
        />
      </fieldset>
    </Item>
  );
}

function BookMenu({ isOpen, setIsOpen, userID, addBooksToShelf }: IBookMenu) {
  const bookForm = useRef<HTMLFormElement>();
  const bookSearchInputRef = useRef<HTMLInputElement>();
  const [newBooks, setNewBooks] = useState<IBookData[]>([]);

  const { execute: onBookSearch, value: bookResults } = useAsync<
    BookSearch,
    IBookSearchResponse
  >((searchValue: string) =>
    asyncRequest("book_search", { query: { search: searchValue } })
  );

  const { execute: onBookAdd } = useAsync(() =>
    asyncRequest("books/create", {
      body: {
        books: newBooks.map(({ id }) => ({
          book_id: id,
          shelf: "deck",
          user_id: userID,
        })),
        userID,
      },
      type: REQUEST_METHODS.POST,
    })
  );

  const updateNewBooks = useCallback(
    (newBook: IBookData) => {
      setNewBooks([...newBooks, newBook]);
    },
    [newBooks]
  );

  const onClose = () => setIsOpen(false);

  const submitBook = ({ isRead }) => {
    onClose();
    onBookAdd();
    addBooksToShelf({
      shelf: isRead ? SHELF_KEYS.RECENT : SHELF_KEYS.DECK,
      books: newBooks,
    });
    setNewBooks([]);
  };

  const handleBookSearch = useCallback((searchValue: string) => {
    onBookSearch(searchValue);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledForm autoComplete="off" onSubmit={submitBook} ref={bookForm}>
        <fieldset className="autocomplete-input">
          <label htmlFor="title">Title</label>
          <AutocompleteWrapper>
            <input
              ref={bookSearchInputRef}
              name="title"
              id="title"
              onInput={handleBookSearch}
              autoComplete="off"
            />
            <Autocomplete<IBookData>
              results={bookResults ? bookResults.result : []}
              inputRef={bookSearchInputRef}
              callback={handleBookSearch}
            >
              <BookSuggestion updateNewBooks={updateNewBooks} />
            </Autocomplete>
          </AutocompleteWrapper>
        </fieldset>
        {newBooks.map((book) => (
          <BookToAdd {...book} />
        ))}

        <fieldset className="centered-field">
          <Shelve type="submit" disabled={!newBooks.length}>
            Shelve
          </Shelve>
        </fieldset>
      </StyledForm>
    </Modal>
  );
}

const storeConnector = ({ user }) => ({
  userID: user.user_id,
});

const actionCreator = {
  addBooksToShelf: shelfActions.addBooksToShelf,
};

export default connect(storeConnector, actionCreator)(BookMenu);

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  justify-content: space-evenly;

  fieldset {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      padding: 10px 5px;
      font-size: 1.1em;
    }

    input {
      color: black;
      padding: 10px;
      border-radius: 3px;
      width: 490px;

      &:focus {
        border: 2px solid var(--light-green);
      }
    }

    &.autocomplete-input {
      position: relative;
    }
  }

  .centered-field {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const ReadBook = styled(FormControlLabel)`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100px;

  svg {
    color: white;
    font-size: 1.6em;
    margin: 0 15px;
  }

  span {
    font-size: 1.2em;
  }

  .checked {
    color: var(--light-green);
  }
`;

const Shelve = styled.button`
  height: 50px;
  width: 170px;
  border: 2px solid white;
  border-radius: 3px;
  transition: all 0.4s ease-in-out;

  &:hover {
    border-color: var(--light-green);
    box-shadow: 0 0 5px 1px #69f0ae;
  }
`;

const AutocompleteWrapper = styled.div`
  position: relative;
`;

const AutocompleteItem = styled.li<{ isHighlightedSuggestion: boolean }>`
  display: flex;
  padding: 20px 20px;
  line-height: 1.5;
  cursor: pointer;

  img {
    height: 60px;
    width: 50px;
    margin-right: 20px;
  }

  span {
    display: block;

    &.author {
      font-style: italic;
    }
  }

  ${({ isHighlightedSuggestion }) =>
    isHighlightedSuggestion ? "background-color:  #a8cff4" : "color: black"};
`;

const Item = styled.li`
  display: flex;
  padding: 20px 20px;
  line-height: 1.5;
  cursor: pointer;

  img {
    height: 60px;
    width: 50px;
    margin-right: 20px;
  }

  span {
    display: block;

    &.author {
      font-style: italic;
    }
  }
`;
