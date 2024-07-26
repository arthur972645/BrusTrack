import {Router} from 'express'

import {
  getMotorista,
  getMotoristaid,
  postMotorista,
  deleteMotorista,
} from '../controllers/motoristaControllers.js'

const router = Router()

router.get("/", getMotorista)
router.get("/:id", getMotoristaid)
router.post("/criar", postMotorista)
router.put("/delete/:id",  deleteMotorista)

export default router