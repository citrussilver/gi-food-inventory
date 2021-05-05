<template>
  <div id="ingredients-block">
      <p>Ingredients List:</p>
      <ul id="ingredients-list">
          <li class="row" v-for="ingredient in ingredients" :key="ingredient._id">
              <div id="ingredient-image-container">
                  <img class="image is-64x64" :src="require(`../assets/images/food_inv/${ingredient.imagePath}.png`)" alt="ingredient.ingredientName" :title="ingredient.ingredientName">
                </div>
                <div id="required-qty-container">
                    {{ingredient.ingredientName}}
                </div>
                <div id="on-hand-qty-container">
                    <p>On Hand:</p>
                    <div id="qty-input-button-container">
                        <div id="qty-input">
                            <input v-if="ingredient.onHandQty < 1" class="input is-danger on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                            <input v-else class="input is-primary on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                        </div>
                        <div id="qty-button">
                          <!-- <button class="button is-primary save-button" @click="test({ingredient_id: ingredient._id, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button> -->
                          <button class="button is-primary save-button" @click="$emit('update-qtys', { ingredient_id: ingredient._id, ingredientName: ingredient.ingredientName, onhandqty: ingredient.onHandQty })"><i class="material-icons">save</i></button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['ingredients']
}
</script>

<style scoped>
#ingredients-block {
    background: #323232;
}

.ingredients-block p {
    padding: 0.1rem;
}

#ingredients-list {
    background: #252526;
    width: 100%;
}

#ingredients-list .row {
    padding: 0.5em;
    margin: 0%;
    display: flex;
    flex-direction: row;
}

#ingredients-list .row:hover {
    background-color: #007acc;
}

.row #ingredient-image-container {
    flex: 5%;
    display: grid;
}

.row #required-qty-container {
    flex: 5%; 
}

#required-qty p {
    text-align: center; 
}

#required-inner-qty {
    font-size: 5rem;
}

.row #on-hand-qty-container {
    flex: 26.5%;
    padding: 0 0.5rem;
}

.on-hand-qty-container .save-button {
    width: 2rem;
}

#qty-input-button-container {
    display: flex;
    justify-content: space-between;
}

.on-hand-input {
    width: 4.5vw;
}
</style>