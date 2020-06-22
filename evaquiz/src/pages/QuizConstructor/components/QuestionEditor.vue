<template>
  <v-card class="qe_card">
    <v-card-title :style="{ backgroundColor: getColor(question.type) }">
      Редактировать {{ question.text ? "вопрос" : "ответ" }}
      <v-spacer />
      <v-btn icon @click="close">
        <v-icon> mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text
      v-if="question.text"
      :style="{ backgroundColor: getColor(question.type) }"
    >
      <v-row align="center">
        <v-col cols="9">
          <v-textarea
            v-model="question.text"
            label="Вопрос"
            :auto-grow="true"
            :clearable="true"
            :rows="1"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="question.type"
            label="Тип ответа"
            item-text="text"
            item-value="value"
            :items="questionTypes"
            :disabled="selectDisabled"
            @change="changeType"
          />
        </v-col>
      </v-row>
      <v-row v-if="question.type === 'catalog'" align="center">
        <v-col cols="9">
          <v-textarea
            v-model="question.description"
            label="Описание вопроса"
            :auto-grow="true"
            :clearable="true"
            :rows="1"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="question.catalog_id"
            label="Справочник"
            :items="catalogsItems"
            item-text="name"
            item-value="id"
          />
        </v-col>
      </v-row>
      <v-row v-else align="center">
        <v-col cols="12">
          <v-textarea
            v-model="question.description"
            label="Описание вопроса"
            :auto-grow="true"
            :clearable="true"
            :rows="1"
          />
        </v-col>
      </v-row>
      <v-row align="center" class="de_label_row">
        <v-col cols="1">
          <v-btn
            :color="question.is_sign ? 'primary' : 'gray'"
            icon
            @click="key"
          >
            <v-icon>mdi-key</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11">
          <v-text-field
            v-if="question.is_sign"
            v-model="question.label"
            label="Сокращеный вопрос"
            :clearable="true"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else :style="{ backgroundColor: getColor(question.type) }">
      <v-row align="center">
        <v-col cols="9">
          <v-textarea
            v-model="question.value"
            label="Ответ"
            :auto-grow="true"
            :clearable="true"
            :rows="1"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="question.type"
            label="Тип ответа"
            item-text="text"
            item-value="value"
            :items="childTypes"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "QuestionEditor",

  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      childTypes: [
        {
          value: "select",
          text: "Из списка"
        },
        {
          value: "text",
          text: "Текстовый"
        },
        {
          value: "cascade",
          text: "Каскадный"
        }
      ],
      questionTypes: [
        {
          value: "multi",
          text: "Логический"
        },
        {
          value: "text",
          text: "Текст"
        },
        {
          value: "date",
          text: "Дата"
        },
        {
          value: "catalog",
          text: "Справочник"
        },
        {
          value: "cascade",
          text: "Каскадный"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      catalogsItems: state => state.catalog.catalogs.data
    }),
    selectDisabled() {
      if (this.question.childs.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getColor(type) {
      if (type === "select") {
        return "#cb9bdd";
      }
      if (type === "cascade") {
        return "#a0cded";
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
        return "#d79b4f";
      }
    },
    changeType() {
      if (this.question.type === "catalog") {
        this.question.catalog_id = this.catalogsItems[0].id;
      } else {
        this.question.catalog_id = null;
      }
    },
    close() {
      this.$emit("edit-close", null);
    },
    key() {
      this.question.is_sign = !this.question.is_sign;
      this.question.label = null;
    }
  }
};
</script>
<style scoped>
.qe_card {
  margin-left: 24px;
  margin-top: 15px;
}

.qe_wrapper {
  padding-left: 24px;
}
.de_label_row {
  height: 98px;
}
</style>
