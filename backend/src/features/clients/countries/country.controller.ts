import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import countryService from "./country.service.ts"

const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const country = await countryService.getAll();
        res.status(200).json(country);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllCountries
}