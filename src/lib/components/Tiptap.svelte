<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'

  let element: Element
  let editor: Editor
  $: content = ''

  onMount(() => {
    console.log('Mounting markdown editor..')
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Image],
      content: '<p>Hello World! 🌍️ </p>',
      editorProps: {
        attributes: {
          class: 'prose',
        },
      },
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
    console.log('Markdown editor mounted successfully')
  })

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })

  function addImage() {
    const url = window.prompt('URL')
    const altTag = window.prompt('Alt Tag')
    const title = window.prompt('Title')

    if (url) {
      editor
        .chain()
        .focus()
        .setImage({
          src: url,
          alt: altTag,
          title: title,
        })
        .run()
    }
  }

  // Just used to test how the content is rendered from the getHTML() function
  $: if (editor) {
    content = editor.getHTML()
  }
</script>

{#if editor}
  <div class="flex gap-4">
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      class:active={editor.isActive('heading', { level: 1 })}
    >
      H1
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class:active={editor.isActive('heading', { level: 2 })}
    >
      H2
    </button>
    <button
      on:click={() => editor.chain().focus().setParagraph().run()}
      class:active={editor.isActive('paragraph')}
    >
      P
    </button>
    <button on:click={addImage}> Image </button>
    <button
      on:click={() => editor.chain().focus().toggleBulletList().run()}
      class:active={editor.isActive('bulletList')}
    >
      Bullet list
    </button>
    <button
      on:click={() => editor.chain().focus().toggleOrderedList().run()}
      class:active={editor.isActive('orderedList')}
    >
      Ordered list
    </button>
  </div>
{/if}

<!-- binding the editor to a div element -->
<div bind:this={element} />
<!-- Preview stuff for testing -->
<article class="prose prose-pre:text-white">
  {@html content}
</article>

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
