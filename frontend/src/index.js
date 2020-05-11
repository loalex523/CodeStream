import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Room from './views/Room';
import Homepage from './views/Homepage';

// ReactDOM.render(
//   <App />
//   , document.getElementById('root')
// );

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Homepage} />
      <Route path="/:roomID" component={Room} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
);

serviceWorker.unregister();
