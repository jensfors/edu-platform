<script lang="ts">
  import { supabase } from '$lib/db/supabaseClient'

  let loading = false
  let email: string,
    password,
    confirmpassword,
    firstName: string,
    lastName: string,
    avatarURL: string = null
  let message = { success: null, display: '' }

  const handleSignup = async () => {
    if (password != confirmpassword) {
      message = { success: false, display: 'Password and Confirm Password fields do not match' }
      return
    }

    try {
      loading = true
      const { error, user } = await supabase.auth.signUp({ email, password })
      //const publicUser: User = createUser(user.id, email, firstName, lastName, avatarURL)
      //console.log('data', publicUser)
      console.log(error)
      if (error) throw error
      message = {
        success: true,
        display: 'We have sent you an confirmation email. Please check your email',
      }
      fetch('/signup', {
        method: 'POST',
        headers: [['Content-Type', 'multipart/form-data']],
        body: JSON.stringify({
          id: user.id,
          email,
          firstName,
          lastName,
          avatarURL,
        }),
      })
        .then((response) => {
          console.log('Upload Successfully')
          // Successfully uploaded
        })
        .catch((error) => {
          console.log('Yikes an fucking error occured')
          // Upload failed
        })
    } catch (error) {
      console.log(error)
      let errorMsg = error.error_description || error.message
      message = { success: false, display: errorMsg }
    } finally {
      loading = false
    }
  }
</script>

<form on:submit|preventDefault={handleSignup}>
  <div class="form-widget">
    <h1 class="header">Eternal Dev Community</h1>
    <p class="description">Create an account and join the community of developers</p>
    <div class="form-group">
      <label for="email">Email address</label>
      <input
        id="email"
        class="form-control"
        type="email"
        placeholder="Your email"
        bind:value={email}
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        class="form-control"
        type="password"
        placeholder="Set your new password"
        bind:value={password}
      />
    </div>
    <div class="form-group">
      <label for="confirmpassword">Confirm Password</label>
      <input
        id="confirmpassword"
        class="form-control"
        type="password"
        placeholder="Confirm your new password"
        bind:value={confirmpassword}
      />
    </div>
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input
        id="firstName"
        class="form-control"
        type="name"
        placeholder="Your first name"
        bind:value={firstName}
      />
    </div>
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input
        id="lastName"
        class="form-control"
        type="name"
        placeholder="Your last name"
        bind:value={lastName}
      />
    </div>
    <div class="form-group">
      <label for="avatar">Profile Avatar</label>
      <input
        id="avatar"
        class="form-control"
        type="url"
        placeholder="URL for your avatar"
        bind:value={avatarURL}
      />
    </div>
    <div>
      <input
        type="submit"
        class="btn btn-success"
        value={loading ? 'Loading' : 'Sign up'}
        disabled={loading}
      />
    </div>

    {#if message.success != null}
      <div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
        {message.display}
      </div>
    {/if}
  </div>
</form>
