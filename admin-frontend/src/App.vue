<template>
  <v-app>
    <div id="header">
      <v-toolbar app>
        <div class="logo">
          <v-img class="lipster" :src="require('./assets/logo-3.png')"/>
        </div>
        <v-spacer></v-spacer>
        <!-- <v-toolbar-items>
          <v-btn flat to="/Lipsticks">Lipsticks</v-btn>
          <v-btn flat to="/Trends">Trends</v-btn>
        </v-toolbar-items>
        <v-btn flat href="#" target="_blank">
          <span class="mr-2">Logout</span>
        </v-btn> -->
      </v-toolbar>
    </div>

    <v-content>
      <div id="nav">
        <v-navigation-drawer permanent>
          <v-list dense class="pt-0">
            <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
              <v-list-tile-action>
                <img v-bind:src="item.image" class="nav-icon">
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title class="nav-title">{{ item.title }}</v-list-tile-title>
                
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </div>

      <div id="container">
        <!-- <Lipsticks/> -->
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      items: [
        { title: "Lipstick", image: require('./assets/lipstick.png'), link: '/Lipsticks'},
        { title: "Trend", image: require('./assets/mirror.png'), link: '/Trends'},
        { title: "Logout", image: require('./assets/exit.png'), link: '/'}
      ],
      right: null
    };
  },
  method: {
    linkToPage(title){

    }
  }
};
</script>

