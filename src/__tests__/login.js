import React from "react";
import { reduxRender, screen, fireEvent, within } from '../test-utils';
import userEvent from '@testing-library/user-event'
import App from '../containers/App/App'
// 測試登入和登出的功能
describe('log in and log out tests', () => {
  // 每個測試前先把locale設定成英文
  beforeEach(() => {
    reduxRender(<App />)
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/english/i));
  })
  // 測試登入和註冊切換邏輯正常
  it('should sign in and sign up route be correct', () => {
    expect(screen.getAllByText(/sign up/i)).toHaveLength(1);
    userEvent.click(screen.getByText(/sign up/i));
    expect(screen.getAllByText(/sign in/i)).toHaveLength(1);
    userEvent.click(screen.getByText(/sign in/i));
  })
  // 如果有空白輸入應該顯示錯誤
  it('should an error message shown when a blank input occurs', () => {
    userEvent.click(screen.getByDisplayValue(/sign/i));
    expect(screen.getByText(/Invalid login/i)).toBeInTheDocument();
  })
  // 如果帳密不符應該要顯示錯誤
  it('should an error message shown when any invalid user submitted', async () => {
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.type(screen.getByLabelText(/email/i), 'invalid@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), 'invalid');
    userEvent.click(screen.getByDisplayValue(/sign/i));
    expect(await screen.findByText(/Invalid login/i)).toBeInTheDocument();
  })
  // 帳密符合的使用者應該要可以登入
  it('should allow a valid user to log in and log out', async () => {
    expect(screen.queryByRole('heading', { name: /hi/i })).not.toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), '123');
    userEvent.click(screen.getByDisplayValue(/sign/i));
    expect(await screen.findByRole('heading', { name: /hi test/i })).toBeInTheDocument();
    userEvent.click(screen.getByText(/sign out/i));
    expect(await screen.findByText(/CeleRec will tell you/i)).toBeInTheDocument();
  })

})