import express from 'express'
import {
    verifyTokenWithAdmin,
    verifyToken,
    checkToken
  } from "../controllers/verifyToken.js";
import { userController} from '../controllers/userController.js'

const router = express.Router()

router.delete('/:id',verifyTokenWithAdmin,userController.deleteUser)

router.put('/edit/:id',userController.update)
router.get('/role/:role',userController.getWithRole)
router.get('/profile',userController.getProfile)
router.get('/:id',userController.getOneUser)
router.get('/',userController.getAllUser)

export default router