<script lang="ts">
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import confetti from 'canvas-confetti'
  import { sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'

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
  export let userXP: userXP

  // destructuring props
  let {
    level: beforeLevel,
    nextLevelXP: beforeTotalXP,
    progressXP: beforeProgressXP,
  } = userXP.beforeXP
  let { level: afterLevel, nextLevelXP: afterTotalXP, progressXP: afterProgressXP } = userXP.afterXP

  let initialBarXP = beforeProgressXP
  let afterBarXP = afterProgressXP
  let barPercentage = (afterProgressXP / afterTotalXP) * 100 // * 100 to get percentage instead of decimal number
  let remainingXPToNextLevel = afterTotalXP - afterProgressXP

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

  console.log('yaya 123 ', beforeTotalXP, beforeProgressXP, beforeLevel)
  console.log('userXP: ', userXP)
  console.log('Remaining ', remainingXPToNextLevel)

  console.log('before: ', beforeTotalXP)
  console.log('after: ', afterTotalXP)
  console.log('barPercentage: ', barPercentage)

  animate()

  function animate() {
    const maxPercentage = 100
    // Re-animate if they level up
    if (afterLevel > beforeLevel) {
      // PAAAAAARTY - they leveled up for gods sake!
      confetti({
        particleCount: 250,
        spread: 100,
        disableForReducedMotion: true,
      })

      // Animate remaining of current lvl xp
      progress.set(maxPercentage)
      barXP.set(beforeTotalXP)
      remainingXP.set(beforeTotalXP)

      // timeout to wait until the first animation is done
      setTimeout(() => {
        // Reset state
        progress.set(0, { duration: 0 })
        barXP.set(0, { duration: 0 })
        remainingXP.set(0, { duration: 0 })
        // Animate with new values
        console.log('Getting here or what?: ', barPercentage)
        progress.set(barPercentage)
        barXP.set(afterProgressXP)
        remainingXP.set(remainingXPToNextLevel)
      }, 2000)
    } else {
      console.log('barPercentage123: ', barPercentage)
      progress.set(barPercentage)
      console.log('remainingXP123: ', remainingXPToNextLevel)
      remainingXP.set(remainingXPToNextLevel)
      console.log('afterProgressXP123: ', afterProgressXP)
      barXP.set(afterProgressXP)
    }
  }
</script>

<div class="flex h-full w-full" in:fade>
<!-- Level Icon -->
<div class="avatar z-10">
  <div class="w-20 rounded-full">
    <img src={getLevelIcon(beforeLevel)} alt={'Level icon showing you are level ' + beforeLevel}
      />
</div>
</div>
<!-- Progress Bar -->
<div class="meter top-[25%] -ml-2 h-10 w-80">
      <span style:width="{$progress}%" />
      <p class="left-50% absolute top-[1px] w-full text-center text-2xl font-extrabold leading-10">
      {$barXP.toFixed(0)}
      </p>
      <!-- <p class="xp left-50% absolute top-[7px] w-full text-center text-2xl font-extrabold leading-10" style:--currXP={initialBarXP} style:--newXP={afterBarXP}
    /> -->
    </div>
    <!-- Remaining XP to level up -->
    <div class="flex flex-col items-center justify-center rounded-xl border-2 border-solid p-4" style:background-color={getLevelColor(beforeLevel + 1)} style:border-color={getLevelBorderColor(beforeLevel + 1)}
  >
<div class="stat-desc opacity-100">XP to level up</div>
    <div class="text-4xl font-extrabold">
      {$remainingXP.toFixed(0)}
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
