<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-html="desc"></p>

    <div class="global-style"> global style</div>
    <div class="self-style"> self style</div>
    <div class="var-style"> var style</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'vue demo',
      desc: '该 demo 已经集成 px to rem（font dpr）、sass resources <br>可以右键查看 px 已经转成 rem <br>font size 已经做了 dpr 适配'
    }
  }
}
</script>

<style lang="scss" scoped>
.hello
{
  padding: 20px;
  border: solid 1px #999;
  text-align: center;
  p
  {
    line-height: 2em;
  }
  .var-style
  {
    @include var-style(#0f0);
    font-size: 20px;
  }
  .self-style
  {
    color: #00f;
    font-size: 20px;
  }
}
</style>
