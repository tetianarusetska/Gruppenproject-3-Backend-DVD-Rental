import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import cityService from "./city.service.ts"

const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const cities = await cityService.getAll();
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllCities
}