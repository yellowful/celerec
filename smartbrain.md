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
    1. 去tachyon找sign in register的樣板來套用，要把class改成className，把連接的部分都改成onClick。 
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
