<template>
  <InfoTableWrapper :id="$route.params.id" />
</template>

<script>
import { mapActions } from "vuex";
import InfoTableWrapper from "./components/InfoTableWrapper";

export default {
  name: "InfoPage",
  components: {
    InfoTableWrapper
  },
  watch: {
    "$route.params.id": function() {
      this.getAnswer({
        id: this.$route.params.id,
        offset: this.$route.params.offset
      });
    }
  },
  mounted() {
    this.getAnswer({
      id: this.$route.params.id,
      offset: this.$route.params.offset
    });
  },
  methods: {
    ...mapActions({
      getAnswer: "answer/getAnswer"
    })
  }
};
</script>

<style>
@media print {
  * {
    color: black;
  }
  @page {
    margin: 1cm;
    height: 297mm;
    width: 210mm;
    page-break-before: always;
  }
  .v-dialog {
    box-shadow: none !important;
  }
  .v-dialog--active {
    max-width: none !important;
    width: 100% !important;
  }

  header {
    display: none !important;
  }
  main {
    padding: 0 !important;
  }
  .v-overlay__scrim {
    opacity: 1 !important;
    background-color: white !important;
    border-color: white !important;
  }
  .v-card__actions {
    display: none;
  }
  .v-card {
    height: 100% !important;
    overflow: hidden !important;
    box-shadow: none !important;
  }
  .df_container {
    max-height: none !important;
    height: 100% !important;
  }
  .theme--light.v-data-table thead tr:last-child th {
    border-bottom: thin solid black;
  }
}
</style>
