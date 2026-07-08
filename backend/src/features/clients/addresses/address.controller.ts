import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import addressService from "./address.service.ts"

const getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const address = await addressService.getAll();
        res.status(200).json(address);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllAddresses
}