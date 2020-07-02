<template v-if="questions">
  <draggable tag="ul" :list="questions" :animation="200">
    <li
      v-for="question in questions"
      :key="question.sid"
      :style="{ backgroundColor: getColor(question.type) }"
    >
      <v-row class="qi_row">
        <div>
          <v-btn
            v-if="question.type === 'cascade'"
            icon
            @click="clickAdd(question)"
          >
            <v-icon> mdi-plus</v-icon>
          </v-btn>
        </div>

        <div class="qi_text_container" @click="clickEdit(question)">
          <div class="qi_text">{{ question.text || question.value }}</div>
          <div class="qi_label">
            {{ question.is_sign && question.label ? question.label : "" }}
          </div>
        </div>

        <div class="qi_delete_btn">
          <v-btn icon @click="clickDelete(question)">
            <v-icon> mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-row>

      <QuestionItem
        v-if="questions"
        :questions="question.childs"
        style="border-left: 2px solid #495e6d; padding-left: 10px; margin-left: 15px;"
        @edit-question="sendEditQuestion"
      />
    </li>
    <DialogCreateChild
      v-if="dialog"
      :dialog="dialog"
      @close-dialog="closeDialog"
      @add-question="addQuestion"
    />
  </draggable>
</template>
<script>
import DialogCreateChild from "../modals/DialogCreateChild";
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  name: "QuestionItem",
  components: {
    draggable,
    DialogCreateChild
  },
  props: {
    questions: {
      required: true,
      type: Array,
      default: function() {
        return null;
      }
    }
  },
  data() {
    return {
      dialog: false,
      insertSid: null
    };
  },
  computed: {
    ...mapState({
      sid: state => state.quiz.constructorCount
    })
  },
  methods: {
    getColor(type) {
      if (type === "select") {
        return "#cb9bdd";
      }
      if (type === "cascade") {
        return "#f0370d";
      }
      if (type === "multi") {
        return "#f4b75e";
      }
      if (type === "text") {
        return "#f1b4c9";
      }
      if (type === "date") {
        return "#f6ef9f";
      }
      if (type === "catalog") {
        return "#81d8d0";
      }
    },
    clickAdd(question) {
      this.insertSid = question.sid;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.insertSid = null;
    },
    addQuestion(question) {
      this.dialog = false;
      const element = this.questions.find(q => q.sid === this.insertSid);
      element.childs = element.childs.concat({ ...question, sid: this.sid });
      this.insertSid = null;
      this.$store.commit("quiz/CONSTRUCTORCOUNT_PLUS");
    },
    clickDelete(question) {
      const element = this.questions.find(q => q.sid === question.sid);
      const index = this.questions.indexOf(element);
      if (index > -1) {
        this.questions.splice(index, 1);
      }
    },
    clickEdit(question) {
      this.$emit("edit-question", question);
    },
    sendEditQuestion(question) {
      this.$emit("edit-question", question);
    }
  }
};
</script>
<style scoped>
li {
  list-style-type: none;

  min-height: 60px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
}
ul {
  margin-top: 15px;
}

.qi_text_container {
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
}
.qi_text {
  color: #000000de;
  font-size: 16px;
}
.qi_label {
  font-size: 12px;
  color: #353030;
}
.qi_row {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 36px auto 36px;
}
.qi_delete_btn {
  color: rgba(0, 0, 0, 0.3);
}
</style>
