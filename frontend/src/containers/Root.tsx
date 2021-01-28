import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';

type RootProps = {
    store: Store;
    history: History;
};

const Root = ({ store, history }: RootProps) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>
);

export default Root;
