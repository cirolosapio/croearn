<template>
  <div />
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const notification = useNotification()

watchEffect(() => {
  if (needRefresh.value) {
    const n = notification.info({
      content: 'Nuovo aggiornamento disponibile',
      // closable: false,
      meta: 'Si prega di aggiornare la pagina',
      onClose: () => {
        needRefresh.value = false
        n.destroy()
      },
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              updateServiceWorker()
              n.destroy()
            },
          },
          { default: () => 'Aggiorna' },
        ),
    })
  }
})
</script>
