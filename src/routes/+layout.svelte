<script lang="ts">
	import '../main.css';
	import { background } from '$lib/stores';
	import Footer from './Footer.svelte';
	import Settings from './Settings.svelte';
	import chroma from 'chroma-js';

	const getContrast = (background: string) => {
		if (chroma.valid(background)) {
			let white = chroma.contrast(background, 'white');
			let black = chroma.contrast(background, 'black');
			// console.log(
			// 	'Contrast:',
			// 	black > white ? black : white,
			// 	'\nAlt:',
			// 	black > white ? white : black
			// );
			return black < white ? 'dark' : 'light';
		} else {
			return 'light';
		}
	};

	$: theme = getContrast($background);
</script>

<div
	class="flex flex-col min-h-screen justify-between {theme == 'dark' ? 'text-white' : 'text-black'}"
	style="background: {chroma.valid($background) ? $background : 'white'};"
>
	<div class="p-4 flex justify-between items-center">
		<h1 class=" text-4xl">Color Scale Generator</h1>
		<Settings />
	</div>
	<div class="p-4">
		<slot />
	</div>
	<Footer />
</div>

<svelte:head>
	<title>Color Scale Generator</title>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#ffffff" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>
