<template>
  <div>
    <p>чек-лист - {{ $route.params.id }}</p>
    <Questions />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Questions from "./components/Questions";
export default {
  name: "GeneratorPage",
  components: {
    Questions
  },
  mounted() {
    this.getQuestions(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getQuestions: "generator/getQuestions"
    })
  }
};
</script>
