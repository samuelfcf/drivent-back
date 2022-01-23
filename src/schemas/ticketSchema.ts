import joi from "joi";

export default joi.object({
  value: joi.string().required(),
  isPaid: joi.boolean().required(),
  enrollmentId: joi.number().integer().required(),
  ticketTypeId: joi.number().integer().required(),
  hasHotel: joi.boolean().required(),
});
