<script lang="ts">
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import confetti from 'canvas-confetti'
  import { sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'

  interface userXP {
    level: number
    nextLevelXP: number
    progressXP: number
    totalXP: number
  }

  export let userXP: userXP

  // destructuring props
  let { level, nextLevelXP, progressXP, totalXP } = userXP
  let barPercentage = (progressXP / nextLevelXP) * 100 // * 100 to get percentage instead of decimal number
  let remainingXPToNextLevel = nextLevelXP - progressXP

  // Animation variables
  const progress = tweened(1, {
    duration: 2000,
    easing: sineOut,
  })

  const barXP = tweened(1, {
    duration: 2000,
    easing: sineOut,
  })

  const remainingXP = tweened(1, {
    duration: 2000,
    easing: sineOut,
  })

  progress.set(barPercentage)
  barXP.set(progressXP)
  remainingXP.set(remainingXPToNextLevel)
</script>

<div class="flex h-20 flex-col">
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
      <p class="left-50% absolute top-[1px] w-full text-center text-2xl font-extrabold leading-10">
        {$barXP.toFixed(0)}
      </p>
      <!-- <p
      class="xp left-50% absolute top-[7px] w-full text-center text-2xl font-extrabold leading-10"
      style:--currXP={initialBarXP}
      style:--newXP={afterBarXP}
    /> -->
    </div>
    <!-- Remaining XP to level up -->
    <div
      class="flex flex-col items-center justify-center rounded-xl border-2 border-solid p-4"
      style:background-color={getLevelColor(level + 1)}
      style:border-color={getLevelBorderColor(level + 1)}
    >
      <div class="stat-desc opacity-100">XP to level up</div>
      <div class="text-4xl font-extrabold">
        {$remainingXP.toFixed(0)}
      </div>
    </div>
  </div>
</div>

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
</style>
