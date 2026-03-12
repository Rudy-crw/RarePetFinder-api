const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");
const path = require("path"); // 👈 1. 記得加回這行！

const app = jsonServer.create();

// 👈 2. 這裡一定要用 __dirname 綁死絕對路徑！
const router = jsonServer.router(path.join(__dirname, "db.json"));

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
