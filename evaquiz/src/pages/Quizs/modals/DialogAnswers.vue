<template>
  <div class="qp_conrainer">
    <div class="qp_type">
      <p @click="dialogActivator">{{ quiz.name }}</p>
      <v-checkbox class="qp_cheekbox" @change="changeCheckbox" />
    </div>

    <v-dialog v-model="dialog" persistent max-width="650">
      <v-card v-if="quetionsArray && quetionsArray.length">
        <v-card-title>
          <p class="qp_headline">
            Заполнить чeк-лиcт "{{ quetionsArray[index.quiz].name }}"
          </p>
        </v-card-title>
        <v-card-text>
          <v-progress-linear v-model="persent" height="25" reactive>
            <strong>{{ index.actual + 1 }} из {{ lengthQuetions }}</strong>
          </v-progress-linear>

          <AnswerItem
            :key="index.quiz + '_' + index.quetion"
            :question="quetionsArray[index.quiz].questions[index.quetion]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="gray" @click="close">Закрыть</v-btn>
          <v-spacer />

          <v-btn v-if="index.actual !== 0" color="gray" @click="prevQuetion">
            Предыдущий
          </v-btn>

          <v-btn
            v-if="index.actual + 1 !== lengthQuetions"
            color="primary"
            :disabled="isDisabled"
            @click="nextQuetion"
          >
            Следующий
          </v-btn>
          <v-btn
            v-if="index.actual + 1 === lengthQuetions"
            color="primary"
            :disabled="isDisabled"
            @click="send"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AnswerItem from "../components/AnswerItem";

export default {
  name: "DialogAnswers",
  components: {
    AnswerItem
  },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      index: {
        quiz: 0,
        quetion: 0,
        actual: 0
      }
    };
  },
  computed: {
    ...mapState({
      quetionsArray: state => state.quiz.quetions
    }),
    lengthQuetions() {
      let _count = 0;
      this.quetionsArray.forEach(quetion => {
        _count = _count + quetion.questions.length;
      });
      return _count;
    },
    persent() {
      return ((this.index.actual + 1) * 100) / this.lengthQuetions;
    },
    isDisabled() {
      if (this.quetionsArray) {
        let _answer = this.quetionsArray[this.index.quiz].questions[
          this.index.quetion
        ].answer;

        if (
          !!_answer.value ||
          (_answer.value == false && !!_answer.description)
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  },
  watch: {
    dialog(val) {
      if (val === true) {
        this.getQuestionsMulti(this.quiz);
      } else {
        this.$store.commit("quiz/SET_QUETIONS", []);
        this.index.quiz = 0;
        this.index.quetion = 0;
        this.index.actual = 0;
      }
    }
  },
  methods: {
    ...mapActions({
      getQuestionsMulti: "quiz/getQuestionsMulti",
      saveAnswers: "quiz/saveAnswers"
    }),
    dialogActivator() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    nextQuetion() {
      this.index.actual++;
      if (
        this.quetionsArray[this.index.quiz].questions.length ===
        this.index.quetion + 1
      ) {
        this.index.quiz++;
        this.index.quetion = 0;
      } else {
        this.index.quetion++;
      }
    },
    prevQuetion() {
      this.index.actual--;
      if (this.index.quiz > 0 && this.index.quetion === 0) {
        this.index.quiz--;
        this.index.quetion =
          this.quetionsArray[this.index.quiz].questions.length - 1;
      } else {
        this.index.quetion--;
      }
    },
    send() {
      Promise.all(
        this.quetionsArray.map(q => {
          return this.saveAnswers([q]);
        })
      )
        .then(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "green",
            message: "Ответы успешно сохранились"
          });
          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка сохраниния ответов"
          });
        });
    },
    changeCheckbox(e) {
      if (e === true) {
        this.$store.commit("quiz/ADD_MULTICOUNT", this.quiz.id);
      }
      if (e === false) {
        this.$store.commit("quiz/DELETE_MULTICOUNT", {
          multi: this.quiz.multi,
          id: this.quiz.id
        });
      }
    }
  }
};
</script>
<style scoped>
.qp_type {
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 10px;
  margin-right: 10px;
  width: 90%;
}
.qp_cheekbox {
  display: inline-block;
  margin: 0;
  padding: 0;
}
.qp_headline {
  font-size: 18px;
}
.qp_conrainer {
  width: 100%;
}
</style>
