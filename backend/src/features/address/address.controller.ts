import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import addressService from "./address.service.ts"


const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdAddress = await addressService.create(req.body);

    return res.status(201).json(createdAddress);

  } catch (err) {
    next(err);
  }
};

const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedAddress = await addressService.update(req.body);

    return res.status(200).json(updatedAddress);

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

const getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const address_id = Number(req.params.address_id);

        const address = await addressService.getById(address_id);

        if (isNaN(address_id)) {
            return res.status(400).json({ error: "Ungültige Address-ID angegeben." });
        }

        res.json(address);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllAddresses,
  create: createAddress,
  update: updateAddress,
  getById: getAddressById
}