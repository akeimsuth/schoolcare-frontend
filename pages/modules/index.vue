<template>
    <v-layout>
        <v-app-bar color="teal-darken-4">
            <v-app-bar-title class="text-subtitle-2"> 👋 Welcome {{ user?.email }}</v-app-bar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon @click="onClick">mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>

            <VContainer fluid class="fill-height">
                <VCol>
                    <h6>Please select one of the modules listed to continue</h6>
                    <v-card class="mx-auto bg-none" flat color="transparent" max-width="500">
                        <v-row dense>
                            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                                <NuxtLink :to="card.url">

                                    <v-card class="mod-card">
                                        <v-img :src="card.src" class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                            <v-card-title class="text-white" v-text="card.title"></v-card-title>
                                        </v-img>
                                    </v-card>


                                </NuxtLink>
                            </v-col>
                        </v-row>
                    </v-card>
                </VCol>
            </VContainer>
        </v-main>
    </v-layout>
</template>
<script setup>
definePageMeta({
    middleware: 'auth'
})
const user = await useStrapiUser()
const { logout } = useStrapiAuth()
const onClick = () => {
    //logout()
    navigateTo("/admin")
}
const cards = [
    { title: 'Timesheet', src: 'https://www.zoho.com/invoice/what-is-a-timesheet/what-is-a-timesheet-1x.png', url: "/timesheet", flex: 12 },
    { title: 'Pickup/Drop Off', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', url: "", flex: 6 },
    { title: 'Attendance', src: 'https://3.files.edl.io/c1e3/23/07/17/210826-73b99a8c-0bee-466f-bb7b-bc0f264a2125.png', url: "", flex: 6 },
]
</script>
<style>
.mod-card:hover {
    border: 2px solid rgb(0, 123, 255);
}
</style>