require("dotenv").config();
const {User} = require("../../models/users_db");
const bcrypt = require("bcryptjs");
const JOI = require("joi");

class api_AuthController {

  
    validate = (data) =>{

      const schema = JOI.object({

        email: JOI.string().email().required().label("Email"),
        password: JOI.string().required().label("Password"),
      });

      return schema.validate(data);
    }

    index = async (req, res, next) => {

      return res.status(200).send({
        
        message: "success"
      })
    }

    login = async (req, res, next) => {

      try {

        const user = await User.findOne({ email: req.body.email });
        const token = user.generateAuthToken();

        console.log("User login: ", user);
    
        res.cookie('token', token, {
            sameSite: 'none',
            path: '/',
            expires: new Date(Date.now() + 30000),httpOnly: true,
            secure: true
		    });

        res.cookie('username', `${user.firstName} ${user.lastName}`, {
          sameSite: 'none',
          path: '/',
          expires: new Date(Date.now() + 30000),httpOnly: true,
          httpOnly: true,
          secure: true
        });

        res.cookie('email', user.email, {
          sameSite: 'none',
          path: '/',
          expires: new Date(Date.now() + 30000),httpOnly: true,
          httpOnly: true,
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
