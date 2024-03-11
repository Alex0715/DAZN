import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import setResponse from "../response/response.helper";

export class ValidationHelper {
  addMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body = req.body;
      let transSchema = Joi.object({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        streamLink: Joi.string().required(),
        rating: Joi.number().required(),
      });
      const { error } = transSchema.validate(body);
      if (error) throw new Error(error.details[0].message);

      return next();
    } catch (error: any) {
      return setResponse.error(res, 400, {
        message: error.message,
        error: true,
      });
    }
  };

  updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body = req.body;
      let transSchema = Joi.object({
        name: Joi.string().required(),
        genre: Joi.string().required(),
        streamLink: Joi.string().required(),
        rating: Joi.number().required(),
      });
      const { error } = transSchema.validate(body);
      if (error) throw new Error(error.details[0].message);

      return next();
    } catch (error: any) {
      return setResponse.error(res, 400, {
        message: error.message,
        error: true,
      });
    }
  };
}

export default new ValidationHelper();
