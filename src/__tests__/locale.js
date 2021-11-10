import React from "react";
import { reduxRender, screen, fireEvent, within } from '../test-utils';
import userEvent from '@testing-library/user-event'
import App from '../containers/App/App'

// 測試登入頁面的locale都正確
describe('locale tests of FormSubmit', () => {
  // 測試前都先把app render好
  beforeEach(() => {
    reduxRender(<App />)
  })
  // 測試英語正確
  it('should translate into english',()=>{
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/english/i));
    expect(screen.queryAllByText(/sign in/i)).toHaveLength(2);
    expect(screen.getByText(/tell you/i)).toBeInTheDocument();
    expect(screen.getByText(/build by/i)).toBeInTheDocument();
  })
  // 測試中文正確
  it('should translate into mandarin',()=>{
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/中文/i));
    expect(screen.queryAllByText(/登入/i)).toHaveLength(2);
    expect(screen.getByText(/告訴/i)).toBeInTheDocument();
    expect(screen.getByText(/建立/i)).toBeInTheDocument();
  })
  // 測試西文正確
  it('should translate into spanish',()=>{
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/español/i));
    expect(screen.queryAllByText(/Iniciar sesión/i)).toHaveLength(2);
    expect(screen.getByText(/te dirá/i)).toBeInTheDocument();
    expect(screen.getByText(/construido de/i)).toBeInTheDocument();
  })

})
// 測試登入後的locale都正確
describe('locale tests of SearchBar', () => {
  // 每一個測試前都先登入
  beforeEach(() => {
    reduxRender(<App />)
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/english/i));
    userEvent.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), '123');
    userEvent.click(screen.getByDisplayValue(/sign/i));
  })
  // 測試英文正確
  it('should translate into english',async ()=>{
    expect(await screen.findByText(/hi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter/i)).toBeInTheDocument();
    expect(screen.getByText(/send/i)).toBeInTheDocument();
    expect(screen.queryByRole('button',{name:/upload/i})).toBeInTheDocument();
    expect(screen.getByText(/please input/i)).toBeInTheDocument();
    expect(screen.getByText(/build/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/sign out/i));
  })
  // 測試中文正確
  it('should translate into mandarin',async ()=>{
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/中文/i));
    expect(await screen.findByText(/您好/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/輸入/i)).toBeInTheDocument();
    expect(screen.getByText(/送出/i)).toBeInTheDocument();
    expect(screen.queryByRole('button',{name:/上傳/i})).toBeInTheDocument();
    expect(screen.getByText(/請輸入/i)).toBeInTheDocument();
    expect(screen.getByText(/建立/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/登出/i));
  })
  // 測試西文正確
  it('should translate into spanish',async ()=>{
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/español/i));
    expect(await screen.findByText(/hola/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/poner/i)).toBeInTheDocument();
    expect(screen.getByText(/enviar/i)).toBeInTheDocument();
    expect(screen.queryByRole('button',{name:/subir/i})).toBeInTheDocument();
    expect(screen.getByText(/ingresa/i)).toBeInTheDocument();
    expect(screen.getByText(/construido/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/cerrar sesión/i));
  })

})
