<template>
    <div>
        <div class="food-item-container">
            <div class="food-block" :key="food.id" v-for="food in foodsData">
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
                            <!-- <input class="input is-primary on-hand-input" type="number" min="0" v-model="food.onHandQty"> -->
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
                                <template v-if="food.ingredients">
                                    <div class="ingredients-block">
                                        <p>Ingredients List:</p>
                                        <ul class="ingredients-list">
                                            <li class="grid-row" v-for="ingredient in food.ingredients" :key="ingredient._id">
                                                <div id="ingredient-image">
                                                    <img class="image is-64x64" :src="require(`../assets/images/food_inv/${ingredient.imagePath}.png`)" alt="ingredient.ingredientName" :title="ingredient.ingredientName">
                                                </div>
                                                <div class="ingredient-name">
                                                    <!-- <i class="material-icons" id="required-inner-qty">food_bank</i> -->
                                                    <!-- Required:
                                                    {{ ingredient.requiredQty }} -->
                                                    {{ingredient.ingredientName}}
                                                </div>
                                                <div class="on-hand-qty-container">
                                                    <input v-if="ingredient.onHandQty < 1" class="input is-danger on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                    <input v-else class="input is-primary on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                </div>
                                                <div class="save-button">
                                                    <!-- <button class="button is-primary save-button" @click="test({ingredient_id: ingredient._id, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button> -->
                                                    <button class="button is-primary save-button" @click="$emit('update-qtys', { ingredient_id: ingredient._id, ingredientName: ingredient.ingredientName, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button class="button is-primary" @click="$emit('update-qtys', [food, food.id])">Save Changes</button> -->
                <!-- <button class="button is-primary" @click="test(ingredient._id)">Save Changes</button> -->
            </div>
        </div>
    </div>  
</template>

<script>
// import ImageRef from './ImageRef.vue'
export default {
  components: { 
    //   ImageRef 
    },
    props: ['foodsData'],
    methods: {
        requiredOnHand: function(value) {
            if(value < 20) {
                return 20 - value;
            } else {
                return 0;
            }
        },
        test: function(Id) {
            console.log(Id);
        }
    }
}
</script>