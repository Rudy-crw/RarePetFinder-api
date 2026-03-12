const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("dj.json"); // 指向你的資料庫
const middlewares = jsonServer.defaults();

// 設定 Port，雲端環境會自動分配 process.env.PORT
const port = process.env.PORT || 3001;

// 綁定跨域與預設中介軟體
app.use(cors());
app.use(middlewares);

// 綁定權限驗證 (auth)
app.db = router.db; // json-server-auth 需要綁定 db
app.use(auth);

// 綁定路由
app.use(router);

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
