import { supabase } from '$lib/db/supabaseClient'

/** @type {import('./api').RequestHandler} */
export async function get() {
  console.log(supabase)
  let markdown

  try {
    console.log('we are getting to the try block')
    // const { data, error } = await supabase.storage.from('posts').download(path)
    // const { data, error } = await supabase.storage.getBucket('posts')
    // const { data, error } = await supabase.storage.from('posts').list()
    // const { data, error } = await supabase.storage.from('posts').download('uses.md')
    const { data, error } = await supabase.storage.from('posts').download('afile.md')

    markdown = await data.text()
    console.log('Data: ', await data.text())
    console.log('Error: ', error)
    if (error) throw error
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }

  return {
    status: 200,
    body: {
      cuteMessage: 'Welcome to my API :)))',
      markdown,
    },
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  console.log('Still getting endpoints hitted?????????')
  // const data = await request.formData() // or .json(), or .text(), etc
  // console.log(request)
  console.log(request)
  console.log('--------')
  console.log('text: ', await request.text())
  // console.log('json: ', await request.json())
  console.log('formData: ', await request.formData())
  // const avatarFile = event.target.files[0]
  // const { data, error } = await supabase.storage
  //   .from('avatars')
  //   .upload('public/avatar1.png', avatarFile, {
  //     cacheControl: '3600',
  //     upsert: false,
  //   })

  // if (error) {
  //   // return validation errors
  //   return {
  //     status: 400,
  //     body: { error },
  //   }
  // }
  return {
    status: 303,
    body: { message: 'You did it!' },
    // headers: {
    //   location: `/about`,
    // },
  }

  // redirect to the newly created item
  // return {
  //   status: 303,
  //   headers: {
  //     location: `/items/${item.id}`,
  //   },
  // }
}
