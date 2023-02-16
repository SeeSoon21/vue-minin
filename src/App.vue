<!-- Именно этот компонент запускает приложение и всё проходит через него-->
<template>
  <div id="app">
    <!--этот компонент динамически изменяется на другой компонент-->
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>

import EmptyLayout from './layouts/EmptyLayout.vue';
import MainLayout from './layouts/MainLayout.vue';

export default {
  computed: {
    //свойство, возвращающее название layout
    layout() {
      //значение, которое возвращается по дефолту
      //тут на любой route возвращаем один соответствующий 
      console.log("layout: " + this.$route.meta.layout );
      return (this.$route.meta.layout || 'empty') + '-layout';
    },
  },
  components: {
    EmptyLayout, MainLayout
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "~assets/index.css";
</style>
