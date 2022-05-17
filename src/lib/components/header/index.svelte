<script lang="ts">
  import { goto } from '$app/navigation'
  import { authUser } from '$lib/stores'
  import { BarChart2Icon, HomeIcon, SearchIcon } from 'svelte-feather-icons'
</script>

<!-- The header looks ass on less than 400px, and should be fixed with an entire other menu -->
<header class="navbar mb-6 rounded-b-2xl bg-primary shadow-xl">
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
  <!--

    <div class="navbar-center">
      <ul tabindex="0" class="menu menu-compact flex-row p-4">
        <li>
          <a sveltekit:prefetch href="/about">About</a>
        </li>
        <li>
          <a sveltekit:prefetch href="/testing-zone">Testing Zone</a>
        </li>
        <li><a sveltekit:prefetch href="/todos">Todos</a></li>
      </ul>
    </div>
  -->
  <div class="navbar-end">
    {#if $authUser}
      <div class="dropdown-end dropdown">
        <div tabindex="0" class="avatar btn btn-ghost btn-circle">
          <div type="text" class="w-10 rounded-full">
            <img
              src={$authUser.avatarURL
                ? $authUser.avatarURL
                : '/static/defaults/DefaultProfile.png'}
              alt="Profile avatar"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a sveltekit:prefetch href={`/profile/${$authUser.id}`} class="justify-between">
              View Profile
            </a>
          </li>
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
    @apply text-lg text-base-100;
  }
</style>
