<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"> Удалить чeк-лиcт? </v-card-title>
      <v-card-text>
        Вы точно хотите удалить чeк-лиcт "{{ quiz.name }}" ?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-btn color="primary" @click="del">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DialogDelete",
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions({
      deleteQuiz: "quiz/deleteQuiz",
      getQuizs: "quiz/getQuizs"
    }),
    del() {
      this.deleteQuiz(this.quiz.id)
        .then(() => {
          this.getQuizs();

          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно удалили " + this.quiz.name
          });

          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "errorDelete"
          });
        });
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>
