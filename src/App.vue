<template>
  <Navbar />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
