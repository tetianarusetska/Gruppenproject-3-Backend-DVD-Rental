import crypto from "crypto";
import { CredentialsInvalid } from "./auth.error.ts"
import authRepo from "./auth.repo.ts";

const assertCredentials = async (username: string, password: string) => {
    const staff = await authRepo.login(username)
    
    if (!staff || !verifyPassword(password, staff.password)) {
        throw new CredentialsInvalid()
    }
}


const verifyPassword = (incomingPassword: string, dbHash: string): boolean => {
    const hashedIncoming = crypto
        .createHash("sha1")
        .update(incomingPassword)
        .digest("hex");

    return hashedIncoming.toLowerCase() === dbHash.toLowerCase();
};

export default {
    assertCredentials
}