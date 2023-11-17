<template>
    <v-container fluid class="d-flex align-center justify-center" style="min-height: 100vh;">
        <VCol>
            <v-card class="mx-auto" flat color="transparent" max-width="500">
                <v-col cols="12">
                    <!-- Clock-in Button -->
                    <transition name="fade-transition">
                        <div v-if="!showDateTime">
                            <v-img
                                src="https://img.freepik.com/free-vector/early-morning-concept-illustration_114360-7202.jpg"></v-img>
                            <v-btn prepend-icon="mdi-clock-check-outline" size="x-large" @click="startClockIn"
                                color="success" block>
                                {{ clockInButtonText }}
                            </v-btn>
                        </div>
                    </transition>
                    <!-- Date and Time Display -->
                    <transition name="slide-x-transition">
                        <div v-if="showDateTime">
                            <v-img
                                src="https://static.vecteezy.com/system/resources/previews/022/020/649/original/teacher-giving-lesson-to-her-students-in-classroom-teaching-concept-illustration-vector.jpg"></v-img>
                            <div class="text-center">
                                <h3 class="headline">You Logged In At:</h3>
                                <p>{{ currentDate + " - " + currentTime }}</p>
                            </div>
                        </div>
                    </transition>
                </v-col>
            </v-card>
        </VCol>
    </v-container>
</template>
  
<script setup>
definePageMeta({
    middleware: 'auth'
})
const user = useStrapiUser()
const { create } = useStrapi()
const showDateTime = ref(false);
const clockInButtonText = ref('Clock In')
const currentTime = ref('')
const currentDate = ref('')
const startClockIn = () => {
    showDateTime.value = true;
    clockInButtonText.value = 'Clock Out';
    updateDateTime();
}
const updateDateTime = async () => {
    const now = new Date();
    currentDate.value = now.toLocaleDateString();
    currentTime.value = now.toLocaleTimeString();
    await create('time-sheets', { date: currentDate.value, time: currentTime.value, hours_worked: 0.0, staff_id: user.id, image: localStorage.getItem('image') })
    console.log("DATE: ", currentDate.value, currentTime.value, user);
    setTimeout(async () => {
        await navigateTo("/modules")
    }, 5000);
}
const getHoursDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600);

</script>
  