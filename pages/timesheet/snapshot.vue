<template>
    <v-container fluid class="d-flex justify-center">
        <v-card class="mx-auto" flat color="transparent" max-width="500">
            <h3 class="text-center">Face Identification</h3>
            <p class="text-center">Please make sure your face is visible</p>
            <canvas ref="canvasElement" style="display: none;"></canvas>
            <v-img :src="capturedImage" v-if="capturedImage" width="500" height="480"></v-img>
            <video v-else ref="videoElement" width="500" height="480" autoplay></video>
            <NuxtLink v-if="capturedImage" to="/timesheet/clock-in">
                <v-btn color="primary" block>Continue</v-btn>
            </NuxtLink>
            <v-btn v-else @click="captureImage" color="primary" block>Capture Image</v-btn>

        </v-card>
    </v-container>
</template>
  
<script>
export default {
    
    data() {
        return {
            capturedImage: null,
            videoStream: null,
            captureButton: 'CaptureImage'
        };
    },
    
    methods: {
        async startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.videoElement.srcObject = stream;
                this.videoStream = stream;
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        },
        async captureImage() {
            const video = this.$refs.videoElement;
            const canvas = this.$refs.canvasElement;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageDataURL = canvas.toDataURL('image/jpeg');
            this.capturedImage = imageDataURL;
            console.log({imageDataURL});
            localStorage.setItem('image', imageDataURL);
            this.destroyCamera();
        },
        destroyCamera() {
        if (this.videoStream) {
            this.videoStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    },
    },
    mounted() {
        this.startCamera();
    },

};
</script>
  
<style>
/* Add your custom styles here */
</style>
  