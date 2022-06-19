<template>
  <nav class="styled-nav">
      <div class="flex items-center">
        <div><img class="image is-64x64" src="https://lh3.googleusercontent.com/u-rhq1fjHeh86u2VXYwvFgg5dlQtEAfhZW91zbT9R2FsHdybSt5FiQssx-6kjUQPAQ51Q3zdAsdrARmyGw4JSd0gqi53DCw7EmH-fHWyVDQ281-yY3H-AQQNZ6LBfadSaacy0EpRJA=s256-p-k" alt=""></div>
        <div class="is-hidden-mobile">Genshin Food Ingredients Tracker</div>
        <div class="is-hidden-desktop site-name-container">Genshin Food Ingredients</div>
      </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
  .styled-nav {
    font-weight: 400;
    font-size: 1.5rem;
    background-color: var(--dark-item-bg);
    padding: 2rem 2.5rem;
    color: #fff;  
    /* display: flex;
    align-items: center; */
  }

  .site-name-container {
    position: relative;
  }

  @media only screen and (max-width: 740px) {

    .site-name-container {
      font-size: 0.95rem;
    }

    .site-name-container::after {
      content: 'Tracker';
      position: absolute;
      top: 65%;
      left: 15%;
      transform: translate(-50%, 0%);
    }
  }
</style>
