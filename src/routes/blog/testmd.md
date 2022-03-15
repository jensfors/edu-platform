<script context="module">
  export const load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()


    console.log('hello')
    console.log(allPosts)
    return {
      props: {
        posts: allPosts,
        all: posts
      }
    }
  }
</script>
<script >

import Counter from '$lib/components/Counter.svelte';
console.log('hello again')
export let posts
console.log(posts)

let test = `# Uses **Here's some stuff I use** - Firefox - VS Code - Emojis`
let test2 = `**Here som stuff I use**`

  import SvelteMarkdown from 'svelte-markdown'
  const source1 = `
  # This is a header

This is a paragraph.

* This is a list
* With two items
  1. And a sublist
  2. That is ordered
    * With another
    * Sublist inside

| And this is | A table |
|-------------|---------|
| With two    | columns |
`
const source =  posts.markdown
const down =  '# Uses'
console.log('LOOk AT ME ', source)
console.log(typeof source)

</script>

# Uses

**Here's some stuff I use**

- Firefox
- VS Code
- Emojis 😎

{posts.markdown}

{test}

{test2}
**Here some stuff i Use**

<Counter />
<!-- <pre>{mdown}</pre> -->
<article class="markdown-content">
<SvelteMarkdown {source} />
</article>
<SvelteMarkdown {source} />
<SvelteMarkdown {source1} />

<style>
/* h1 {
  font-size: 44px;
  color:blue;
} */
.markdown-content :global(h1) {
  font-size: 44px;
  color:blue;
}
</style>
