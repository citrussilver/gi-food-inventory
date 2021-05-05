<template>
  <div>
      <div class="food-item-container">
          <div class="food-block" :key="food.id"  v-for="food in foodsData">
              <FoodCard :food="food" @update-qtys="$emit('update-qtys', { objects })" />
            </div>
        </div>
    </div>
</template>

<script>
import FoodCard from './FoodCard'

export default {
    props: ['foodsData'],
    components: {
        FoodCard
    }
}
</script>

<style>

.food-item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 4rem auto;
    max-width: 95%;
}

.food-item-container > .food-block {
    background: #323232;
    max-width: 50rem;
    margin: 4rem auto;
    padding: 2rem;
    border-radius: 3px;
    box-shadow: 0 2px 0 rgba(230, 145, 56, 0.05), 0 5px 20px rgba(230, 145, 56, 0.5);
    transition: all 100ms ease-in-out;
}

.food-block:hover {
    box-shadow: 0 0 0 0.5em #007acc;
}
</style>