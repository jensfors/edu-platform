<script context="module">
  import Header from '$lib/components/header/index.svelte'
  import { supabase } from '$lib/db/supabaseClient'
  import { authUser } from '$lib/stores'
  import '../app.css'

  export const load = async ({ fetch }) => {
    let user = supabase.auth.user()
    if (user) {
      let userId = user.id
      const dataRaw = await fetch(`/api/user/${userId}`)
      const data = await dataRaw.json()
      authUser.set(data.user)
      return {
        props: { message: 'User was stored locally' },
      }
    }
    return { props: { message: 'No user logged in' } }
  }
</script>

<Header />

<main class="flex flex-col flex-1 p-4 w-full max-w-[1280px] my-0 mx-auto">
  <slot />
</main>

<!-- TODO: Make a footer -->
<footer class="flex flex-col justify-center items-center py-10 sm:p-10" />

<style>
</style>
