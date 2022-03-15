<script lang="ts">
  import { supabase } from '$lib/db/supabaseClient'

  const content = `
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
  | With two    | columns | `

  async function uploadMarkdown() {
    console.log('upload function is called')
    const { data, error } = await supabase.storage
      .from('posts')
      .upload('postfromsvelte1.md', content, {
        upsert: false,
      })

    console.log('Data: ', data)
    console.log('Error: ', error)
  }
</script>

<button class="btn btn-succes" on:click={uploadMarkdown}>Upload to Supa Dupa Base 👏</button>
