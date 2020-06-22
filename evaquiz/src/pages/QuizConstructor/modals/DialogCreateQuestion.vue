<template>
  <v-dialog v-model="dialog" persistent max-width="650">
    <v-card :style="{ backgroundColor: color }">
      <v-card-title>Добавить новый вопрос</v-card-title>

      <v-card-text>
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
              :items="typesAnswer"
              @change="changeSelect"
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
        <v-row align="center" class="dcq_label_row">
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

      <v-card-actions>
        <v-btn color="gray" @click="close">Закрыть</v-btn>
        <v-spacer />
        <v-btn color="primary" :disabled="isDisabled" @click="create"
          >Добавить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DialogCreateQuestion",
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      question: {
        text: null,
        label: null,
        description: null,
        is_sign: false,
        catalog_id: null,
        childs: []
      },
      color: null,
      typesAnswer: [
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
    isDisabled() {
      if (this.question.text) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.clear();
  },

  methods: {
    clear() {
      this.question.text = null;
      this.question.label = null;
      this.question.description = null;
      this.question.is_sign = false;
      this.question.type = this.typesAnswer[0].value;
      this.color = "#f4b75e";
    },
    close() {
      this.clear();
      this.$emit("close-dialog");
    },
    create() {
      this.$store.commit("snack/SET_SNACK", {
        color: "green",
        message: "Новый вопрос добавлен"
      });

      this.$emit("add-question", { ...this.question });
      this.clear();
    },
    key() {
      this.question.is_sign = !this.question.is_sign;
      this.question.label = null;
    },
    changeSelect() {
      this.question.catalog_id = null;
      switch (this.question.type) {
        case "multi": {
          this.color = "#f4b75e";
          break;
        }
        case "text": {
          this.color = "#f1b4c9";
          break;
        }
        case "date": {
          this.color = "#f6ef9f";
          break;
        }
        case "cascade": {
          this.color = "#a0cded";
          break;
        }
        case "catalog": {
          this.question.catalog_id = this.catalogsItems[0].id;
          this.color = "#d79b4f";
          break;
        }
      }
    }
  }
};
</script>
<style scoped>
.dcq_label_row {
  height: 98px;
}
</style>
