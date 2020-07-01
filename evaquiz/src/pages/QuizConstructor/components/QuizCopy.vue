<template>
  <div>
    <DialogCreateQuestion
      v-if="dialog"
      :dialog="dialog"
      @close-dialog="closeDialog"
      @add-question="addQuestion"
    />
    <v-card-text v-if="quiz && quizCopy">
      <v-row align="center">
        <v-col cols="5">
          <v-textarea
            v-model="quiz.name"
            :clearable="true"
            spellcheck="false"
            label="Название чек-листа"
            :auto-grow="true"
            :rows="1"
          />
        </v-col>
        <v-col cols="1">
          <v-btn color="primary" @click="openDialog">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="2" offset="4">
          <v-btn color="primary" :disabled="isDisabled" @click="action">
            Копировать
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="6" class="ma-0 pa-0 qc_list">
          <QuestionItem :questions="quiz.questions" @edit-question="onEdit" />
        </v-col>
        <v-col cols="6" class="ma-0 pa-0">
          <QuestionEditor
            v-if="editQuestion"
            :question="editQuestion"
            @edit-close="editClose"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import DialogCreateQuestion from "../modals/DialogCreateQuestion";
import QuestionItem from "./QuestionItem";
import QuestionEditor from "./QuestionEditor";
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "QuizCopy",
  components: {
    DialogCreateQuestion,
    QuestionEditor,
    QuestionItem
  },
  data() {
    return {
      dialog: false,
      editQuestion: null,
      quiz: null
    };
  },
  computed: {
    ...mapState({
      sid: state => state.quiz.constructorCount,
      quizCopy: state => state.quiz.quetions[0]
    }),
    isDisabled() {
      if (this.quiz.name) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.quiz = JSON.parse(JSON.stringify(this.quizCopy));
  },
  methods: {
    ...mapActions({
      createQuiz: "quiz/createQuiz",
      getCatalogs: "catalog/getCatalogs"
    }),
    openDialog() {
      this.dialog = true;
      this.getCatalogs({});
    },
    closeDialog() {
      this.dialog = false;
    },
    addQuestion(question) {
      this.dialog = false;
      this.quiz.questions.push({ ...question, sid: this.sid });
      this.$store.commit("quiz/CONSTRUCTORCOUNT_PLUS");
    },
    onEdit(question) {
      this.editQuestion = question;
      this.getCatalogs({});
    },
    editClose() {
      this.editQuestion = null;
    },
    action() {
      this.createQuiz(this.quiz)
        .then(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно скопировали " + this.quizCopy.name
          });

          this.$router.push({ path: "/list/" });
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка при копировалии " + this.quizCopy.name
          });
        });
    }
  }
};
</script>
<style scoped>
.qc_list {
  min-height: 395px;
}
</style>
