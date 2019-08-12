import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import CommentBox from 'components/CommentBox';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(1);
});

describe('the textarea', () => {
  beforeEach(() => {
    // actual html event, not the react name
    wrapped.find('textarea').simulate('change', {
      // merges into the event argument (so it'll go "event" .target.value (from below))
      target: { value: 'new comment' }
    }); // can't check for update right away because react rendering after setstate is async, need to force update
    wrapped.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('has a form that clears its textarea after submission', () => {
    // should consider separate expect statement here to check if comment actually updated, but ok to skip because above test does that for us
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
})