<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { fadeScale } from '$lib/utils/customAnimations'
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import { getDifficultyXP } from '$lib/utils/levels'
  import type { Difficulty, Principle } from '$lib/utils/stringTypes'
  import { onDestroy, onMount } from 'svelte'
  import { cubicIn, sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade, fly } from 'svelte/transition'
  import ProgressBar from './Progressbar.svelte'

  interface userXP {
    afterXP: {
      level: number
      nextLevelXP: number
      progressXP: number
    }
    beforeXP: {
      level: number
      nextLevelXP: number
      progressXP: number
    }
  }

  const COMPLIMENT = compliments[Math.floor(Math.random() * compliments.length)]

  export let exerciseDifficulty: Difficulty
  export let userXP: userXP
  let xpGained: number = getDifficultyXP(exerciseDifficulty)

  function scrollIntoView() {
    console.log('Scroll baby girl')
    // const el = document.querySelector(target.getAttribute('label'))
    const el = document.getElementById('solution')
    if (!el) return
    el.scrollIntoView({
      behavior: 'smooth',
    })
  }

  // UI States
  let visible = false
  let showXPGained = true
  let showProgressBar = false
</script>

<!-- The button to open modal -->
<!-- <label for="xp-modal" class="modal-button btn" on:click={() => (visible = true)}>open modal</label> -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="xp-modal" class="modal-toggle" />
<label for="xp-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="py-4 text-center text-2xl font-bold">Congratulations, {COMPLIMENT}</h3>
    {#if true}
      <!-- XP gained -->
      {#if showXPGained}
        <div class="flex justify-center">
          <h1
            class="absolute text-6xl"
            in:fadeScale={{
              delay: 0,
              duration: 1500,
              easing: cubicIn,
              baseScale: 0.5,
            }}
            on:introend={() => {
              showXPGained = !showXPGained
              showProgressBar = !showProgressBar
            }}
            out:fly={{ y: -250, duration: 3000 }}
          >
            +{xpGained} xp
          </h1>
        </div>
      {/if}
      <!-- Progress and level bar -->
      <div class="flex h-20 flex-col">
        {#if showProgressBar}
          <ProgressBar {userXP} />
        {/if}
      </div>
    {/if}
  </label>
</label>
