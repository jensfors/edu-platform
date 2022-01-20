<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Editor from '$lib/Editor.svelte';
	import Counter from '$lib/Counter.svelte';
	import * as esbuild from 'esbuild-wasm';
	import { onMount } from 'svelte';
	import { unpkgPathPlugin } from '$lib/plugins/unpkg-path-plugin';
	import { fetchPlugin } from '$lib/plugins/fetch-plugin';

	let inputCode = 'console.log("demo input")';
	let outputCode = 'console.log(12345)';
	let iframe;

	const startEsbuild = async () => {
		await esbuild.initialize({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
		});
	};

	onMount(() => {
		console.log('------ Mounting esbuild -------');
		startEsbuild();
	});

	const onClick = async () => {
		if (!startEsbuild) {
			console.warn('Esbuild is not initialized');
			return;
		}
		console.log('iframe before');
		console.log(iframe);
		// Reset the context of the iframe before the user executes code
		// EX: the user could remove the body element and try to do stuff after that
		iframe.srcdoc = html;

		const result = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
			define: {
				// I think Svelte might do this it self since it self-corrects
				// depending on if it's run in prod or dev mode... hmm?
				// AND there is no error in the console like there was in the Next.js app
				// 'process.env.NODE_ENV': '"production"',
				global: 'window'
			}
		});

		console.log('this is the result');
		console.log(result);
		console.log(result.outputFiles[0].text);
		console.log('printing iframe');
		console.log(iframe);

		outputCode = result.outputFiles[0].text;
		console.log('output code');
		console.log(outputCode);
		console.log('html');
		console.log(html);

		iframe.contentWindow.postMessage(result.outputFiles[0].text, '*');
	};

	$: html1 = `
	   <script>${outputCode}<\/script>
	     `;

	let html = `
    <hmtl>
      <head></head>
      <body>
        <div id="root"></div>
        <script>\
          window.addEventListener('message', (event) => {\
            try {\
              eval(event.data);\
            } catch (error) {\
              const root = document.querySelector('#root');\
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';\
              console.error(error);\
            }\
          }, false);\
        <\/script>
      </body>
    </html>
      `;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h2>HERE COMES THE EDITOR COMPONENT</h2>
	<div>
		<Editor />
		<textarea bind:value={inputCode} on:input={({ target }) => (inputCode = target.value)} />
		<button on:click={onClick}> submit </button>
		<!-- <pre>{outputCode}</pre> -->
		<iframe title="preview" bind:this={iframe} sandbox="allow-scripts" srcDoc={html} />
	</div>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
