<template>
  <div class="home">
    <FoodsListView />
  </div>
</template>

<script>
// @ is an alias to /src
import FoodsListView from '../components/FoodsListView'


export default {
  name: "Home",
  components: {
    FoodsListView
  },
  methods: {
    // async updateOnHandQtys(objects){
    //   try {
    //     const response = await axios.patch('api/foods/' + objects.ingredient_id, {
    //       onHandQty : objects.onhandqty,
    //       ingredientName: objects.ingredientName
    //     });
    //     // console.log(`\nFood ID: ${objects.food_id} \nOn Hand Qty passed: ${objects.onhandqty} \nIngredient ID: ${objects.ingredient_id}`);
    //     toast({
    //       message: 'Successfully updated ' + objects.ingredientName + ' quantity',
    //       type: 'is-info',
    //       position: "top-center",
    //       dismissible: true,
    //       pauseOnHover: true,
    //       closeOnClick: true
    //     })
    //     console.log(response.data)
    //     this.randomKey++
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
};
</script>
