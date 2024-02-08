import { useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

import useEventListener from '~/hooks/useEventListener';
import useFocusTrap from '~/hooks/useFocusTrap';
import useScrollLock from '~/hooks/useScrollLock';

interface IModal {
  isOpen: boolean;
  isSubmodal?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, isOpen, onClose }: IModal) {
  const modalInner = useRef<HTMLDivElement>(null);

  const handleKeyPress = useCallback(({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onClose();
    }
  }, []);

  useScrollLock({ isActive: isOpen });
  useEventListener<typeof handleKeyPress>('keydown', handleKeyPress);
  useFocusTrap(modalInner);

  if (!isOpen) {
    return null;
  }


  return createPortal(
    <>
      <Wrapper ref={modalInner} tabIndex={0}>
        <div className='modal-inner'>
          {children}
          <button
            className='close-button absolute text-red text-2xl font-bold weight-bold top-4 right-6 z-20'
            id='modal-close-button'
            onClick={onClose}
            type='button'
            >
            &#x2715;
          </button>
        </div>
      </Wrapper>
      <Backdrop
        className='fixed bg-black05 top-0 left-0 flex items-center justify-center w-screen h-screen z-10'
        onClick={onClose}
      />
    </>,
    document.getElementById('modal-root') as HTMLDivElement,
  );
}

const popIn = keyframes`
  90% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
  
  .modal-inner {
    position: relative;
    border-radius: 4px;
    background-color: #28231d;
    border-radius: 5px;
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.5);
    padding: 30px 50px;
    overflow-y: auto;
    transform: scale(0);
    
    animation: ${popIn} 0.4s forwards;
  }

  .close-button {
    position: absolute;
    color: red;
    top: 14px;
    right: 14px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  animation: ${fadeIn} 0.4s forwards;
`;
