<script lang="ts">
  // your script goes here
  import Card from '$lib/components/progressCard/Card.svelte'
  import { getNextMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { getWCAGMasterIcon } from '$lib/utils/levelIcon'

  export let user
  export let criteria
  const level = getWCAGMasterLevel(criteria) // just use the level from the user, when we have made a default for level 0.. until then we +1
  const nextLevel = getNextMasterLevel(level)

  console.log('uauauau')
  console.log(criteria[0])
</script>

<!-- markup (zero or more items) goes here -->

<h1>WCAG Master</h1>
<div class="avatar">
  <div class="w-24 rounded-full">
    <img src={getWCAGMasterIcon(level + 1)} alt="Icon showing the profiency of WCAG skills" />
  </div>
</div>

<!-- DER ER 78 kriterier -->
<div class="flex flex-wrap gap-6">
  {#each criteria as criterion}
    <div
      class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
      style:background-color={criterion.principle.color}
    >
      <div class="flex">
        <img
          class="mr-1 h-7 w-7"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        <span class="text-xl text-[#0B0A26]">{criterion.number}</span>
      </div>
      <!-- <span
        title={criterion.principle.description}
        class="badge badge-lg badge-ghost p-4 text-xl"
        style:background-color={criterion.principle.color}
      >
        <img
          class="mr-1 h-5 w-5"
          src={getCourseIcon([criterion.principle])}
          alt="The icon of {criterion.principle.name}"
        />
        {criterion.number}
      </span> -->
      <span class="-mb-2 text-xs text-[#0B0A26]">Completed:</span>
      <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
    </div>
  {/each}
</div>

<div class="divider" />
<div class="w-30">
  <Card />
</div>
