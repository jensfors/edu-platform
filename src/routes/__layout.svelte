<script lang="ts">
  import Header from '$lib/header/Header.svelte'
  import '../app.css'
</script>

<Header />

<main class="flex flex-col flex-1 p-4 w-full max-w-[1280px] my-0 mx-auto">
  <slot />
</main>

<footer class="flex flex-col justify-center items-center py-10 sm:p-10">
  <p>
    visit <a class="font-bold" href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
  </p>
</footer>

<style>
</style>
