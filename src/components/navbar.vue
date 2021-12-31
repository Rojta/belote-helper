<template>
  <Menubar class="p-mb-2 p-shadow-1" :model="items">
    <template #start>
      <img alt="logo" src="@/assets/logo.png" height="50" class="p-mr-2" />
    </template>
    <template #item="{ item }">
      <router-link :to="item.to" custom v-slot="{ href, route, navigate, isActive }">
        <div class="p-m-2">
          <i :class="[item.icon, { 'active-link': isActive }]"></i>
          <a class="link" :href="href" @click="navigate" :class="{ 'active-link': isActive }"> {{ route.name }}</a>
        </div>
      </router-link>
    </template>
    <template #end
      ><Button v-if="this.theme === 'light'" @click="changeTheme('dark')" icon="fa-solid fa-moon" class="p-button-rounded p-button-primary" /><Button
        v-else
        @click="changeTheme('light')"
        icon="fa-solid fa-sun"
        class="p-button-rounded p-button-primary"
    /></template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import Button from "primevue/button";

export default {
  name: "Navbar",
  components: {
    Menubar,
    Button,
  },
  data() {
    return {
      theme: "light",
      items: [
        {
          label: "Igra",
          icon: "p-mr-1 fa-solid fa-gamepad",
          to: "/",
        },
        {
          label: "Karte",
          icon: "p-mr-1 fa-solid fa-box",
          to: "/karte",
        },
      ],
    };
  },
  methods: {
    changeTheme(theme) {
      this.theme = theme;
    },
  },
  watch: {
    theme(newTheme, oldTheme) {
      let themeElement = document.getElementById("theme-link");
      themeElement.setAttribute("href", themeElement.getAttribute("href").replace(oldTheme, newTheme));
      localStorage.theme = newTheme;
    },
  },
  mounted() {
    if (localStorage.theme) this.theme = localStorage.theme;
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: var(--text-color);
  font-size: 15px;
}

.active-link {
  color: #3b82f6;
}
</style>
