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
                            <p class="count-label">Craftable Qty:</p>
                            <p class="count-figure">{{ craftableQty }}</p>
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
                    <div class="tile tile-parent-container">
                        <div class="tile is-parent">
                            <div class="tile is-child box">
                                <template v-if="food.ingredients">
                                    <div class="ingredients-block">
                                        <p>Ingredients List:</p>
                                        <ul class="ingredients-list">
                                            <li class="flex-list" v-for="ingredient in food.ingredients" :key="ingredient._id">
                                                <div class="ingredient-image-container">
                                                    <img class="image is-64x64" :src="ingredient.ingredientDetail[0].imageUrl" :alt="ingredient.ingredientName" :title="ingredient.ingredientName">
                                                </div>
                                                <div class="is-hidden-mobile ingredient-name-container">
                                                    {{ ingredient.ingredientDetail[0].ingredientName }}
                                                </div>
                                                <div class="required-qty-container">
                                                    <span class="material-icons">outdoor_grill</span>
                                                    {{ ingredient.requiredQty }}
                                                </div>
                                                <div class="on-hand-qty-container">
                                                    <input v-if="ingredient.ingredientDetail[0].onHandQty < 1" class="input is-danger ingredient-on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                    <input v-else class="input is-primary ingredient-on-hand-input" type="number" v-model="ingredient.ingredientDetail[0].onHandQty" min="0">
                                                    <button 
                                                        class="button is-primary save-button"
                                                        @click="updateIngredientQtys({
                                                            ingredient_id: ingredient.ingredientDetail[0]._id, 
                                                            ingredientName: ingredient.ingredientDetail[0].ingredientName, 
                                                            onHandQty: ingredient.ingredientDetail[0].onHandQty
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
    data() {
        return {
            craftableQty: 0,
            craftableDetailsObj: {},
            craftableDetailsArray: []
        };
    },
    methods: {
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

<style>
.tile {
    background: var(--dark-item-bg);
    color: var(--white-text);
}

.tile.is-child {
    /* box-shadow: 0 2px 0 rgba(230, 145, 56, 0.05), 0 5px 20px rgba(230, 145, 56, 0.5); */
    border-style: dotted;
    border-radius: 0.75rem;
    border-color: rgba(230, 145, 56, 0.1);
}

p .count-label {
    font-size: 20px;
    text-align: center;
}

.tile .count-figure {
    font-size: 2.5rem;
    text-align: center;
}

.tile .food-name {
    text-align: center;
    font-size: 20px;
    padding: 0.5rem;
}

.tile .food-img {
    text-align: center;
}

.food-img img {
    border-radius: 50%;
}

.food-item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 4rem auto;
    max-width: 95%;
}

.food-item-container > .food-block {
    background: var(--dark-item-bg);
    max-width: 50rem;
    margin: 4rem auto;
    padding: 2rem;
    border-radius: 0.1875rem;
    box-shadow: 0 5px 20px rgba(230, 145, 56, 0.05), 0 5px 20px rgba(230, 145, 56, 0.5);
    transition: all 100ms ease-in-out;
}

.save-block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.save-block button {
    position: absolute;
    top: 14vh;
    z-index: 2;
    left: 92%;
}

.button.is-primary.save-block-btn {
    /* background-color: rgba(0, 209, 178, 2%); */
    border-radius: 50%;
}

.button.is-primary.save-block-btn:hover, .button.is-primary.save-button:hover {
    background-color: rgba(230, 145, 56, 1);
}

.food-block:hover {
    box-shadow: 0 0 0 0.5em var(--hover-color);
}

#txtarea-custom {
    background: var(--dark-item-bg);
    color: var(--white-text);
}

.ingredients-block {
    background: var(--dark-item-bg);
}

.ingredients-block p {
    padding: 0.1rem;
}

.ingredients-list {
    background: var(--dark-item-bg);
    width: 100%;
}

.ingredients-list .row {
    padding: 0.5em;
    margin: 0%;
    display: flex;
    flex-direction: row;
}

.flex-list {
    display: flex;
    justify-content: space-between;
    border-style: dotted;
    border-color: rgba(230, 145, 56, 0.1);
    border-radius: 0.75rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
}

.flex-list:hover {
    background-color: rgba(22, 114, 249, 50%);
}

.grid-row {
    display: grid;
    grid-template-columns: 20% 30% 30% 20%;
    border-style: dotted;
    border-color: rgba(230, 145, 56, 0.1);
    border-radius: 0.75rem;
}

.food-on-hand-qty-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.food-on-hand-input {
    -moz-appearance: textfield;
    appearance: textfield;
    padding: 0;
    background-color: inherit;
    color: #fff;
    font-size: 2.2rem;
    max-width: 3rem;
    max-width: 7.5rem;
    text-align: center;
}

.misc-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


.ingredient-on-hand-input {
    max-width: 5rem;
}

.ingredient-image-container, .ingredient-name-container, .required-qty-container, .on-hand-qty-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ingredient-image-container img {
    border-radius: 20%;
}

.button {
    max-width: 2.5rem;
}

@-moz-document url-prefix() {
    @media only screen and (max-width: 740px) {
        .save-block button {
            position: absolute;
            top: 61.5vh;
            left: 70%;
            padding: 2rem;
        }
    }
}

/* @media screen and (-webkit-min-device-pixel-ratio:0)
  and (min-resolution:.001dpcm) {
    @media only screen and (max-width: 740px) {
        .save-block button {
            position: absolute;
            top: 61.5vh;
            left: 70%;
            padding: 2rem;
        }
    }    
} */

@media only screen and (max-width: 740px) {

    .ingredient-on-hand-input {
        max-width: 3.7rem;
    }

    .button.is-primary.save-block-btn {
        background-color: rgba(0, 209, 178, 2%);
    }
    .button.is-primary.save-block-btn:hover {
        background-color: #00d1b2;
    }

    .ingredient-on-hand-input {
        -moz-appearance: textfield;
        -webkit-appearance: none; 
        appearance: textfield;
    }
}
</style>