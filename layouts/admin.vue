<template>
    <v-app id="default">
        <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app floating
            styles="height: calc(100% - 2rem); top: 0px; max-height: calc(100% - 0px)" class="elevation-8">
            <nuxt-link to="/" class="no-underline success--text">
                <v-flex align-self-center class="text-center justify-center align-center" style="height: 33px">
                    <h4 class="my-6" v-text="title" />
                </v-flex>
            </nuxt-link>

            <v-list v-for="(item, i) in items">
                <v-list-item :key="item.title" :to="item.to" exact :ripple="false">
                    <v-row @click="openTimeSheet(item.title)" style="cursor: pointer">
                        <v-col style="flex-grow: 0;">
                            <v-list-item-action>
                                <v-icon size="small" :color="item.color" center>{{ item.icon }}</v-icon>
                            </v-list-item-action>
                        </v-col>
                        <v-col>
                            <v-list-item-title class="text-caption" v-text="item.title"></v-list-item-title>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar elevate-on-scroll>
            <v-app-bar-nav-icon :class="drawer ? '' : 'menu-toggle'" @click.stop="drawer = !drawer" />
            <!-- <v-btn small icon :class="drawer ? '' : 'd-none'" @click.stop="miniVariant = !miniVariant">
                <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn> -->
            <h4>Welcome back, John 👋</h4>
            <v-spacer />
            <v-col align-self="center">
                <v-text-field density="compact" class="search" v-model="search" :full-width="true" :hide-details="true"
                    :height="`50%`" placeholder="Search" name="search" prepend-inner-icon="mdi-magnify" maxlength="20" dense
                    solo flat @focus="searchFocus" @focusout="searchFocus">
                </v-text-field>
            </v-col>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props">
                        <v-avatar color="primary" size="35" v-html="title.substring(0, 1)"></v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in subitems" :key="index" :value="index">
                        <v-row @click="item.action" style="cursor: pointer">
                            <v-col style="flex-grow: 0;">
                                <v-list-item-action>
                                    <v-icon size="small" center>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                            </v-col>
                            <v-col>
                                <v-list-item-title class="text-caption" v-text="item.title"></v-list-item-title>
                            </v-col>
                            </v-row>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!-- <v-btn small icon>
                <v-icon @click="signOut">mdi-logout</v-icon>
            </v-btn> -->
            <!-- <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list class="pl-2 pr-4">
            <v-list-item :to="`/sign-in`">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="`/profile`">
              <v-list-item-icon>
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Profile </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings">
              <v-list-item-icon>
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ title }} Setting </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu> -->
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
        </v-main>
        <v-dialog v-model="timesheet" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary" density="compact" class="text-center">
                    <v-btn icon dark @click="closeTimeSheet">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Teacher Attendance</v-toolbar-title>
                </v-toolbar>
                <TeacherAttendance />
            </v-card>
        </v-dialog>
        <v-dialog v-model="student" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary" density="compact" class="text-center">
                    <v-btn icon dark @click="closeStudent">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Student Attendance</v-toolbar-title>
                </v-toolbar>
                <StudentAttendance />
            </v-card>
        </v-dialog>
        <v-dialog v-model="pinScreen" transition="dialog-bottom-transition">
            <v-card class="mx-auto" flat>

                <v-card-text>
                    <h2 class="text-center">Enter Your Pin</h2>
                    <p class="text-center">To close window</p>
                    <v-otp-input v-model="otp" :disabled="validating"></v-otp-input>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                    <v-btn @click="pinScreen = false">DISCARD</v-btn>
                    <v-btn @click="closeDialog" color="primary">VERIFY</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay v-if="$nuxt.isOffline" :value="overlay" z-index="1000">
            <v-banner color="warning" single-line @click:icon="alert">
                <v-icon slot="icon" color="light" size="36">
                    mdi-wifi-strength-alert-outline
                </v-icon>
                <span class="white--text">Unable to verify your Internet connection</span>
                <template v-slot:actions>
                    <v-btn class="white--text" color="warning" text flat fab @click="overlay = !overlay">
                        <v-icon> mdi-window-close </v-icon>
                    </v-btn>
                </template>
            </v-banner></v-overlay>
    </v-app>
</template>
  
<script setup>
import { mapState } from 'vuex'
import TeacherAttendance from '~/components/dialogs/TeacherAttendance.vue';
import StudentAttendance from '~/components/dialogs/StudentAttendance.vue';
const { logout } = useStrapiAuth()
const title = 'SchoolCare';
const company = 'Company';
const otp = ref('');
const drawer = ref(true)
const overlay = ref(true);
const miniVariant = ref(false)
const right = ref(true)
const timesheet = ref(false);
const student = ref(false);
const pinScreen = ref(false);
const timeDialog = ref('timesheet');
const fab = ref(true)
const darkmode = ref(false)
const searchLength = ref(false)
const search = ref('')

const items = ref([
    {
        icon: 'mdi-apps',
        title: 'Dashboard',
        to: '/admin',
        color: 'blue'
    },
    {
        icon: 'mdi-person',
        title: 'Staff',
        to: '/admin/users',
        color: 'orange'
    },
    {
        icon: 'mdi-people',
        title: 'Students',
        to: '/#',
        color: 'purple'
    },
    {
        icon: 'mdi-clock-outline',
        title: 'Teacher Attendance',
        color: 'green'
    },
    {
        icon: 'mdi-people-outline',
        title: 'Student Attendance',
        color: 'brown'
    },
])
const subitems = ref([
    {
        icon: 'mdi-account-circle-outline',
        title: 'Profile',
        to: '/admin/users',
    },
    {
        icon: 'mdi-logout',
        title: 'Logout',
        to: '/#',
        action: signOut
    }
])
const openTimeSheet = (title) => {
    if (title === 'Teacher Attendance') {
        timesheet.value = true;
    } else if(title === 'Student Attendance'){
        student.value = true;
    }
}

const closeTimeSheet = () => {
    pinScreen.value = true;
}
const closeStudent = () => {
    student.value = false;
}
const closeDialog = () => {
    pinScreen.value = false;
    timesheet.value = false;
}
const searchFocus = () => {
    searchLength.value = !searchLength.value
    search.value = ''
}
function signOut() {
    logout();
    navigateTo("/")
}
//   function onScroll(e) {
//     if (typeof window === 'undefined') return
//     const top = window.pageYOffset || e.target.scrollTop || 0
//     this.fab = top > 20
//   }
//   function toTop() {
//     const { $vuetify } = this
//     $vuetify.goTo(0)
//   }
</script>
<style>
.search>div.v-field__outline {
    --v-field-border-width: 0px;
}

.v-list {
    padding: 0px !important;
}

.v-list-item--active {
    background: #3c4fe0 !important;
    color: white !important;
    border-radius: 1rem !important;
    /* padding: 0; */
    margin: 10px 10px !important;
    /* box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
    transform: translateY(2px); */
}

.v-list-item {
    margin: 10px 10px;
}

.v-main {
    background-color: #7393b32b;
}

.v-toolbar__content {
    background-color: #7393b32b;
}
</style>
