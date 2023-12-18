require("dotenv").config();
const {User} = require("../../models/users_db");
const bcrypt = require("bcrypt");
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

      return res.status(200).send({message: "success"})
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
          // expires: new Date(Date.now() + 60 * 60 * 1000),
          expires: new Date(Date.now() + 30000),httpOnly: true,
          httpOnly: true,
          secure: true
        });

        res.cookie('email', user.email, {
          sameSite: 'none',
          path: '/',
          // expires: new Date(Date.now() + 60 * 60 * 1000),
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

        console.log(error);

        res.status(500).send({ 
          message: error
        });
      }
    };
    
    

    store = async (req, res, next)=>{
          
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      await new User({ ...req.body, password: hashPassword }).save();

      res.status(201).send({ message: "User created successfully" });
    }

}

module.exports = {
  
  auth_api : new api_AuthController,
}
