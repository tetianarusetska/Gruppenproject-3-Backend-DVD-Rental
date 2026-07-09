import type { Response, NextFunction } from "express"
import type { Request } from "./types/Request.ts"
import authService from "./auth.service.ts"
import sessionService from "./session.service.ts"

interface LoginBody {
    username?: string
    password?: string
}

const login = async (req: Request<any, any, LoginBody>, res: Response, next: NextFunction) => {
    const { username, password } = req.body ?? {}

    if (!username || !password) {
        return res.status(400).json({ error: "Username or password not provided." })
    }

    await authService.assertCredentials(username, password)

    const sessionId = sessionService.create(username)

    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    return res.status(200).json({ message: "Login success" })
}

const logout = (req: Request, res: Response) => {
    const sessionId = req.session!.id
    sessionService.delete(sessionId);

    res.clearCookie("sessionId", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    return res.json({ message: "User signed out successfully!" })
}

const getSelf = (req: Request, res: Response) => {
    return res.json({
        username: req.session!.username,
        createdAt: req.session!.createdAt.toISOString()
    })
}

export default {
    login,
    logout,
    getSelf
}