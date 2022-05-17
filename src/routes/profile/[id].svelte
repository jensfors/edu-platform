<script lang="ts">
  // your script goes here
  import ProgressCard from '$lib/components/progressCard/ProgressBar.svelte'
  import ProgressCardModal from '$lib/components/progressCard/ProgressCardModal.svelte'
  import { getNextMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { getWCAGMasterIcon } from '$lib/utils/levelIcon'

  export let user
  export let criteria
  export let sortedWcag
  const level = getWCAGMasterLevel(criteria) // just use the level from the user, when we have made a default for level 0.. until then we +1
  const nextLevel = getNextMasterLevel(level)

  let visible = false
</script>

<div class="flex justify-center">
  <ProgressCard {user} />
</div>
<div class="divider" />
<h1>WCAG Master</h1>
<div class="avatar">
  <div class="w-24 rounded-full">
    <img src={getWCAGMasterIcon(level)} alt="Icon showing the profiency of WCAG skills" />
  </div>
</div>

<h1 class="pb-6 pt-14 text-3xl">Perceivable criteria</h1>
<div class="flex flex-wrap gap-6">
  {#each sortedWcag.perceivable as criterion}
    <div
      class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
      style:background-color={criterion.principle.color}
      style:opacity={criterion.solves < nextLevel ? 0.5 : 1}
    >
      <div class="flex">
        <img
          class="mr-1 h-10 w-10"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        <span class="pt-1 text-2xl text-[#0B0A26]">{criterion.number}</span>
      </div>
      <span class="-mb-2 pt-1 text-xs text-[#0B0A26]">Completed:</span>
      <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
    </div>
  {/each}
</div>

<h1 class="pb-6 pt-14 text-3xl">Operable criteria</h1>
<div class="flex flex-wrap gap-6">
  {#each sortedWcag.operable as criterion}
    <div
      class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
      style:background-color={criterion.principle.color}
      style:opacity={criterion.solves < nextLevel ? 0.5 : 1}
    >
      <div class="flex">
        <img
          class="mr-1 h-10 w-10"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        <span class="pt-1 text-2xl text-[#0B0A26]">{criterion.number}</span>
      </div>
      <span class="-mb-2 pt-1 text-xs text-[#0B0A26]">Completed:</span>
      <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
    </div>
  {/each}
</div>

<h1 class="pb-6 pt-14 text-3xl">Understandable criteria</h1>
<div class="flex flex-wrap gap-6">
  {#each sortedWcag.understandable as criterion}
    <div
      class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
      style:background-color={criterion.principle.color}
      style:opacity={criterion.solves < nextLevel ? 0.5 : 1}
    >
      <div class="flex">
        <img
          class="mr-1 h-10 w-10"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        <span class="pt-1 text-2xl text-[#0B0A26]">{criterion.number}</span>
      </div>
      <span class="-mb-2 pt-1 text-xs text-[#0B0A26]">Completed:</span>
      <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
    </div>
  {/each}
</div>

<h1 class="pb-6 pt-14 text-3xl">Robust criteria</h1>
<div class="flex flex-wrap gap-6">
  {#each sortedWcag.robust as criterion}
    <div
      class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
      style:background-color={criterion.principle.color}
      style:opacity={criterion.solves < nextLevel ? 0.5 : 1}
    >
      <div class="flex">
        <img
          class="mr-1 h-10 w-10"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        <span class="pt-1 text-2xl text-[#0B0A26]">{criterion.number}</span>
      </div>
      <span class="-mb-2 pt-1 text-xs text-[#0B0A26]">Completed:</span>
      <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
    </div>
  {/each}
</div>

<!-- <div class="w-30">
  <ProgressCardModal {user} />
</div> -->
