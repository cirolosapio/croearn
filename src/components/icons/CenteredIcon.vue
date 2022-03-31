<template>
  <div w-full flex justify-center items-center>
    <slot v-if="$slots.default" />
    <div v-else v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CenteredIcon',
  inheritAttrs: false,
})
</script>
