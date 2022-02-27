<script lang="ts">
  import { HomeIcon, SearchIcon } from 'svelte-feather-icons'
</script>

<header>
  <div class="navbar bg-primary mb-40 shadow-xl rounded-b-2xl">
    <div class="navbar-start">
      <a sveltekit:prefetch href="/" class="btn btn-ghost btn-circle">
        <HomeIcon size="28" class="text-base-100" />
      </a>

      <!-- TODO: Make this search button do stuff -->
      <button class="btn btn-ghost btn-circle">
        <SearchIcon size="28" class="text-base-100" />
      </button>
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
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div type="text" class="w-10 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=33791" alt="profile" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a sveltekit:prefetch href="/dymmy-url" class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a sveltekit:prefetch href="/dymma-url">Settings</a></li>
          <li><a sveltekit:prefetch href="/dyamy-url">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</header>

<style>
  .navbar-center a {
    @apply text-base-100 text-lg;
  }
</style>
