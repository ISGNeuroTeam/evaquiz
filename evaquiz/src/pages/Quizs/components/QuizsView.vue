<template>
  <div class="qp_main">
    <QuizCart v-for="quiz in quizs" :key="quiz.id" :quiz="quiz" />
    <QuizCreate v-if="quizs && quizs.length" />
    <QuizCreate v-if="!quizs || !quizs.length" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import QuizCart from "./QuizCart";
import QuizCreate from "./QuizCreate";

export default {
  name: "QuizsView",
  components: {
    QuizCart,
    QuizCreate
  },

  computed: {
    ...mapState({
      quizs: state => state.quiz.quizs
    })
  }
};
</script>

<style scoped>
.qp_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 45px;
  padding: 45px;
}
</style>
