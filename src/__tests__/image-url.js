import React from "react";
import { reduxRender, screen, fireEvent, within } from '../test-utils';
import userEvent from '@testing-library/user-event'
import App from '../containers/App/App'
// 搜尋的網址是相片網址的相關測試
describe('image url search tests', () => {
  // 在每個測試前先登入
  beforeEach(()=>{
    reduxRender(<App />)
    // 不管瀏灠器或是node環境預設locale為何，先切換成英文環境登入
    // within可以限制用來找某個結構內部
    fireEvent.mouseEnter(within(screen.getByRole('navigation')).getByRole('button'))
    userEvent.click(screen.getByText(/english/i));
    userEvent.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), '123');
    userEvent.click(screen.getByDisplayValue(/sign in/i));
  })
  // 每個測試結束都登出，不然有的測試在沒登出情況下會出錯
  afterEach(()=>{
    userEvent.click(screen.getByText(/sign out/i));
  })

  // 輸入有相片格式的網址，測試app的邏輯，是不是能夠正確的顯示辨識結果，而且使用次數加1
  it('should the recognition result and the entries be correct', async () => {
    // 登入後會看到使用次數原本是0
    expect(await screen.findByText('0')).toBeInTheDocument();
    userEvent.type(await screen.findByRole('searchbox'), 'https://celebmafia.com/wp-content/uploads/2014/07/karen-gillan-shows-off-her-legs-leaving-itv-studios-in-london-july-2014_18.jpg');
    userEvent.click(screen.getByText(/send/i));
    // 標題行和答案一共構成2列
    expect(await screen.findAllByRole('row')).toHaveLength(2);
    // 使用次數變1了
    expect(await screen.findByText('1')).toBeInTheDocument();
  })
  // mock後端會回傳2張人臉的辨識結果，要測試是不是能正確顯示
  it('should the result has multi rows', async () => {
    // 別張圖的網址
    userEvent.type(await screen.findByRole('searchbox'), 'http://images2.fanpop.com/image/photos/11600000/-3-matt-smith-and-karen-gillan-11610266-544-768.jpg');
    userEvent.click(screen.getByText(/send/i));
    // 標題1列，答案2列，所以3列
    expect(await screen.findAllByRole('row')).toHaveLength(3);
  })

})
