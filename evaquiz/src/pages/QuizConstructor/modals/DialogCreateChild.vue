<template>
  <v-dialog v-model="dialog" persistent max-width="650">
    <v-card :style="{ backgroundColor: color }">
      <v-card-title>Добавить новый ответ</v-card-title>

      <v-card-text>
        <v-row align="center">
          <v-col cols="9">
            <v-textarea
              v-model="question.text"
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
              :items="typesAnswer"
              @change="changeSelect"
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
export default {
  name: "DialogCreateChild",
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      question: {
        value: null,
        childs: []
      },
      color: null,
      typesAnswer: [
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
      ]
    };
  },
  computed: {
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
      this.question.value = null;
      this.question.type = this.typesAnswer[0].value;
      this.color = "#cb9bdd";
    },
    close() {
      this.clear();
      this.$emit("close-dialog");
    },
    create() {
      this.$store.commit("snack/SET_SNACK", {
        color: "green",
        message: "Новый ответ добавлен"
      });

      this.$emit("add-question", { ...this.question });
      this.clear();
    },
    changeSelect() {
      switch (this.question.type) {
        case "select": {
          this.color = "#cb9bdd";
          break;
        }
        case "cascade": {
          this.color = "#a0cded";
          break;
        }
        case "text": {
          this.color = "#f1b4c9";
          break;
        }
      }
    }
  }
};
</script>
