import type * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage, { clear, config } from 'localforage'

const fileCache = localForage.createInstance({
  name: 'filecache'
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      })

      // Avoid to send a million requests to unpkg every time we look for external
      // packages, as it can get quite slow if they import a lot of packages.
      // Instead look in cache and return that instead.
      // If onLoad do NOT return, then it will go to next onLoad function
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

        if (cachedResult) {
          return cachedResult
        }
      })

      // Handle css files, by injecting the css into html head
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}'
          document.head.appendChild(style);
        `

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result)

        return result
      });

      // Handle js/jsx files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result)

        return result
      });
    }
  }
}
