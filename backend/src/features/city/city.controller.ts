import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import cityService from "./city.service.ts"

const getAllCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const cities = await cityService.getAll();
        res.status(200).json(cities);
    } catch (err) {
        next(err);
    }
};

const getCityById = async (req: Request<{ city_id: string }>, res: Response, next: NextFunction) => {
    try {
        const cityId = Number(req.params.city_id);

        if (isNaN(cityId)) {
            return res.status(400).json({ error: "Ungültige Stadt-ID angegeben." });
        }

        const city = await cityService.getById(cityId);
        res.status(200).json(city);
    } catch (err) {
        next(err);
    }
}

export default {
  getAll: getAllCities,
  getById: getCityById
}