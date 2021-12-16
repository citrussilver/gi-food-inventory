<template>
    <div>
        <div class="food-item-container">
            <div class="food-block" v-for="food in foodsData" :key="food.id">
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <div id="food-name">{{ food.foodName }}</div>
                            <div id="food-img">
                                {{ food.foodName }}
                                <!-- <img :src="foodIcon()" :alt="food.foodName" :title="food.foodName" /> -->
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
                                                    <!-- <button class="button is-primary save-button" @click="$emit('update-qtys', { ingredient_id: ingredient._id, ingredientName: ingredient.ingredientName, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button> -->
                                                    <button class="button is-primary save-button"><i class="material-icons">save</i></button>
                                                    <!-- @click="updateQtys({ ingredient_id: ingredient._id, ingredientName: ingredient.ingredientName, onhandqty: ingredient.onHandQty})" -->
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

import axios from "axios"
import { toast } from 'bulma-toast'

export default {
    components: { 
        //ImageRef 
    },
    mounted() {
        this.$store.dispatch('foods/retrieveFoods')
    },
    computed: {
        foodsData() {
            return this.$store.state.foods
        }
    },
    methods: {
        requiredOnHand: function(value) {
            if(value < 20) {
                return 20 - value;
            } else {
                return 0;
            }
        },
        updateQtys: async function(objects) {
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