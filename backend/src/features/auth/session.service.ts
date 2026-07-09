import { SessionMissing } from "./auth.error.ts"
import { type Session, type SessionId } from "./types/Session.ts"
import { randomUUID } from "node:crypto"

const sessions = new Map<SessionId, Session>()

const deleteSession = (id: SessionId) => {
    const wasDeleted = sessions.delete(id)
    if (!wasDeleted) throw new SessionMissing()
}

const createSession = (username: string): SessionId => {
    const sessionId = randomUUID()
    const session: Session = {
        id: sessionId,
        username,
        createdAt: new Date()
    }

    sessions.set(sessionId, session)
    return sessionId
}

const findSession = (id: SessionId): Session => {
    const session = sessions.get(id)
    if (!session) throw new SessionMissing()
    return session
}

export default {
    delete: deleteSession,
    create: createSession,
    find: findSession
}