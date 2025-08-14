import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '@/redux/store';
import RootNavigator from '@/navigations/index';
import { useEffect, useState } from 'react';
import { loadCartCodeFromStorage, syncCartCodeStorage } from '@/redux/cartSlice';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const cartCode = useSelector((state: RootState) => state.cart.code);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart code from AsyncStorage
    const load = async () => {
      await dispatch(loadCartCodeFromStorage());
      setLoading(false);
    };
    load();
  }, [dispatch]);

  // Sync Redux cart code to AsyncStorage whenever it changes
  useEffect(() => {
    syncCartCodeStorage(cartCode);
  }, [cartCode]);

  if (loading) return null;

  return <>{children}</>;
}

export default function App() {

  return (
    <Provider store={store}>
      <AppInitializer >
        <RootNavigator />
      </AppInitializer >
    </Provider>
  );
}
