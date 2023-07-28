// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './api/mocks/_server';

// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
