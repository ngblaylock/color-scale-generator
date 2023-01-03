<script lang="ts">
  import {background, mode, colorNum} from '$lib/stores';
  import ColorInput from '$lib/ColorInput.svelte';
  import ModeDropdown from '$lib/ModeDropdown.svelte';
  import ColorsNumInput from '$lib/ColorsNumInput.svelte';

</script>

<div class="flex gap-3">
  <ColorInput label="Background:" bind:value={$background} />
  <ModeDropdown label="Mode:" bind:value={$mode} />
  <ColorsNumInput label="Number of Colors:" bind:value={$colorNum} />
</div>
