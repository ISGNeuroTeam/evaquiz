<template>
  <v-data-table
    multi-sort
    :headers="headers"
    hide-default-footer
    :items="quizs"
    :items-per-page="50"
    :search="search"
    @click:row="clickRow"
  >
    <template v-slot:item.fill_date="{ item }">
      <p>{{ formatDate(item.fill_date) }}</p>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "TableAll",
  props: {
    search: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "Последнее заполнение",
          sortable: true,
          value: "fill_date"
        },
        {
          text: "Последний заполняющий",
          sortable: true,
          value: "filler"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      quizs: "answer/getQuizsItems"
    })
  },
  methods: {
    ...mapActions({
      getAnswer: "answer/getAnswer"
    }),
    clickRow(value) {
      this.$router.push({ path: "/info/" + value.quiz_id });
    },
    formatDate(date) {
      return new Date(date).toLocaleString("ru-RU");
    }
  }
};
</script>
