import {Router} from 'express'

import {
  getLinha,
  getLinhaid,
  postLinha,
  putLinhaid,
} from '../controllers/linha_onibusControllers.js'

const router = Router()

router.get("/", getLinha)
router.get("/:id", getLinhaid)
router.post("/criar", postLinha)
router.put("/editar/:id", putLinhaid)

export default router