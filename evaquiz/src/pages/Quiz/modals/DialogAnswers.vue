<template>
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
          :description="isDescription"
          @invert-description="invertDescription"
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
    dialog: {
      type: Boolean,
      required: true
    },
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      index: {
        quiz: 0,
        quetion: 0,
        actual: 0
      },
      isDescription: false
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
        let _quetion = this.quetionsArray[this.index.quiz].questions[
          this.index.quetion
        ];
        if (_quetion.type === "multi") {
          if (
            (_quetion.answer.value === "no" && _quetion.answer.description) ||
            _quetion.answer.value === "yes" ||
            _quetion.answer.value === "skip"
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          //любой тип не мульти
          if (_quetion.answer.value) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.getQuestionsMulti(this.quiz);
  },

  methods: {
    ...mapActions({
      getQuestionsMulti: "quiz/getQuestionsMulti",
      saveAnswers: "quiz/saveAnswers",
      getQuizs: "quiz/getQuizs"
    }),
    close() {
      this.$store.commit("quiz/SET_QUETIONS_MULTI", []);
      this.$emit("close-dialog");
    },
    invertDescription() {
      this.isDescription = !this.isDescription;
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
          //для того чтобы убрать галки мульти
          this.getQuizs();
          this.close();
        })
        .catch(() => {
          this.$store.commit("snack/SET_SNACK", {
            color: "red",
            message: "Ошибка сохраниния ответов"
          });
        });
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
