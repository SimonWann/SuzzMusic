<template>
    <div id="songs">
        <div class="list-group">
            
            <a @click="getsongurl(item,index)" v-for="(item,index) in songlist" class="list-group-item list-group-item-success" :class="colorClass[index%4]">
                <h3>{{item.name}}</h3>
                <p><span v-for="(item2,index) in item.ar">{{item2.name}},</span></p>
                
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            colorClass: ['list-group-item-success',
                        'list-group-item-info',
                        'list-group-item-warning',
                        'list-group-item-danger'],
            cUrl: {},
            cindex: 0
        }
    },
    computed: {
        songlist() {
            return this.$store.state.sdetaillist
        },
        
    },
    methods: {
        getsongurl(item,index) {
            console.log(index)
            this.$store.commit('changeIndex',index)
            this.cindex = index
            this.$store.commit('currentSong',this.$store.state.sdetaillist[this.cindex])
            this.cUrl = this.$store.state.sdetaillist[this.cindex].id
            this.$store.dispatch('getcuUrl',this.cUrl)
            this.$store.dispatch('getsonginfo',this.cUrl)
            this.$store.commit('checkFavorite',false)
            for(let item of this.$store.state.favoriteList){
                if( this.cUrl == item ){
                    this.$store.commit('checkFavorite',true)
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
#songs{
    margin-top: 40px;
    width: inherit;
    height: 340px;
    overflow: auto;
    &::-webkit-scrollbar{
        display: none;
    }
}
</style>