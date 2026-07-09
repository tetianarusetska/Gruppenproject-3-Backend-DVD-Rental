import { type Request as ExpressRequest } from "express"
import { type Session } from "./Session.ts"
import type core from "express-serve-static-core"

export interface Request<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    LocalsObj extends Record<string, any> = Record<string, any>
> extends ExpressRequest<P, ResBody, ReqBody, ReqQuery, LocalsObj> {
    session?: Session
}