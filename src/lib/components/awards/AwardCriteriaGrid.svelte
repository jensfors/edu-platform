<script lang="ts">
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import type { WCAGCriteria } from '@prisma/client'

  export let criteria: WCAGCriteria[]
  export let nextLevel: number
</script>

{#each criteria as criterion}
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
    <span class="-mb-2 pt-1 text-xs text-[#0B0A26]">Completed</span>
    <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextLevel}</p>
  </div>
{/each}
