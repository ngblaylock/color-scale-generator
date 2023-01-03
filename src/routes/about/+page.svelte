<script>
  import Icon from '@iconify/svelte'
</script>

<div class=" max-w-lg mx-auto">
	<h2 class="text-3xl mb-3">About</h2>
	<p>
		This color scale generator was a tool I made for myself to easily generate colors on a scale
		from 50-900 (see <a
			href="https://m2.material.io/design/color/the-color-system.html"
			target="_blank"
			rel="noreferrer">material design colors</a
		>). I also wanted to make sure that it was flexible enough that you could select specific colors
		within the color scale itself, change the number of colors, or provide a different color mode.
	</p>
	<p class="my-3">
		This app was inspired by <a
			href="https://hihayk.github.io/scale"
			target="_blank"
			rel="noreferrer">hihayk.github.io/scale</a
		>
		and
		<a href="https://colordesigner.io/gradient-generator" target="_blank" rel="noreferrer"
			>colordesigner.io/gradient-generator</a
		>.
	</p>
	<p class="my-3">
		Any issues can be submitted on <a
			href="https://github.com/ngblaylock/color-scale-generator/issues"
			target="_blank"
			rel="noreferrer">GitHub</a
		>.
	</p>
	<hr class="border-gray-300" />
	<div class="mt-4"><a href="/" class="flex items-center gap-1"><Icon icon="mdi:arrow-left"></Icon> Back to the Color Scale Generator App</a></div>
</div>
