import {Router} from 'express'

import {
  getLinha,
  getLinhaid,
  postLinha,
  putLinhaid,
} from '../controllers/linha_onibusControllers.js'

const router = Router()

router.get("/", getLinha)
router.get("/:id_linha", getLinhaid)
router.post("/criar", postLinha)
router.put("/editar/:id_linha", putLinhaid)

export default router