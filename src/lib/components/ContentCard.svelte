<script lang="ts">
  import { goto } from '$app/navigation'
  import { authUser } from '$lib/stores'

  import { getCourseIcon, getPrinciples } from '$lib/utils/courseIcon'

  import type { Course, Exercise, Persona, UserSolvesExercise } from '@prisma/client'
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

  function userHasSolvedExercise(exercise: Exercise): boolean {
    if ($authUser) {
      return exercise.usersSolved.some((user) => user.userId === 'someid3') // TODO: change to $authUser.id
    }
    return false
  }
</script>

<!-- TODO: Make for Personas -->
{#if type === 'Courses'}
  <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px] w-full">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">{type}</h1>
    </div>
    <div class="flex flex-wrap p-4">
      {#each data as course}
        <div class="p-4">
          <div
            class="card w-96 bg-base-100 shadow-xl h-full max-w-[185px] max-h-[450px]"
            on:click={() => goto(`/course/${course.id}`)}
            style="cursor: pointer"
          >
            <figure class="px-3 pt-4">
              <div class="flex h-28 w-28">
                <img
                  class="rounded-2xl"
                  src={getCourseIcon(getPrinciples(course))}
                  alt={`The course: ${course.title}`}
                />
              </div>
            </figure>
            <div class="card-body items-center text-center p-2 pb-4">
              <h2 class="card-title text-base">
                {course.title}
              </h2>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

{#if type === 'Exercises'}
  <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[1120px] w-full">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">{type}</h1>
    </div>
    <div class="flex flex-wrap p-4">
      {#each data as exercise, index}
        <div class="p-4">
          <div
            class="card w-96 bg-base-100 shadow-xl h-full max-w-[185px] max-h-[450px]"
            on:click={() => goto(`/course/exercise/${exercise.id}`)}
            style="cursor: pointer"
          >
            <figure class="px-3 pt-4">
              <div class="flex h-28 w-28">
                <img
                  src={exercise.persona.avatarUrl}
                  alt="Avatar of {exercise.persona.name}"
                  class="rounded-xl"
                />
                {#if userHasSolvedExercise(exercise)}
                  <span style="color:green;font-size:40px;" title="Exercise solved">&#10003;</span>
                {/if}
              </div>
            </figure>
            <div class="card-body items-center text-center p-2 pb-4">
              <h2 class="card-title">
                Exercise {index + 1}
              </h2>
              <p>{exercise.title}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
