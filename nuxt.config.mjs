export default {
  head: {
    title: "hello-hary",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: ["@nuxtjs/vuetify"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  auth: {
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        codeChallengeMethod: "",
        responseType: "token id_token",
      },
    },
  },
  axios: {
    baseURL: "/",
  },
  proxy: {},
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      themes: {},
    },
  },
  build: {},
  serverMiddleware: ["~/server.mjs"],
};
