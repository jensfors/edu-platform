<script lang="ts">
  import type { Exercise } from '@prisma/client'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import CodeCell from '$lib/components/CodeCell.svelte'
  export let exercise: Exercise

  let showSolution = false
  // @ts-ignore
  let criteria = exercise.criteria
  // @ts-ignore
  let codeExercise = exercise.assignments[0].answers[0].text
  // @ts-ignore
  let codeSolution = exercise.assignments[0].answers[1].text

  console.log('execise: ', exercise)
  console.log('execise: ', exercise.assignments)
  console.log('Coderino: ', exercise.assignments[0].answers[0].text)
  // console.log('criteria: ', criteria)
</script>

<div class="flex justify-center">
  <h1>{exercise.title}</h1>
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

<CodeCell initialValue={codeExercise} />

<div class="flex justify-center gap-20 py-16">
  <button class="btn btn-primary">Previous exercise</button>
  <button class="btn btn-success" disabled={showSolution} on:click={() => (showSolution = true)}>
    {showSolution ? 'Answer submitted' : 'Submit answer'}</button
  >
  <button class="btn btn-primary">Next exercise</button>
</div>

{#if showSolution}
  <CodeCell initialValue={codeSolution} />
{/if}
