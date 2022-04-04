import { getPersona } from "$lib/db/persona";
import type { Persona } from "@prisma/client";

export async function get({ params }) {
    const { personaId } = params
    let persona: Persona = null
    persona = await getPersona(personaId)
    if (persona) {
        console.log(persona)
    }

    return {
        body: {
            persona
        }
    };
}