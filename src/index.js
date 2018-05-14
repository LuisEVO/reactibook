import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Routing
import {BrowserRouter} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './store/config'

const Reactibook = (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Reactibook/>, document.getElementById('root'));
registerServiceWorker();
