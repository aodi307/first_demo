<template>
    <div>
       <h1>Message</h1>
      <keep-alive>
        <transition style="padding:20px 0" name="fade" mode="out-in" >
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </transition>
      </keep-alive>
      <transition style="padding:20px 0" name="fade" mode="out-in" >
        <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "Message"
    }
</script>

<style scoped>

</style>
