<template>
    <div>
        <div id="category" class="list-group">
            <a href="#" v-show="this.$store.state.isLogin" @click.prevent="showSearch" class="list-group-item"  :class="{active: isSearchAcitive}">搜索</a>
            <a v-show="this.$store.state.isLogin" href="#" @click.prevent="dailyActive" class="list-group-item" :class="{ active: isDailyActive }">
                每日推荐
            </a>
            <a href="#" v-for="(item,index) in allist" @click.prevent="active(index)" class="list-group-item" :class="{ active: isActive[index] }">
                {{item.name}}
            </a>
            
        </div>
        <div id="search1" v-if="isSearchAcitive">
            <div id="box3" class="input-group">
            <input v-model="info" type="text" class="form-control" placeholder="搜索" aria-describedby="basic-addon1">
            <span class="input-group-btn" id="basic-addon1"><button @click="searchNow" class="btn btn-default">:)</button></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:  function() {
        return  {
            isActive: new Array(),
            isClick: new Array(),
            isDailyActive: false,
            isSearchAcitive: false,
            isSearchShow: false,
            info: ''
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
    created() {
        // console.log('sasds')
        this.$store.dispatch('hotMenu')
    },
    methods: {
        active(index) {
            this.isSearchAcitive = false
            this.isDailyActive = false
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
        },
        dailyActive() {
            this.isActive = []
            this.isSearchAcitive = false
            this.isDailyActive = true
            this.$store.dispatch('getDailySong','Wann')
        },
        showSearch() {
            this.isActive = []
            this.isDailyActive = false
            this.isSearchAcitive = !this.isSearchAcitive
        },
        searchNow() {
            this.$store.dispatch('search', this.info)
            .then((data) => {
                
            })
        }
    }
    
}
</script>
<style lang="less">
    #category{
        display: flex;
        flex-wrap: wrap;
        a{
            padding: 20px;
            
        }
        // border: 1px solid #000;
        height: 124px;
        
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        padding: 1px 0px;

    }
    #search1{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        // transform: translateY(-50%);
        width: 300px;
        height: 150px;
        border: 1px solid #f5f5f5;
        border-radius: 5px;
        background: #f5f5f5;
        box-shadow: 0px 0px 3px darken(#d8dadd, 15%);
        display: flex;
        justify-content: center;
        align-items: center;
        #box3{
            
            width: 200px;
        }
    }
</style>