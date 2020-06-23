<template>
  <div>
    <DialogCreateQuestion
      v-if="dialog"
      :dialog="dialog"
      @close-dialog="closeDialog"
      @add-question="addQuestion"
    />
    <v-card-text>
      <v-row align="center">
        <v-col cols="5">
          <v-textarea
            v-model="element.name"
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
            {{ buttonHeader() }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="6" class="ma-0 pa-0 qc_list">
          <QuestionItem
            :questions="element.questions"
            @edit-question="onEdit"
          />
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
  name: "QuizConstrustor",
  components: {
    DialogCreateQuestion,
    QuestionEditor,
    QuestionItem
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      quiz: {
        name: null,
        questions: []
      },
      editQuestion: null
    };
  },
  computed: {
    ...mapState({
      sid: state => state.quiz.constructorCount,
      constructorQuiz: state => state.quiz.quetions[0]
    }),
    element() {
      if (this.constructorQuiz) {
        return this.constructorQuiz;
      } else {
        return this.quiz;
      }
    },
    isDisabled() {
      if (this.element.name) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions({
      createQuiz: "quiz/createQuiz",
      editQuiz: "quiz/editQuiz",
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
      this.element.questions.push({ ...question, sid: this.sid });
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
      if (this.type === "create" || this.type === "copy") {
        this.create();
      } else {
        this.edit();
      }
    },
    create() {
      this.createQuiz(this.element)
        .then(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно создали " + this.element.name
          });

          this.$router.push({ path: "/list/" });
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка при создании " + this.element.name
          });
        });
    },
    edit() {
      this.editQuiz(this.element)
        .then(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно изменили " + this.element.name
          });

          this.$router.push({ path: "/list/" });
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка изменении " + this.element.name
          });
        });
    },
    buttonHeader() {
      if (this.type === "copy") {
        return "Копировать";
      }
      if (this.type === "create") {
        return "Создать";
      }
      if (this.type === "edit") {
        return "Сохранить";
      }
    }
  }
};
</script>
<style scoped>
.qc_list {
  min-height: 395px;
}
</style>
