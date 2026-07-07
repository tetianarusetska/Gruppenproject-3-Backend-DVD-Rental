import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import addressesService from "./addresses.service.ts"

const getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const addresses = await addressesService.getAll();
        res.status(200).json(addresses);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllAddresses
}