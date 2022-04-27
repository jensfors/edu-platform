<script lang="ts">
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import type monaco from 'monaco-editor'
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
  import prettier from 'prettier'
  import type { Options } from 'prettier'
  import parser from 'prettier/parser-babel'

  export let initialValue: string
  export let language: string
  export let onChange: (value: string) => string
  let parentStyles = $$props.class // use $$props to access the parent's props which has the normal styles

  let divEl: HTMLDivElement = null
  let editor: monaco.editor.IStandaloneCodeEditor
  let options: monaco.editor.IStandaloneEditorConstructionOptions = {
    value: initialValue,
    language: language,
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

      let Monaco = await import('monaco-editor')
      editor = Monaco.editor.create(divEl, options)

      // Just a  console log to make sure we actually didn't break something so far
      console.log('Editor text when mounted: ', editor.getModel().getValue())
      editor.getModel().onDidChangeContent(() => {
        onChange(editor.getModel().getValue())
      })

      return () => {
        editor.dispose()
      }
    })
  }

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

<div class="editor-wrapper">
  <div class="min-h-full" bind:this={divEl} />
  <button
    class="button-format btn btn-outline btn-secondary btn-sm absolute top-1 right-1 z-20 opacity-0 hover:opacity-100 duration-300"
    on:click={formatOnClick}>Format</button
  >
</div>

<style>
  .editor-wrapper {
    /* Use this if we want height to be auto instead of set from consuming parent */
    @apply relative h-full;
    /* @apply relative; */
  }

  .editor-wrapper .button-format {
    @apply absolute -top-[72px] right-2 z-20 opacity-0 duration-300;
  }

  .editor-wrapper:hover .button-format {
    @apply opacity-100;
  }
</style>
