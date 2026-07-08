import { ActorNotFound } from "./actor.error.ts";
import actorRepo from "./actor.repo.ts";
import type { Actor } from "./types/actor.ts";

const findActor = async (id: number): Promise<Actor> => {
    const actor = await actorRepo.find(id)

    if (!actor) {
        throw new ActorNotFound(id)
    }

    return actor
}

const findAllActors = async (): Promise<Actor[]> => {
    return await actorRepo.findAll()
}

export default {
    find: findActor,
    findAll: findAllActors
}