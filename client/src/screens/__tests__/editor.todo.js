import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor'
import * as utilsMock from '../../utils/api'
/**
 * this describes how utilities work behinds the scenes to better understand the abstraction
 * that the utilities provide
 */
// note: mock up a fake api returning an empty promise
// jest will run this fake api instead of what's defined in the React component.
jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

// note: mock up the async behaviour
const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div')
  const fakeUser = {id: 'foobar'}
  // mockup of react router history
  const fakeHistory = {
    push: jest.fn(),
  }
  const preDate = Date.now()

  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements
  title.value = 'I like tweets'
  content.value = 'Like a lot...'
  tags.value = 'twix, my, likes'
  console.log(title.value)

  const submit = new window.Event('submit')

  form.dispatchEvent(submit)
  // notes: api posts is async so needs time to resolve to make test pass
  await flushPromises()
  /**
   *  notes: test different conditions
   *  1. test react route history is called once
   *  2. test react route can route to root url
   *  3. test creation of posts
   *  4. check posted date is created at the point of edit
   */

  const inputDateString = utilsMock.posts.create.mock.calls[0][0].date
  const inputDate = new Date(inputDateString)
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String),
  })
  const dateAfterPost = Date.now()
  expect(inputDate.getTime()).toBeGreaterThan(preDate)
  expect(inputDate.getTime()).toBeLessThanOrEqual(dateAfterPost)
  // Arrange
  // create a fake user, post, history, and api
  //
  // use ReactDOM.render() to render the editor to a div
  //
  // fill out form elements with your fake post
  //
  // Act
  // submit form
  //
  // wait for promise to settle
  //
  // Assert
  // ensure the create function was called with the right data
})

// TODO later...
test('snapshot', () => {})
