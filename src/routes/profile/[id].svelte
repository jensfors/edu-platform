<script lang="ts">
  import AwardCollapse from '$lib/components/awards/AwardCollapse.svelte'
  import ProgressCard from '$lib/components/progressCard/ProgressBar.svelte'
  import Verified from '$lib/components/Verified.svelte'
  import ContentCollapse from '$lib/components/ContentCollapse.svelte'
  import { authUser } from '$lib/stores'
  import { getPrincipleMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { formatDate } from '$lib/utils/stringFormating'
  import { getPrincipleList, Roles } from '$lib/utils/stringTypes'

  export let user
  export let criteria
  export let sortedCriteria
  let wcagMasterLevel = getWCAGMasterLevel(criteria)
  console.log(user)
</script>

<!-- Create course button -->
{#if $authUser.id === user.id && ($authUser?.role === Roles.Creator || $authUser?.role === Roles.Admin)}
  <div class="flex justify-center pb-4">
    <a class="button-width btn btn-primary" role="button" sveltekit:prefetch href={`/create-course`}
      >Create course</a
    >
  </div>
{/if}

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
  <div class="divider" />
</div>

<ContentCollapse {user} type={'Personas'} />
<ContentCollapse {user} type={'Courses'} />

<!-- WCAG Master Collapse -->
<AwardCollapse {sortedCriteria} currentLevel={wcagMasterLevel} principle={null} />

<!-- All Principle Master Collapses -->
{#each getPrincipleList() as principle}
  <AwardCollapse
    {sortedCriteria}
    currentLevel={getPrincipleMasterLevel(criteria, principle)}
    {principle}
  />
{/each}
