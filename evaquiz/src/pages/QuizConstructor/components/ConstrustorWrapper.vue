<template>
  <v-card height="100%">
    <v-card-title>{{ header() }}</v-card-title>
    <QuizConstrustor :type="type" />
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import QuizConstrustor from "./QuizConstrustor";

export default {
  name: "ConstrustorWrapper",
  components: { QuizConstrustor },
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
