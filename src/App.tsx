import { Provider } from 'react-redux';
import { JournalApp } from './JournalApp';
import {store} from './store/store'


const App: React.FC = () => (
    <Provider store={store}>
    <JournalApp />
    </Provider>
);

export default App
