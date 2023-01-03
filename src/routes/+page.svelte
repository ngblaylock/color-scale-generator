<script lang="ts">
	import { background, mode, colorNum } from '$lib/stores';
	import chroma from 'chroma-js';
	import Icon from '@iconify/svelte';
	import ColorInput from '$lib/ColorInput.svelte';
	import { onMount } from 'svelte';

	let colors: string[] = [];

	const getContrast = (color: string | undefined) => {
		if (!color) return;
		let black = chroma.contrast(color, 'black');
		let white = chroma.contrast(color, 'white');
		return black < white ? 'white' : 'black';
	};
	const getBackground = (color: string | undefined, index: number) => {
		let background = color;
		let i = index;
		if (!background) {
			background = `#f9f9f9`;
			let pinned = pinnedIndexes();
			if (pinned.length) {
				// there are pinned colors in the middle
			} else {
				let min = 0;
				let max = colors.length - 1;
				background = chroma
					.scale([colors[min], colors[max]])(index / max)
					.hex();
			}
		}
		return background;
	};
	const getStyle = (color: string | undefined, index: number) => {
		return `background: ${getBackground(color, index)}; color: ${getContrast(
			getBackground(color, index)
		)}`;
	};
	const updateNumColors = (colorNum: number) => {
		let tempColors = [];
		
		tempColors.push(colors[0] || '#ffffff');
		let i = colorNum - 2;
		for (let x = 0; x < i; x++) {
			tempColors.push('');
		}
		tempColors.push(colors[colors.length - 1] || '#000000');
		colors = tempColors;
	};

	$: pinnedIndexes = () => {
		let pi: number[] = [];
		colors.forEach((color, index) => {
			if (color && index !== 0 && index !== colors.length - 1) {
				pi.push(index);
			}
		});
		return pi;
	};

	$: updateNumColors($colorNum);
</script>

<div class="flex justify-center">
	{#each colors as color, index}
		<div class="color-box" style={getStyle(color, index)}>
			<div>
				<div class="flex flex-1 justify-center mb-2">
					{#if color}
						{#if index !== 0 && index !== colors.length - 1}
							<button><Icon width="20" icon="mdi:drag" /></button>
							<button on:click={() => (color = '')}><Icon width="20" icon="mdi:pin" /></button>
						{/if}
						<button><Icon width="20" icon="mdi:eyedropper-variant" /></button>
					{:else}
						<button on:click={() => (color = '#ffffff')} class="pin-color"
							><Icon width="20" icon="mdi:pin-outline" /></button
						>
					{/if}
				</div>
				{#if color}
					<ColorInput bind:value={color} />
				{:else}
					<div class="flex justify-center uppercase">{getBackground(color, index)}</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.color-box {
		background: gray;
		min-width: 80px;
		min-height: 120px;
		padding: 8px;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
	.pin-color {
		opacity: 0;
		transition: 0.2s;
	}
	.color-box:hover .pin-color,
	.pin-color:focus {
		opacity: 1;
	}
</style>
