import { rest } from 'msw'
import { users } from './users'
import { imageUrlRes,multiCelebrities } from './response'

// 在node環境底下mock server，需要給後端完整網址，在browser環境底下則給end point就好了。
const backendURL = 'https://quiet-retreat-05063.herokuapp.com'
// mock各個end points回傳的資料
export const handlers = [
  rest.get(backendURL + '/', (req, res, ctx) => {
    return res(ctx.json('service worker backend connected'))
  }),
  rest.post(backendURL + '/signin', (req, res, ctx) => {
    // 符合測試者資料就回傳使用者資料，不符合就回傳錯誤訊息
    if (req.body.email === users[0].emeil && req.body.password === users[0].password) {
      return res(ctx.json(users[0]))
    } else {
      return res(ctx.status(403), ctx.json('email or password error'))
    }
  }),
  rest.post(backendURL + '/imageurl', (req, res, ctx) => {
    // 假資料的網址有clebmafia的話，就回傳辨認出一個明星的結果
    // 其它的假資料就回傳辨認二個明星的結果
    if(req.body.clarifaiImageURL.includes('celebmafia')){
      return res(ctx.json(imageUrlRes))
    } else {
      return res(ctx.json(multiCelebrities))
    }
  }),
  // 如果收到使用次數的request，就把使用次數由0改成1，再回傳
  rest.put(backendURL + '/image', (req, res, ctx) => {
    const user = Object.assign({},users[0]);
    user.entries = '1'
    return res(ctx.json([user]))
  }),
  // 這個endpoint會傳檔案來，就回傳一個檔名回去就好了
  // 其中這個檔案是真的有存在後端的server上，所以前端也是能顯示相片
  rest.post(backendURL + '/upload', (req, res, ctx) => {
    return res(ctx.json('18853-1615993462968.png'))
  }),
  rest.post(backendURL + '/capture', (req, res, ctx) => {
    // 這個endpoint會傳一個非url的網址過來，也只需回傳一個檔名回去就好了
    // 其中這個檔案是真的有存在後端的server上，所以前端也是能顯示相片
    return res(ctx.json('18853-1615993462968.png'))
  }),
]
