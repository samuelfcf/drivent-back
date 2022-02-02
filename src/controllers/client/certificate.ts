import { Request, Response } from "express";

import * as certificateService from "@/services/client/certificate";

export async function getCertificateData(req: Request, res: Response) {
  const certificateData = await certificateService.getCertificateData(req.user.id);

  return res.status(200).send(certificateData);
}
