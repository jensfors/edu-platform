<script lang="ts">
  import { goto } from '$app/navigation'

  import { getCourseIcon, getPrinciples } from '$lib/utils/courseIcon'

  import type { Course, Exercise, Persona } from '@prisma/client'
  export let data: Course[] | Persona[] | Exercise[]
  let type: string = ''
  if (type) {
    console.log('nou')
  }

  if (data && data.length > 0) {
    if (data[0].hasOwnProperty('title')) {
      if (data[0].hasOwnProperty('description')) {
        type = 'Courses'
        getPrinciples(data[0])
      } else {
        type = 'Exercises'
      }
    } else if (data[0].hasOwnProperty('name')) {
      type = 'Persona'
    }
  }

  function getTitle(): string {
    let title = ''
    return title
  }
</script>

{#if type === 'Courses'}
  <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">{type}</h1>
    </div>
    <div class="flex py-8 pr-8">
      {#each data as course}
        <div>
          <figure class="flex flex-col pl-8">
            <!-- Finds the correct course image -->
            <div>
              <img
                class="rounded-2xl"
                src={getCourseIcon(getPrinciples(course))}
                on:click={() => goto(`/course/${course.id}`)}
                alt={`The course: ${course.title}`}
              />
            </div>

            <!-- <p class="absolute top-3/4 text-white text-xl font-bold">{course.title}</p> -->
            <a sveltekit:prefetch href={`/course/${course.id}`}>{course.title}</a>
          </figure>
          <!-- <h2 class="text-1xl pl-8 py-4 text-black">{course.title}</h2> -->
        </div>
      {/each}
    </div>
  </div>
{/if}
