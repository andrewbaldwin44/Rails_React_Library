import useStorage from 'hooks/useStorage';

export default function usePersistentState() {
  const [state, setState] = useStorage('state', null);

  const onUpdateState = (updatedState: any) => {
    setState(updatedState);
  };

  return [state, onUpdateState];
}
