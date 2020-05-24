<template>
  <div>
    <DialogFullAnswer
      :dialog="dialog"
      :fill-date="fillDate"
      @close-dialog="closeDialog"
    />
    <v-data-table
      multi-sort
      :headers="headers"
      hide-default-footer
      :items="items"
      :items-per-page="50"
      @click:row="clickRow"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click.stop="clickRow(item)">
          mdi-magnify
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DialogFullAnswer from "../modals/DialogFullAnswer";

export default {
  name: "TableID",
  components: {
    DialogFullAnswer
  },
  data() {
    return {
      dialog: false,
      fillDate: null
    };
  },
  computed: {
    ...mapGetters({
      headers: "answer/getAnswersHeaders",
      items: "answer/getAnswersItems"
    })
  },
  methods: {
    clickRow(value) {
      this.fillDate = value.fill_date;
      this.$store.commit("answer/SET_ANSWER_ID", value.id);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
