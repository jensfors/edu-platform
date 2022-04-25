<script lang="ts">
  import Editor from './Editor.svelte'
  import Preview from './Preview.svelte'

  export let initialHtml: string = '<h1>Hello, world!</h1>'
  let initialCss: string = 'h1 { color: CornflowerBlue; }'
  let initialJs: string = 'console.log("Check the console and you will see this message :-)")'

  export let inputHtml: string = initialHtml
  let inputCss: string = initialCss
  let inputJs: string = initialJs

  let outputHtml: string // TODO: figure out if i can do something smarter with output code
  let outputCss: string // TODO: figure out if i can do something smarter with output code
  let outputJs: string // TODO: figure out if i can do something smarter with output code

  let htmlTab = true
  let cssTab = false
  let jsTab = false

  function onTabClick(type: string) {
    if (type === 'HTML') {
      htmlTab = true
      cssTab = false
      jsTab = false
    } else if (type === 'CSS') {
      htmlTab = false
      cssTab = true
      jsTab = false
    } else if (type === 'JS') {
      htmlTab = false
      cssTab = false
      jsTab = true
    }
  }

  $: {
    // console.log(inputHtml)
    // console.log(inputCss)
    // console.log(inputJs)
  }
</script>

<div>
  <div class="flex h-[600px] w-full gap-16">
    <div class=" editor-wrapper mockup-code w-1/2">
      <div class="tabs pl-4 gap-2">
        <button
          class="btn btn-secondary btn-outline btn-sm pt-2 pb-8 -mb-2 focus:text-black"
          class:btn-outline={!htmlTab}
          on:click={() => onTabClick('HTML')}>HTML</button
        >
        <button
          class="btn btn-secondary btn-outline btn-sm pt-2 pb-8 -mb-2 focus:text-black"
          class:btn-outline={!cssTab}
          on:click={() => onTabClick('CSS')}>CSS</button
        >
        <button
          class="btn btn-secondary btn-outline btn-sm pt-2 pb-8 -mb-2 focus:text-black"
          class:btn-outline={!jsTab}
          on:click={() => onTabClick('JS')}>JS</button
        >
      </div>
      {#if htmlTab}
        <Editor
          initialValue={inputHtml}
          language="html"
          onChange={(value) => (inputHtml = value)}
        />
      {:else if cssTab}
        <Editor initialValue={inputCss} language="css" onChange={(value) => (inputCss = value)} />
      {:else if jsTab}
        <Editor
          initialValue={inputJs}
          language="javascript"
          onChange={(value) => (inputJs = value)}
        />
      {/if}
    </div>
    <Preview bind:html={inputHtml} css={inputCss} js={inputJs} class="w-1/2" />
  </div>
</div>

<style>
  .editor-wrapper {
    /* Use this if we want height to be auto instead of set from consuming parent */
    @apply relative h-full;
    /* @apply relative; */
  }

  .editor-wrapper .button-format {
    @apply absolute top-2 right-2 z-20 opacity-0 duration-300;
  }

  .editor-wrapper:hover .button-format {
    @apply opacity-100;
  }
</style>
