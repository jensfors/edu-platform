<script lang="ts">
  import CodeCell from '$lib/components/CodeCell.svelte'
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1 class="text-3xl font-bold underline">This is from the testing zone</h1>
<CodeCell />
<!-- <CodeCell /> -->
<!--   Delete if not using -->
<!-- <textarea bind:value={inputCode} /> -->
<!-- <textarea bind:value={inputCode} on:input={({ target }) => (inputCode = target.value)} /> -->
<!-- <textarea bind:value={inputCode} on:input={({ value }) => (inputCode = value)} /> -->
