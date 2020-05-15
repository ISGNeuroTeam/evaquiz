<template>
  <v-dialog v-model="dialog" max-width="450" @click:outside="close">
    <v-card>
      <v-card-title class="headline"> Удалить чeк-лиcт? </v-card-title>
      <v-card-text>
        Вы точно хотите удалить чeк-лиcт "{{ quiz.name }}" ?
      </v-card-text>
      <v-card-actions>
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-spacer />
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
    dialog: {
      type: Boolean,
      required: true
    },
    quiz: {
      type: Object,
      required: true
    }
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
            message: "Ошибка при удалении " + this.quiz.name
          });
        });
    },
    close() {
      this.$emit("close-dialog");
    }
  }
};
</script>
