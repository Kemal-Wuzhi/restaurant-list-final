# restaurant list
### 功能
1.使用者可以在首頁瀏覽餐廳資料：    
餐廳名稱    
餐廳類型  
餐廳照片    
餐廳評價    

2.使用者可以點擊餐廳圖示查看以下資訊：    
餐廳類別    
餐廳地址    
餐廳電話    
餐廳描述    


3.使用者可以透過名稱搜尋餐廳    
4.使用者可以透過餐廳類別搜尋餐廳    
5.可以新增、修改、刪除餐廳資料    
6.可以註冊使用者    
7.使用facebook登入    

### 網站需求
node.js: v13.14.0  
express: v4.17.1  
express-handlebars: v5.3.3  

### 安裝方法
下載專案  
  git clone https://github.com/azod2/restaurant_list-final.git  

安裝相關套件  
  npm install  

將.env.example 改成 .env，並使用自己的相關個人資料填入以下欄位  
  FACEBOOK_ID = 'YOUR ID'  
  FACEBOOK_SECRET = 'YOUR SECRET'  

執行種子資料  
  npm run seed  

執行  
npm run dev  

啟動網頁  
http://localhost:3000  
