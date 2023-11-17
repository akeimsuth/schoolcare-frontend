<template>
    <div>
        <NuxtPage/>
    </div>
</template>
<script setup>
  definePageMeta({
      middleware: 'auth',
      layout: 'admin'
  })
</script>