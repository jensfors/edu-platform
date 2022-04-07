<script lang="ts">
  import type { Course, Persona, WCAGPrinciple, WCAGCriteria } from '@prisma/client'
  import { page } from '$app/stores'
  import { getCourseIcon } from '$lib/utils/courseIcon'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]

  let personaTexts: { id: string; text: string }[] = []

  personas.forEach((persona) => {
    personaTexts.push({ id: persona.id, text: persona.description })
  })

  function getPersonaText(persona: Persona) {
    return personaTexts.find((x) => x.id === persona.id).text
  }

  function toggleReadMore(persona: Persona) {
    let p = personaTexts.find((x) => x.id === persona.id)
    if (p.text === persona.description) {
      personaTexts.find((x) => x.id === persona.id).text = persona.description.substring(0, 200)
    } else {
      personaTexts.find((x) => x.id === persona.id).text = persona.description
    }
  }
</script>

<!--
  <button>
    <a href={`${$page.url.pathname}/create-exercise`}> Create exercise motherfucker </a>
  </button>
-->

<!-- Showing the course information -->

<div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px]">
  <div class="flex w-full bg-primary">
    <h1 class="text-2xl pl-4 py-4 text-white">{course.title}</h1>
  </div>
  <div class="pl-4 flex flex-row">
    {#each principles as principle}
      <div class="pr-2 pt-2">
        <span title={principle.description} class="badge badge-ghost badge-lg bg-[#8AEFFF]">
          <img
            class="h-5 w-5"
            src={getCourseIcon([principle])}
            alt="The icon of {principle.name}"
          />
          {principle.name}
        </span>
      </div>
    {/each}
  </div>
  <div class="pl-4 pt-1 pr-4 pb-4">
    <p>{course.description}</p>
  </div>
</div>

{#if personas.length > 0}
  <div class="pt-8">
    <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px]">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-4 py-4 text-white">
          Persona{personas.length > 1 ? 's' : ''}
        </h1>
      </div>
      <div class="p-4 flex flex-row card-body items-center">
        {#each personas as persona}
          <div class="p-2">
            <!--
            <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[400px]">
              <div class="flex w-full bg-primary">
                <h2 class="text-2xl pl-4 py-4 text-white">
                  {persona.name}
                </h2>
              </div>
              <div class="p-4">#3B25A)</div>
            </div>
          -->
            <div
              class="card card-side bg-base-100 shadow-xl items-center max-w-[400px] min-w-[300px]"
            >
              <figure class="max-w-[120px] max-h-[120px]">
                <img src={persona.avatarUrl} alt="{persona.name}'s avatar" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">{persona.name} ({persona.age})</h2>
                <p>{getPersonaText(persona)}...</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary" on:click={() => toggleReadMore(persona)}
                    >More</button
                  >
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
