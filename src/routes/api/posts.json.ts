import { supabase } from '$lib/db/supabaseClient'

/** @type {import('./api').RequestHandler} */
export async function get() {
  console.log(supabase)
  let markdown
  let blob

  try {
    console.log('we are getting to the try block')
    // const { data, error } = await supabase.storage.from('posts').download(path)
    const { data, error } = await supabase.storage.from('posts').download('afile.md')
    // const { data, error } = await supabase.storage.getBucket('posts')
    // const { data, error } = await supabase.storage.from('posts').list()

    markdown = await data.text()
    // blob = data.text()
    console.log('Data: ', await data.text())
    // console.log('Data: ', JSON.stringify(data))
    console.log('hmmm')
    console.log('Error: ', error)
    if (error) throw error

    // src = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }

  return {
    status: 200,
    body: {
      cuteMessage: 'Welcome to my API :)))',
      markdown,
      // blob,
    },
  }
}
