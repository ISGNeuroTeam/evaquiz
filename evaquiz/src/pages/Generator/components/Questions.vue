<template>
  <div v-if="questions">
    <p>{{ questions.name }}</p>
    <v-btn color="primary" :disabled="disabled" @click="generator"
      >generate!</v-btn
    >
    <v-text-field v-model="count" :disabled="disabled" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Api from "@/api";

export default {
  name: "Questions",
  data() {
    return {
      randomTextCascade: [
        "ДО/ПО 1",
        "ДО/ПО 375",
        "random ДО/ПО",
        "new ДО/ПО",
        "new",
        "новый"
      ],
      randomTextNo: [
        "не вижу",
        "не слышу",
        "не знаю",
        "забыл",
        "нет причины",
        "нет объекта",
        "а зачем",
        "потому что"
      ],
      catalogUnit: null,
      catalogObject: null,
      catalogFam: null,
      count: 0,
      disabled: false
    };
  },
  computed: {
    ...mapState({
      questions: state => state.generator.questions
    })
  },
  mounted() {
    this.getCatalogs();
  },
  methods: {
    ...mapActions({
      saveAnswer: "generator/saveAnswer"
    }),
    generator() {
      this.disabled = !this.disabled;
      for (let i = 0; i < this.count; i++) {
        this.questions.questions.forEach(question => {
          question.answer = this.guestionAnswer(question);
        });
        this.saveAnswer([this.questions]);
      }
      this.disabled = !this.disabled;
      this.$store.commit("snack/SET_SNACK", {
        color: "green",
        message: "Успешно сгенерировали"
      });
    },
    guestionAnswer(question) {
      if (question.type === "cascade") {
        let _rand = this.getRandomInt(0, question.childs.length - 1);
        return this.guestionAnswer(question.childs[_rand]);
      }
      if (question.type === "select") {
        return { value: question.text, description: null };
      }
      if (question.type === "text") {
        let _rand = this.getRandomInt(0, this.randomTextCascade.length - 1);
        return { value: this.randomTextCascade[_rand], description: null };
      }
      if (question.type === "catalog" && question.catalog_id === 7) {
        let _rand = this.getRandomInt(0, this.catalogFam.length - 1);
        return { value: this.catalogFam[_rand], description: null };
      }
      if (question.type === "catalog" && question.catalog_id === 8) {
        let _rand = this.getRandomInt(0, this.catalogUnit.length - 1);
        return { value: this.catalogUnit[_rand], description: null };
      }
      if (question.type === "catalog" && question.catalog_id === 9) {
        let _rand = this.getRandomInt(0, this.catalogObject.length - 1);
        return { value: this.catalogObject[_rand], description: null };
      }

      if (question.type === "multi") {
        let _rand = this.getRandomInt(0, 2);
        if (_rand === 0) {
          return { value: "yes", description: null };
        }
        if (_rand === 1) {
          _rand = this.getRandomInt(0, this.randomTextNo.length - 1);
          return {
            value: "no",
            description: this.randomTextNo[_rand]
          };
        }
        if (_rand === 2) {
          return { value: "skip", description: null };
        }
      }
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getCatalogs() {
      Api.getCatalog(7).then(data => {
        this.catalogFam = data.data.data.content.split("\n");
      });
      Api.getCatalog(8).then(data => {
        this.catalogUnit = data.data.data.content.split("\n");
      });
      Api.getCatalog(9).then(data => {
        this.catalogObject = data.data.data.content.split("\n");
      });
    }
  }
};
</script>
