import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import md5 from "md5";

export const authController = {
  TOKEN: process.env.JSONWEBTOKEN_TOKEN,
  //GET PROJECT
  registerUser: async (req, res, next) => {
    try {
      const tk = req.cookies.token;
      console.log(tk);
      const md5Password = md5(req.body.password);
      const newUser = await UserModel({
        username: req.body.username,
        password: md5Password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const TOKEN = process.env.JSONWEBTOKEN_TOKEN;
      const user = await UserModel.findOne({
        username: req.body.username,
        password: md5(req.body.password),
      });
      if (user) {
        const { password, ...others } = user._doc;
        let token = jwt.sign(
          {
            _id: user._id,
            isAdmin: user.role === 1 ? true : false,
          },
          TOKEN,
          { expiresIn: "2d" }
        );
        res.cookie('accessToken',token)
        res.status(200).json({
          message: "success",
          user: others,
          token: token,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logoutUser: async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("logout Successful");
  },
};
