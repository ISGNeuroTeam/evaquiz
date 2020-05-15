<template>
  <div class="qp_cart" :class="quiz.multi ? 'qp_cart_multi' : null">
    <v-row class="qp_row">
      <DialogEdit :quiz="quiz" :operation="'Copy'" />
      <v-spacer />
      <DialogEdit :quiz="quiz" :operation="'Edit'" />
    </v-row>

    <v-row class="qp_row">
      <DialogAnswers :quiz="quiz" />
    </v-row>

    <v-row class="qp_row">
      <DialogDelete :quiz="quiz" />
      <v-spacer />
      <p v-if="quiz.multi" class="qp_number">{{ quiz.multi }}</p>
    </v-row>
  </div>
</template>

<script>
import DialogEdit from "../modals/DialogEdit";
import DialogDelete from "../modals/DialogDelete";
import DialogAnswers from "../modals/DialogAnswers";

export default {
  name: "QuizCart",
  components: {
    DialogEdit,
    DialogDelete,
    DialogAnswers
  },
  props: {
    quiz: {
      type: Object,
      required: true
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
}
.qp_cart_multi {
  border: 2px solid #1976d2;
}
.qp_row {
  width: 100%;
  margin: 0 auto;
}

.qp_number {
  font-size: 24px;
  font-weight: 600;
  color: #1976d2;
}
</style>
