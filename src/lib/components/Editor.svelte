<script lang="ts">
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import type monaco from 'monaco-editor'
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
  import prettier, { Options } from 'prettier'
  import parser from 'prettier/parser-babel'
  import { parse } from 'cookie'

  export let initialValue: string
  export let onChange: (value: string) => string

  let divEl: HTMLDivElement = null
  let editor: monaco.editor.IStandaloneCodeEditor
  let options: monaco.editor.IStandaloneEditorConstructionOptions = {
    // value: ['console.log("Write your code here :-)");'].join('\n'),
    value: initialValue,
    language: 'javascript',
    theme: 'vs-dark',
    wordWrap: 'on',
    minimap: { enabled: false },
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 3,
    fontSize: 16,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
  }
  let Monaco

  if (browser) {
    onMount(async () => {
      // @ts-ignore
      self.MonacoEnvironment = {
        getWorker: function (_moduleId: any, label: string) {
          if (label === 'json') {
            return new jsonWorker()
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
          }
          if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
          }
          return new editorWorker()
        },
      }

      Monaco = await import('monaco-editor')
      editor = Monaco.editor.create(divEl, options)

      // Just a  console log to make sure we actually didn't break something so far
      console.log('Editor text when mounted: ', editor.getModel().getValue())
      editor.getModel().onDidChangeContent(() => {
        onChange(editor.getModel().getValue())
      })

      // This one logs all the content to terminal, we know this works
      // editor.getModel().onDidChangeContent(printShit)

      return () => {
        editor.dispose()
      }
    })
  }

  function printShit() {
    console.log('event triggerede mutherfucker ')
    console.log('editor text triggerede: ', editor.getValue())
  }

  // function mountEditor() {
  //     setTimeout(() => {
  //       import("monaco-editor").then(monaco => {
  //         editor = monaco.editor.create(document.getElementById('monaco-container'), {
  //           value: $userCSS.split(`
  // `).join('\n'),
  //           language: 'css',
  //           roundedSelection: false,
  //           scrollBeyondLastLine: false,
  //           readOnly: false,
  //           tabSize: 2,
  //           theme: "vs-dark",
  //           minimap: {
  //             enabled: false
  //             // renderCharacters: false
  //           }
  //         });
  //         modelChangeSub = editor.getModel().onDidChangeContent(v => {
  //           userCSS.set(editor.getModel().getValue())
  //         })
  //       })
  //     }, 200)
  //   }

  /* THIS IS ANOTHER EXAMPLE */

  // import { onMount } from 'svelte';
  // import { browser } from '$app/env';
  // import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker&inline';
  // let divEl;

  // if (browser) {
  // 	onMount(async () => {
  // 		const Monaco = await import('monaco-editor');

  // 		console.log(Monaco);
  // 		console.log('------------------s----------------');
  // 		console.log(self);

  // 		self.MonacoEnvironment = {
  // 			getWorker: function () {
  // 				return new jsonWorker();
  // 			}
  // 		};

  // 		const editor = Monaco.editor.create(divEl, {
  // 			value: JSON.stringify(
  // 				{
  // 					something: 123
  // 				},
  // 				null,
  // 				'\t'
  // 			),
  // 			height: '500px',
  // 			language: 'json',
  // 			automaticLayout: true
  // 		});

  // 		return () => {
  // 			editor.dispose();
  // 		};
  // 	});
  // }

  function formatOnClick() {
    const prettierConf: Options = {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: false,
      singleQuote: true,
    }
    const unformatted = editor.getModel().getValue()
    // replace removes the new line prettier creates, it will give problems when loading the code back up
    const formatted = prettier.format(unformatted, prettierConf).replace(/\n$/, '')
    editor.getModel().setValue(formatted)
  }
</script>

<!-- <section> -->
<!-- <div bind:this={divEl} class="h-screen" style="height: 500px; width: 500px;" /> -->
<!-- <div bind:this={divEl} style="height: 500px; width: 500px;" /> -->
<div class="editor-wrapper">
  <button
    class="button-format btn btn-secondary absolute top-1 right-1 z-20 opacity-0 hover:opacity-100 duration-300"
    on:click={formatOnClick}>Format</button
  >
  <div bind:this={divEl} class="h-screen" style="height: 500px; width: 500px;" />
</div>

<!-- </section> -->
<style>
  .editor-wrapper {
    @apply relative h-full;
  }

  .editor-wrapper .button-format {
    @apply absolute top-1 right-1 z-20 opacity-0 duration-300;
  }

  .editor-wrapper:hover .button-format {
    @apply opacity-100;
  }
</style>
