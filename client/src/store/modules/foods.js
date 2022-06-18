import axios from "axios"
//const BASE_URL = 'http://localhost:9000';

const foods = {
    namespaced: true,
    state: {
        foods: [],
        ingredients: [],
    },
    mutations: {
        SET_FOODS(state, data) {
            state.foods = data
        },
        SET_INGREDIENT_QTY(state, data) {
            state.ingredients = data
        }
    },
    actions: {
        async retrieveFoods({ commit }) {

            await axios.get('/api/foodslist')
            .then(response => {
                commit('SET_FOODS', response.data)
            })
            .catch(error => console.log(error))
            
        },
        async updateFoodOnHandQtys({ commit }, value) {
            return await axios.patch('/api/foods/' + value.food_id, {
                foodId: value.food_id,
                onHandQty : value.onHandQty,
                foodName: value.foodName
            })
            .then(response => {
                commit('SET_FOODS', response.data)
                return response.data
            })
            .catch(error => {
                console.log(error)
                return error
            })
        },
        async updateIngredientOnHandQtys({ commit }, value) {
            
            return await axios.patch('/api/ingredients/' + value.ingredient_id, {
                onHandQty : value.onHandQty,
                ingredientName: value.ingredientName
            })
            .then(response => {
                commit('SET_INGREDIENT_QTY', response.data)
                return response.data
            })
            .catch(error => {
                console.log(error)
                return error
            })
        }
    },
    getters: {
        allFoods : state => state.foods
    }
}

export default foods