<template>
  <QuizsView />
</template>

<script>
import { mapActions } from "vuex";
import QuizsView from "./components/QuizsView";

export default {
  name: "QuizsPage",
  components: {
    QuizsView
  },
  mounted() {
    this.getQuizs();
  },
  methods: {
    ...mapActions({
      getQuizs: "quiz/getQuizs"
    })
  }
};
</script>
