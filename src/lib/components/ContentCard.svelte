<script lang="ts">
  import { goto } from '$app/navigation'

  import { getCourseIcon, getPrinciples } from '$lib/utils/courseIcon'

  import type { Course, Exercise, Persona } from '@prisma/client'
  export let data: Course[] | Persona[] | Exercise[]
  let type: string = ''

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
</script>

<!-- TODO: Make for Personas and exercises -->
{#if type === 'Courses'}
  <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px] w-full">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">{type}</h1>
    </div>
    <div class="flex flex-wrap">
      {#each data as course}
        <div class="p-2">
          <figure class="flex flex-col w-36 p-2">
            <!-- Finds the correct course image -->
            <div class="flex h-28 w-28">
              <img
                class="rounded-2xl"
                style="cursor: pointer"
                src={getCourseIcon(getPrinciples(course))}
                on:click={() => goto(`/course/${course.id}`)}
                alt={`The course: ${course.title}`}
              />
            </div>

            <!-- <p class="absolute top-3/4 text-white text-xl font-bold">{course.title}</p> -->
            <a style="text-align:center" sveltekit:prefetch href={`/course/${course.id}`}
              >{course.title}</a
            >
          </figure>
          <!-- <h2 class="text-1xl pl-8 py-4 text-black">{course.title}</h2> -->
        </div>
      {/each}
    </div>
  </div>
{/if}
