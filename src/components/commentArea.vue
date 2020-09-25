<template>
    <div>
        <div id="comment" class="list-group">
            <a v-for="(item,index) in conList.hotComments" class="list-group-item list-group-item-success" :class="colorClass[index%4]">
                <h3>{{item.user.nickname}}</h3>
                <p>{{item.content}}</p>
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
                        'list-group-item-danger']
        }
    },
    computed: {
        conList() {
            return this.$store.state.comList
        },
    },
    method: {

    }
}
</script>
<style lang="less" scoped>
    #comment{
        margin-top: 40px;
        width: inherit;
        height: 340px;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        h3{
            font-weight: 700;
        }
        img{
            width: 25px;
            height: 25px;
            background: #fff;
            border-radius: 25px;
            overflow: hidden;
            
        }
    }
</style>