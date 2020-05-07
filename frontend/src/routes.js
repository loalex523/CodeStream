import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/App';
import HomePage from './views/HomePage';
import Room from './views/Room'
import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import { Router, browserHistory } from 'react-router';
import routes from './views/routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore()

render(  
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
 document.getElementById('main')
);
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/rooms/:id" component={Room} />
  </Route>
);