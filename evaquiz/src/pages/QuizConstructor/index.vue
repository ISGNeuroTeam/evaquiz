<template>
  <ConstrustorWrapper :type="$route.params.type" />
</template>

<script>
import ConstrustorWrapper from "./components/ConstrustorWrapper";
export default {
  name: "QuizConstructorPage",
  components: {
    ConstrustorWrapper
  },
  beforeDestroy() {
    this.$store.commit("quiz/SET_QUETIONS", []);
    this.$store.commit("quiz/CONSTRUCTORCOUNT_ZERO");
  }
};
</script>

<style>
.container {
  height: 100%;
}
</style>
