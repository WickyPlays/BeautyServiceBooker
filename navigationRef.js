import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import { create } from 'zustand';

export const navigationRef = createNavigationContainerRef();

const useNavigationStore = create((set) => ({
  navigate: (name, params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    } else {
      console.error("Navigation reference is not ready");
    }
  },
  navigateToMain: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } else {
      console.error("Navigation reference is not ready");
    }
  },
  navigateToAuth: () => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    } else {
      console.error("Navigation reference is not ready");
    }
  },
}));

export default useNavigationStore;