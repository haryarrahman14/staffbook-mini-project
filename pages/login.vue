<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4" rows="10">
      <v-card class="mb-2">
        <v-card-title class="align-center">
          <p class="mb-0 mr-1">Login with Google</p>
          <v-img
            max-width="30"
            height="30"
            :src="require('~/static/images/google.webp')"
          />
        </v-card-title>

        <v-card-subtitle class="mt-2">
          Please login to your Google account.
        </v-card-subtitle>
        <v-card-actions style="left: 0px">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="loginWithGoogle">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "unauthenticated",
  layout: "unauthenticated",
  methods: {
    async loginWithGoogle() {
      await this.$auth.loginWith("google");
    },
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },

    userInfo() {
      return this.$auth.user;
    },
  },
};
</script>
