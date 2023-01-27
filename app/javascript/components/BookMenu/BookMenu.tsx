import { useEffect, createRef } from 'react';
import styled, { keyframes } from 'styled-components';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BsBook } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa';

import Autocomplete from 'components/BookMenu/Autocomplete';

interface IBookMenu {
  openMenu: () => void;
  onBookSearch: (search: string) => void;
  bookData: any;
}

function BookMenu({ openMenu, onBookSearch, bookData }: IBookMenu) {
  const menuOverlay = createRef();
  const bookForm = createRef();

  const submitBook = event => {
    event.preventDefault();
  };

  const closeMenu = () => {
    const menuElement = menuOverlay.current;
    const formElement = bookForm.current;

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

  const isMenuOpen = () => menuOverlay.current.style.display !== 'none';

  const toggleMenu = () => {
    const menuElement = menuOverlay.current;

    if (openMenu) {
      menuElement.style.display = 'flex';
    } else if (isMenuOpen()) {
      closeMenu();
    }
  };

  const handleBookSearch = event => {
    console.log({ b: event.target.value });
    onBookSearch(event.target.value);
  };

  useEffect(toggleMenu, [openMenu]);

  return (
    <Wrapper className='menu-overlay' ref={menuOverlay} style={{ display: 'none' }}>
      <Form autocomplete='off' onSubmit={submitBook} ref={bookForm}>
        <fieldset className='autocomplete-input'>
          <label htmlFor='title'>Title</label>
          <input name='title' id='title' onInput={handleBookSearch} autoComplete='off' />
          <Autocomplete items={bookData} />
        </fieldset>

        <fieldset>
          <label htmlFor='author'>Author</label>
          <input name='author' id='author' />
        </fieldset>

        <fieldset>
          <label htmlFor='genre'>Genre</label>
          <input name='genre' id='genre' />
        </fieldset>

        <fieldset className='centered-field'>
          <ReadBook
            control={
              <Checkbox
                icon={<BsBook />}
                checkedIcon={<FaBookOpen className='checked' />}
                name='read-book'
              />
            }
            label='Read'
          />
        </fieldset>

        <fieldset className='centered-field'>
          <Shelve type='submit'>Shelve</Shelve>
        </fieldset>
      </Form>
    </Wrapper>
  );
}

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

const Form = styled.form`
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

export default BookMenu;
