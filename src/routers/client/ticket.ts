import { Router } from "express";

import * as controller from "@/controllers/client/tickets";

const router = Router();

router.get("/:enrollmentId", controller.getTicketInfo);

export default router;
