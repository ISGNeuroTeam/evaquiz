<template>
  <v-card>
    <v-card-title>
      <v-btn v-if="id" class="mr-3" dark color="primary" @click="clickBack">
        <v-icon left>mdi-arrow-left-bold</v-icon> Назад
      </v-btn>

      {{ title }}
      <v-spacer />
      <v-text-field v-model="filter" label="Фильтр" :clearable="true" />
    </v-card-title>
    <TableID v-if="id" :search="filter" />
    <TableAll v-else :search="filter" />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import TableAll from "./TableAll";
import TableID from "./TableID";

export default {
  name: "InfoTableWrapper",
  components: {
    TableAll,
    TableID
  },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      filter: null
    };
  },
  computed: {
    ...mapGetters({
      header: "answer/getAnswersName"
    }),
    title() {
      if (this.id) {
        return 'Список чек-листа "' + this.header + '"';
      } else {
        return "Список чек-листов";
      }
    }
  },
  methods: {
    clickBack() {
      this.$router.push({ path: "/filleds/" });
    }
  }
};
</script>
