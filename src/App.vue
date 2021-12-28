<template>
  <Menubar class="p-mb-2 p-shadow-1" :model="items">
    <template #start>
      <img alt="logo" src="@/assets/logo.png" height="50" class="p-mr-2">
    </template>
    <template #item="{item}">
      <router-link :to="item.to" custom v-slot="{href, route, navigate, isActive}">
        <div class="p-m-2">
          <i :class="[item.icon, {'active-link': isActive }]"></i>
          <a class="link" :href="href" @click="navigate" :class="{'active-link': isActive }"> {{ route.name }}</a>
        </div>
      </router-link>
    </template>
  </Menubar>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  components: {
    Menubar
  },
  data() {
    return {
      items: [
        {
          label:'Home',
          icon:'pi pi-fw pi-home',
          to: '/'
        },
        {
          label:'Cards',
          icon:'pi pi-fw pi-inbox',
          to: '/cards'
        }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: var(--text-color);
}

.active-link {
  color: var(--blue-400);
}

.p-menubar {
  background: #fdfdfd;
}

#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>

<style lang="scss">

body {
  background: #f1f1f1;
}
</style>
