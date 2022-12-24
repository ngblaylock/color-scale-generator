<script lang="ts">
	import { onMount } from 'svelte';
	import { background, mode } from '$lib/stores';
	import chroma from 'chroma-js';

	export let label: string = '';
	export let value: string = '';
	export let hex: string = '';
	export let r = 255;
	export let g = 255;
	export let b = 255;

	$: {
		if ($mode == 'RGB' && chroma.valid(`rgb(${r},${g},${b})`)) {
			value = chroma(`rgb(${r}, ${g}, ${b})`).hex();
			hex = chroma(`rgb(${r},${g},${b})`).hex().replace('#', '');
		} else if ($mode == 'HEX' && chroma.valid(hex)) {
			value = chroma(hex).hex();
			let rgb = chroma(hex).rgb();
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
		} else {
			value = '#ffffff';
		}
	}

	onMount(() => {
		hex = $background.replace('#', '');
	});
	const onHexBlur = () => {
		console.log('blurred');
		if (chroma.valid(hex)) {
			hex = chroma(hex).hex().replace('#', '');
		} else {
			hex = 'ffffff';
		}
	};
	const onRgbBlur = (color: 'r' | 'g' | 'b') => {
		if (chroma.valid(`rgb(${r}, ${g}, ${b})`)) {
			let rgb = chroma(`rgb(${r}, ${g}, ${b})`).rgb();
			if (color == 'r') r = rgb[0];
			if (color == 'g') g = rgb[1];
			if (color == 'b') b = rgb[2];
		} else {
			if (color == 'r') r = 255;
			if (color == 'g') g = 255;
			if (color == 'b') b = 255;
		}
	};
</script>

{#if $mode === 'HEX'}
	<label class="flex">
		<span class="mr-2">{label}</span>
		<span class="custom-input rounded-md">
			<span class=" text-gray-500 pointer-events-none">#</span>
			<input
				type="text"
				bind:value={hex}
				class="focus:ring-0 focus:ring-offset-0"
				on:blur={onHexBlur}
			/>
		</span>
	</label>
{:else if $mode === 'RGB'}
	<fieldset class="flex">
		<legend class=" float-left pr-2">{label}</legend>
		<span class="custom-input rounded-md">
			<span class="border-r">
				<label class="text-gray-500 pointer-events-none" for="r">R</label>
				<input
					type="number"
					id="r"
					min="0"
					max="255"
					bind:value={r}
					on:blur={() => onRgbBlur('r')}
				/>
			</span>
			<span class="border-r">
				<label class="text-gray-500 pointer-events-none" for="g">G</label>
				<input
					type="number"
					id="g"
					min="0"
					max="255"
					bind:value={g}
					on:blur={() => onRgbBlur('g')}
				/>
			</span>
			<span>
				<label class="text-gray-500 pointer-events-none" for="b">B</label>
				<input
					type="number"
					id="b"
					min="0"
					max="255"
					bind:value={b}
					on:blur={() => onRgbBlur('b')}
				/>
			</span>
		</span>
	</fieldset>
{:else}
	Oops
{/if}

<style>
	.custom-input {
		background: white;
		border: 1px solid black;
		padding: 0 2px 0 6px;
	}
	.custom-input input {
		background: transparent;
		max-width: 48px;
		text-align: center;
	}
	.custom-input input:focus {
		outline: none;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
