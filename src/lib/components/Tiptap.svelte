<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'

  let element: Element
  let editor: Editor
  export let content: string

  onMount(() => {
    console.log('Mounting markdown editor..')
    editor = new Editor({
      element: element,
      extensions: [StarterKit, Image],
      content: '<p>Please write your exercise text here</p>',
      editorProps: {
        attributes: {
          class: 'prose outline rounded p-4',
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

  // Change the content when the html in the editor changes
  $: if (editor) {
    content = editor.getHTML()
  }

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
</script>

<div class="flex flex-col gap-4">
  {#if editor}
    <div class="flex">
      <div class="btn-group">
        <button
          class="btn btn-sm btn-outline btn-accent"
          on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          class:active={editor.isActive('heading', { level: 1 })}
        >
          H1
        </button>
        <button
          class="btn btn-sm btn-outline btn-accent"
          on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          class:active={editor.isActive('heading', { level: 2 })}
        >
          H2
        </button>
        <button
          class="btn btn-sm btn-outline btn-accent"
          on:click={() => editor.chain().focus().setParagraph().run()}
          class:active={editor.isActive('paragraph')}
        >
          P
        </button>
        <button
          class="btn btn-sm btn-outline btn-accent"
          on:click={() => editor.chain().focus().toggleBulletList().run()}
          class:active={editor.isActive('bulletList')}
        >
          Bullet list
        </button>
        <button
          class="btn btn-sm btn-outline btn-accent"
          on:click={() => editor.chain().focus().toggleOrderedList().run()}
          class:active={editor.isActive('orderedList')}
        >
          Ordered list
        </button>
        <button class="btn btn-sm btn-outline btn-accent" on:click={addImage}> Image </button>
      </div>
    </div>
  {/if}
  <div class="flex">
    <!-- binding the editor to a div element -->
    <div class="w-full" bind:this={element} />
  </div>
  <!-- Preview stuff for testing -->
  <!-- <article class="prose prose-pre:text-white">
    {@html content}
  </article> -->
</div>

<style>
  button.active {
    background: #131325;
    color: white;
  }
  .ProseMirror {
    @apply w-full;
  }
</style>
