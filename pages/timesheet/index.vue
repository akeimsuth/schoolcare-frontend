<template>
    <VContainer fluid class="fill-height">
        <v-btn>
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <VCol>
            <v-card class="mx-auto" flat color="transparent" max-width="500">
                <h2 class="text-center">Enter Your Pin</h2>
                <p class="text-center">This will allow you to continue to mark your attendance</p>
                <v-otp-input v-model="otp" :disabled="validating"></v-otp-input>
                <v-layout class="d-flex justify-center">

                    <v-btn :loading="validating" @click="submitOTP" class="my-4 justify-center" color="purple" height="40"
                        text="Verify" variant="flat" width="70%"></v-btn>

                </v-layout>
                <div class="text-caption text-center">
                    Don't remember your PIN? <NuxtLink to="/help">
                        <span class="text-blue-lighten-2" @click.prevent="otp = ''">Contact
                            Administrator</span>
                    </NuxtLink>
                </div>
            </v-card>
        </VCol>
    </VContainer>
</template>
<script setup>
definePageMeta({
    middleware: 'auth'
})
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const user = await useStrapiUser()
const { findOne } = useStrapi()

const otp = ref("");
const validating = ref(false);
const submitOTP = async () => {
    validating.value = true;
    const response = await findOne('teachers', user.id, {
        fields: ['pin'],
    })

    if (otp.value == response.data[0]?.attributes.pin) {
        console.log("SUCCESS");
        await navigateTo('/timesheet/snapshot');
    } else {
        validating.value = false;
        toast("PIN does not match records!", {
            autoClose: 2000,
            type: toast.TYPE.ERROR,
            position: toast.POSITION.TOP_LEFT
        });
        otp.value = "";
    }

}

</script>