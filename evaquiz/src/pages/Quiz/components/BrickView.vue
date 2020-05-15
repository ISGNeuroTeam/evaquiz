<template>
  <div class="qp_main">
    <QuizCart v-for="quiz in quizs" :key="quiz.id" :quiz="quiz" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuizCart from "./QuizCart";

export default {
  name: "BrickView",
  components: {
    QuizCart
  },

  computed: {
    ...mapGetters({
      quizs: "quiz/filterQuizs"
    })
  }
};
</script>

<style scoped>
.qp_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}
</style>
