<script lang="ts">
  import Editor from './Editor.svelte'
  import Preview from './Preview.svelte'

  export let demo: boolean = false
  let demoHtml = `
  <body>
    <button>Important Button</button>
  </body>`
  let demoCss = `button {
    color: #65B54E;
    background-color: #FF6666;
    font-size: 32px;
    padding: 10px;
  }`
  let demoJs = ``
  export let initialHtml: string = '<h1>Hello, world!</h1>'

  console.log('filter: ', demo)
  console.log('initial: ', initialHtml)
  let initialCss: string = ` /* Remove this comment to apply the CSS
    h1 {
      color: CornflowerBlue;
    }
    */`
  let initialJs: string = 'console.log("Check the console and you will see this message :-)")'

  let inputHtml: string = demo ? demoHtml : initialHtml
  let inputCss: string = demo ? demoCss : initialCss
  let inputJs: string = demo ? demoJs : initialJs

  // let outputHtml: string // TODO: figure out if i can do something smarter with output code
  // let outputCss: string // TODO: figure out if i can do something smarter with output code
  // let outputJs: string // TODO: figure out if i can do something smarter with output code

  let htmlTab = demo ? false : true
  let cssTab = demo ? true : false
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
</script>

<div>
  <div class="flex h-[600px] w-full gap-16">
    <div class=" editor-wrapper mockup-code w-1/2">
      <div class="tabs gap-2 pl-4">
        <button
          class="btn btn-outline btn-secondary btn-sm -mb-2 pt-2 pb-8 focus:text-black"
          class:btn-outline={!htmlTab}
          on:click={() => onTabClick('HTML')}>HTML</button
        >
        <button
          class="btn btn-outline btn-secondary btn-sm -mb-2 pt-2 pb-8 focus:text-black"
          class:btn-outline={!cssTab}
          on:click={() => onTabClick('CSS')}>CSS</button
        >
        <button
          class="btn btn-outline btn-secondary btn-sm -mb-2 pt-2 pb-8 focus:text-black"
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
    <Preview html={inputHtml} css={inputCss} js={inputJs} class="w-1/2" />
  </div>
</div>

<style>
  .editor-wrapper {
    /* Use this if we want height to be auto instead of set from consuming parent */
    @apply relative h-full;
    overflow: unset;
    /* @apply relative; */
  }

  .editor-wrapper .button-format {
    @apply absolute top-2 right-2 z-20 opacity-0 duration-300;
  }

  .editor-wrapper:hover .button-format {
    @apply opacity-100;
  }
  .deuteranopia {
    -webkit-filter: url('filters.svg#deuteranopia');
    filter: url('filters.svg#deuteranopia');
  }
</style>
