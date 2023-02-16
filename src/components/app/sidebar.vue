<template>
  <!-- произведем автоматическое создание ссылок -->
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link in links" 
      :key="link.url" 
      tag="li" 
      active-class="active"
      :to="link.url"
      custom
      v-slot="{ href, route, navigate, isActive, isExactActive }"
    >
      <li :class="[isExactActive && 'isActive']">
        <a
          :href="href"
          :active="isActive"
          @click="navigate"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}</a
        >
      </li>
    </router-link>
  </ul>

</template>

<script>
//console.log("isOpen in sidebar:" + isOpen)
export default {
  //принимае данные состояния sidebar'а
  props: ['isOpen'],
  //возвращаем и функции новый объект
  data: () => ({
    //каждый объект представляет собой ссылку
    links: [
      { title: "Счёт", url: "/", exact: "true" },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "/record" },
      { title: "Категории", url: "/categories" },
    ],
  }),
};
</script>
