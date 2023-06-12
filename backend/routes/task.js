import express from 'express'
import { taskController } from '../controllers/taskController.js'

const router = express.Router()

router.delete('/:id',taskController.delete)
router.put('/edit/:id',taskController.update)
router.post('/',taskController.create)

router.get('/edit/:id',taskController.getOne)
router.get('/',taskController.getAll)

export default router