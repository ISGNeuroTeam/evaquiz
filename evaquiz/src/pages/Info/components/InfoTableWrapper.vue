<template>
  <v-card>
    <v-card-title>
      <v-btn v-if="id" class="mr-3" dark color="primary" @click="clickBack">
        <v-icon left>mdi-arrow-left-bold</v-icon> Назад
      </v-btn>

      {{ title }}
      <v-spacer />
    </v-card-title>
    <TableID v-if="id" />
    <TableAll v-else />
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
      /*очистка стора */
      this.$router.push({ path: "/filleds/" });
    }
  }
};
</script>
