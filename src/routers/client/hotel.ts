import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.get);
router.get("/:hotelId/rooms", controller.getRooms);
router.post("/:roomId", controller.saveBooking);
router.get("/booking", controller.getBooking);
export default router;
