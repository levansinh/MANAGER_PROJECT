import express from 'express'

import { projectController } from '../controllers/projectController.js'

const router = express.Router()

router.delete('/:id',projectController.delete)
router.put('/edit/:id',projectController.update)
router.post('/',projectController.create)

router.get('/edit/:id',projectController.getOne)
router.get('/',projectController.getAll)

export default router