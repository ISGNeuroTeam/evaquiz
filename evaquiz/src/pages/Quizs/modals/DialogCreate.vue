<template>
  <v-dialog v-model="dialog" persistent max-width="650">
    <template v-slot:activator="{ on }">
      <div class="qp_cart_create" v-on="on">
        <v-btn icon class="dc_icon" color="white">
          <v-icon size="100">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title class="headline">Создать новый чeк-лиcт</v-card-title>
      <v-card-text class="pr-0">
        <v-textarea
          v-model="quiz.name"
          label="Название чек-листа"
          class="pr-5"
          :auto-grow="true"
          :clearable="true"
          :rows="1"
        />
        <v-container fluid class="dc_container">
          <QuetionItem
            v-for="quetion in quiz.questions"
            :key="quetion.sid"
            :quetion="quetion"
            @minus="deleteQuetion"
          />
        </v-container>

        <v-btn color="primary" align="center" @click="add">+</v-btn>
      </v-card-text>

      <v-card-actions class="pr-5">
        <v-spacer />
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-btn color="primary" @click="create">Создать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QuetionItem from "../components/QuetionItem";
import { mapActions } from "vuex";

export default {
  name: "DialogCreate",
  components: {
    QuetionItem
  },
  data() {
    return {
      dialog: false,
      sid: 0,
      quiz: {
        name: null,
        questions: []
      }
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.sid = 0;
        this.quiz.questions.push({
          sid: this.sid,
          type: "bool",
          text: "",
          is_sign: false,
          label: ""
        });
      } else {
        this.quiz.name = "";
        this.quiz.questions = [];
      }
    }
  },
  methods: {
    ...mapActions({
      createQuiz: "quiz/createQuiz",
      getQuizs: "quiz/getQuizs"
    }),
    close() {
      this.dialog = false;
    },
    create() {
      if (this.validation()) {
        this.request();
      } else {
        this.$store.commit("snack/SET_SNACK", {
          color: "red",
          message: "В создании чек-листа ошибка. Проверьте поля"
        });
      }
    },
    request() {
      this.createQuiz(this.quiz)
        .then(() => {
          this.getQuizs();

          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Успешно создали " + this.quiz.name
          });

          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка создания чек-листа"
          });
        });
    },
    add() {
      this.sid++;
      this.quiz.questions.push({
        sid: this.sid,
        type: "bool",
        text: "",
        is_sign: false,
        label: ""
      });
    },
    deleteQuetion(sid) {
      if (this.quiz.questions.length === 1) {
        this.$store.commit("snack/SET_SNACK", {
          color: "red",
          message: "Должен быть минимум один вопрос"
        });
      }
      if (this.quiz.questions.length > 1) {
        const element = this.quiz.questions.find(
          question => question.sid === sid
        );
        const index = this.quiz.questions.indexOf(element);
        if (index > -1) {
          this.quiz.questions.splice(index, 1);
        }
      }
    },
    validation() {
      let _valid = true;
      if (!!this.quiz.name && this.quiz.name.trim().length) {
        this.quiz.questions.forEach(q => {
          if (q.text === null || q.text.trim().length === 0) {
            _valid = false;
          }
        });
      } else {
        _valid = false;
      }

      return _valid;
    }
  }
};
</script>
<style scoped>
.qp_cart_create {
  border: 2px solid #1976d2;

  border-radius: 6px;
  background: #1976d2;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  cursor: pointer;

  height: 205px;
}

.dc_container {
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
}

.dc_icon {
  width: 100%;
  height: 100%;
}
.dc_icon::before {
  bottom: auto;
}
</style>
<style>
.qp_cart_create .v-ripple__container {
  display: none !important;
}
</style>
