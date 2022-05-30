<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import CodeCell from '$lib/components/editor/CodeCell.svelte'
  import ModalBoxWcag from '$lib/components/ModalBoxWcag.svelte'
  import Tiptap from '$lib/components/Tiptap.svelte'
  import { authUser } from '$lib/stores'
  import { ExerciseType } from '$lib/utils/stringTypes'
  import type { Course,Persona,WCAGCriteria,WCAGPrinciple } from '@prisma/client'

  export let course: Course
  export let personas: Persona[]
  export let criteria: WCAGCriteria[]

  let codeExercise: string
  let codeSolution: string
  let disablePublish = true
  let exerciseContent
  let exerciseQuestion: string
  let exerciseTitle: string
  let exerciseType: string
  let initialCodeExercise = `<h1>Hello world</h1>`
  let initialCodeSolution = `let testVar123= "Should be the value from codecell"`
  let operableWcagSelections: WCAGCriteria[] = []
  let perceivableWcagSelections: WCAGCriteria[] = []
  let personaSelected: Persona = null
  let robustWcagSelections: WCAGCriteria[] = []
  let understandableWcagSelections: WCAGCriteria[] = []
  let userId

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

  if ($authUser) {
    userId = $authUser.id
    $page.url.searchParams.set('userId', userId)
    goto(`?${$page.url.searchParams.toString()}`)
  }

  function getPerceivableCriteria() {
    let perceivableCriteria: WCAGCriteria[] = []
    criteria.forEach((criteria) => {
      // @ts-ignore
      if (criteria.principle.name === 'Perceivable') {
        perceivableCriteria.push(criteria)
      }
    })
    return perceivableCriteria
  }

  function getOperableCriteria() {
    let operableCriteria: WCAGCriteria[] = []
    criteria.forEach((criteria) => {
      // @ts-ignore
      if (criteria.principle.name === 'Operable') {
        operableCriteria.push(criteria)
      }
    })
    return operableCriteria
  }

  function getUnderstandableCriteria() {
    let understandableCriteria: WCAGCriteria[] = []
    criteria.forEach((criteria) => {
      // @ts-ignore
      if (criteria.principle.name === 'Understandable') {
        understandableCriteria.push(criteria)
      }
    })
    return understandableCriteria
  }

  function getRobustCriteria() {
    let robustCriteria: WCAGCriteria[] = []
    criteria.forEach((criteria) => {
      // @ts-ignore
      if (criteria.principle.name === 'Robust') {
        robustCriteria.push(criteria)
      }
    })
    return robustCriteria
  }

  async function onSave() {
    const res = await fetch(`${$page.url.pathname}`, {
      method: 'POST',
      body: JSON.stringify({
        codeExercise,
        codeSolution,
        course,
        exerciseContent,
        exerciseQuestion,
        exerciseTitle,
        exerciseType,
        operableWcagSelections,
        perceivableWcagSelections,
        personaSelected,
        robustWcagSelections,
        understandableWcagSelections,
        userId,
      }),
    })
  }

  function onPublish() {
    // Write the stuff here to make post request that publish exercise
    console.log('CodeExercise: ', codeExercise)
    console.log('CodeSolution: ', codeSolution)
    console.log('Trying to publish a book here... Sign up for my newsletter ')
  }
</script>

<div class="mx-auto block max-w-2xl">
  <div class="flex w-full justify-center pb-10">
    <h1 class="text-3xl">Create exercise</h1>
  </div>
  <div>
    <!--  Select persona  -->
    <div class="pb-4">
      <label class="label" for="Select persona">
        <span class="label-text">Persona selected</span>
      </label>
      <label for="my-modal-4" class="modal-button btn btn-outline"
        >{personaSelected ? personaSelected.name : 'Select persona'}</label
      >

      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal">
        <label for="my-modal-4" class="modal-box relative max-h-[500px] w-11/12 max-w-5xl">
          <!-- <label for="my-modal-4" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label> -->
          <div class="p-4">
            <h3 class="pb-2 text-lg font-bold">Select a persona</h3>
            <div class="flex w-full flex-wrap rounded-lg border p-4">
              <div class="flex w-1/2 flex-col">
                {#each personas as persona}
                  <div class="form-control">
                    <label class="label cursor-pointer justify-start gap-4">
                      <input
                        type="radio"
                        bind:group={personaSelected}
                        value={persona}
                        class="radio"
                      />
                      <span class="label-text">{persona.name}</span>
                    </label>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </label>
      </label>
    </div>

    <label class="label" for="Select persona">
      <span class="label-text">Criteria selected</span>
    </label>
    <!-- WCAG Criteria -->
    <label for="my-modal-3" class="modal-button btn btn-outline">Select WCAG criteria</label>

    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <label for="my-modal-3" class="modal">
      <label class="modal-box relative max-h-[500px] w-11/12 max-w-5xl" for="">
        <!-- <label for="my-modal-3" class="btn btn-circle btn-sm absolute right-2 top-2">✕</label> -->
        <ModalBoxWcag
          criterias={getPerceivableCriteria()}
          bind:selections={perceivableWcagSelections}
        />
        <ModalBoxWcag criterias={getOperableCriteria()} bind:selections={operableWcagSelections} />
        <ModalBoxWcag
          criterias={getUnderstandableCriteria()}
          bind:selections={understandableWcagSelections}
        />
        <ModalBoxWcag criterias={getRobustCriteria()} bind:selections={robustWcagSelections} />
      </label>
    </label>
    {#if [...operableWcagSelections, ...perceivableWcagSelections, ...understandableWcagSelections, ...robustWcagSelections].length > 0}
      <ul class="pt-2">
        {#each perceivableWcagSelections as wcag}
          <li class="">
            <label class="label cursor-pointer justify-start gap-4 pt-0 pb-1">
              <input
                type="checkbox"
                bind:group={perceivableWcagSelections}
                value={wcag}
                class="checkbox checkbox-xs"
              />
              <span class="label-text">{wcag.number}</span>
              <span class="label-text">{wcag.conformance}</span>
              <span class="label-text">{wcag.name}</span>
            </label>
          </li>
        {/each}
        {#each operableWcagSelections as wcag}
          <li>
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  bind:group={operableWcagSelections}
                  value={wcag}
                  class="checkbox checkbox-xs"
                />
                <span class="label-text">{wcag.number}</span>
                <span class="label-text">{wcag.conformance}</span>
                <span class="label-text">{wcag.name}</span>
              </label>
            </div>
          </li>
        {/each}
        {#each understandableWcagSelections as wcag}
          <li>
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  bind:group={understandableWcagSelections}
                  value={wcag}
                  class="checkbox checkbox-xs"
                />
                <span class="label-text">{wcag.number}</span>
                <span class="label-text">{wcag.conformance}</span>
                <span class="label-text">{wcag.name}</span>
              </label>
            </div>
          </li>
        {/each}
        {#each robustWcagSelections as wcag}
          <li>
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  bind:group={robustWcagSelections}
                  value={wcag}
                  class="checkbox checkbox-xs"
                />
                <span class="label-text">{wcag.number}</span>
                <span class="label-text">{wcag.conformance}</span>
                <span class="label-text">{wcag.name}</span>
              </label>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="form-control w-full max-w-xs pb-10 pt-4">
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
    <Tiptap bind:content={exerciseContent} />
  </div>

  <!-- Select type of exercise -->
  <div class="pb-4 pt-8">
    <div class="w-80">
      <div class="label">
        <label class="label-text" for="Exercise options">Select type of exercise</label>
      </div>
      {#each Object.entries(ExerciseType) as [key, value]}
        <div class="form-control flex-row">
          <label class="label cursor-pointer pr-2">
            <input class="radio" type="radio" bind:group={exerciseType} {value} checked />
            <span class="label-text pl-2">{value}</span>
          </label>
        </div>
      {/each}
    </div>
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
    <!-- <CodeCell initialValue={initialCodeExercise} bind:inputCode={codeExercise} /> -->
    <CodeCell initialHtml={initialCodeExercise} bind:inputHtml={codeExercise} />
    <h2 class="pb-8 pt-16  pl-2">Add your solution to the coding exercise in the editor below</h2>
    <!-- <CodeCell initialValue={initialCodeSolution} bind:inputCode={codeSolution} /> -->
    <CodeCell initialHtml={initialCodeExercise} bind:inputHtml={codeSolution} />
  </div>
{/if}
<!-- The save and publish buttons -->
<div class="flex justify-center gap-8 pt-14">
  <button class="btn" disabled={disableSave} on:click={onSave}>Save</button>
  <button class="btn btn-secondary" disabled={disablePublish} on:click={onPublish}>Publish</button>
</div>

<style>
  .custom-checkbox > input {
    height: 25px;
    width: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 1px solid #34495e;
    border-radius: 4px;
    outline: none;
    transition-duration: 0.3s;
    background-color: #41b883;
    cursor: pointer;
  }

  .custom-checkbox > input:checked {
    border: 1px solid #41b883;
    background-color: #34495e;
  }

  .custom-checkbox > input:active {
    border: 2px solid #34495e;
  }
</style>
