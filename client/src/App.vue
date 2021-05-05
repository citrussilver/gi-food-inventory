<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span id="navspan">&#91;WIP&#93; Genshin Impact Food-Ingredients Inventory</span>
      </div>
    </nav>
    <!-- <Food :foodsData="foodsData" v-on:update-qtys="updateOnHandQtys" :key="randomKey"/> -->
    <div v-if="foodsData.length">
      <FoodsList :foodsData="foodsData" @update-qtys="updateOnHandQtys" />
    </div>
    <footer class="footer footerspan">
      <div class="content has-text-centered">
        <p>2020 GI Food-Ingredients Inventory</p>
        <p>by Hisokage</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios"
import { toast } from 'bulma-toast'
import Food from './components/Food.vue'
import FoodsList from './components/FoodsList.vue'

export default {
  components: {
    Food,
    FoodsList
  },
  data() {
    return {
      foodsData: [],
      randomKey: 0
    }
  },
  async mounted() {
    try {
      const response = await axios.get('api/foods/')
      this.foodsData = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async updateOnHandQtys(objects){
      try {
        
        const response = await axios.patch('api/foods/' + objects.ingredient_id, {
          onHandQty : objects.onhandqty,
          ingredientName: objects.ingredientName
        });
        // console.log(`\nFood ID: ${objects.food_id} \nOn Hand Qty passed: ${objects.onhandqty} \nIngredient ID: ${objects.ingredient_id}`);
        toast({
          message: 'Successfully updated ' + objects.ingredientName + ' quantity',
          type: 'is-info',
          position: "top-center",
          dismissible: true,
          pauseOnHover: true,
          closeOnClick: true
        })
        console.log(response.data)
        this.randomKey++
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

#navspan {
  padding: 1rem;
}

.footerspan {
  background-color: #363636;
}


</style>
