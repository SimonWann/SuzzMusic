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
            this.$store.commit('changeName', item.name)
            this.$store.commit('currentSong',this.$store.state.sdetaillist[this.cindex])
            this.cUrl = this.$store.state.sdetaillist[this.cindex].id
            this.$store.dispatch('getcuUrl', this.cUrl)
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
 @redcolor: #d9534f;
    @keyframes scrollc {
        from{
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            background: darken(@redcolor, 20%); 
        }
        to{
            box-shadow: 0px 0px 7px darken(@redcolor, 20%); 
            background: darken(@redcolor, -5%); 
        }
    }
#songs{
    margin-top: 20px;
    width: inherit;
    height: 378px;
    overflow: auto;
    &::-webkit-scrollbar{
            height: 10px;
            width:10px;
            // border: 1px solid #000;
            &:hover{
                // background: #000;
            }
        }
        &::-webkit-scrollbar-tack{
            border-radius: 10px;
            border: 1px solid #000;
            &:hover{
                background: #000;
            }
        }
        &::-webkit-scrollbar-button{
            border-radius: 2px;
            border: 1px solid darken(@redcolor, 70%);
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            background: darken(@redcolor, 20%); 
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 3px;
            border: 1px solid darken(@redcolor, 70%);
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            background: darken(@redcolor, 20%); 
            &:hover{
                animation: scrollc 0.3s;
               
            }
            
        }
    h3{
        font-weight: 700;
    }
}
</style>