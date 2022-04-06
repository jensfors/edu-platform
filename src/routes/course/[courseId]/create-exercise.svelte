<script lang="ts">
  import type { Course, Persona, WCAGPrinciple } from '@prisma/client'
  import Tiptap from '$lib/components/Tiptap.svelte'
  import { ExerciseType } from '$lib/utils/stringTypes'
  import CodeCell from '$lib/components/CodeCell.svelte'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]
  export let criteria: WCAGCriteria[]

  let exerciseType: string
  let exerciseTitle: string
  let exerciseQuestion: string
  let codeExercise: string
  let codeSolution: string
  let initialCodeExercise = `let testVar123= "Should be the value from codecell"`
  let initialCodeSolution = `let testVar123= "Should be the value from codecell"`
  let disablePublish = true

  $: disableSave = exerciseTitle ? false : true

  $: if (
    exerciseType === 'Code' &&
    exerciseTitle &&
    exerciseQuestion &&
    codeExercise &&
    codeSolution
  ) {
    disablePublish = false
  } else {
    disablePublish = true
  }

  function onSave() {
    // Write the stuff here to make post request that saves exercise
    console.log('Trying to save the exercise homie')
  }

  function onPublish() {
    // Write the stuff here to make post request that publish exercise
    console.log('Trying to publish a book here... Sign up for my newsletter ')
  }
</script>

<div class="block mx-auto max-w-2xl">
  <div class="flex justify-center w-full pb-10">
    <h1 class="text-3xl">Create exercise</h1>
  </div>
  <div class="form-control w-full max-w-xs pb-4">
    <label for="Please select a persone for your exercise" class="label">
      <span class="label-text">Please select a persona for your exercise</span>
    </label>
    <select class="select select-bordered">
      <option disabled selected>Select a persona</option>
      {#each personas as persona}
        <option class="bg-red-500">{persona.name}</option>
      {/each}
    </select>
  </div>
  <div class="pb-4">
    <div class="w-80">
      <div class="label">
        <label class="label-text" for="Exercise options">Select type of exercise</label>
      </div>
      {#each Object.entries(ExerciseType) as [key, value]}
        <!-- <li>{key} - {value}</li> -->
        <div class="form-control flex-row">
          <label class="label cursor-pointer pr-2">
            <input class="radio" type="radio" bind:group={exerciseType} {value} checked />
            <span class="label-text pl-2">{value}</span>
          </label>
        </div>
      {/each}
    </div>
    <!-- <div class="label">
      <label class="label-text" for="Exercise options">Select type of exercise</label>
    </div>
    <div class="border rounded-lg w-80">
      <div class="form-control pl-2">
        <label class="label cursor-pointer pr-2">
          <span class="label-text">Coding</span>
          <input type="radio" name="radio-6" class="radio" checked />
        </label>
      </div>
      <div class="divider -my-2 p-0" />
      <div class="form-control pl-2">
        <label class="label cursor-pointer pr-2">
          <span class="label-text">Quiz</span>
          <input type="radio" name="radio-6" class="radio" checked />
        </label>
      </div>
    </div> -->
  </div>
  <div class="form-control w-full max-w-xs pb-10">
    <label class="label" for="What is the title of the exercise?">
      <span class="label-text">What is the title of the exercise?</span>
    </label>
    <input
      class="input input-bordered w-full max-w-xs"
      type="text"
      placeholder="Type here"
      bind:value={exerciseTitle}
    />
  </div>
  <div class="w-[655px]">
    <Tiptap />
  </div>
</div>

<!-- This shows if a "code" execise has been chosen -->
{#if exerciseType === 'Code'}
  <div class="divider py-10" />
  <div class="px-10">
    <div class="form-control w-full max-w-xs pb-10">
      <label class="label" for="What is the the exercise question?">
        <span class="label-text">What is the exercise question?</span>
      </label>
      <input
        class="input input-bordered w-full max-w-xs"
        type="text"
        placeholder="Type here"
        bind:value={exerciseQuestion}
      />
    </div>
    <h2 class="pb-8 pl-2">Add your coding exercise in the editor below</h2>
    <CodeCell initialValue={initialCodeExercise} bind:inputCode={codeExercise} />
    <h2 class="pb-8 pt-16  pl-2">Add your solution to the coding exercise in the editor below</h2>
    <CodeCell initialValue={initialCodeSolution} bind:inputCode={codeSolution} />
  </div>
{/if}
<!-- The save and publish buttons -->
<div class="flex justify-center pt-14 gap-8">
  <button class="btn" disabled={disableSave} on:click={onSave}>Save</button>
  <button class="btn btn-secondary" disabled={disablePublish} on:click={onPublish}>Publish</button>
</div>
