<script context="module">
  export const load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()

    console.log('hello')
    console.log(allPosts)
    return {
      props: {
        posts: allPosts,
        all: posts,
      },
    }
  }
</script>

<script lang="ts">
  export let posts
  import SvelteMarkdown from 'svelte-markdown'
  const source = posts.markdown
  const sourceTest = `
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
</script>

<article class="prose prose-pre:text-white">
  <SvelteMarkdown {source} />
</article>

<!-- ****** This is an example of how to style markdown locally instead of globally  ******** -->
<!-- https://discord.com/channels/457912077277855764/457912077277855766/894820513069805578 -->
<!-- <article class="markdown-content">
  <slot />
</article>

<style>
  .markdown-content :global(h1) {
    font-size: 44px;
    color: blue;
  }
..
</style> -->
