<template>
  <v-app dark fill-height fluid>
    <v-navigation-drawer v-model="drawer" fixed app style="max-height: 100%">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="userInfo.picture"></v-img>
          </v-list-item-avatar>
          <v-col class="pa-0 d-inline-block text-truncate">
            <v-list-item-title>
              {{ userInfo.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ userInfo.email }}
            </v-list-item-subtitle>
          </v-col>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/" router>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Coin Market</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer class="justify-center" app style="bottom: 0px">
        <v-btn color="primary" block @click="logout"> Logout </v-btn>
      </v-footer>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Traders</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    userInfo() {
      return this.$auth.user;
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
