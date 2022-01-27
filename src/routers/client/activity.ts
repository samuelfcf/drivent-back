import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/locals", controller.getActivitiesLocals);

export default router;
