<script lang="ts">
  import Editor from '$lib/components/Old-Editor.svelte'
  import Preview from '$lib/components/Old-Preview.svelte'
  import SplitPane from '$lib/components/SplitPane.svelte'

  import { bundle } from '$lib/bundler'
  import { browser } from '$app/env'

  export let initialValue: string
  export let inputCode = ''
  let outputCode = ''
  let error = ''
  let timer: ReturnType<typeof setTimeout> | null = null

  let initialCode = `
    function css(styles) {\
      var styleSheet = document.createElement("style");\
      styleSheet.innerText = styles;\
      document.head.appendChild(styleSheet);\
    }\
    function show(value) {\
      const root = document.querySelector('#root');\
      if (typeof value === 'object') {\
        if (value.$$typeof && value.props) {\
          ReactDOM.render(value, root);\
        } else {\
          root.innerHTML = JSON.stringify(value);\
        }\
      } else {\
        root.innerHTML = value;\
      }\
    };\ `

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
        const bundleOutput = await bundle(`${initialCode} ${inputCode}`)
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

<div class="flex h-[600px] w-full gap-16">
  <Editor {initialValue} onChange={(value) => (inputCode = value)} class="w-1/2" />
  <Preview code={outputCode} {error} class="w-1/2" />
</div>

<!-- <div class="pt-10">
  <button class="btn btn-primary" on:click={onClick}> Bundle code </button>
</div> -->
<style>
</style>
