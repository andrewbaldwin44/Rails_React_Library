import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useOnClickOutside from 'hooks/useOnClickOutside';
import { debounce } from 'utils/functions';

interface IAutocomplete<Item> {
  results?: Item[];
  children: React.ReactElement;
  inputRef: React.RefObject<HTMLInputElement>;
  callback: (searchValue: string) => void;
}

export default function Autocomplete<Result>({
  callback,
  children,
  inputRef,
  results,
}: IAutocomplete<Result>) {
  const autocompleteRef = useRef<HTMLOListElement>(null);
  const [shouldShowAutofill, setShouldShowAutofill] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  useOnClickOutside(inputRef, () => setShouldShowAutofill(false), {
    exceptions: [autocompleteRef],
  });

  const getAutofillResults = debounce(() => {
    const inputValue = inputRef.current && inputRef.current.value;

    if (!inputValue) {
      setShouldShowAutofill(false);
      return;
    }

    callback(inputValue);
    setShouldShowAutofill(true);
  });

  const onClose = useCallback(() => setShouldShowAutofill(false), []);

  const handleKeyPress = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!results || !inputRef.current) {
        return;
      }

      switch (key) {
        case 'Enter':
          inputRef.current.value = results[selectedSuggestionIndex];
          setShouldShowAutofill(false);
          break;
        case 'ArrowUp':
          if (selectedSuggestionIndex === 0) {
            setSelectedSuggestionIndex(results.length - 1);
            break;
          }

          setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
          break;
        case 'ArrowDown':
          if (selectedSuggestionIndex === results.length - 1) {
            setSelectedSuggestionIndex(0);
            break;
          }

          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
          break;
      }
    },
    [inputRef, results, selectedSuggestionIndex],
  );

  const onFocus = () => {
    inputRef.current && inputRef.current.value && setShouldShowAutofill(true);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.removeEventListener('input', getAutofillResults);
      inputRef.current.removeEventListener('keydown', handleKeyPress);
      inputRef.current.removeEventListener('keydown', onFocus);
      inputRef.current.addEventListener('input', getAutofillResults);
      inputRef.current.addEventListener('keydown', handleKeyPress);
      inputRef.current.addEventListener('focus', onFocus);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', getAutofillResults);
        inputRef.current.removeEventListener('keydown', handleKeyPress);
        inputRef.current.removeEventListener('keydown', onFocus);
      }
    };
  }, [inputRef, handleKeyPress, getAutofillResults, onFocus, results]);

  if (!results || !results.length || !shouldShowAutofill) {
    return null;
  }

  return (
    <Wrapper ref={autocompleteRef}>
      {results.map((result, index: number) =>
        cloneElement(children, {
          ...result,
          isHighlightedSuggestion: index === selectedSuggestionIndex,
          onMouseOver: () => setSelectedSuggestionIndex(index),
          onClose,
        }),
      )}
    </Wrapper>
  );
}

const Wrapper = styled.ol`
  position: absolute;
  top: 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0);
  z-index: 10;
`;
