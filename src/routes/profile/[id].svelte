<script lang="ts">
  // your script goes here
  import AwardCollapse from '$lib/components/awards/AwardCollapse.svelte'
  import ProgressCard from '$lib/components/progressCard/ProgressBar.svelte'
  import { authUser } from '$lib/stores'
  import {
    getNextMasterLevel,
    getPrincipleMasterLevel,
    getWCAGMasterLevel,
  } from '$lib/utils/awards'
  import { getPrincipleList, Principle, Roles } from '$lib/utils/stringTypes'

  export let user
  export let criteria
  export let sortedCriteria
  let wcagMasterLevel = getWCAGMasterLevel(criteria)
</script>

<!-- Create course button -->
{#if $authUser.id === user.id && ($authUser?.role === Roles.Creator || $authUser?.role === Roles.Admin)}
  <div class="flex justify-center pb-8">
    <a class="button-width btn btn-primary" role="button" sveltekit:prefetch href={`/create-course`}
      >Create course</a
    >
  </div>
{/if}

<div class="flex justify-center">
  <ProgressCard {user} />
</div>
<div class="divider" />

<AwardCollapse {sortedCriteria} currentLevel={wcagMasterLevel} principle={null} />

{#each getPrincipleList() as principle}
  <AwardCollapse
    {sortedCriteria}
    currentLevel={getPrincipleMasterLevel(criteria, principle)}
    {principle}
  />
{/each}
