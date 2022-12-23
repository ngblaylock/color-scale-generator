<script lang="ts">
	import '../main.css';
	import Footer from './Footer.svelte';
	import chroma from 'chroma-js';

	let background: string = '#f8f8f8';

	const getContrast = (background: string) => {
		if (chroma.valid(background)) {
			let white = chroma.contrast(background, 'white');
			let black = chroma.contrast(background, 'black');
			console.log('background', background, 'white', white, 'black', black);
			return black < white ? 'dark' : 'light';
		} else {
			return 'light';
		}
	};

	$: theme = getContrast(background);
</script>

<div
	class="flex flex-col min-h-screen justify-between {theme == 'dark' ? 'text-white' : 'text-black'}"
	style="background: {chroma.valid(background) ? background : 'white'};"
>
	<div class="p-4 flex justify-between items-center">
		<h1 class=" text-4xl">Color Scale Generator</h1>
		<div>
			<label>Background <input type="text" bind:value={background} /></label>
		</div>
	</div>
	<div class="p-4">
		<slot />
	</div>
	<Footer />
</div>


<style>
	input{
		color: black;
	}
</style>