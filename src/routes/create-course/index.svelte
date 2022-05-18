<script lang="ts">
  import { page } from '$app/stores'
  import { authUser } from '$lib/stores'
  import type { Course } from '@prisma/client'

  let title: string = ''
  let description: string = ''
  let saveButtonClicked = false
  let message: string = ''
  let course: Course

  async function onSave() {
    const res = await fetch(`${$page.url.origin}/api/course/create`, {
      method: 'POST',
      body: JSON.stringify({
        userId: $authUser.id,
        title,
        description,
      }),
    })
    let data = await res.json()
    course = data.course
    message = data.message
  }
</script>

<div class="mx-auto block w-full max-w-xl">
  <div class="flex w-full justify-center pb-10">
    <h1 class="text-3xl">Create course</h1>
  </div>

  <div class="justify-center px-10">
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
    {#if course}
      <a
        class="button-width btn btn-primary"
        role="button"
        sveltekit:prefetch
        href={`/course/${course?.id}`}>Go to course</a
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
      <div class="alert justify-center {course ? 'alert-success' : 'alert-danger'}" role="alert">
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
