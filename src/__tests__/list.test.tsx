import React from 'react';
import ReactDOM from 'react-dom';
import List from '../components/list/list';
import renderer from 'react-test-renderer';
import EventSource from 'eventsourcemock';
 
Object.defineProperty(window, 'EventSource', {
  value: EventSource,
});

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

