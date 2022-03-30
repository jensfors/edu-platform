<script>
  import { onMount } from 'svelte'
  export let minWidth = 30
  export let splitterWidth = 4
  let mousePos
  let delta = 0
  let isMouseDown = false
  let containerW
  let initialL
  let leftW
  let rightW

  onMount(() => {
    leftW = (containerW - splitterWidth) / 2
    rightW = (containerW - splitterWidth) / 2
  })

  function handleMouseMove(e) {
    if (isMouseDown) {
      delta = mousePos - e.clientX
      leftW =
        initialL - delta <= minWidth
          ? minWidth
          : initialL - delta >= containerW - splitterWidth - minWidth
          ? containerW - splitterWidth - minWidth
          : initialL - delta

      rightW = containerW - leftW - splitterWidth
    }
  }

  function handleMouseDown(e) {
    mousePos = e.clientX
    initialL = leftW
    isMouseDown = true
  }

  function handleMouseUp() {
    isMouseDown = false
  }

  $: if (leftW && rightW & containerW && leftW + rightW !== containerW - splitterWidth) {
    const leftRatio = leftW / (leftW + rightW - splitterWidth / 2)
    leftW = containerW * leftRatio - splitterWidth / 2
    rightW = containerW - leftW - splitterWidth / 2
  }
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<section bind:clientWidth={containerW} class={isMouseDown ? 'disable-select' : ''}>
  <div style="width:{leftW}px" id="left">
    <slot name="left" />
    {#if isMouseDown}
      <div class="window-hook" />
    {/if}
  </div>
  <div on:mousedown={handleMouseDown} id="splitter" style="width:{splitterWidth}px" />
  <div style="width:{rightW}px" id="right">
    <slot name="right" />
    {#if isMouseDown}
      <div class="window-hook" />
    {/if}
  </div>
</section>

<style>
  section {
    height: 300px;
    width: 100%;
    display: flex;
    border: 1px solid black;
  }

  #left {
    height: 100%;
  }

  #right {
    height: 100%;
  }

  #splitter {
    height: 100%;
    background-color: black;
    cursor: col-resize;
  }

  div.window-hook {
    height: 100%;
    width: 100%;
    z-index: 5000;
    position: absolute;
    top: 0;
    left: 0;
  }

  .disable-select,
  .disable-select * {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    cursor: col-resize;
  }
</style>
