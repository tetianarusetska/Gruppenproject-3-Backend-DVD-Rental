import { type Response, type NextFunction } from "express"
import { type Request } from "./types/Request.ts"
import sessionService from "./session.service.ts"
import { CredentialsInvalid, SessionMissing } from "./auth.error.ts"

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
    const { sessionId } = req.cookies

    req.session = sessionService.find(sessionId)

    return next()
}

export const authErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CredentialsInvalid || error instanceof SessionMissing) {
        return res.status(401).json({ error: error.message })
    }

    next(error)
}