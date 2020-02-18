<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item-group v-for="(item, idx) in menus" :key="idx">
            <router-link :to="item.url">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Todolist</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <router-view />
          </v-layout>
        </v-container>
      </v-content>

      <v-footer app>
        <span>&copy; 2020</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
export default {
  name: "",
  vuetify: new Vuetify({
    theme: { dark: true }
  }),
  icons: {
    iconfont: "mdi"
  },
  data: () => ({
    drawer: null,
    menus: [
      { name: "Home", icon: "dashboard", url: "/" },
      { name: "About", icon: "settings", url: "/about" }
    ]
  })
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i&display=swap");
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

body {
  font-family: "Roboto", sans-serif;

  a {
    text-decoration: none;
    color: white;
  }
  .v-layout {
    position: relative;
  }
}
</style>
