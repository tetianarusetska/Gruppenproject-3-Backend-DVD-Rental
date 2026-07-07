import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import countriesService from "./countries.service.ts"

const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const countries = await countriesService.getAll();
        res.status(200).json(countries);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllCountries
}