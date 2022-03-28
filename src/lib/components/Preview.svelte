<script lang="ts">
  export let code: string

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
      iframe.contentWindow.postMessage(code, '*')
    }
  }

  let html = `
    <hmtl>
      <head></head>
      <body>
        <div id="root"></div>
        <script>\
          window.addEventListener('message', (event) => {\
            try {\
              eval(event.data);\
            } catch (error) {\
              const root = document.querySelector('#root');\
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';\
              console.error(error);\
            }\
          }, false);\
        <\/script>
      </body>
    </html>`
</script>

<!-- markup (zero or more items) goes here -->
<iframe
  title="preview"
  bind:this={iframe}
  sandbox="allow-scripts"
  srcDoc={html}
  class="outline outline-4 outline-orange-700"
/>

<style>
  /* your styles go here */
</style>
