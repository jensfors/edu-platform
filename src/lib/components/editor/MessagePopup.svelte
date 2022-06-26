<script>
  let visible = false

  function typewriter(node, { speed = 1 }) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE

    if (!valid) {
      throw new Error(`This transition only works on elements with a single text node child`)
    }

    const text = node.textContent
    const duration = text.length / (speed * 0.01)

    return {
      duration,
      tick: (t) => {
        const i = ~~(text.length * t)
        node.textContent = text.slice(0, i)
      },
    }
  }

  function test() {
    // Sleep function for a few seconds beforeLevel
    setTimeout(() => {
      visible = true
    }, 1000)
  }
  test()
</script>

<!-- {#if visible} -->
<div class="flex justify-end">
  <p class="msg-icon reverse-grow-direction mb-6" transition:typewriter>
    Have you tried to apply a filter? Notice the preview change
  </p>
</div>

<!-- {/if} -->
<style>
  .reverse-grow-direction {
    direction: rtl;
  }

  .msg-icon {
    display: inline-block;
    position: absolute;
    padding: 10px 20px;
    color: black;
    box-sizing: border-box;
    max-width: 265px;
    min-width: 80px;
    min-height: 38px;
    margin-right: 50px;
    margin-top: -90px;
    z-index: 100;
  }
  .msg-icon:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid #e5a002;
    border-radius: 2px;
    box-sizing: border-box;
    clip-path: polygon(
      0% 105%,
      0% 0%,
      105% 0%,
      105% 105%,
      43px 105%,
      43px 80%,
      21px 80%,
      21px 105%
    );
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
  .msg-icon:after {
    content: '';
    position: absolute;
    display: block;
    width: 25px;
    height: 20px;
    background: #e5a002;
    top: calc(100% - 1px);
    right: 20px;
    box-sizing: border-box;
    clip-path: polygon(0 0, 0% 100%, 100% 0%, calc(100% - 2px) 0, 1px calc(100% - 2px), 1px 0);
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
</style>
