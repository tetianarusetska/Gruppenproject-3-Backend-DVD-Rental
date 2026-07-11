import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import countryService from "./country.service.ts"

const getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const country = await countryService.getAll();
        res.status(200).json(country);
    } catch (err) {
        next(err);
    }
};

const getCountryById = async (req: Request<{ country_id: number }>, res: Response, next: NextFunction) => {
    try {
        const countryId = Number(req.params.country_id);
        const country = await countryService.getById(countryId);
        res.status(200).json(country);
    } catch (err) {
        next(err);
    }
}

export default {
  getAll: getAllCountries,
  getById: getCountryById
}