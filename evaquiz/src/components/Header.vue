<template>
  <v-app-bar light app color="primary" class="link-conteiner">
    <v-toolbar-title class="logo">EVA</v-toolbar-title>
    <v-toolbar-title>
      <v-tooltip bottom color="#41C4FF">
        <template v-slot:activator="{ on }">
          <v-icon
            color="white"
            class="header_icon"
            v-on="on"
            @click="clickHome"
          >
            mdi-home-variant-outline
          </v-icon>
        </template>
        <span>На главную</span>
      </v-tooltip>
    </v-toolbar-title>
    <v-toolbar-title>
      <v-tooltip bottom color="#41C4FF">
        <template v-slot:activator="{ on }">
          <v-icon
            color="white"
            class="header_icon"
            v-on="on"
            @click="clickBack"
          >
            mdi-undo-variant
          </v-icon>
        </template>
        <span>Назад</span>
      </v-tooltip>
    </v-toolbar-title>
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
    <v-spacer />
    <v-toolbar-title class="username">
      {{ this.$jwt.decode().username }}
    </v-toolbar-title>

    <v-toolbar-title>
      <v-tooltip bottom color="#41C4FF">
        <template v-slot:activator="{ on }">
          <v-icon
            color="white"
            class="header_icon"
            v-on="on"
            @click="clickDoor"
          >
            mdi-door
          </v-icon>
        </template>
        <span>Выйти из профиля</span>
      </v-tooltip>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    clickHome() {
      window.location.href = `/main`;
    },
    clickBack() {
      this.$router.go(-1);
    },
    clickDoor() {
      document.cookie = `eva-dashPage=''; max-age=0 ; path=/`;
      document.cookie = `eva_token=''; max-age=0 ; path=/`;
      window.location.href = `/`;
    }
  }
};
</script>
<style scoped>
.logo {
  font-family: serif;
  color: white;
  opacity: 0.4;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  padding-right: 5px;
}
.username {
  font-family: serif;
  color: white;
  font-size: 16px;
  text-decoration: none;
  padding-right: 12px;
  border-right: 1px solid white;
}
.link-style {
  color: black;
  text-decoration: none;
  padding-right: 20px;
  padding-left: 20px;
  border-right: 2px solid black;
}
.--first {
  padding-left: 10;
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
.header_icon {
  height: 33px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
