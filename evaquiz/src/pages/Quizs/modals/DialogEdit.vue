<template>
  <v-dialog v-model="dialog" persistent max-width="650">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon v-if="operation === 'Edit'">mdi-pencil</v-icon>
        <v-icon v-if="operation === 'Copy'">mdi-content-copy</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title v-if="operation === 'Edit'" class="headline"
        >Редактировать чeк-лиcта "{{ quiz.name }}"</v-card-title
      >
      <v-card-title v-if="operation === 'Copy'" class="headline"
        >Копировать чeк-лиcт "{{ quiz.name }}"</v-card-title
      >
      <v-card-text>
        <v-text-field
          v-model="modalQuiz.name"
          label="Название чек-листа"
          class="pr-5"
        />
        <v-container fluid class="dc_container">
          <QuetionItem
            v-for="quetion in arrayQuetions"
            :key="quetion.sid"
            :quetion="quetion"
            @minus="deleteQuetion"
          />
        </v-container>
        <v-btn color="primary" align="center" @click="add">+</v-btn>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-btn v-if="operation === 'Edit'" color="primary" @click="action"
          >Редактировать</v-btn
        >
        <v-btn v-if="operation === 'Copy'" color="primary" @click="action"
          >Копировать</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QuetionItem from "../components/QuetionItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "DialogEdit",
  components: {
    QuetionItem
  },
  props: {
    quiz: {
      type: Object,
      required: true
    },
    operation: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      arrayQuetions: [],
      sid: 0,
      modalQuiz: {
        name: ""
      }
    };
  },

  computed: {
    ...mapState({
      quetions: state => state.quiz.quetions
    })
  },

  watch: {
    dialog(val) {
      if (val === true) {
        this.getQuestions(this.quiz).then(() => {
          this.arrayQuetions = JSON.parse(
            JSON.stringify(this.quetions[0].questions)
          );

          this.sid = this.arrayQuetions[this.arrayQuetions.length - 1].sid;
          this.modalQuiz.name = this.quiz.name;
        });
      } else {
        this.$store.commit("quiz/SET_QUETIONS", []);
        this.arrayQuetions = [];
        this.modalQuiz = {};
        this.sid = 0;
      }
    }
  },

  methods: {
    ...mapActions({
      getQuestions: "quiz/getQuestions",
      createQuiz: "quiz/createQuiz",
      getQuizs: "quiz/getQuizs",
      editQuiz: "quiz/editQuiz"
    }),

    close() {
      this.dialog = false;
    },
    action() {
      if (this.operation === "Edit") {
        this.modalQuiz.id = this.quiz.id;
        this.modalQuiz.questions = this.arrayQuetions;
        this.editQuiz(this.modalQuiz)
          .then(() => {
            this.getQuizs();

            this.$store.commit("snack/SET_SNACK", {
              color: "green",
              message: "Успешно изменили " + this.quiz.name
            });
            this.close();
          })
          .catch(() => {
            this.$store.commit("snack/SET_SNACK", {
              color: "red",
              message: "Ошибка редактирования чек-листа"
            });
          });
      }
      if (this.operation === "Copy") {
        this.modalQuiz.questions = this.arrayQuetions;
        this.createQuiz(this.modalQuiz)
          .then(() => {
            this.getQuizs();

            this.$store.commit("snack/SET_SNACK", {
              color: "green",
              message: "Успешно скопировали " + this.quiz.name
            });
            this.close();
          })
          .catch(() => {
            this.$store.commit("snack/SET_SNACK", {
              color: "red",
              message: "Ошибка копирования чек-листа"
            });
          });
      }
    },
    deleteQuetion(sid) {
      if (this.arrayQuetions.length === 1) {
        this.$store.commit("snack/SET_SNACK", {
          color: "red",
          message: "Должен быть минимум один вопрос"
        });
      }

      if (this.arrayQuetions.length > 1) {
        const element = this.arrayQuetions.find(
          question => question.sid === sid
        );
        const index = this.arrayQuetions.indexOf(element);
        if (index > -1) {
          this.arrayQuetions.splice(index, 1);
        }
      }
    },
    add() {
      this.sid++;
      this.arrayQuetions.push({
        sid: this.sid,
        type: "bool",
        text: "",
        is_sign: false,
        label: ""
      });
    }
  }
};
</script>
<style scoped>
.dc_container {
  max-height: 320px;
  overflow-y: auto;
}
</style>
