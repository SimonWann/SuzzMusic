<template>
    <div id="com">
        <div id="comment" class="list-group">
            <a v-for="(item,index) in conList.hotComments" class="list-group-item list-group-item-success" :class="colorClass[index%4]">
                <h3>{{item.user.nickname}}</h3>
                <p>{{item.content}}</p>
            </a>
            <a v-for="(item,index) in conList.comments" class="list-group-item list-group-item-success" :class="colorClass[index%4]">
                <h3>{{item.user.nickname}}</h3>
                <p>{{item.content}}</p>
            </a>
            <a id="changePage" href="#" @click.prevent="getCom" class="list-group-item list-group-item-success" >
                换一页
            </a>
        </div>
        
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            a: 1,
            colorClass: ['list-group-item-success',
                        'list-group-item-info',
                        'list-group-item-warning',
                        'list-group-item-danger'],
            page: 0
        }
    },
    computed: {
        conList() {
            return this.$store.state.comList
        },
    },
    methods: {
        getCom() {
            this.page++
            if(this.page > 10) {
                this.page = 0
            }
            this.$store.dispatch('getCom',{id:this.$store.state.sdetaillist[this.$store.state.cindex].id, page: this.page})
        },
        changePage() {

        }
    }
}
</script>
<style lang="less" scoped>
    @redcolor: #d9534f;
    @keyframes scroll {
        from{
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            background: darken(@redcolor, 20%); 
        }
        to{
            box-shadow: 0px 0px 7px darken(@redcolor, 20%); 
            background: darken(@redcolor, -5%); 
        }
    }
    #comment{
        margin-top: 20px;
        width: 400px;
        height: 378px;
        overflow: auto;
        
        h3{
            font-weight: 700;
        }
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
                
                animation: scroll 1s;
            }
            
        }
        
    }
    #com{
        width: 400px;
        height: 378px;
        overflow: hidden;
        
    }
    #changePage{
        text-align: center;
    }
</style>