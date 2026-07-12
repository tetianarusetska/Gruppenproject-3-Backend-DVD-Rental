import type { Response, NextFunction } from "express";
import type { Request } from "../customer/types/request.ts";
import staffService from "./staff.service.ts"

const getAllStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const staff = await staffService.getAll();
        res.status(200).json(staff);
    } catch (err) {
        next(err);
    }
};

const getStaffById = async (req: Request<{ staff_id: string }>, res: Response, next: NextFunction) => {
    try {
        const staffId = Number(req.params.staff_id);

        if (isNaN(staffId)) {
            return res.status(400).json({ error: "Ungültige Staff-ID angegeben." });
        }

        const staff = await staffService.getById(staffId);
        res.status(200).json(staff);
    } catch (err) {
        next(err);
    }
}

const createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdStaff = await staffService.create(req.body);

        return res.status(201).json(createdStaff);

    } catch (err) {
        next(err);
    }
};

export default {
    getAll: getAllStaff,
    getById: getStaffById,
    create: createStaff
}