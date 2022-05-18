<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { fadeScale } from '$lib/utils/customAnimations'
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import { cubicIn, sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade, fly } from 'svelte/transition'
  import Bar from './Bar.svelte'

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

  export let userXP: userXP
  let xpGained: number = userXP.afterXP.progressXP - userXP.beforeXP.progressXP

  // UI States
  let visible = false
  let showXPGained = true
  let showProgressBar = false
</script>

<!-- The button to open modal -->
<label for="xp-modal" class="modal-button btn" on:click={() => (visible = true)}>open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="xp-modal" class="modal-toggle" />
<label for="xp-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-center text-lg font-bold">Congratulations, {COMPLIMENT}</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use Wikipedia for free!
      Put a lot of cool stats in here Xp and stuff
    </p>
    {#if visible}
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
          <Bar {userXP} />
        {/if}
      </div>
    {/if}
  </label>
</label>
