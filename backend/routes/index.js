import {
  verifyTokenWithAdmin,
  verifyToken,
  checkToken
} from "../controllers/verifyToken.js";
import user from "./user.js";
import project from "./project.js";
import task from "./task.js";
import auth from "./auth.js";

function router(app) {
  app.use("/user",verifyToken, user); // note check login Admin
  app.use("/project", verifyTokenWithAdmin, project);
  app.use("/task",verifyToken, task);
  app.use("/auth", auth);
}

export default router;
