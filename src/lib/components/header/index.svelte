<script lang="ts">
  import { authUser } from '$lib/stores'
  import { HomeIcon, SearchIcon, BarChart2Icon } from 'svelte-feather-icons'
  import { goto } from '$app/navigation'
</script>

<!-- The header looks ass on less than 400px, and should be fixed with an entire other menu -->
<header class="navbar bg-primary mb-20 shadow-xl rounded-b-2xl">
  <!-- <div class="navbar bg-primary mb-40 shadow-xl rounded-b-2xl"> -->
  <div class="navbar-start">
    <a sveltekit:prefetch href="/" class="btn btn-ghost btn-circle" title="Home">
      <HomeIcon size="28" class="text-base-100" />
    </a>
    <!-- TODO: Make this search button do stuff -->
    <button class="btn btn-ghost btn-circle" title="Browse">
      <SearchIcon size="28" class="text-base-100" />
    </button>
    <a sveltekit:prefetch href="/leaderboard" class="btn btn-ghost btn-circle" title="Leaderboard">
      <BarChart2Icon size="28" class="text-base-100" />
    </a>
    <!-------------------------------------------->
  </div>
  <div class="navbar-center">
    <ul tabindex="0" class="flex-row p-4 menu menu-compact">
      <li>
        <a sveltekit:prefetch href="/about">About</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/testing-zone">Testing Zone</a>
      </li>
      <li><a sveltekit:prefetch href="/todos">Todos</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    {#if $authUser}
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div type="text" class="w-10 rounded-full">
            <img
              src={$authUser.avatarURL
                ? $authUser.avatarURL
                : '/static/defaults/DefaultProfile.png'}
              alt="profile"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a sveltekit:prefetch href="/dymmy-url" class="justify-between">
              Profile {$authUser.firstName}
              <span class="badge">New</span>
            </a>
          </li>
          <li><a sveltekit:prefetch href="/dymma-url">Settings</a></li>
          <li><a sveltekit:prefetch href="/dyamy-url">Logout</a></li>
        </ul>
      </div>
    {:else}
      <button class="btn btn-secondary" on:click={() => goto('/auth')}>Login</button>
    {/if}
  </div>

  <!-- </div> -->
</header>

<style>
  .navbar-center a {
    @apply text-base-100 text-lg;
  }
</style>
