import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import citiesService from "./cities.service.ts"

const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const cities = await citiesService.getAll();
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllCities
}