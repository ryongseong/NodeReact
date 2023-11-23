require("dotenv").config();
const express = require('express'); // express 모듈을 가져옴
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const app = express(); // function을 이용하여 express app 생성
const port = 5000; // 포트 번호
const uri = process.env.MONGO_URI
mongoose.set("strictQuery", false);

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

main()
  .then(()=>console.log("succeesssss"))
  .catch(err => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

app.get('/', (req, res) => { res.send('안녕하세요!') })

app.post('/register', async(req, res)=> {

  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });


});


app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })