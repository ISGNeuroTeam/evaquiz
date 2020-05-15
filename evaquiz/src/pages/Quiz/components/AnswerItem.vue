<template>
  <div>
    <v-row align="center">
      <p class="ai_text">{{ question.text }}</p>
    </v-row>
    <v-row align="center">
      <v-col cols="1">
        <v-icon v-if="description" @click="clickEye">mdi-eye-off</v-icon>
        <v-icon v-else @click="clickEye">mdi-eye</v-icon>
      </v-col>
      <v-col v-if="description" cols="11">{{ question.description }}</v-col>
    </v-row>
    <v-row v-if="question.type === 'multi'" align="center">
      <v-col cols="3" offset="2">
        <v-btn
          icon
          color="green"
          :class="question.answer.value === 'yes' ? 'ai_active' : null"
          @click="clickYes"
        >
          <v-icon>mdi-check-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          icon
          color="red"
          :class="question.answer.value === 'no' ? 'ai_active' : null"
          @click="clickNo"
        >
          <v-icon>mdi-close-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          icon
          color="primary"
          :class="question.answer.value === 'skip' ? 'ai_active' : null"
          @click="clickSkip"
        >
          <v-icon>mdi-fast-forward-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      v-if="question.type === 'multi' && question.answer.value === 'no'"
      align="center"
    >
      <v-col cols="7" offset="2">
        <v-text-field v-model="question.answer.description" label="Описание" />
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
    <v-row v-if="question.type === 'catalog'" align="center">
      <v-select
        v-model="question.answer.value"
        :items="catalogItems"
        label="Выберите ответ"
      />
    </v-row>
    <v-row v-if="question.type === 'cascade'" align="center">
      <CascadeAnswer :childs="question.childs" @end-cascade="endCascade" />
    </v-row>
  </div>
</template>

<script>
import CascadeAnswer from "./CascadeAnswer";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "AnswerItem",
  components: {
    CascadeAnswer
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    description: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      datapicker: false,
      header: null
    };
  },
  computed: {
    ...mapGetters({
      catalogItems: "catalog/catalogItems"
    })
  },
  mounted() {
    if (this.question.type === "catalog") {
      this.getCatalog(this.question.catalog_id);
    }
  },

  methods: {
    ...mapActions({
      getCatalog: "catalog/getCatalog"
    }),
    clickYes() {
      this.question.answer.value = "yes";
    },
    clickSkip() {
      this.question.answer.value = "skip";
    },

    clickNo() {
      this.question.answer.value = "no";
    },
    endCascade(val) {
      this.question.answer.value = val;
    },
    clickEye() {
      this.$emit("invert-description");
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
