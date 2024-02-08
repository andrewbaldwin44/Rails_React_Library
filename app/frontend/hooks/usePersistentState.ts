import useStorage from "~/hooks/useStorage";
import { IRootState } from "~/redux/store";

export default function usePersistentState() {
  const { storedValue: preloadedState, setStoredValue: setState } =
    useStorage<IRootState | null>("state", null);

  const updateState = (updatedState: IRootState) => {
    setState(updatedState);
  };

  return { preloadedState, updateState };
}
