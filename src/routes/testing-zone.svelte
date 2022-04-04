<script lang="ts">
  import Editor from '$lib/components/Editor.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import { bundle } from '$lib/bundler'

  let inputCode = 'console.log("demo input")'
  let outputCode = 'console.log(12345)'

  const onClick = async () => {
    outputCode = await bundle(inputCode)
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h2 class="text-3xl font-bold underline">HERE COMES THE EDITOR COMPONENT</h2>
<div>
  <Editor initialValue={`let testVar = "hello there"`} onChange={(value) => (inputCode = value)} />
  <button class="btn btn-primary" on:click={onClick}> submit </button>
  <Preview code={outputCode} />
  <h1>Pre tag output code</h1>
  <pre>{outputCode}</pre>
</div>
<!--   Delete if not using -->
<!-- <textarea bind:value={inputCode} /> -->
<!-- <textarea bind:value={inputCode} on:input={({ target }) => (inputCode = target.value)} /> -->
<!-- <textarea bind:value={inputCode} on:input={({ value }) => (inputCode = value)} /> -->
