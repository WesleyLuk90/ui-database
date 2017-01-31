import ReactDom from 'react-dom';
import React from 'react';

import Test from './Test';

require('bootstrap-sass/assets/stylesheets/_bootstrap-sprockets.scss');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');

const element = document.createElement('div');
document.body.appendChild(element);

ReactDom.render(React.createElement(Test), element);
