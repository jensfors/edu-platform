<script>
  import { supabase } from '$lib/db/supabaseClient'
  import { user } from '$lib/sessionStore'

  let loading = true
  let username, bio, avatarurl, firstname, lastname
  let message = { success: null, display: '' }
  console.log(user)

  async function getProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, firstName, lastName, bio, avatarURL`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username = data.username
        firstname = data.firstName
        lastname = data.lastName
        bio = data.bio
        avatarurl = data.avatarURL
      }
    } catch (error) {
      message = { success: false, display: error.message }
    } finally {
      loading = false
    }
  }

  async function updateProfile() {
    try {
      loading = true
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username: username,
        firstName: firstname,
        lastName: lastname,
        bio: bio,
        avatarURL: avatarurl,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      })

      if (error) throw error
    } catch (error) {
      message = { success: false, display: error.message }
    } finally {
      loading = false
    }
  }

  async function signOut() {
    try {
      loading = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      message = { success: false, display: error.message }
    } finally {
      loading = false
    }
  }
</script>

<div class="container">
  <div class="row flex flex-center">
    <div class="col-4 offset-4 mt-5">
      <div class="row heading">
        <span class="col-8">Profile</span>
        <div class="col-4">
          <button class="btn btn-secondary" on:click={signOut} disabled={loading}>
            Sign Out
          </button>
        </div>
      </div>
      <form use:getProfile class="form-widget" on:submit|preventDefault={updateProfile}>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" class="form-control" type="text" value={$user.email} disabled />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" class="form-control" type="text" bind:value={username} />
        </div>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input id="firstName" type="text" class="form-control" bind:value={firstname} />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input id="lastName" type="text" class="form-control" bind:value={lastname} />
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea id="bio" class="form-control" bind:value={bio} />
        </div>
        <div class="form-group">
          <label for="avatarURL">avatar URL</label>
          <input id="avatarURL" type="text" class="form-control" bind:value={avatarurl} />
        </div>

        <div>
          <input
            type="submit"
            class="btn btn-primary"
            value={loading ? 'Loading ...' : 'Update'}
            disabled={loading}
          />
        </div>
      </form>
      {#if message.success != null}
        <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
          {message.display}
        </div>
      {/if}
    </div>
  </div>
</div>
