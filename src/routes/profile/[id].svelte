<script lang="ts">
  import AwardCollapse from '$lib/components/awards/AwardCollapse.svelte'
  import ProgressCard from '$lib/components/progressCard/ProgressBar.svelte'
  import Verified from '$lib/components/Verified.svelte'
  import ContentCollapse from '$lib/components/ContentCollapse.svelte'
  import { authUser } from '$lib/stores'
  import { getPrincipleMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { formatDate } from '$lib/utils/stringFormating'
  import { getPrincipleList, Principle, Roles } from '$lib/utils/stringTypes'
  import { getPrincipleMasterIcon, getWCAGMasterIcon } from '$lib/utils/levelIcon'
  import { page } from '$app/stores'

  export let user
  export let criteria
  export let sortedCriteria
  const principleList: Principle[] = getPrincipleList()
  let wcagMasterLevel = getWCAGMasterLevel(criteria)

  async function deleteTestSolutions() {
    try {
      const res = await fetch(`${$page.url.origin}/api/user/testUser`, {
        method: 'POST',
      })
    } catch (error) {
      console.log('An error occured when submitting your exercise solution', error)
    }
  }
</script>

<!-- Create course button -->
{#if $authUser.id === user.id && ($authUser?.role === Roles.Creator || $authUser?.role === Roles.Admin)}
  <div class="flex flex-row justify-center gap-4">
    <div class="flex justify-center pb-4">
      <a
        class="button-width btn btn-primary"
        role="button"
        sveltekit:prefetch
        href={`/create-course`}>Create course</a
      >
    </div>
    <button
      class="button-width btn btn-success"
      on:click={() => {
        deleteTestSolutions()
      }}
    >
      {'Delete Test Solutions'}</button
    >
  </div>
{/if}

<!-- Profile information section -->
<div class="flex flex-col justify-center items-center">
  <div class="">
    <ProgressCard {user} />
  </div>
  <div class="flex p-4">
    <div class="h-16 w-16">
      <img
        class="h-full w-auto mask mask-squircle -ml-1"
        src={user.avatarURL}
        alt={`Profile picture for the author: ${user.firstName} ${user.lastName}`}
      />
    </div>
    <div class="flex flex-col items-center pl-1">
      <h1 class="text-3xl">
        {`${user.firstName} ${user.lastName}`}
        <Verified role={user.role} />
      </h1>

      <p><i>Account created {formatDate(user.createdAt)}</i></p>
    </div>
  </div>
  <div class="flex flex-row gap-4 pt-2">
    <!-- Show all master level badges-->
    {#each principleList as principle, index}
      <!-- Show WCAG Master level in the middle-->
      {#if principleList.length / 2 === index}
        <div class="w-20 rounded-full">
          <img
            src={getWCAGMasterIcon(wcagMasterLevel)}
            alt={`Icon showing the WCAG Master level`}
          />
        </div>
      {/if}
      <div class="flex rounded-full w-16 items-center">
        <img
          src={getPrincipleMasterIcon(getPrincipleMasterLevel(criteria, principle), principle)}
          alt={`Icon showing the ${principle} Master level`}
        />
      </div>
    {/each}
  </div>
  <div class="divider" />
</div>

<ContentCollapse {user} type={'Personas'} />
<ContentCollapse {user} type={'Courses'} />

<!-- WCAG Master Collapse -->
<AwardCollapse {sortedCriteria} currentLevel={wcagMasterLevel} principle={null} />

<!-- All Principle Master Collapses -->
{#each principleList as principle}
  <AwardCollapse
    {sortedCriteria}
    currentLevel={getPrincipleMasterLevel(criteria, principle)}
    {principle}
  />
{/each}
