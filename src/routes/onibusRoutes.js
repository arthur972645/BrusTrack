import {Router} from 'express'

import {
  getOnibus,
  getOnibuid,
  postOnibus,
} from '../controllers/onibusControllers.js'

const router = Router()

router.get("/", getOnibus)
router.get("/:id", getOnibuid)
router.post("/criar", postOnibus)

export default router