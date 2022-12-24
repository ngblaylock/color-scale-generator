<script lang="ts">
	import { mode } from '$lib/stores';
	export let label: string = '';
	export let value: string = $mode;

	$: {
		$mode = value;
	}
</script>

<label class="flex">
	<span class="mr-2">{label}</span>
	<select bind:value class="rounded-md border px-1 border-black block">
		<option value="HEX">HEX</option>
		<option value="RGB">RGB</option>
		<option value="HSL">HSL</option>
	</select>
</label>
