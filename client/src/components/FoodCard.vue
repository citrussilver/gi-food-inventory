<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <div id="food-name">{{ food.foodName }}</div>
          <div id="food-img">
            <img :src="require(`../assets/images/food_inv/${food.imagePath}.png`)" :alt="food.foodName" :title="food.foodName" />
          </div>
        </div>
      </div>
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="count-label">On Hand:</p>
          <p class="count-figure">{{ food.onHandQty }}</p>
        </div>
        <div class="tile is-child box">
          <p class="count-label">Deficit:</p>
          <p class="count-figure">{{ requiredOnHand(food.onHandQty) }}</p>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p>Effect</p>
            <p><textarea id="txtarea-custom" class="textarea is-info has-fixed-size" v-model="food.effect" disabled /></p>
          </article>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <div v-if="food.ingredients">
              <Ingredient :ingredients="food.ingredients" @update-qtys="$emit('update-qtys', { objects })" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button class="button is-primary" @click="$emit('update-qtys', [food, food.id])">Save Changes</button> -->
    <!-- <button class="button is-primary" @click="test(ingredient._id)">Save Changes</button> -->
  </div>
</template>

<script>
import Ingredient from './Ingredient'

export default {
  props: ['food'],
  components: {
    Ingredient
  },
  methods: {
    requiredOnHand: function(value) {
      if(value < 20) {
        return 20 - value;
        } else {
                return 0;
            }
        }
  }
}
</script>

<style scoped>
.tile {
    background: #323232;
    color: #fff;
    padding: 0.30em;
}

.tile .count-label {
    font-size: 20px;
    text-align: center;
}

.tile .on-hand-input {
    width: 5rem;
}

.tile .count-figure {
    font-size: 40px;
    text-align: center;
}

.tile #food-name {
    text-align: center;
    font-size: 20px;
    padding: 0.5rem;
}

.tile #food-img {
    text-align: center;
}

#txtarea-custom {
    background: #323232;
    color: #fff;
    cursor: pointer;
}
</style>