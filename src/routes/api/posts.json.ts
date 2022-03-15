import { supabase } from '$lib/db/supabaseClient'

/** @type {import('./api').RequestHandler} */
export async function get() {
  // console.log(supabase)
  let markdown

  try {
    console.log('we are getting to the try block')
    // const { data, error } = await supabase.storage.from('posts').download(path)
    // const { data, error } = await supabase.storage.getBucket('posts')
    // const { data, error } = await supabase.storage.from('posts').list()
    // const { data, error } = await supabase.storage.from('posts').download('uses.md')
    const { data, error } = await supabase.storage.from('posts').download('postfromsvelte1.md')

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
