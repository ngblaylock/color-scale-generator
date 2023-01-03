<script lang="ts">
	import { onMount } from 'svelte';
	import { background, mode } from '$lib/stores';
	import chroma from 'chroma-js';

	export let label: string = '';
	export let value: string = '';
	export let hex: string = value.replace('#', '');
	export let r = 255;
	export let g = 255;
	export let b = 255;
	export let h = 360;
	export let s = 0.5;
	export let l = 0.5;

	const normalizeColors = () => {
		hex = chroma(value).hex().replace('#', '');
		let rgb = chroma(value).rgb();
		r = rgb[0];
		g = rgb[1];
		b = rgb[2];
		let hsl = chroma(value).hsl();
		h = hsl[0] || 360;
		s = hsl[1];
		l = hsl[2];
	};

	const updateMode = (mode: string) => {
		if (mode === 'RGB' && chroma.valid(`rgb(${r},${g},${b})`)) {
			normalizeColors();
			value = chroma(`rgb(${r}, ${g}, ${b})`).hex();
		} else if (mode === 'HSL' && chroma.valid(`hsl(${h}, ${s * 100}%, ${l * 100}%)`)) {
			normalizeColors();
			value = chroma(`hsl(${h}, ${s * 100}%, ${l * 100}%)`).hex();
		} else if (mode === 'HEX' && chroma.valid(hex)) {
			normalizeColors();
			value = chroma(hex).hex();
			// } else {
			// 	value = '#ffffff';
		}
	};

	$: updateMode($mode);
	$: {
		let rgb = `rgb(${r}, ${g}, ${b})`;
		let valid = chroma.valid(rgb);
		value = valid ? chroma(rgb).hex() : 'ffffff';
	}
	$: {
		let hsl = `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
		let valid = chroma.valid(hsl);
		value = valid ? chroma(hsl).hex() : 'ffffff';
	}
	$: {
		let valid = chroma.valid(hex);
		value = valid ? chroma(hex).hex() : 'ffffff';
	}

	const onHexBlur = () => {
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
	const onHslBlur = (color: 'h' | 's' | 'l') => {
		if (chroma.valid(`hsl(${h}, ${s * 100}%, ${l * 100}%)`)) {
			let hsl = chroma(`hsl(${h}, ${s * 100}%, ${l * 100}%)`).hsl();
			if (color == 'h') h = hsl[0] || 360;
			if (color == 's') s = hsl[1];
			if (color == 'l') l = hsl[2];
		} else {
			if (color == 'h') h = 360;
			if (color == 's') s = 0.5;
			if (color == 'l') l = 0.5;
		}
	};
</script>

{#if $mode === 'HEX'}
	<label class="flex">
		{#if label}
			<span class="mr-2">{label}</span>
		{/if}
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
		{#if label}
			<legend class=" float-left pr-2">{label}</legend>
		{/if}
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
{:else if $mode === 'HSL'}
	<fieldset class="flex">
		{#if label}
			<legend class=" float-left pr-2">{label}</legend>
		{/if}
		<span class="custom-input rounded-md">
			<span class="border-r">
				<label class="text-gray-500 pointer-events-none" for="h">H</label>
				<input
					type="number"
					id="h"
					min="0"
					max="360"
					bind:value={h}
					on:blur={() => onHslBlur('h')}
				/>
			</span>
			<span class="border-r">
				<label class="text-gray-500 pointer-events-none" for="s">S</label>
				<input
					type="number"
					id="s"
					min="0"
					max="1"
					step=".01"
					bind:value={s}
					on:blur={() => onHslBlur('s')}
				/>
			</span>
			<span>
				<label class="text-gray-500 pointer-events-none" for="l">L</label>
				<input
					type="number"
					id="l"
					min="0"
					max="1"
					step=".01"
					bind:value={l}
					on:blur={() => onHslBlur('l')}
				/>
			</span>
		</span>
	</fieldset>
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
		display: inline-block;
	}
	.custom-input input:focus {
		outline: none;
	}
</style>
