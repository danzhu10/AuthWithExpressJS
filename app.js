const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./src/config/constantConfig');

// //call for routers
const registerRouter = require('./src/router/userRegisterRoute').router;
const loginRouter = require('./src/router/userLoginRoute').router;
const profileRouter = require('./src/router/profileRoute').router;
const emailVerifRouter = require('./src/router/emailVerificationRoute').router;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('uploads'));

app.use ((req, res, next) => {
    res.jsonf = (code, status, message, response)=> {
      res.json({
        code:code,
        status:status,
        message:message,
        response : response
      }).status(code)
    }
  
    res.jsond = (httpStatus, code, status, message, response)=> {
      res.json({
        code:code,
        status:status,
        message:message,
        response : response
      }).status(httpStatus)
    }
    next()
  });

//Health check
app.get('/api/health-check', (req, res) => {
  res.json({ message:"Health check success" }).status(200)
})

app.use("/api/user",
  registerRouter,
  loginRouter,
  profileRouter,
);

app.use("/verification",
  emailVerifRouter
)

app.listen(config.port, () => {
    console.log('API elid service started on port', config.port);
})