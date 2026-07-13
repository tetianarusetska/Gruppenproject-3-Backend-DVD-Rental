import { StaffNotFound } from "./staff.error.ts";
import staffRepo from "./staff.repo.ts"
import crypto from "crypto";
import { type StaffWithAddress } from "./types/staffWithAddress.ts"
import type { CreateStaff } from "./types/createStaff.ts";

async function getAllStaff(): Promise<StaffWithAddress[]> {
    return await staffRepo.getAll();
}

const getStaffById = async (staff_id: number): Promise<StaffWithAddress> => {
    const staff = await staffRepo.getById(staff_id);

    if (!staff) {
        throw new StaffNotFound(staff_id);
    }

    return staff;
}


const hashPassword = (password: string): string => {
    return crypto.createHash("sha1").update(password).digest("hex");
};

// mit KI-Hilfe
const createStaff = async (data: CreateStaff): Promise<StaffWithAddress> => {
    const hashedPassword = hashPassword(data.password);
    const staffId = await staffRepo.create({ ...data, password: hashedPassword });
    const staff = await staffRepo.getById(staffId);
    if (!staff) throw new StaffNotFound(staffId);
    return staff;
};

export default {
    getAll: getAllStaff,
    getById: getStaffById,
    create: createStaff
}