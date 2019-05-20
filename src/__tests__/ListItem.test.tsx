import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from '../components/list-item/list-item';
import renderer from 'react-test-renderer';

const item = { date: "2019-05-20T17:59:56+02:00", "reference": "BBCGIYECO7LB", "operator": "Bigblue System", "subtype": "status_update", "short": "DELIVERY_EXCEPTION", "description": "Transmitted to the warehouse" }

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListItem firstItem={true} rowType='light' key={item.reference} order={item} />, div);
  ReactDOM.unmountComponentAtNode(div);
})

test('render with the right classes: exception', () => {
  const component = renderer.create(
    <ListItem firstItem={true} rowType='light' key={item.reference} order={item} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.props.className).toContain('animate')
  expect(tree.props.className).toContain('exception')
});

test('render with the right classes: delivered', () => {
  const item = { date: "2019-05-20T17:59:56+02:00", "reference": "BBCGIYECO7LB", "operator": "Bigblue System", "subtype": "status_update", "short": "DELIVERED", "description": "Transmitted to the warehouse" }

  const component = renderer.create(
    <ListItem firstItem={true} rowType='light' key={item.reference} order={item} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.props.className).toContain('animate')
  expect(tree.props.className).toContain('delivered')
})

