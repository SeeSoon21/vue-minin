<template>
  <div class="app-main-layout">
    <!-- при нажатии на клавишу меняем состояние -->
    <Navbar @click="isOpen = !isOpen" />
    <Sidebar v-bind:isOpen="isOpen"/>
  isOpeni: {{ isOpen }}


    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/navbar";
import Sidebar from "@/components/app/sidebar";

export default {
  name: "main-layout",
  //в data храним состояние объектов
  data: () => ({
    //отвечает за открытый side-бар
    isOpen: true
  }),
  components: { 
    Sidebar, Navbar 
  },
};
</script>