<script lang="ts">
  import Editor from '$lib/components/Editor.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import SplitPane from '$lib/components/SplitPane.svelte'

  import { bundle } from '$lib/bundler'
  import { browser } from '$app/env'

  let inputCode = 'console.log("demo input")'
  let outputCode = 'console.log(12345)'
  let error = ''
  let timer: ReturnType<typeof setTimeout> | null = null

  $: debouncing(inputCode)

  // Throttle code execution to prevent it from being called too often
  // Gives better performance, and it do not render errors imidiaitly when the user is typing
  function debouncing(inputCode: string) {
    if (browser) {
      // Cancel previous timer
      if (timer) {
        clearTimeout(timer)
      }

      // The timer waits 1 second with bundling the code AFTER the user is done typing
      timer = setTimeout(async () => {
        const bundleOutput = await bundle(inputCode)
        outputCode = bundleOutput.code
        error = bundleOutput.error
      }, 750) // This is just 750ms, but it's a good value to give some time to the user to finish typing
    }
  }

  const onClick = async () => {
    const bundleOutput = await bundle(inputCode)
    outputCode = bundleOutput.code
  }
</script>

<h2 class="text-3xl font-bold underline">HERE COMES THE EDITOR COMPONENT</h2>
<div class="flex h-[600px] w-full gap-16">
  <Editor
    initialValue={`let testVar= "hello there"`}
    onChange={(value) => (inputCode = value)}
    class="w-1/2"
  />
  <Preview code={outputCode} {error} class="w-1/2" />
</div>
<div class="pt-10">
  <button class="btn btn-primary" on:click={onClick}> Bundle code </button>
</div>
<h1>Pre tag output code</h1>
<pre>{outputCode}</pre>
<!-- <SplitPane minWidth={50}>
  <div id="blue" slot="left" class="w-96">
    <Editor initialValue={`let testVar= "hello there"`} onChange={(value) => (inputCode = value)} />
  </div>
  <div id="red" slot="right">
    <Preview code={outputCode} />
  </div>
</SplitPane> -->
<!--   Delete if not using -->
<!-- <textarea bind:value={inputCode} /> -->
<!-- <textarea bind:value={inputCode} on:input={({ target }) => (inputCode = target.value)} /> -->

<!-- <textarea bind:value={inputCode} on:input={({ value }) => (inputCode = value)} /> -->
<style>
  /* div {
    height: 100%;
    right: 100%;
    display: grid;
    place-items: center;
  }
  #blue {
    background-color: lightseagreen;
  }
  #red {
    background-color: tomato;
  } */
</style>
