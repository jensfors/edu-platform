<script lang="ts">
  import { browser } from '$app/env'

  import { afterUpdate, onMount } from 'svelte'

  let parentStyles = $$props.class // use $$props to access the parent's props which has the normal styles
  export let html: string
  export let css: string
  export let js: string

  let iframe: HTMLIFrameElement = null
  let url

  onMount(() => {
    loadIframe()
  })

  afterUpdate(() => {
    loadIframe()
  })

  function loadIframe() {
    url = getGeneratedPageURL({
      html,
      css,
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
</script>


<div class="mockup-window border bg-base-300 border-base-300 {parentStyles}">
  <iframe title="preview" bind:this={iframe} class="bg-white w-full h-full p-2" />
</div>
