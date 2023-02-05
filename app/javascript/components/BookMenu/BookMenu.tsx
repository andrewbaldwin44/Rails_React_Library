import { connect } from 'react-redux';
import { useEffect, useState, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BsBook } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa';
import type { IBookData, IBookMenuProps } from 'components/BookMenu/types';
import Form from 'components/Form/Form';

import Autocomplete from 'components/Autocomplete/Autocomplete';
import { asyncRequest, REQUEST_METHODS } from 'api/asyncRequest';
import useAsync from 'hooks/useAsync';
import { shelfActions } from 'modules/Shelf/shelf.slice';
import type { IAddBooksToShelf } from 'modules/Shelf/shelf.slice';
import { SHELF_KEYS } from 'modules/Shelf/shelf.constants';

interface IBookMenu extends IBookMenuProps {
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

function BookSuggestion({
  updateNewBooks,
  onMouseOver,
  isHighlightedSuggestion,
  onClose,
  ...bookData
}: IBookSuggestion) {
  const { authors, title, imageLinks } = bookData;

  const onBookSuggestionClick = () => {
    onClose();
    updateNewBooks(bookData);
  };

  return (
    <Item
      onMouseOver={onMouseOver}
      isHighlightedSuggestion={isHighlightedSuggestion}
      onClick={onBookSuggestionClick}
    >
      {imageLinks && <img src={imageLinks.smallThumbnail} alt={title} />}
      <div>
        <span>{title}</span>
        <span className='author'>{`By ${authors}`}</span>
      </div>
    </Item>
  );
}

function BookToAdd({ authors, title, imageLinks }: IBookData) {
  return (
    <BookToAddWrapper>
      {imageLinks && <img src={imageLinks.smallThumbnail} alt={title} />}
      <div>
        <span>{title}</span>
        <span className='author'>{`By ${authors}`}</span>
      </div>
    </BookToAddWrapper>
  );
}

// <fieldset className='centered-field'>
//   <ReadBook
//     control={
//       <Checkbox
//         icon={<BsBook />}
//         checkedIcon={<FaBookOpen className='checked' />}
//         name='read-book'
//       />
//     }
//     label='Read'
//   />
// </fieldset>

const BookToAddWrapper = styled.li`
  display: flex;
  padding: 20px 0;
  line-height: 1.5;
  max-width: 400px;
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

function BookMenu({
  openMenu,
  setOpenMenu,
  onBookSearch,
  bookData,
  userID,
  addBooksToShelf,
}: IBookMenu) {
  const menuOverlay = useRef<HTMLDivElement>();
  const bookForm = useRef<HTMLFormElement>();
  const bookSearchInputRef = useRef<HTMLInputElement>();
  const [newBooks, setNewBooks] = useState<IBookData[]>([]);

  const { execute: onBookAdd } = useAsync(() =>
    asyncRequest('books/create', {
      body: {
        books: newBooks.map(({ id }) => ({ book_id: id, shelf: 'deck', user_id: userID })),
        userID,
      },
      type: REQUEST_METHODS.POST,
    }),
  );

  const updateNewBooks = useCallback(
    (newBook: IBookData) => {
      setNewBooks([...newBooks, newBook]);
    },
    [newBooks],
  );

  const submitBook = () => {
    onBookAdd();
    addBooksToShelf({ shelf: SHELF_KEYS.DECK, books: newBooks });
    setNewBooks([]);
  };

  const closeMenu = () => {
    const menuElement = menuOverlay.current;
    const formElement = bookForm.current;

    if (!menuElement || !formElement) {
      return;
    }

    menuElement.classList.add('fadeOut');
    formElement.classList.add('fadeOut');

    menuElement.addEventListener(
      'animationend',
      () => {
        menuElement.style.display = 'none';
        menuElement.classList.remove('fadeOut');
        formElement.classList.remove('fadeOut');
      },
      { once: true },
    );
  };

  const isMenuOpen = () => menuOverlay.current?.style.display !== 'none';

  const toggleMenu = () => {
    const menuElement = menuOverlay.current;

    if (openMenu && menuElement) {
      menuElement.style.display = 'flex';
    } else if (isMenuOpen()) {
      closeMenu();
    }
  };

  const handleBookSearch = useCallback((searchValue: string) => {
    onBookSearch(searchValue);
  }, []);

  useEffect(toggleMenu, [openMenu]);

  const onClockMenu = () => {
    console.log({ setOpenMenu });
    closeMenu();
    setOpenMenu(false);
  };

  return (
    <Wrapper className='menu-overlay' ref={menuOverlay} style={{ display: 'none' }}>
      <Inner>
        <CloseButton onClick={onClockMenu}>&#x274c;</CloseButton>
        <StyledForm autoComplete='off' onSubmit={submitBook} ref={bookForm}>
          <fieldset className='autocomplete-input'>
            <label htmlFor='title'>Title</label>
            <AutocompleteWrapper>
              <input
                ref={bookSearchInputRef}
                name='title'
                id='title'
                onInput={handleBookSearch}
                autoComplete='off'
              />
              <Autocomplete<IBookData>
                results={bookData}
                inputRef={bookSearchInputRef}
                callback={handleBookSearch}
              >
                <BookSuggestion updateNewBooks={updateNewBooks} />
              </Autocomplete>
            </AutocompleteWrapper>
          </fieldset>
          <BooksToAddList>
            {newBooks.map(book => (
              <BookToAdd {...book} />
            ))}
          </BooksToAddList>

          <fieldset className='centered-field'>
            <Shelve type='submit' disabled={!newBooks.length}>
              Shelve
            </Shelve>
          </fieldset>
        </StyledForm>
      </Inner>
    </Wrapper>
  );
}

const storeConnector = ({ user }) => ({
  userID: user.user_id,
});

const actionCreator = {
  addBooksToShelf: shelfActions.addBooksToShelf,
};

export default connect(storeConnector, actionCreator)(BookMenu);

const formIn = keyframes`
  90% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
`;

const overlayIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const formOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

const overlayOut = keyframes`
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  animation-name: ${overlayIn};
  animation-duration: 0.4s;

  &.fadeOut {
    animation-name: ${overlayOut};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  color: crimson;
  top: 20px;
  right: 20px;
`;

const Inner = styled.div`
  position: relative;
  background-color: #28231d;
  border-radius: 5px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70%;
  transform: scale(0);

  animation-name: ${formIn};
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 70%;

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
      width: 390px;

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

  &.fadeOut {
    animation-name: ${formOut};
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

const BooksToAddList = styled.ol`
  margin: 10px 0;
`;

const Item = styled.li<{ isHighlightedSuggestion: boolean }>`
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
    isHighlightedSuggestion ? 'background-color:  #a8cff4' : 'color: black'};
`;
