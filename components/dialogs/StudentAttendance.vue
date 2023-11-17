<script setup>
const itemsPerPage = ref();
const loading = ref(true);
const serverItems = ref([]);
const search = ref('');
const headers = ref([]);
const totalItems = ref(0);
const loadItems = ref([]);
</script>
<template>
    <v-container fluid>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalItems"
          :items="serverItems"
          :loading="loading"
          :search="search"
          class="elevation-1"
          item-value="name"
          @update:options="loadItems"
        ></v-data-table-server>
    </v-container>
  </template>