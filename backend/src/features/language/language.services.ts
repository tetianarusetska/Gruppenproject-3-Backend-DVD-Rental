import { LanguageNotFound } from "./language.error.ts";
import languageRepo from "./language.repo.ts";
import type { Language } from "./types/language.ts";

const findLanguage = async (id: number): Promise<Language> => {
    const language = await languageRepo.find(id)

    if (!language) {
        throw new LanguageNotFound(id)
    }

    return language
}

const findAllLanguage = async (): Promise<Language[]> => {
    return await languageRepo.findAll()
}

export default {
    find: findLanguage,
    findAll: findAllLanguage
}