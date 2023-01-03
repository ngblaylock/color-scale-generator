<script lang="ts">
	import { colorNum } from '$lib/stores';
	export let label: string = '';
	export let value: number = $colorNum;

	const blurColorNumInput = () => {
		if(value < 2) value = 2
	}

	$: {
		$colorNum = value;
	}
</script>

<label class="flex">
	<span class="mr-2">{label}</span>
	<input type="number" bind:value class=" w-8 rounded-md border border-black text-center" on:blur={blurColorNumInput}>
</label>
