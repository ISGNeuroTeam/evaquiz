<template>
  <v-dialog v-model="dialog" max-width="650" @click:outside="close">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-container fluid class="df_container">
          <v-row
            v-for="answer in answers"
            :key="answer.id"
            class="df_row_answer"
          >
            <v-col cols="8">
              <div class="df_text">{{ answer.text }}</div>
              <div v-if="answer.is_sign && answer.label" class="df_label">
                {{ answer.label }}
              </div>
            </v-col>
            <v-col cols="4">
              <div class="df_text">{{ getAnswer(answer) }}</div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn icon color="primary" @click="exel">
          <v-icon>mdi-file-excel</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn color="primary" @click="close">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "DialogFullAnswer",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    fillDate: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      header: "answer/getAnswersName",
      answers: "answer/getAllAnswerByID"
    }),
    title() {
      return 'Ответы "' + this.header + '", ' + this.fillDate;
    }
  },
  methods: {
    ...mapActions({
      downloadExel: "answer/downloadExel"
    }),
    close() {
      this.$emit("close-dialog");
    },
    getAnswer(answer) {
      if (answer.type === "date") {
        return new Date(answer.answer.value.split(" ")[0]).toLocaleDateString(
          "ru-RU"
        );
      }
      if (answer.type === "cascade") {
        return answer.answer.value.replace("-->", ", ");
      }
      if (answer.type === "multi") {
        if (answer.answer.value.toLowerCase() === "yes") {
          return "Да";
        }
        if (answer.answer.value.toLowerCase() === "no") {
          return "Нет, " + answer.answer.description;
        }
        if (answer.answer.value.toLowerCase() === "skip") {
          return "Не применимо";
        }
      }

      return answer.answer.value;
    },
    exel() {
      this.downloadExel();
    }
  }
};
</script>
<style scoped>
.df_container {
  max-height: 320px;
  overflow-y: auto;
}
.df_row_answer {
  border-bottom: 2px solid #e0e0e0;
}
.df_text {
  color: #000000de;
  font-size: 16px;
}
.df_label {
  font-size: 12px;
}
</style>
