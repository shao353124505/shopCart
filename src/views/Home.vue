<template>
  <div class="home-component">

    <div class="jumbotron jumbotron-fluid main_img">
        <div class="container title">
<!--          <img alt="Vue logo" src="../assets/dabing.png" width="100px">-->
          <h3 class="display-5 "><span style="color:#FFFFFF">大兵健身器材南通有限公司网上商城</span></h3>
          <p style="color:#FFFFFF">欢迎您！</p>
        </div>
    </div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Our Best Products</li>
        <li class="ml-auto" aria-current="page"><router-link to="/products">Show All</router-link></li>
      </ol>
      
    </nav>
    <BestProducts></BestProducts>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active " aria-current="page">Our Top Products</li>
        <li class="ml-auto" aria-current="page"><router-link to="/products">Show All</router-link></li>
      </ol>
    </nav>
    <TopProducts></TopProducts>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BestProducts from "@/components/products/BestProducts.vue";
import TopProducts from "@/components/products/TopProducts.vue";
export default {
  name: "home",
  components: {
    HelloWorld,
    BestProducts,
    TopProducts
  }
};
</script>
<style>
.jumbotron {
  padding: 1rem 0rem;
}

    .main_img{
        background:url('../assets/main.png');
        -moz-background-size:40% 100%; /* 老版本的 Firefox */
        background-size:100% 100%;
        background-repeat:no-repeat;
        height: 250px;
    }

    .main_img .title{
        font-family:arial,helvetica,sans-serif;
        padding: 60px 0px;
    }
</style>
