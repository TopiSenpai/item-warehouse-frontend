<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>Warehouse</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="switchTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" clipped app>
      <v-list shaped nav>
        <v-list-item :to="`/warehouses`" exact>
          <v-list-item-avatar tile>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Warehouses</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          :to="`/warehouses/${warehouse.id}`"
        >
          <v-list-item-avatar tile>
            <!--<v-img src="./assets/default_warehouse.png" />-->
            <v-icon>mdi-warehouse</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ warehouse.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" @click="logout()">
          <v-list-item-avatar tile>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view
        class="dashboard-navigation-view"
        :warehouses="warehouses"
        :loggedIn="loggedIn"
        :key="$route.path"
      />
    </v-main>

    <v-dialog
      v-if="!loggedIn && ready"
      :value="true"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title>Please login to continue</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="username"
            label="Username"
            placeholder="username"
            required
            autofocus
          />
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            placeholder="password"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import API from "./api";

export default {
  name: "App",

  data() {
    return {
      ready: false,
      errors: [],
      drawer: null,
      loading: false,
      loggedIn: false,
      modal: true,
      warehouses: [],
      username: "",
      password: "",
    };
  },

  created() {
    this.$vuetify.theme.dark = API.theme.isDark;
    this.loadData();
  },

  methods: {
    switchTheme() {
      let isDark = !API.theme.isDark;
      API.theme.setDark = isDark;
      this.$vuetify.theme.dark = isDark;
    },
    loadData() {
      if (API.authKey.get != null) {
        API.get("me").then(
          (response) => {
            this.loggedIn = response.status == 200;
            this.username = response.body.username;
            this.warehouses = response.body.warehouses;
            this.ready = true;
          },
          () => {
            this.loggedIn = false;
            this.ready = true;
          }
        );
      } else {
        this.ready = true;
      }
    },
    login() {
      API.post("login", {
        username: this.username,
        password: this.password,
      }).then(
        (response) => {
          API.authKey.set = response.body.session_id;
          this.loadData();
        },
        () => {
          // TODO
        }
      );
    },
    logout() {
      this.loading = true;
      API.authKey.set = "";
      this.loggedIn = false;
      this.username = "";
      this.password = "";
      this.warehouses = [];
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
@import "./style/style.less";

.dashboard-navigation-view {
  padding: 16px;
}

html {
  overflow-y: auto !important;
}
</style>
