<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { getLevelBorderColor, getLevelColor, getLevelIcon } from '$lib/utils/levelIcon'
  import { onDestroy, onMount } from 'svelte'
  import { sineOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let user
  let compliment = compliments[Math.floor(Math.random() * compliments.length)]
  let { nextLevelXP, progressXP, level } = user.userXP
  let progressAfterCompletedExercise = progressXP
  let progerssPercentage = (progressAfterCompletedExercise / nextLevelXP) * 100 // * 100 to get percentage instead of decimal number
  let visible = false

  // We wait until the items is visible to animate it, so they are not execute already when the component is mounted

  const progress = tweened(1, {
    duration: 2000,
    easing: sineOut,
  })

  progress.set(progerssPercentage)
  console.log('user: ', user)
</script>

<div class="flex h-20">
  <div class="avatar z-10">
    <div class="w-20 rounded-full">
      <img src={getLevelIcon(level)} alt={'Level icon showing you are level ' + level} />
    </div>
  </div>

  <div class="meter top-[25%] -ml-2 h-10 w-80">
    <span style:width="{$progress}%" />
    <p
      class="xp left-50% absolute top-[7px] w-full text-center text-2xl font-extrabold leading-10"
      style:--currXP={progressXP}
      style:--newXP={progressAfterCompletedExercise}
    />
  </div>

  <div
    class="flex flex-col items-center justify-center rounded-xl border-2 border-solid p-4"
    style:background-color={getLevelColor(level + 1)}
    style:border-color={getLevelBorderColor(level + 1)}
  >
    <div class="text-4xl font-extrabold">{nextLevelXP}</div>
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
