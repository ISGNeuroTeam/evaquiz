import Vue from "vue";
import VueJWT from "vuejs-jwt";

Vue.use(VueJWT, { storage: "cookie", keyName: "eva_token" });

export default VueJWT;
