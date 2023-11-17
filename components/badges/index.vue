<template>
    <v-row v-if="items && items.length">
      <v-col
        v-for="item in items"
        :key="item.title.replace(' ', '_')"
        cols="6"
        sm="3"
      >
        <v-card height="100%" class="card">
          <v-container fluid>
            <h3 class="text-caption">{{ item.title }}</h3>
            <v-row height="100%">
              <v-col>
                <h4
                  class="grey--text text-h5 text-lg-h5 font-weight-bold lh-normal"
                >
                  {{ item.summary }}
                </h4>
                <h5 class="font-weight-normal grey--text">{{ item.total }}</h5>
              </v-col>
              <v-col align-self="center" align="center">
                <v-icon size="60" :color="item.color">{{ item.icon }}</v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    name: 'CardSummary',
    data() {
      return {
        items: [
          {
            title: 'Staff',
            summary: '5230',
            color: 'green',
            icon: 'mdi-person'
          },
          {
            title: 'Students',
            summary: '6424',
            color: 'warning',
            icon: 'mdi-people'
          },
          {
            title: 'Staff Attendance',
            summary: '39',
            color: 'red',
            total: 100,
            icon: 'mdi-chart-areaspline'
          },
          {
            title: 'Student Attendance',
            summary: '41',
            total: '100',
            color: 'orange',
            icon: 'mdi-gesture-double-tap'
          }
        ]
      }
    }
  }
  </script>