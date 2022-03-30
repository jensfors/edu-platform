import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '$lib/bundler/unpkg-path-plugin'
import { fetchPlugin } from '$lib/bundler/fetch-plugin'

let serviceStarted = false

export async function bundle(rawCode: string) {
  console.log('rawCode: ', rawCode)

  // Initialize the service if it's not already initialized
  if (!serviceStarted) {
    console.log('Starting esbuild service')
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    })
    console.log('esbuild service started')
    serviceStarted = true
  }

  try {
    // Bundle the code and return the output used for the iFrame
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        // I think Svelte might do this it self since it self-corrects
        // depending on if it's run in prod or dev mode... hmm?
        // AND there is no error in the console like there was in the Next.js app
        // 'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    })

    return {
      code: result.outputFiles[0].text,
      error: '',
    }
  } catch (error) {
    return {
      code: '',
      error: error.message,
    }
  }
}
