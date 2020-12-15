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
        margin-top: 20px;
        width: 600px;
        height: 482px;
        overflow: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        h3{
            font-weight: 700;
        }
        
    }
    #com{
        width: 600px;
        height: 482px;
    }
</style>