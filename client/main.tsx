import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../imports/store';
import { App } from '../imports/ui/App';

Meteor.startup(() => {
  render(
    <Provider store={ store }>
      <App/>
    </Provider>, 
    document.getElementById('react-target')
  );
});
