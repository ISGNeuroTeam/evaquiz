<template>
  <v-card height="100%">
    <v-card-title>{{ header }}</v-card-title>
    <QuizCreate v-if="type === 'create'" />
    <QuizCopy v-if="type === 'copy'" />
    <QuizEdit v-if="type === 'edit'" />
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import QuizCreate from "./QuizCreate";
import QuizCopy from "./QuizCopy";
import QuizEdit from "./QuizEdit";

export default {
  name: "ConstrustorWrapper",
  components: { QuizCreate, QuizCopy, QuizEdit },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      quizName: "quiz/qetQuizName"
    }),
    header() {
      if (this.type.toLowerCase() === "copy") {
        return 'Копирование чек-листа "' + this.quizName + '"';
      } else if (this.type.toLowerCase() === "edit") {
        return 'Редактирование чек-листа "' + this.quizName + '"';
      } else {
        return "Создание нового чек-листа";
      }
    }
  },

  methods: {}
};
</script>
