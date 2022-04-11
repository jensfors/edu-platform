<script lang="ts">
  import type { Course, Persona, WCAGPrinciple, WCAGCriteria, User } from '@prisma/client'
  import { page } from '$app/stores'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { goto } from '$app/navigation'
  import ContentCard from '$lib/components/ContentCard.svelte'
  import { authUser } from '$lib/stores'
  import Author from '$lib/components/Author.svelte'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]

  // For displaying a short version of the persona text
  let personaTexts = []
  let personaButton = []
  const personaTextChars: number = 200

  personas.forEach((persona) => {
    personaTexts[persona.id] = persona.description.substring(0, personaTextChars)
    personaButton[persona.id] = 'Expand'
  })

  let authors: User[] = []

  course.authors.forEach((author) => {
    authors.push(author.user)
  })

  function userIsAuthor(): boolean {
    if ($authUser) {
      return course.authors.some((user) => user.userId === 'someid1') // TODO: change to $authUser.id
    }
    return false
  }

  // TODO: Use for inviting other content creators
  function userIsMainAuthor(): boolean {
    if ($authUser) {
      return course.authors.some((user) => user.userId === 'someid1' && user.mainAuthor === true) // TODO: change to $authUser.id
    }
    return false
  }

  // Changes the amount of displayed text for personas
  function toggleReadMore(persona: Persona) {
    if (personaTexts[persona.id] === persona.description) {
      personaTexts[persona.id] = persona.description.substring(0, personaTextChars)
      personaButton[persona.id] = 'Expand'
    } else {
      personaTexts[persona.id] = persona.description
      personaButton[persona.id] = 'Collapse'
    }
  }

  function displayPersonaButton(persona: Persona): boolean {
    return !(persona.description === persona.description.substring(0, personaTextChars))
  }
</script>

{#if userIsAuthor()}
  <button>
    <a href={`${$page.url.pathname}/create-exercise`}> Create exercise motherfucker </a>
  </button>
{/if}

<!-- Showing the course information -->
<div class="flex justify-center">
  <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px]">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">{course.title}</h1>
    </div>
    <div class="pl-8 flex flex-row">
      {#each principles as principle}
        <div class="pr-2 pt-2">
          <span
            title={principle.description}
            class="badge badge-ghost badge-lg"
            style:background-color={principle.color}
          >
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
    <div class="pl-8 pt-1 pr-8 pb-4">
      <p>{course.description}</p>
      <div class="flex justify-center">
        <Author {authors} />
      </div>
    </div>
  </div>
</div>
<!-- Persona card -->
{#if personas.length > 0}
  <div class="pt-8 flex justify-center">
    <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px] w-full">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">
          Persona{personas.length > 1 ? 's' : ''}
        </h1>
      </div>
      <div class="p-4 flex flex-row flex-wrap card-body justify-center">
        {#each personas as persona}
          <div class="p-2">
            <div
              class="card card-side bg-base-100 shadow-xl items-center max-w-[400px] min-w-[300px]"
            >
              <figure class="max-w-[120px] max-h-[120px]">
                <img
                  style="cursor: pointer"
                  src={persona.avatarUrl}
                  alt="{persona.name}'s avatar"
                  on:click={() => goto(`/persona/${persona.id}`)}
                />
              </figure>
              <div class="card-body max-w-[280px]">
                <h2 class="card-title">
                  <a sveltekit:prefetch href={`/persona/${persona.id}`}>
                    {persona.name} ({persona.age})
                  </a>
                  {#if persona.official}
                    <span title="This is an official persona" class="badge badge-md badge-secondary"
                      >OFFICIAL</span
                    >
                  {/if}
                </h2>
                <p>{personaTexts[persona.id]}</p>
                <div class="card-actions justify-end">
                  {#if displayPersonaButton(persona)}
                    <button class="btn btn-primary" on:click={() => toggleReadMore(persona)}
                      >{personaButton[persona.id]}</button
                    >
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<div class="pt-8 flex justify-center">
  <ContentCard data={course.exercises} />
</div>
