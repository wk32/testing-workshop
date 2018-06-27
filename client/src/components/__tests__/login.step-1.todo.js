import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'
// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  const div = document.createElement('div')
  const fakeAccount = {username: 'user', password: 'password'}
  const handleSubmit = jest.fn()

  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)
  // notes: querySelector must be placed after render if not there won't be any component to be queried
  const form = div.querySelector('form')
  const inputs = div.querySelectorAll('input')
  const submitButtonNode = div.querySelector('button')

  // notes: variables must be assigned before submitting the form
  const usernameNode = inputs[0]
  const passwordNode = inputs[1]
  usernameNode.value = 'user'
  passwordNode.value = 'password'
  console.log(usernameNode.value)
  console.log(passwordNode.value)
  console.log(submitButtonNode)

  form.dispatchEvent(new window.Event('submit'))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toBeCalledWith(fakeAccount)
  expect(submitButtonNode.type).toBe('submit')
  // Arrange
  // create a fake object to hold the form field values (username and password)
  // create a jest.fn() for your submit handler
  // render the Login component to a div
  // TIP: const div = document.createElement('div')
  //
  // get the field nodes
  // TIP: const inputs = div.querySelectorAll('input')
  // TIP: const form = div.querySelector('form')
  // fill in the field values
  //
  // Act
  // submit the form:
  // TIP: formNode.dispatchEvent(new window.Event('submit'))
  //
  // Assert
  // ensure your submit handler was called properly
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
