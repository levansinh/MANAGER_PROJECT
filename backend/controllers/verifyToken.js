import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  jwt.verify(token, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json("token khong fdung");
    }
      req.userId = user._id;
      next();
  });
};
const verifyTokenWithAdmin = (req, res, next) => {
  const token = req.cookies.accessToken
  jwt.verify(token, process.env.JSONWEBTOKEN_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json("token khong fdung");
    }
    if (user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: "ban khong du quyen" });
    }
  });
};

const checkToken = (req,res,next) => {
  const token = req.cookies.accessToken
  if(token) {
    next()
  }else{
    res.status(403).json({message:"You had Logined"})
  }
}

export { verifyToken, verifyTokenWithAdmin,checkToken };

