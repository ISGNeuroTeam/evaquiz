<template>
  <v-app>
    <Header />
    <Snackbar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <div class="version">0.4.7</div>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar";
import Header from "@/components/Header";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Snackbar,
    Header
  },
  mounted() {
    this.getPermissions();
  },
  methods: {
    ...mapActions({
      getPermissions: "user/getPermissions"
    })
  }
};
</script>
<style>
* {
  font-family: "Roboto", sans-serif;
}
.version {
  color: white;
  text-align: right;
}
</style>
