<script lang="ts">
	export type ViewOption = 'preview' | 'code';

	let {
		value = $bindable('preview' as ViewOption)
	}: {
		value?: ViewOption;
	} = $props();
</script>

{#if value === 'preview'}
	<forge-button variant="tonal" onclick={() => (value = 'code')}>
		<forge-icon name="code" external></forge-icon>
		<span>View source</span>
	</forge-button>
{:else}
	<forge-button variant="tonal" onclick={() => (value = 'preview')}>
		<forge-icon name="preview" external></forge-icon>
		<span>Show preview</span>
	</forge-button>
{/if}
