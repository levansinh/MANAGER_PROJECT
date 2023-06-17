import express from 'express'
import {
    verifyTokenWithAdmin,
  } from "../controllers/verifyToken.js";
import { projectController } from '../controllers/projectController.js'

const router = express.Router()

router.delete('/:id',verifyTokenWithAdmin,projectController.delete)
router.put('/edit/:id',verifyTokenWithAdmin,projectController.update)
router.post('/',verifyTokenWithAdmin,projectController.create)

router.get('/:id',projectController.getOne)
router.get('/',projectController.getAll)

export default router