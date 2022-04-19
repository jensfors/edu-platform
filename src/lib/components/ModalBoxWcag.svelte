<script lang="ts">
  import type { WCAGCriteria } from '@prisma/client'

  export let criterias: WCAGCriteria[]
  export let selections: WCAGCriteria[]
  // @ts-ignore
  let titleNumber = criterias[0].principle.number
  // @ts-ignore
  let titleName = criterias[0].principle.name
</script>

<div class="p-4">
  <h3 class="text-lg font-bold pb-2">{titleNumber}. {titleName}</h3>
  <div class="border rounded-lg p-4 flex flex-wrap w-full">
    <div class="flex flex-col w-1/2">
      {#each criterias as criterion, i}
        {#if i < criterias.length / 2}
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                bind:group={selections}
                value={criterion}
                class="checkbox checkbox-xs"
              />
              <span class="label-text">{criterion.number}</span>
              <span class="label-text">{criterion.conformance}</span>
              <span class="label-text">{criterion.name}</span>
            </label>
          </div>
        {/if}
      {/each}
    </div>
    <div class="flex flex-col w-1/2">
      {#each criterias as criterion, i}
        {#if i > criterias.length / 2}
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                bind:group={selections}
                value={criterion}
                class="checkbox checkbox-xs"
              />
              <span class="label-text">{criterion.number}</span>
              <span class="label-text">{criterion.conformance}</span>
              <span class="label-text">{criterion.name}</span>
            </label>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  /* your styles go here */
</style>
