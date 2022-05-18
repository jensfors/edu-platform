<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { fadeScale } from '$lib/utils/customAnimations'
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import { cubicIn, sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade, fly } from 'svelte/transition'

  export let user
  export let xpGained: number

  let compliment = compliments[Math.floor(Math.random() * compliments.length)]
  let { nextLevelXP, progressXP, level } = user.userXP
  let remainingXPToNextLevel = nextLevelXP - progressXP
  let progressAfterCompletedExercise = nextLevelXP
  let progerssPercentage = (progressXP / nextLevelXP) * 100 // * 100 to get percentage instead of decimal number

  // UI States
  let visible = false
  let showXPGained = true
  let showProgressBar = false

  // We wait until the items is visible to animate it, so they are not execute already when the component is mounted
  $: if (showProgressBar) {
    progress.set(progerssPercentage)
  }

  const progress = tweened(1, {
    duration: 2000,
    easing: sineOut,
  })

  console.log('user: ', user)
</script>

<!-- The button to open modal -->
<label for="xp-modal" class="modal-button btn" on:click={() => (visible = true)}>open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="xp-modal" class="modal-toggle" />
<label for="xp-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-center text-lg font-bold">Congratulations, {compliment}</h3>
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
      <div class="flex h-20">
        {#if showProgressBar}
          <div class="flex h-full w-full" in:fade>
            <!-- Level Icon -->
            <div class="avatar z-10">
              <div class="w-20 rounded-full">
                <img src={getLevelIcon(level)} alt={'Level icon showing you are level ' + level} />
              </div>
            </div>
            <!-- Progress Bar -->
            <div class="meter top-[25%] -ml-2 h-10 w-80">
              <span style:width="{$progress}%" />
              <p
                class="xp left-50% absolute top-[7px] w-full text-center text-2xl font-extrabold leading-10"
                style:--currXP={progressXP}
                style:--newXP={progressAfterCompletedExercise}
              />
            </div>
            <!-- Remaining XP to level up -->
            <div
              class="flex flex-col items-center justify-center rounded-xl border-2 border-solid p-4"
              style:background-color={getLevelColor(level + 1)}
              style:border-color={getLevelBorderColor(level + 1)}
            >
              <div class="stat-desc opacity-100">XP to level up</div>
              <div class="text-4xl font-extrabold">
                {remainingXPToNextLevel}
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </label>
</label>

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
  .meter::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 10px;
    left: -10px;
    /* border-top-right-radius: 8px; */
    /* border-bottom-right-radius: 8px; */
    /* border-top-left-radius: 8px; */
    /* border-bottom-left-radius: 8px; */
    /* border-top-left-radius: 20px; */
    /* border-bottom-left-radius: 20px; */
    background-color: rgb(43, 194, 83);
    background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
  }
  /* .meter::after {
    content: '';
    position: absolute;
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  } */

  .meter > span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    /* border-top-left-radius: 8px; */
    /* border-bottom-left-radius: 8px; */
    /* border-top-left-radius: 20px; */
    /* border-bottom-left-radius: 20px; */
    background-color: rgb(43, 194, 83);
    background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
  }

  .yaya {
    font: 800 40px system-ui;
  }

  @property --num {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }

  .xp {
    animation: counter 3s normal ease-in-out forwards;
    counter-reset: num var(--num);
    font: 800 24px system-ui;
    /* padding: 2rem; */
  }
  .xp::after {
    content: counter(num);
  }

  @keyframes counter {
    from {
      --num: var(--currXP);
    }
    to {
      --num: var(--newXP);
    }
  }
</style>
