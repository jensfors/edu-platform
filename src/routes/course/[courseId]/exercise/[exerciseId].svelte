<script lang="ts">
  import { page } from '$app/stores'
  import CodeCell from '$lib/components/editor/CodeCell.svelte'
  import ProgressCard from '$lib/components/progressCard/ProgressCard.svelte'
  import { authUser } from '$lib/stores'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import type { Course, Exercise } from '@prisma/client'

  export let exercise: Exercise
  export let course: Course

  //console.log('exer: ', exercise)
  //console.log('course: ', course)

  let showSolution: boolean = userHasSolvedExercise()
  showSolution = false // TODO: Remove when done
  // @ts-ignore
  let criteria = exercise.criteria
  // @ts-ignore
  let persona = exercise.persona
  // @ts-ignore
  let codeExercise = exercise.assignments[0].answers[0].text
  // @ts-ignore
  let codeSolution = exercise.assignments[0].answers[1].text
  // @ts-ignore
  let exerciseQuestion = exercise.assignments[0].question

  function userHasSolvedExercise(): boolean {
    let hasSolved: boolean = false
    // @ts-ignore
    if ($authUser && exercise.usersSolved) {
      // @ts-ignore
      exercise.usersSolved.forEach((usersSolved) => {
        if (usersSolved.userId === $authUser.id) {
          hasSolved = true
          return
        }
      })
    }
    return hasSolved
  }

  function isLastExercise(): boolean {
    // @ts-ignore
    return currentExIndex === course.exercises.length - 1
  }

  function isFirstExercise(): boolean {
    // @ts-ignore
    return currentExIndex === 0
  }

  function getExerciseIndex(): number {
    let index: number = 0
    // @ts-ignore
    for (let ex of course.exercises) {
      if (ex.id === exercise.id) {
        break
      }
      index++
    }
    return index
  }

  async function onSubmit() {
    const res = await fetch(`${$page.url.pathname}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: $authUser.id,
        exerciseId: exercise.id,
        difficulty: exercise.difficulty,
      }),
    })
    console.log('response: ', res)
  }

  function userIsAuthor(): boolean {
    let isAuthor: boolean = false
    // @ts-ignore
    if ($authUser && course.authors) {
      // @ts-ignore
      course.authors.forEach((author) => {
        if (author.userId === $authUser.id) {
          isAuthor = true
          return
        }
      })
    }
    return isAuthor
  }

  let currentExIndex = getExerciseIndex()
  let nextExIndex = currentExIndex + 1
  let prevExIndex = currentExIndex - 1

  // @ts-ignore
  let prevExercise: Exercise = course.exercises[isFirstExercise() ? currentExIndex : prevExIndex]
  // @ts-ignore
  let nextExercise: Exercise = course.exercises[isLastExercise() ? currentExIndex : nextExIndex]

  console.log('authUser', $authUser)
</script>

<div class="flex justify-center">
  <h1>{exercise.title}</h1>
</div>

<div
  class="tooltip tooltip-bottom [--tooltip-text-color:black] [--tooltip-color:#fefefe]"
  data-tip={persona.description}
>
  <div class="flex items-center justify-center p-1">
    <div class="h-16 w-16">
      <img
        class="mask mask-squircle -ml-1 h-full w-auto"
        src={persona.avatarUrl}
        alt={`Picture for the persona: ${persona.name}`}
      />
    </div>
    <div class="flex flex-col gap-1">
      <span>{persona.name} ({persona.age} years)</span>
      <span>Disability: {persona.disability}</span>
    </div>
  </div>
</div>
<div class="flex flex-row justify-center pl-8">
  {#each criteria as criterion}
    <div class="pr-2 pt-2">
      <span
        title={criterion.criteria.principle.description}
        class="badge badge-lg badge-ghost"
        style:background-color={criterion.criteria.principle.color}
      >
        <img
          class="h-5 w-5"
          src={getCourseIcon([criterion.criteria.principle])}
          alt="The icon of {criterion.criteria.principle.name}"
        />
        {criterion.criteria.number}
      </span>
    </div>
  {/each}
</div>
<div class="flex justify-center">
  <article class="prose prose-pre:text-white">
    {@html exercise.content}
  </article>
</div>

<!-- Exercise -->
<div class="divider pt-14 pb-7">Exercise</div>
<p class="pb-6 text-xl font-semibold">{exerciseQuestion}</p>
<CodeCell initialHtml={codeExercise} />

<!-- Navigation buttons -->
<div class="flex justify-center gap-20 py-16">
  {#if isFirstExercise()}
    <a
      class="button-width btn btn-primary"
      role="button"
      sveltekit:prefetch
      href={`/course/${course.id}`}>Go back to course</a
    >
  {:else}
    <a
      class="btn btn-primary button-width"
      role="button"
      sveltekit:reload
      href={`/course/${course.id}/exercise/${prevExercise.id}`}>Previous exercise</a
    >
  {/if}
  <button
    class="button-width btn btn-success"
    disabled={showSolution}
    on:click={() => {
      showSolution = true
      // TODO: Remove when done
      if (/* !userIsAuthor() && */ $authUser) {
        onSubmit()
      }
    }}
  >
    {showSolution ? 'Answer submitted' : 'Submit answer'}</button
  >
  <!-- <ProgressCard /> -->
  <div>
    {#if isLastExercise()}
      <a
        class="button-width btn btn-primary"
        role="button"
        sveltekit:prefetch
        href={`/course/${course.id}`}>Go back to course</a
      >
    {:else}
      <a
        class="btn btn-primary button-width"
        role="button"
        sveltekit:reload
        href={`/course/${course.id}/exercise/${nextExercise.id}`}>Next exercise</a
      >
    {/if}
  </div>
</div>

{#if showSolution}
  <CodeCell initialHtml={codeSolution} />
{/if}

<style>
  .button-width {
    min-width: 175px;
  }

  .tooltip::before {
    @apply border-2 border-dashed border-indigo-600;
  }
</style>
