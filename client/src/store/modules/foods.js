import axios from "axios"

const foods = {
    namespaced: true,
    state: {
        foods: [],
    },
    mutations: {
        GET_FOODS(state, data) {
            state.foods = data
        }
    },
    actions: {
        retrieveFoods({ commit }) {
            axios.get('/api/foods')
                .then(response => {
                    commit('GET_FOODS', response.data)
                })
                .catch(error => console.log(error))
        }
    },
    getters: {
        allFoods : state => state.foods
    }
}

export default foods