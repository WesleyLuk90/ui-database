import ReactDom from 'react-dom';
import React from 'react';

import Test from './Test';

const element = document.createElement('div');
document.body.appendChild(element);

ReactDom.render(React.createElement(Test), element);
