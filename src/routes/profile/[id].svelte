<script lang="ts">
  // your script goes here
  import ProgressCard from '$lib/components/progressCard/ProgressBar.svelte'
  import { authUser } from '$lib/stores'
  import { getNextMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { getMasterColor, getWCAGMasterIcon } from '$lib/utils/levelIcon'
  import { getPrincipleList, Principle, Roles } from '$lib/utils/stringTypes'

  export let user
  export let criteria
  export let sortedCriteria
  let wcagMasterLevel = getWCAGMasterLevel(criteria)
  const nextWCAGMasterLevel = getNextMasterLevel(wcagMasterLevel)

  let visible = false

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

<!-- WCAG Master Collapse -->
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
  <!-- Header -->
  <input type="checkbox" checked />
  <div class="flex collapse-title bg-primary p-2 pl-4">
    <div class="w-14 rounded-full">
      <img
        src={getWCAGMasterIcon(wcagMasterLevel)}
        alt="Icon showing the profiency of WCAG skills"
      />
    </div>
    <h1 class="flex items-center text-2xl font-medium pl-3">WCAG Master</h1>
  </div>
  <!-- Content -->
  <div class="collapse-content">
    <div class="flex justify-center items-center">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            src={getWCAGMasterIcon(wcagMasterLevel)}
            alt="Icon showing the profiency of WCAG skills"
          />
        </div>
      </div>
      <div class="meter top-[25%] h-10 w-80 border-solid border-2 border-black">
        <span class="" style:width="{80}%" style:background={getMasterColor(wcagMasterLevel)} />
        <p
          class="left-50% absolute top-[0px] w-full text-center text-2xl font-extrabold leading-10"
        >
          processText
        </p>
      </div>
    </div>

    {#each getPrincipleList() as principle}
      <div class="divider" />
      <h2 class="pb-6 text-xl">{principle} criteria</h2>
      <div class="flex flex-wrap gap-6">
        {#each getPrincipleCriteria(principle) as criterion}
          <div
            class="w-50 card flex w-[12.5%] flex-col items-center gap-2 p-2 outline outline-slate-300"
            style:background-color={criterion.principle.color}
            style:opacity={criterion.solves < nextWCAGMasterLevel ? 0.5 : 1}
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
            <p class="text-xl text-[#0B0A26]">{criterion.solves} / {nextWCAGMasterLevel}</p>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<!-- <div class="w-30">
  <ProgressCardModal {user} />
</div> -->
<style>
  .meter {
    box-sizing: content-box;
    /* height: 20px; Can be anything */
    position: relative;
    /* margin: 60px 0 20px 0; Just for demo spacing */
    background: rgb(206, 206, 206);
    /* border-radius: 25px; */
    /* border-top-right-radius: 8px; */
    /* border-bottom-right-radius: 8px; */
    /* border-top-left-radius: 8px; */
    /* border-bottom-left-radius: 8px; */
    /* padding: 10px; */
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }

  .meter > span {
    display: block;
    height: 100%;
    /* border-top-left-radius: 8px; */
    /* border-bottom-left-radius: 8px; */
    /* border-top-left-radius: 20px; */
    /* border-bottom-left-radius: 20px; */
    background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
  }
</style>
