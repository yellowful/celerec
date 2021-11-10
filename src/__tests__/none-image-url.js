import React from "react";
import { reduxRender, screen, fireEvent, within } from '../test-utils';
import userEvent from '@testing-library/user-event'
import App from '../containers/App/App'
// 非相片網址的測式
describe('none image url tests', () => {
  // 測試前都要先登入
  beforeEach(() => {
    reduxRender(<App />)
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/english/i));
    userEvent.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), '123');
    userEvent.click(screen.getByDisplayValue(/sign in/i));
  })
  // 測試完都要登出
  afterEach(() => {
    userEvent.click(screen.getByText(/sign out/i));
  })
  // 上傳一個檔，應該要正確的顯示三行
  it('should the result has multi rows, when an image file is uploaded', async () => {
    expect(await screen.findByText('0')).toBeInTheDocument();
    // 假的圖片檔案
    const file = new File(['hello'], 'hello.png', {type: 'image/png'})
    // 隱形的上傳按鈕比較難找，直接用testid處理
    const fileInput = screen.getByTestId('upload-button');
    // 使用者將檔案上傳，這邊用fireEvent.change反而無效
    userEvent.upload(fileInput,file);
    // 假資料是2個人臉，所以加標題列應該是3行
    expect(await screen.findAllByRole('row')).toHaveLength(3);
  })
  // 送出非相片網址，app應該要能夠測得而向後端的capture endpoint送出網址，前端收到檔名後，再向後端丟出相片網址
  // 最後應該要能得到3行的結果資料
  it('should the result has multi rows, when an none image url is sent', async () => {
    expect(await screen.findByText('0')).toBeInTheDocument();
    // 非相片的網址(沒有jpg等檔名)
    userEvent.type(await screen.findByRole('searchbox'), 'https://www.fanpop.com/clubs/matt-smith-and-karen-gillan/images/11610266/title/3-photo');
    userEvent.click(screen.getByText(/send/i));
    // 假資料是2個人臉，所以加標題列應該是3行
    expect(await screen.findAllByRole('row')).toHaveLength(3);
  })

})


