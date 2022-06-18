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
};
</script>
