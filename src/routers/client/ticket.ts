import { Router } from "express";

import * as controller from "@/controllers/client/tickets";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.get("/user", controller.getTicketFromUser);
router.get("/", controller.getTicketsTypes);
router.post("/", schemaValidatingMiddleware(ticketSchema), controller.createTicket);

export default router;
