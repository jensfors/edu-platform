<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { onMount } from 'svelte'
  import { cubicIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let user
  let compliment = compliments[Math.floor(Math.random() * compliments.length)]
  let { nextLevelXP, progressXP } = user.userXP
  let progressAfterCompletedExercise = progressXP + 100

  const progress = tweened(1, {
    duration: 1000,
    easing: cubicIn,
  })

  onMount(() => {
    // sleep function
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }

    sleep(0).then(() => {
      progress.set(97)
    })
  })
</script>

<!-- The button to open modal -->
<label for="xp-modal" class="modal-button btn">open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="xp-modal" class="modal-toggle" />
<label for="xp-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-center text-lg font-bold">Congratulations, {compliment}</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use Wikipedia for free!
      Put a lot of cool stats in here Xp and stuff
    </p>
    <div class="flex">
      <!-- <div class="relative flex justify-center"> -->
      <div class="meter h-10 w-80">
        <span style:width="{$progress}%" />
        <p
          class="xp left-50% absolute -top-9 w-full text-center text-blue-600"
          style:--currXP={progressXP}
          style:--newXP={progressAfterCompletedExercise}
        />
      </div>
      <!-- <progress
          class="h-10 w-80 appearance-none"
          style="accent-color: blue;"
          value={$progress}
          max="100"
        /> -->
      <!-- </div> -->
      <div class="stats z-50 -mt-3 bg-white shadow">
        <div class="stat">
          <div class="stat-value text-2xl">{nextLevelXP}</div>
        </div>
      </div>
    </div>
  </label>
</label>

<style>
  .meter {
    box-sizing: content-box;
    /* height: 20px; Can be anything */
    position: relative;
    /* margin: 60px 0 20px 0; Just for demo spacing */
    background: #555;
    /* border-radius: 25px; */
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    /* padding: 10px; */
    box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  }
  .meter > span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
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
    font: 800 38px system-ui;
    padding: 2rem;
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
