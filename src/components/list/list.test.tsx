import React from 'react';
import List from './list';
import EventSource, {sources} from 'eventsourcemock';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {store} from "../../store/store";

Enzyme.configure({adapter: new Adapter()});

Object.defineProperty(window, 'EventSource', {
  value: EventSource,
});

describe('update on sse', () => {
  let wrapper: any;
  beforeAll(() => {
    wrapper = mount(<List/>);
    sources['http://localhost:8080'].emitOpen();

  });

  it('should initialise items to {}', () => {
    expect(wrapper.state('items')).toStrictEqual({});
  });


  it('should have one item', () => {
    spyOn(store, 'dispatch');
    sources['http://localhost:8080'].emitMessage(
      {
        event: "order_event",
        data: JSON.stringify({
          "id": "1LXIp1XYWWcW8YdyavBFx90ESpE",
          "create_time": "2019-05-21T10:43:14+02:00",
          "organization": "BBCG",
          "type": "order_event",
          "payload": {
            "reference": "BBCGL6T715OJ",
            "operator": "Mrs. Ms. Miss Robin Ross",
            "subtype": "data_update",
            "short": "destination",
            "description": "Northridge Street 18"
          }
        })
      }
    );
    expect(wrapper.state('listener').readyState).toBe(1);
    expect(wrapper.state('items').hasOwnProperty('BBCGL6T715OJ')).toBe(true);

  });


  it('should close the EventSource on unmount', () => {
    wrapper.unmount();
    expect(sources['http://localhost:8080'].readyState).toBe(2);
  });
});


