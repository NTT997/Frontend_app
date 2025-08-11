import { Provider } from 'react-redux';
import store from '@/redux/store';
import RootNavigator from '@/navigations/index';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
