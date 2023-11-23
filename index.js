require("dotenv").config();
const express = require('express'); // express 모듈을 가져옴
const mongoose = require('mongoose');
const app = express(); // function을 이용하여 express app 생성
const port = 5000; // 포트 번호
const uri = "mongodb+srv://ryongseong:abcd1234@node.sch9h9t.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);

main()
  .then(()=>console.log("succeesssss"))
  .catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

app.get('/', (req, res) => { res.send('안녕하세요!') })

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })