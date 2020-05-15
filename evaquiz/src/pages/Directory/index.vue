<template>
  <DirectoryWrapper />
</template>

<script>
import DirectoryWrapper from "./components/DirectoryWrapper";
import { mapActions } from "vuex";

export default {
  name: "DirectoryPage",
  components: {
    DirectoryWrapper
  },
  mounted() {
    this.getCatalogs();
  },
  methods: {
    ...mapActions({
      getCatalogs: "catalog/getCatalogs"
    })
  }
};
</script>
