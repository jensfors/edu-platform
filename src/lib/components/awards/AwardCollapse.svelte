<script lang="ts">
  import { getMasterProgress, getNextMasterLevel } from '$lib/utils/awards'

  import { getMasterColor, getPrincipleMasterIcon, getWCAGMasterIcon } from '$lib/utils/levelIcon'
  import { getPrincipleList, Principle } from '$lib/utils/stringTypes'
  import type { WCAGCriteria } from '@prisma/client'
  import AwardCriteriaGrid from './AwardCriteriaGrid.svelte'

  export let currentLevel: number
  export let principle: Principle
  export let sortedCriteria: {
    perceivable: WCAGCriteria[]
    operable: WCAGCriteria[]
    understandable: WCAGCriteria[]
    robust: WCAGCriteria[]
  }
  let nextLevel: number = getNextMasterLevel(currentLevel)
  // Returns the criteria for a principle
  function getPrincipleCriteria(principle: Principle) {
    switch (principle) {
      case Principle.Perceivable:
        return sortedCriteria.perceivable
      case Principle.Operable:
        return sortedCriteria.operable
      case Principle.Understandable:
        return sortedCriteria.understandable
      case Principle.Robust:
        return sortedCriteria.robust
    }
  }

  const progress: { progress: number; total: number } = getProgress()
  const progressPercentage: number = Math.round((progress.progress / progress.total) * 100)

  function getProgress() {
    let progress: { progress: number; total: number }
    if (principle) {
      progress = getMasterProgress(currentLevel, getPrincipleCriteria(principle))
    } else {
      let allCriteria: WCAGCriteria[] = [].concat(
        sortedCriteria.perceivable,
        sortedCriteria.operable,
        sortedCriteria.understandable,
        sortedCriteria.robust
      )
      progress = getMasterProgress(currentLevel, allCriteria)
    }
    return progress
  }
</script>

<!-- Master Level Collapse -->
<div class="pb-6">
  <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <!-- Header -->
    <input type="checkbox" checked={!principle} />
    <div class="flex collapse-title bg-primary p-2 pl-4">
      <div class="w-14 rounded-full">
        <img
          src={principle
            ? getPrincipleMasterIcon(currentLevel, principle)
            : getWCAGMasterIcon(currentLevel)}
          alt={`Icon showing the ${principle ? principle : 'WCAG'} Master level`}
        />
      </div>
      <h1 class="flex items-center text-2xl font-medium pl-3 text-white">
        {principle ? `${principle} Master` : 'WCAG Master'}
      </h1>
    </div>
    <!-- Content -->
    <div class="collapse-content">
      <div class="flex justify-center items-center pt-6">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img
              src={principle
                ? getPrincipleMasterIcon(currentLevel, principle)
                : getWCAGMasterIcon(currentLevel)}
              alt={`Icon showing the ${principle ? principle : 'WCAG'} Master level`}
            />
          </div>
        </div>
        <!-- Progress bar showing how many criteria is needed -->
        <div class="pl-4">
          <div class="meter top-[25%] h-10 w-80 border-solid border-2 border-black">
            <span style:width="{progressPercentage}%" />
            <p
              class="left-50% absolute top-[0px] w-full text-center text-2xl font-extrabold leading-10"
            >
              {`${progress.progress} / ${progress.total}`}
            </p>
          </div>
        </div>
      </div>

      <!-- If its for Principle Master -->
      {#if principle}
        <div class="divider" />
        <div class="flex flex-wrap gap-6 justify-center">
          <AwardCriteriaGrid criteria={getPrincipleCriteria(principle)} {nextLevel} />
        </div>
        <!-- If its for WCAG Master-->
      {:else}
        {#each getPrincipleList() as principle}
          <div class="divider" />
          <h2 class="pb-6 text-2xl text-center">{principle} criteria</h2>
          <div class="flex flex-wrap gap-6 pb-2 justify-center">
            <AwardCriteriaGrid criteria={getPrincipleCriteria(principle)} {nextLevel} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .meter {
    box-sizing: content-box;
    position: relative;
    background: rgb(206, 206, 206);
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }

  .meter > span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: rgb(43, 194, 83);
    background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
  }
</style>
