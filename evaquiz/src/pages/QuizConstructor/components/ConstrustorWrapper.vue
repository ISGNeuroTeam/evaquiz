<template>
  <v-card height="100%">
    <v-card-title v-if="constructorQuiz.name">{{ header() }}</v-card-title>

    <QuizCreate v-if="type === 'create'" />
    <QuizCopy v-if="type === 'copy'" />
    <QuizEdit v-if="type === 'edit'" />
  </v-card>
</template>
<script>
import { mapState } from "vuex";
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
    ...mapState({
      constructorQuiz: state => state.quiz.quetions[0]
    })
  },

  methods: {
    header() {
      if (this.type.toLowerCase() === "create") {
        return "Создание нового чек-листа";
      }
      if (this.type.toLowerCase() === "edit" && this.constructorQuiz) {
        return 'Редактирование чек-листа "' + this.constructorQuiz.name + '"';
      }
      if (this.type.toLowerCase() === "copy" && this.constructorQuiz) {
        return 'Копирование чек-листа "' + this.constructorQuiz.name + '"';
      }
    }
  }
};
</script>
