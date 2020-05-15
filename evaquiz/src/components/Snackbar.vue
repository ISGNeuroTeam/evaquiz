<template>
  <v-snackbar
    v-model="visible"
    :timeout="timeout"
    :color="snackbar.color"
    :right="true"
    :top="true"
  >
    {{ snackbar.message }}
    <v-btn icon color="grey lighten-5" @click="close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  data() {
    return {
      visible: false,
      timeout: 4000,
      snackbar: {}
    };
  },
  computed: {
    ...mapState({
      snack: state => state.snack.snack
    })
  },
  watch: {
    snack: function() {
      this.snackbar = { ...this.snack };
      this.visible = true;
      this.timeout = 4000;
    }
  },
  methods: {
    close() {
      this.snackbar = {};
      this.visible = false;
      this.timeout = 0;
    }
  }
};
</script>
