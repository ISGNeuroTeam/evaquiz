<template>
  <div>
    <DialogDelete
      v-if="isDeleteModal"
      :quiz="quiz"
      :dialog="isDeleteModal"
      @close-dialog="closeDeleteModal"
    />
    <DialogAnswers
      v-if="isAnswerModal"
      :quiz="quiz"
      :dialog="isAnswerModal"
      @close-dialog="closeAnswerModal"
    />
    <div class="qp_cart">
      <v-row class="qp_row">
        <v-icon class="mr-2" @click="clickCopy"> mdi-content-copy</v-icon>
        <v-spacer />
        <v-icon class="mr-2" @click="clickEdit"> mdi-pencil</v-icon>
      </v-row>

      <v-row class="qp_row">
        <div class="ma-3 qp_row_name">
          <span
            class="qp_name"
            :class="quiz.isMulti ? 'qp_name_isMulti' : null"
            @click="clickAnswer"
            >{{ quiz.name }}</span
          >
        </div>
        <v-checkbox
          v-model="quiz.isMulti"
          class="ma-auto"
          @change="changeCheckbox"
        />
      </v-row>

      <v-row class="qp_row qp_row_footer">
        <v-icon class="mr-2" @click="clickDelete"> mdi-delete</v-icon>
        <v-spacer />
        <p v-if="quiz.multi" class="qp_number">{{ quiz.multi }}</p>
      </v-row>
    </div>
  </div>
</template>

<script>
import DialogDelete from "../modals/DialogDelete";
import DialogAnswers from "../modals/DialogAnswers";
import { mapActions } from "vuex";
export default {
  name: "QuizCart",
  components: {
    DialogDelete,
    DialogAnswers
  },
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDeleteModal: false,
      isAnswerModal: false
    };
  },
  methods: {
    ...mapActions({
      getQuestions: "quiz/getQuizEditor"
    }),
    clickDelete() {
      this.isDeleteModal = true;
    },
    closeDeleteModal() {
      this.isDeleteModal = false;
    },
    changeCheckbox() {
      if (this.quiz.isMulti === true) {
        this.$store.commit("quiz/ADD_MULTICOUNT", this.quiz.id);
      }
      if (this.quiz.isMulti === false) {
        this.$store.commit("quiz/DELETE_MULTICOUNT", {
          multi: this.quiz.multi,
          id: this.quiz.id
        });
      }
    },
    clickAnswer() {
      this.isAnswerModal = true;
    },
    closeAnswerModal() {
      this.isAnswerModal = false;
    },
    clickCopy() {
      this.getQuestions(this.quiz);
      this.$router.push({
        path: "/qconstructor/copy"
      });
    },
    clickEdit() {
      this.getQuestions(this.quiz);
      this.$router.push({
        path: "/qconstructor/edit"
      });
    }
  }
};
</script>
<style scoped>
.qp_cart {
  border: 2px solid #f5f5f5;

  border-radius: 6px;
  background-color: #f5f5f5;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  height: 100%;
}
.qp_row {
  width: 100%;
  margin: 0 auto;
}
.qp_row_name {
  width: 100%;
}
.qp_name {
  cursor: pointer;
}
.qp_name_isMulti {
  border-bottom: 2px solid #1976d2;
  font-weight: 600;
}
.qp_number {
  color: #1976d2;
  margin-bottom: 0px;
  font-weight: 600;
}
</style>
