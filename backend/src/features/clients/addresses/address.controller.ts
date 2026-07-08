import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import addressService from "./address.service.ts"


const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdAddress = await addressService.create(req.body);

    return res.status(201).json(createdAddress);

  } catch (err) {
    next(err);
  }
};


const getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = await addressService.getAll();
    res.status(200).json(address);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll: getAllAddresses,
  create: createAddress
}