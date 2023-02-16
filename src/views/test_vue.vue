<template>
  <div><mainComponent /></div>
  
  <span v-for="food in foods" :key="food.quantity">{{ food.label }}</span>
</template>

<script>
import mainComponent from '@/components/app/mainComponent.vue'

export default {

  data: () => ({
    foods: [
    { label: 'brokkoles', quantity: '4'},
    { label: 'tomatoes', quantity: '2'},
    { label: 'peanut', quantity: '18'}
    ]
  })
  
};
</script>