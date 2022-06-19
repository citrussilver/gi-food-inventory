<template>
  <footer class="footer footerspan">
      <div class="content has-text-centered">
        <p id="footer-desc">2022 Genshin Food Ingredients Tracker</p>
        <p>by DrunkIce<sup>3</sup> </p>
      </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footerspan {
  background-color: #363636;
}

#footer-desc {
  position: relative;
}

#footer-desc::after {
  content: 'powered by Vue, Node.js and MongoDB';
  position: absolute;
  left: 50%;
  top: 1.5rem;
  transform: translate(-50%, 0%);
  font-size: 0.5rem;
}
</style>