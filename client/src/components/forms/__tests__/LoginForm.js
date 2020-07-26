import React from "react"
import LoginForm from "../LoginForm"
//import ReactDOM from "react-dom"
import { render, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { toHaveAttribute, toHaveTextContent } from "@testing-library/jest-dom/matchers"
import user from "@testing-library/user-event";
import { queries, getQueriesForElement } from "@testing-library/dom";
import mockApi from "../../../api"


expect.extend({toHaveAttribute, toHaveTextContent})

const submit = jest.fn(() => Promise.resolve())

//const { users: { login }} = mockApi;

const data = {
    email: "test@mail.com",
    password: "mypass",
  }

/* const mockToken = "12345"

jest.mock("../../../api")

const mockLogin = jest.fn();
const mockHistory = {push: jest.fn()} */




/* test("LoginForm should render correct", () => {
    const { getByLabelText } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
        );
    const emailEl = getByLabelText(/email/i)
    expect(emailEl).toHaveAttribute("type", "email");
})

test("Debug", () => {
    const { debug } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
    debug()
})
*/
 test("LoginForm test snapshot", () => {
    const { container } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
      
    expect(container.firstChild).toMatchSnapshot()
}) 

/*
test("LoginForm test submit (fireEvent)", () => {
    const { debug, getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <LoginForm submit={submit}/>
      </MemoryRouter>
    );
  
    const emailElement = getByLabelText(/email/i);
    const passwordElement = getByLabelText(/password/i);
    fireEvent.change(emailElement, {target: {value: data.email}})
    fireEvent.change(passwordElement, {target: {value: data.password}})
  
    const loginButton = getByTestId("login-button")
    fireEvent.click(loginButton)
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(data)
  })


test("LoginForm test submit (user event)", () => {
    const { getByLabelText, getByTestId } = render(
        <MemoryRouter>
          <LoginForm submit={submit}/>
        </MemoryRouter>
      );
      const emailElement = getByLabelText(/email/i);
      const passwordElement = getByLabelText(/password/i);
      const loginButton = getByTestId("login-button")

      user.type(emailElement, data.email)
      user.type(passwordElement, data.password)

      fireEvent.click(loginButton)
      expect(submit).toHaveBeenCalledTimes(1)
}) 
*/



    
