<template>
    <div>
        <div class="food-item-container">
            <div class="food-block" v-for="food in foods" :key="food.id">
                <div class="save-block">
                    <button 
                        class="button is-primary save-block-btn"
                        @click="updateFoodQty({
                            food_id: food._id, 
                            foodName: food.foodName, 
                            onHandQty: food.onHandQty
                        })"
                    >
                        <i class="material-icons">save</i>
                    </button>
                </div>
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <div class="food-name">{{ food.foodName }}</div>
                            <div class="food-img">
                               <img :src="food.imageUrl" :alt="food.foodName" :title="food.foodName" />
                            </div>
                        </div>
                    </div>
                    <div class="tile is-4 is-vertical is-parent">
                        <div class="tile is-child box food-on-hand-qty-container">
                            <p class="count-label">On Hand:</p>
                            <!-- <p class="count-figure">{{ food.onHandQty }}</p> -->
                            <input class="input is-primary food-on-hand-input" type="number" min="0" v-model="food.onHandQty">
                        </div>
                        <div class="tile is-child box misc-info">
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
                                            <li class="flex-list" v-for="ingredient in food.ingredients" :key="ingredient._id">
                                                <div class="ingredient-image">
                                                    <img class="image is-64x64" :src="ingredient.imageUrl" :alt="ingredient.ingredientName" :title="ingredient.ingredientName">
                                                </div>
                                                <div class="ingredient-name">
                                                    <!-- <i class="material-icons" id="required-inner-qty">food_bank</i> -->
                                                    <!-- Required:
                                                    {{ ingredient.requiredQty }} -->
                                                    {{ingredient.ingredientName}}
                                                </div>
                                                <div class="on-hand-qty-container">
                                                    <input v-if="ingredient.onHandQty < 1" class="input is-danger ingredient-on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                    <input v-else class="input is-primary ingredient-on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                    <button 
                                                        class="button is-primary save-button"
                                                        @click="updateIngredientQtys({
                                                            ingredient_id: ingredient._id, 
                                                            ingredientName: ingredient.ingredientName, 
                                                            onHandQty: ingredient.onHandQty
                                                        })"
                                                    ><i class="material-icons">save</i></button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import { mapState } from 'vuex';
import { toast } from 'bulma-toast'

export default {
    mounted() {
        this.$store.dispatch('foods/retrieveFoods')
    },
    computed: {
        ...mapState('foods', ['foods']),
    },
    methods: {
        requiredOnHand: function(value) {
            if(value < 20) {
                return 20 - value;
            } else {
                return 0;
            }
        },
        updateFoodQty: async function(foodData) {

            await this.$store.dispatch('foods/updateFoodOnHandQtys', {
                food_id: foodData.food_id,
                foodName: foodData.foodName,
                onHandQty: foodData.onHandQty,
            }).then(res => {
                console.log(res)
                toast({
                    message: res,
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                })
                this.$store.dispatch('foods/retrieveFoods')
            }).catch(err => {
                console.log(err)
                toast({
                    message: `Encountered an error. ${err}`,
                    type: 'is-danger',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                })
            })

        },
        updateIngredientQtys: async function(ingredientData) {
            
            await this.$store.dispatch('foods/updateIngredientOnHandQtys', {
                ingredient_id: ingredientData.ingredient_id,
                ingredientName: ingredientData.ingredientName,
                onHandQty: ingredientData.onHandQty,
            }).then(res => {
                console.log(res)
                toast({
                    message: res,
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                })
                this.$store.dispatch('foods/retrieveFoods')
            }).catch(err => {
                console.log(err)
                toast({
                    message: `Encountered an error. ${err}`,
                    type: 'is-danger',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                })
            })
            
        }
    }
}
</script>