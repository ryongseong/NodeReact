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

app.get('/', (req, res) => { res.send('Hello World!~~~') })

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

app.post('/login', (req, res)=> {
  // 요청된 이메일을 데이터베이스에서 있는지 확인한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
    // 비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        
      })

    })


  })
})


app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })