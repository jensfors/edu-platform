<script lang="ts">
  import type { Course, Exercise } from '@prisma/client'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import CodeCell from '$lib/components/editor/CodeCell.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  export let exercise: Exercise
  export let course: Course

  let showSolution: boolean = false
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

  let currentExIndex = getExerciseIndex()
  let nextExIndex = currentExIndex + 1
  let prevExIndex = currentExIndex - 1

  // @ts-ignore
  let prevExercise: Exercise = course.exercises[isFirstExercise() ? currentExIndex : prevExIndex]
  // @ts-ignore
  let nextExercise: Exercise = course.exercises[isLastExercise() ? currentExIndex : nextExIndex]
</script>

<div class="flex justify-center">
  <h1>{exercise.title}</h1>
</div>

<div
  class="tooltip tooltip-bottom [--tooltip-text-color:black] [--tooltip-color:#fefefe]"
  data-tip={persona.description}
>
  <div class="flex p-1 justify-center items-center">
    <div class="h-16 w-16">
      <img
        class="h-full w-auto mask mask-squircle -ml-1"
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
<div class="pl-8 flex flex-row justify-center">
  {#each criteria as criterion}
    <div class="pr-2 pt-2">
      <span
        title={criterion.criteria.principle.description}
        class="badge badge-ghost badge-lg"
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

<div class="divider pt-14 pb-7">Exercise</div>

<p class="pb-6 text-xl font-semibold">{exerciseQuestion}</p>
<CodeCell initialHtml={codeExercise} />

<div class="flex justify-center gap-20 py-16">
  {#if isFirstExercise()}
    <a
      class="btn btn-primary button-width"
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
    class="btn btn-success button-width"
    disabled={showSolution}
    on:click={() => (showSolution = true)}
  >
    {showSolution ? 'Answer submitted' : 'Submit answer'}</button
  >
  <div>
    {#if isLastExercise()}
      <a
        class="btn btn-primary button-width"
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
