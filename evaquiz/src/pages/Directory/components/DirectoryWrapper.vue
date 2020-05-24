<template>
  <div>
    <DirectoryUpdate
      v-if="dialog"
      :dialog="dialog"
      @close-dialog="closeDialog"
    />
    <v-card-title class="dh_card-title">
      <v-row align="center">
        <v-col cols="3">
          Справочники
        </v-col>
        <v-col cols="4" offset="4">
          <v-text-field v-model="filter" label="Фильтр" :clearable="true" />
        </v-col>
        <v-col cols="1">
          <v-btn dark color="primary" @click="openDialog">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <DirectoryTable :search="filter" />
  </div>
</template>
<script>
import DirectoryUpdate from "../modals/DirectoryUpdate";
import DirectoryTable from "./DirectoryTable";
export default {
  name: "DirectoryHeader",
  components: {
    DirectoryUpdate,
    DirectoryTable
  },
  data() {
    return {
      filter: null,
      dialog: false
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>
<style scoped>
.dh_card-title {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
