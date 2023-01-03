<script lang="ts">
	import { background, mode } from '$lib/stores';
	import chroma from 'chroma-js';
	import Icon from '@iconify/svelte';
	import ColorInput from '$lib/ColorInput.svelte';
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
			background = `#${index}${index}${index}${index}${index}${index}`;
			let pinned = pinnedIndexes();
			if(pinned.length){
				// there are pinned colors in the middle
			} else{
				// there aren't pinned colors in the middle. Get colors.length
				let min = 0;
				let max = colors.length - 1;
				background = chroma.scale([colors[min].code, colors[max].code])(index / 6).hex();
				
			}
		}
		return background;
	};
	const getStyle = (color: string | undefined, index: number) => {
		return `background: ${getBackground(color, index)}; color: ${getContrast(
			getBackground(color, index)
		)}`;
	};
	let colors = [
		{
			code: '#ffffff'
		},
		{
			code: ''
		},
		{
			code: ''
		},
		{
			code: ''
		},
		{
			code: ''
		},
		{
			code: ''
		},
		{
			code: '#000000'
		}
	];
	$: pinnedIndexes = () => {
		let pi: number[] = [];
		colors.forEach((color, index) => {
			if (color.code && index !== 0 && index !== colors.length - 1) {
				pi.push(index);
			}
		});
		return pi;
	};
</script>

<div class="flex justify-center">
	{#each colors as color, index}
		<div class="color-box" style={getStyle(color.code, index)}>
			<div>
				<div class="flex flex-1 justify-center mb-2">
					{#if color.code}
						{#if index !== 0 && index !== colors.length - 1}
							<button><Icon width="20" icon="mdi:drag" /></button>
							<button on:click={() => (color.code = '')}><Icon width="20" icon="mdi:pin" /></button>
						{/if}
						<button><Icon width="20" icon="mdi:eyedropper-variant" /></button>
					{:else}
						<button on:click={() => (color.code = '#ffffff')} class="pin-color"
							><Icon width="20" icon="mdi:pin-outline" /></button
						>
					{/if}
				</div>
				{#if color.code}
					<ColorInput bind:value={color.code} />
				{:else}
					<div class="flex justify-center uppercase">{getBackground(color.code, index)}</div>
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
