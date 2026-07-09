export class CredentialsInvalid extends Error {
    constructor() {
        super("The provide credentials were incorrect.")
        this.name = new.target.name
    }
}

export class SessionMissing extends Error {
    constructor() {
        super("You are not signed in.")
        this.name = new.target.name
    }
}