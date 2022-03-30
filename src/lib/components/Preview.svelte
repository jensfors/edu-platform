<script lang="ts">
  export let code: string
  export let error: string
  let parentStyles = $$props.class // use $$props to access the parent's props which has the normal styles

  let iframe: HTMLIFrameElement = null

  // code is used as a dependency to trigger the reset function
  // see https://sveltesociety.dev/recipes/svelte-language-fundamentals/reactivity/
  // for more documentation
  $: resetIframe(code)

  function resetIframe(code) {
    console.log('ressetting iFrame')

    if (iframe) {
      // Reset the context of the iframe before the user executes code
      // EX: the user could remove the body element and try to do stuff after that
      iframe.srcdoc = html
      setTimeout(() => {
        iframe.contentWindow.postMessage(code, '*')
      }, 50)
    }
  }

  let html = `
    <hmtl>
      <head></head>
      <body>
        <div id="root"></div>
        <script>\
          function handleError(error) {\
            const root = document.querySelector('#root');\
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';\
            console.error(error);\
          }\
          window.addEventListener('error', (event) => {\
            event.preventDefault();\
            handleError(event.error);\
          });\
          window.addEventListener('message', (event) => {\
            try {\
              eval(event.data);\
            } catch (error) {\
              handleError(error);\
            }\
          }, false);\
        <\/script>
      </body>
    </html>`

  console.log('error in preview', error)
</script>

<div class="mockup-window border bg-base-300 border-base-300 {parentStyles}">
  {#if error}
    <h1 class="text-red-600 p-2">{error}</h1>
  {:else}
    <iframe
      title="preview"
      bind:this={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
      class="bg-white w-full h-full"
    />
  {/if}
</div>

<!--
const root = document.querySelector('#root')
root.innerHTML = '123' -->
<style>
  /* your styles go here */
</style>
