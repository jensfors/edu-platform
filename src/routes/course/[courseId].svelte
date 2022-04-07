<script lang="ts">
  import type { Course, Persona, WCAGPrinciple, WCAGCriteria } from '@prisma/client'
  import { page } from '$app/stores'
  import { getCourseIcon } from '$lib/utils/courseIcon'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]

  personas.forEach((persona) => {
    personas.push(persona)
  })

  personas.forEach((persona) => {
    personas.push(persona)
  })

  personas.forEach((persona) => {
    personas.push(persona)
  })
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
      <div class="p-4 flex flex-row">
        {#each personas as persona}
          <div class="p-4">
            <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[500px]">
              <div class="flex w-full bg-primary">
                <h2 class="text-2xl pl-4 py-4 text-white">
                  {persona.name}
                </h2>
              </div>
              <div class="p-4">fff</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
