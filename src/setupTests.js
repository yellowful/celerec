// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server'

// 解決一個jest和jsdom相關的報錯
HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};
// 以下都是讓test使用mock的server
beforeAll(() => {
    // Enable the mocking in tests.
    server.listen()
})

afterEach(() => {
    // Reset any runtime handlers tests may use.
    server.resetHandlers()
})

afterAll(() => {
    // Clean up once the tests are done.
    server.close()
})
