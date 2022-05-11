<script lang="ts">
  import { compliments } from '$lib/utils/compliments'
  import { onMount } from 'svelte'
  import { cubicIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  let compliment = compliments[Math.floor(Math.random() * compliments.length)]
  let currXP = 200
  let newXP = currXP + 100

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
      <div class="relative flex justify-center">
        <progress class="progress progress-accent h-10 w-80" value={$progress} max="100" />
        <span
          class="xp left-50% absolute -top-9 text-center text-blue-600"
          style:--currXP={currXP}
          style:--newXP={newXP}
        />
      </div>
      <div class="stats z-50 -mt-3 bg-white shadow">
        <div class="stat">
          <div class="stat-value text-2xl">89,400</div>
        </div>
      </div>
    </div>

    <span class="yaya"> / 1234 XP</span>
  </label>
</label>

<style>
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
