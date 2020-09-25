<template>
    <div>
        <div id="category" class="list-group">
            <a href="#" v-for="(item,index) in allist" @click.prevent="active(index)" class="list-group-item" :class="{ active: isActive[index] }">
                {{item.name}}
            </a>
            
        </div>
        
    </div>
</template>
<script>
export default {
    data:  function() {
        return  {
            isActive: new Array(),
            isClick: new Array()
        }
    },
    computed:{
         allist: function() {
             if(this.$store.state.allist.playlist){
                for (let i=0; i<this.$store.state.allist.playlist.length;i++){
                    this.isClick.push(false)
                }
                return this.$store.state.allist.playlist;
             }else{
                return [];
             }
            //  console.log(this.$store.state.allist.playlist)
             
         }
    },
    methods: {
        active(index) {
            this.isActive = []
            this.isActive = this.isClick.map((current,index1) => {
                current = false
                if( index1 == index){
                    current = true
                }
                return current
            })
            this.$store.dispatch('getAlList',index)
            return this.isActive
            
        }
    }
    
}
</script>
<style lang="less">
    #category{
        display: flex;
        flex-wrap: wrap;
        a{
            padding: 25px;
            
        }
        // border: 1px solid #000;
        height: 150px;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        padding: 1px 0px;
    }
</style>