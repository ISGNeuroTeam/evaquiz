<template>
  <v-card>
    <DirectoryWrapper />
    <v-pagination
      v-model="page"
      :length="countPage"
      :total-visible="7"
      @input="changePagination"
    />
  </v-card>
</template>

<script>
import DirectoryWrapper from "./components/DirectoryWrapper";
import { mapActions, mapState } from "vuex";

export default {
  name: "DirectoryPage",
  components: {
    DirectoryWrapper
  },
  data() {
    return {
      page: 1,
      offset: null
    };
  },
  computed: {
    ...mapState({
      countDirectory: state => state.catalog.catalogs.count
    }),
    countPage() {
      if (this.countDirectory) {
        return Math.ceil(this.countDirectory / 10);
      } else {
        return 1;
      }
    }
  },
  mounted() {
    if (this.$route.params.offset) {
      this.page = Number(this.$route.params.offset) + 1;
    } else {
      this.page = 1;
    }
    this.getCatalogs(this.$route.params.offset);
  },
  methods: {
    ...mapActions({
      getCatalogs: "catalog/getCatalogs"
    }),
    changePagination(page) {
      this.getCatalogs(page - 1);

      this.$router.replace({
        path: `/directory/${page - 1}`
      });
    }
  }
};
</script>
