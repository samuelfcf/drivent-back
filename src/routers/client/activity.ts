import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/", controller.getActivities);
router.get("/locals", controller.getActivitiesLocals);
router.post("/sign-up/:activityId", controller.signUpToActivity);
router.post("/sign-out/:activityId", controller.signOutFromActivity);

export default router;
