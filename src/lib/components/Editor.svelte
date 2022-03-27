<script lang="ts">
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import type monaco from 'monaco-editor'
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  export let initialValue: string
  export let onChange: (value: string) => string

  let divEl: HTMLDivElement = null
  let editor: monaco.editor.IStandaloneCodeEditor
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
      editor = Monaco.editor.create(divEl, {
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
      })

      console.log('Editor text when mounted: ', editor.getModel().getValue())
      editor.getModel().onDidChangeContent(onChange(editor.getModel().getValue))

      return () => {
        editor.dispose()
      }
    })
  }

  function printShit() {
    console.log('event triggerede mutherfucker ')
    console.log('editor text triggerede: ', editor.getValue())
  }

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
</script>

<!-- <section> -->
<!-- <div bind:this={divEl} class="h-screen" style="height: 500px; width: 500px;" /> -->
<!-- <div bind:this={divEl} style="height: 500px; width: 500px;" /> -->
<div bind:this={divEl} class="h-screen" style="height: 500px; width: 500px;" />

<!-- </section> -->
<style>
</style>
