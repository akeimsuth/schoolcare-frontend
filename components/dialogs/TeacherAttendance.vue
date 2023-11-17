<script>
import Camera from "simple-vue-camera";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const user = await useStrapiUser()
const { findOne, create } = useStrapi()
export default {

  data() {
    return {
      validating: false,
      otp: '',
      timesheet: 'timesheet'
    };
  },
  setup() {
    const camera = ref(null);
    const timesheet = ref('timesheet')
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
        timesheet.value = 'timesheet'
      }, 5000);
    }
    // Use camera reference to call functions
    const snapshot = async () => {
      const blob = await camera.value?.snapshot();

      // To show the screenshot with an image tag, create a url
      const url = URL.createObjectURL(blob);
      console.log('URL: ', url);
      timesheet.value = 'pivk';
    }

    return {
      camera,
      snapshot,
      timesheet,
      showDateTime,
      clockInButtonText,
      currentTime,
      currentDate,
      startClockIn
    };
  },
  components: {
    Camera,
  },
  methods: {
    async submitOTP() {
      this.validating = true;
      const response = await findOne('teachers', user.id, {
        fields: ['pin'],
      })

      if (this.otp == response.data[0]?.attributes.pin) {
        console.log("SUCCESS");
        this.timesheet = 'picture';
        this.validating = false;
        this.otp = "";
      } else {
        this.validating = false;
        toast("PIN does not match records!", {
          autoClose: 2000,
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_LEFT
        });
        this.otp = "";
      }

    }
  },

};
</script>
<template>
  <v-card class="mx-auto" flat v-if="timesheet == 'timesheet'">
    <v-card-actions>

    </v-card-actions>
    <v-card-text>
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
    </v-card-text>
  </v-card>

  <v-card class="mx-auto" flat v-else-if="timesheet == 'picture'">
    <h3 class="text-center">Face Identification</h3>
    <p class="text-center">Please make sure your face is visible</p>
    <div style="width:575; height: 300">
      <camera :resolution="{ width: 575, height: 240 }" ref="camera" autoplay></camera>
    </div>
    <v-btn @click="snapshot" color="primary" block>Capture Image</v-btn>
  </v-card>

  <v-card class="mx-auto" flat width="500" v-else>
    <v-col cols="12">
      <!-- Clock-in Button -->
      <transition name="fade-transition">
        <div v-if="!showDateTime">
          <v-img src="https://img.freepik.com/free-vector/early-morning-concept-illustration_114360-7202.jpg"></v-img>
          <v-btn prepend-icon="mdi-clock-check-outline" size="x-large" @click="startClockIn" color="success" block>
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
</template>
