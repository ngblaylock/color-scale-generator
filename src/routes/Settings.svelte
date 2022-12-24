<script lang="ts">
  import {background, mode} from '$lib/stores';
  import ColorInput from '$lib/ColorInput.svelte';
  import ModeDropdown from '$lib/ModeDropdown.svelte';

</script>

<div class="flex gap-3">
  <ColorInput label="Background" bind:value={$background} />
  <ModeDropdown label="Mode" bind:value={$mode} />
</div>
