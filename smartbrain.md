smartbrain專案流程
1. npx create-react-app smartbrain，其中smartbrain需要是小寫，接著會出現專案資料夾
2. 進資料夾裡灌tachyons： 
   <code>npm install tachyons</code>
3. 弄出辨識畫面時的基本畫面
   1. 用一個最大的div，用flex-column，依序由上而下將以下component排列好。
      1. sign in, sign out的瀏覽列
      2. logo
      3. 搜尋列
      4. 圖片框
   2. 修飾各個元件位置和細節：
      1. 瀏覽列讓它靠右，並調一下margin
      2. logo調一下大小、外框粗細、陰影、margin
      3. 搜尋列用兩個元件（input和button）組成，用grid調大小，用flex調置中
      4. 圖片框也是用兩個component組成（預測結果和圖片），用flex-column上下排列
4. 串接clarifai的API：
   1. 讀API文件，google找到特定model的document，直接copy code來用，model有特定的代碼當呼叫時的arguement。
   2. 找到authentication，copy驗證的程式碼來用。
   3. 找到自己的api key，把自己的api key換上。
   4. 把clarifai範例的相片網址送出，console.log收到的資料結構，找出預測的人名位置
5. 把search bar和API串接起來：
   1. 設計input和send鍵的邏輯，雖然有監聽input的event，也有更新state，但是只有在監聽到send的event的時候，才會把input的value抓下來
   2. 把input抓到的value，也就是網址，送出去給API
   3. 監聽到send鍵的event時，把input的value再清空，使用者才可以接著輸入下一個網址。
   4. 最後再把URL送給圖片框，讓圖片框能顯示輸入的相片。
   5. 把步驟四的人名顯示在圖片上方，這樣基本最重要的功能就有了。
   6. 第一版本可以deploy了：
      1. 先git init
      2. git add .
      3. git commit -m 'v0.1'
      4. git remote add origin https://github.com/yellowful/smartbrain.git
      5. git push - u origin master (以後都git push就好了)
      6. 去github上設定github pages設定為gh-pages的branch
      7. vscode裡改package檔，加上github pages的網址，和predeploy和deploy。
      8. 在terminal裡： npm install --save gh-pages
      9. 在terminal裡： npm run deploy
6. 登入和註冊：
   1. 先弄清楚登錄的邏輯
      1. 只要是已經登錄狀態，瀏覽列就是顯示sign out，而且會顯示下面的主要功能，搜尋列和圖框，可以把這個狀態設成sign in是true。
      2. 所有sign in的按鈕(除了submit按鈕不算)點了，都會出現sign in的component，點了sign out的按鈕，也是該出現sign in的component。這個狀態可以設成sign in是false。
      3. 註冊的component是在register鈕被按的時候才會出現，submit點出後就要消失，所以可以設一個register記住這兩種狀態。
    2. 去tachyon找sign in register的樣板來套用，要把class改成className，把連接的部分都改成onClick。 
7. 製作人臉方框：
   1. 先試著從clarifai的範例，用chrome的select tool找到框框怎麼寫。
   2. 試著在照片上畫一個疊上去的方框。
   3. 方框是一個div的shadow，最關鍵的點是這個div的position需要是absolute，而他的爸爸div要是relative，這樣方框div才會蓋在爸爸身上。
   4. 不過一個困難點在於，圖片框這個component包含兩個被flex-column保住的element，而被flex-column包住的element的寬度都會變成和螢幕同寬，所以包在相片外面的div的寬度會和相片不同，而抓回來的方框資料依據的是相片的大小，方框依據的是爸爸div的大小，所以會不能用。
   5. 把爸爸div大小弄成和相片一樣大小的方式，就是把爸爸div的flex特性取消掉，取消的方式是，把display設成inline-flex。（這也是inline-flex和flex不同的地方，連css tricks都不知道，以為兩個一樣）
   6. 但是爸爸的div把flex取消之後，會無法置中，只好再弄一個爺爺包住爸爸，爺爺的display用block而position用static，這時候爺爺就會被flex-column限制了，寬度展開和螢幕同寬，爸爸div就神奇的被置中了。
   7. 這時候爸爸div的範圍和相片會重疊，方框用absolute就可以疊在爸爸上，至於要疊在什麼位置，就得先抓image的大小才算的出來。
      1. 先用.getElementById或是.querrySelector都可以，先找到相片。
      2. 屬性是.offsetWidth和.offsetHeight。
   8. 把步驟四抓的資料找出方框的資料，換算成像素，再套用。
   9. 其他修飾
      1.  Logo： 
          1.  用npm react-tilt的library，套用在logo上。
          2.  https://www.flaticon.com/free-icons/brain
      2.  背景：react particle js
8. 連接backend：
   1. 先弄好node.js環境。
   2. 用npm安裝:
      1. express：架站用，設定如下
         1. app.use(express.urlencoded({extended:false}));
         2. app.use(express.json());
      2. cors：讓chrome同意同一個web app連向不同網站。
          app.use(cors());
      3. bcrypt-nodejs：讓密碼轉hash的工具。
   3. 先在componentDidLoad先測試看看，能不能連接的上。
   4. backend可以先設定2個預設user，以方便測試連接。
   5. 先把/sign in連上。
      1. 把資料post再body中。資料格式是application/json。
      2. 因為其他component並不在乎sign in這個component是否登入成功，所以fetch就不寫在app裡了，以免app程式太長。
      3. 因為要將輸入的email和password傳到backend，所以要設定this.state來因應改變。
   6. 把/register連上，和sign in非常類似。
   7. 把/image連上，用put的方式進行更新entry（使用人臉辨識的次數）。
   8. 著重api是否連接ok，backend的判斷邏輯和預設user的判斷，不是太重要，因為之後都會被database的功能取代掉。
9. 連接database：
   1.  PostgreSQL：先建立兩個table
         users
         id SERIAL PRIMARY KEY
         name VARCHAR(100)
         email TEXT UNIQUE NOT NULL 
         entries BIGINT DEFAULT 0
         joined TIMESTAMP NOT NULL

         login 
         id SERIAL PRIMARY KEY
         hash VARCHAR(100) NOT NULL 
         email TEXT UNIQUE NOT NULL
   2.  在backend用KNEX連接database
       1.  npm設定：
           1.  網址：http://knexjs.org/#Installation-node
           2.  安裝：
                 npm install knex
                 npm install pg
           3.  設定：
               1.  require的地方，client要設為pg
               2.  server送出給postgresql的connection
                   1.  user要設成database的創建者
                   2.  要有password，即使是空字串也沒關係
   3.  用postman送'/signin'、‘/register’、'/image'、'/:id'等給backend，backend把request透過KNEX送去database。
       1.  /register：
           1.  要用transaction，把frontend的request存到兩個users和login兩個table中。
                  用法：
                     db.transaction(trx => {
                        trx.insert(...)
                        .into(table_name1)
                        .returning('column1')
                        .then(column1 => {
                           return trx.insert(...)
                           .into(table_name2)
                           .
                        })
                        .then(trx.commit)
                        .catch(trx.rollback)
                     }) 
           2.  其中password的部分要先用同步的方式bcrypt.hashSync做好hash
       2.  /signin：
           1.  frontend收到email去調出database的login中的hash，然後用同步的方式bcrypt.compareSync確認密碼是不是相同
           2.  相同的話，要用密碼去調出database的users的所有資料，然後把那個email的user資料送去前端。
       3.  /image：
           1.  收前端的user資科，用increment去增加那個email對應的entry。
           2.  叫database回傳increment後的entry，然後把更新後的user再回傳給frontend
   4.  component的修改：
       1. register的component，判斷response的是object，就將response載入現在使用者資料中。
       2. signin的component，判斷response是object，就將response載入現在使用者資料中。
       3. searchbar的component，send之後，要將response，也就是更新使用次數後的使用這資料，載入現在使用者資料中。
       4. 更新使用次數的function是傳使用者給後端，後端的KNEXT用increment去將database加1，然後再把database更新後的使用者傳給frontend，這時候frontend要整個user的object的state一起更新，不要只更新裡面使用次數的properties，因為語法會超級麻煩。
10. 還可以再改進或增加的功能：
    1.  再次到訪不用再login
    2.  後端介面可以刪除使用者
    3.  可以上傳圖檔來辨識
    4.  可以辨識多人
    5.  不用註冊可以辨識一定次數
    6.  enter也有click的效果

舊版先git push

initial state
所有.then最好都要有catch
signin和register共用大部分元件，所以可以用一個component，只是有不同的input property

image component也許可以拿出什麼東西出來，例如輸入欄和按鈕，當作一個component，可以給其他component用。

dependency injection

advanced function：currying（run完變成另外一個function可以接受req和res）

非常重要：frontend和backend有各自的偵錯機制，永遠不可以相信任何人

再度用return停止function運作，防止傳錯誤資料到database

如果太多this，記得用destructure

把front end的api key移去back end
   建立一個新的end point
   fetch到後端
   後端fetch到clarifai
   後端再把response傳到front end

environmental variable通常用大寫
process.env.PORT
bash底下：PORT=3000

fish：
env variable node server.js


hostgater: apache放檔案

sign up heroku
heroku node
heroku cli

heroku open
keroku logs --tail

改port

以下不安全，正式上線不該用。
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

裝postgresql
heroku addons確認是否裝好

heroku cli: heroku pg:info

heroku pg:psql

讀文件，連到node.js:
database的url是：process.env.DATABASE_URL,
ssl:true

heroku config看網址

原來host改成connectionString

deploy react app:
npm install serve --s
"start":"serve -s build",

在介面中開啟一個app
依document的git指令deploy


主要觀念是設定網址，讓他們指向正確的地方。


reveal config vars




