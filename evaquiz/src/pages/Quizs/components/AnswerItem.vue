<template>
  <div>
    <v-row align="center">
      <p class="ai_text">{{ question.text }}</p>
    </v-row>
    <v-row v-if="question.type === 'bool'" align="center">
      <v-col cols="2">
        <v-btn
          icon
          color="green"
          :class="question.answer.value ? 'ai_active' : null"
          @click="clickYes"
        >
          <v-icon>mdi-check-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn
          icon
          color="red"
          :class="question.answer.value === false ? 'ai_active' : null"
          @click="clickNo"
        >
          <v-icon>mdi-close-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-if="question.answer.value === false"
          v-model="question.answer.description"
          label="Описание"
        />
      </v-col>
    </v-row>
    <v-row v-if="question.type === 'text'" align="center">
      <v-col cols="12">
        <v-text-field v-model="question.answer.value" label="Ответ" />
      </v-col>
    </v-row>

    <v-row v-if="question.type === 'date'" align="center">
      <v-col cols="12">
        <v-date-picker
          v-model="question.answer.value"
          :first-day-of-week="1"
          locale="ru"
          no-title
          :full-width="true"
        />
      </v-col>
    </v-row>

    <v-row v-if="question.type === 'cascade'" align="center">
      <CascadeAnswer :childs="question.childs" @end-cascade="endCascade" />
    </v-row>
  </div>
</template>

<script>
import CascadeAnswer from "./CascadeAnswer";
export default {
  name: "AnswerItem",
  components: {
    CascadeAnswer
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      datapicker: false,
      header: null
    };
  },

  methods: {
    clickYes() {
      this.question.answer.value = true;
    },
    clickNo() {
      this.question.answer.value = false;
    },
    endCascade(val) {
      this.question.answer.value = val;
    }
  }
};
</script>
<style scoped>
.ai_text {
  font-size: 13px;
  text-align: left;
  padding-top: 25px;
  color: #000;
  width: 100%;
  padding-left: 15px;
}
.ai_active {
  background-color: #c9deef;
  border: 1px solid #1976d2;
}
</style>
