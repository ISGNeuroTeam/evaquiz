<template>
  <v-app-bar light app color="primary" class="link-conteiner">
    <v-toolbar-title>
      <router-link to="/list" class="link-style --first">Список </router-link>
    </v-toolbar-title>
    <v-toolbar-title>
      <router-link to="/directory" class="link-style">Справочник</router-link>
    </v-toolbar-title>
    <v-toolbar-title>
      <router-link to="/filleds" class="link-style --last">
        Информация
      </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>
<style scoped>
.link-style {
  color: black;
  text-decoration: none;
  padding-right: 20px;
  padding-left: 20px;
  border-right: 2px solid black;
}
.--first {
  padding-left: 0;
}
.--last {
  padding-right: 0px;
  border-right: 0px solid;
}

.link-conteiner {
  padding-left: 40px;
  padding-right: 40px;
}
.router-link-active {
  color: white;
}
</style>
