import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import ticketRouter from "@/routers/client/ticket";
import activityRouter from "@/routers/client/activity";
import certificateRouter from "@/routers/client/certificate";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/tickets", tokenValidationMiddleware, ticketRouter);
router.use("/activities", tokenValidationMiddleware, activityRouter);
router.use("/certificate", tokenValidationMiddleware, certificateRouter);

export default router;
