require("dotenv").config();
const {User} = require("../../models/users_db");
const bcrypt = require("bcryptjs");
const JOI = require("joi");

class api_AuthController {


    constructor() {

      this.csrfToken = null;
    }
  
    validate = (data) =>{

      const schema = JOI.object({

          email: JOI.string().email().required().label("Email"),
          password: JOI.string().required().label("Password"),
      });

      return schema.validate(data);
    }

    index = async (req, res, next) => {

      res.header('Access-Control-Allow-Origin', process.env.REACT_APP_HOSTNAME);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization','X-CSRF-Token');
      res.header('Access-Control-Allow-Credentials', 'true');

     
      this.csrfToken = req.csrfToken();

      console.log("New csrf token: ", this.csrfToken);

      return res.status(200).send({
        
          csrf: this.csrfToken,
      });
    }

    getCsrfTokenGenerate = async ()=>{

      return this.csrfToken;
    }

    account = async (req, res, next) => {

      res.header('Access-Control-Allow-Origin', process.env.REACT_APP_HOSTNAME);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization','X-CSRF-Token');
      res.header('Access-Control-Allow-Credentials', 'true');

      return res.status(200).send({
        
        message: "Login success",
      });
    }

    login = async (req, res, next) => {


      try {

        const user = await User.findOne({ email: req.body.data.email });
        const token = user.generateAuthToken();

        console.log("User login: ", user);
    
        res.cookie('token', token, {
            sameSite: 'none',
            path: '/',
            maxAge: 60*1000,
            httpOnly: true,
            secure: true
		    });

        res.cookie('username', `${user.firstName} ${user.lastName}`, {
            sameSite: 'none',
            path: '/',
            maxAge: 60*60*1000,
            secure: true
        });

        res.cookie('email', user.email, {
            sameSite: 'none',
            path: '/',
            maxAge: 60*60*1000,
            secure: true
        });
    
        res.status(200).send({
            data: token,
            email: user.email,
            username: `${user.firstName} ${user.lastName}`,
            message: "Đăng nhập thành công",
        });

      } catch (error) {

        console.log("Login Server Error: ",error);

        res.status(500).send({ 

            message: "Internal Server Error!" + error
        });
      }
    };
  

    store = async (req, res, next)=>{
          
      try{

        const salt = bcrypt.genSaltSync(Number(process.env.SALT));
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const isPasswordValid = bcrypt.compareSync(req.body.password, hashPassword);
        await new User({ ...req.body, password: hashPassword }).save();
  
        res.status(201).send({ 
      
            message: "User created successfully"
        });

      }catch (error){

        console.log("Register Server Error: ",error);

        res.status(500).send({ 

            message: "Internal Server Error!" + error
        });
      }
    }

}

module.exports = {
  
  auth_api : new api_AuthController,
}
