<script lang="ts">
  import { showFilter,showMessage } from '$lib/components/editor/editorStore'
  import { colorblindFilters } from '$lib/utils/colorblindFilters'
  import { afterUpdate,onMount } from 'svelte'

  let parentStyles = $$props.class // use $$props to access the parent's props which has the normal styles
  export let html: string
  export let css: string
  export let js: string

  let colorblindFilterHtml: string = '' // Empty if no filter is selected
  let colorblindFilterCss: string = '' // Empty if no filter is selected
  let appliedFilterName: string = 'Select Filter' // Empty if no filter is selected

  // let triedFilter = false

  let iframe: HTMLIFrameElement = null
  let url

  onMount(() => {
    loadIframe()
  })

  afterUpdate(() => {
    loadIframe()
  })

  function loadIframe() {
    let htmlWithAppliedFilter = html + colorblindFilterHtml
    let cssWithAppliedFilter = css + colorblindFilterCss

    url = getGeneratedPageURL({
      html: htmlWithAppliedFilter,
      css: cssWithAppliedFilter,
      js,
    })

    iframe.src = url
  }

  $: {
    // console.log('previws: ', html)
    // console.log('preview: ', css)
    // console.log('previes: ', js)
  }

  const getGeneratedPageURL = ({ html, css, js }) => {
    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    const source = `
        <html>
          <head>
            ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
            ${js && `<script src="${jsURL}"><\/script>`}
          </head>
          <body>
            ${html || ''}
          </body>
        </html> `

    return getBlobURL(source, 'text/html')
  }

  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }

  function addFilter(filter: string) {
    showMessage.set(false)
    colorblindFilterHtml = colorblindFilters[filter].html
    colorblindFilterCss = colorblindFilters[filter].css
    appliedFilterName = colorblindFilters[filter].name

    if (appliedFilterName === 'removeFilter') {
      appliedFilterName = 'Select Filter'
    }

    loadIframe()
  }
</script>

<div class="mockup-window border border-base-300 bg-base-300 {parentStyles}">
  <iframe title="preview" bind:this={iframe} class="h-full w-full bg-white p-2" />

  {#if $showFilter}
    <div class="absolute top-1 right-1 z-20 flex">
      <div class="reverse-button-grow-direction dropdown-left dropdown mt-0 w-36">
        <label
          tabindex="0"
          for="colorblind-filter"
          class="btn btn-outline btn-sm absolute m-1 duration-300 hover:opacity-100"
          >{appliedFilterName}</label
        >
        <ul tabindex="0" class="dropdown-content menu rounded-box w-60 bg-base-100 p-2 shadow">
          {#each Object.entries(colorblindFilters) as [key, value]}
            <li>
              <button class="px-1 py-1 text-right text-sm" on:click={() => addFilter(value.name)}
                >{value.description}</button
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>

<style>
  .reverse-button-grow-direction {
    direction: rtl;
  }
</style>
