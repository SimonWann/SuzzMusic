<template>
  <div id="app">
    <loading></loading>
    <player></player>
    <song-info></song-info>
    <category></category>
    <song v-show="this.$store.state.isSong"></song>
    <comment-area v-show="!this.$store.state.isSong"></comment-area>
  </div>
</template>
<script>
import player from './components/player'
import songInfo from './components/songInfo'
import category from './components/category'
import song from './components/song'
import commentArea from './components/commentArea'
import loading from './components/loading'

export default {
  components: {
    player,
    songInfo,
    category,
    song,
    commentArea,
    loading
  }
}
</script>
<style lang="less">
  #app{
    width: 400px;
    height: 700px;
    margin: 0 auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }
</style>
