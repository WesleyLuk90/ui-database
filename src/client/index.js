import ReactDom from 'react-dom';
import React from 'react';
import Page from './components/Page';

require('./styles/main.scss');

const element = document.createElement('div');
document.body.appendChild(element);

ReactDom.render(React.createElement(Page), element);


const routingService = new RoutingService();
