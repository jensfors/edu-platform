<script lang="ts">
  import { authUser } from '$lib/stores'
  import { page } from '$app/stores'

  let title: string = ''
  let description: string = ''
  let isSaved: boolean = false
  let saveButtonClicked = false
  let message: string = ''

  async function onSave() {
    const res = await fetch(`${$page.url.pathname}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: $authUser.id,
        title,
        description,
      }),
    })
    isSaved = res.status === 200
    message = isSaved ? 'Course has been saved' : 'There was an error saving the course'
  }
</script>

<div class="mx-auto block max-w-xl w-full">
  <div class="flex w-full justify-center pb-10">
    <h1 class="text-3xl">Create course</h1>
  </div>

  <div class="px-10 justify-center">
    <!-- Enter title -->
    <div class="form-control w-full pb-10">
      <label class="label" for="Enter the title of your course?">
        <span class="label-text">Enter the title of your course</span>
      </label>
      <input
        class="input input-bordered w-full"
        type="text"
        placeholder="Enter the title here"
        bind:value={title}
      />
    </div>

    <!-- Enter description -->
    <div class="form-control w-full pb-10">
      <label class="label" for="Enter the description of your course?">
        <span class="label-text">Enter the description of your course</span>
      </label>
      <textarea placeholder="Enter the description here" bind:value={description} />
    </div>
  </div>

  <!-- Button -->
  <div class="flex justify-center">
    <!-- If the course has been saved => redirect -->
    {#if isSaved}
      <!-- TODO: Needs to be changed to go to the course when we can get the data from POST requests-->
      <a class="button-width btn btn-primary" role="button" sveltekit:prefetch href={`/`}
        >Go to course</a
      >
      <!-- If not saved show save button-->
    {:else}
      <button
        class="button-width btn btn-primary"
        disabled={title === '' || description === ''}
        on:click={() => {
          onSave()
          saveButtonClicked = true
        }}>Save</button
      >{/if}
  </div>
  <!-- Alert when saving -->
  {#if saveButtonClicked && message !== ''}
    <div class="flex pb-8">
      <div class="justify-center alert {isSaved ? 'alert-success' : 'alert-danger'}" role="alert">
        {message}
      </div>
    </div>
  {/if}
</div>

<style>
  textarea {
    width: 100%;
    height: 400px;
  }
</style>
