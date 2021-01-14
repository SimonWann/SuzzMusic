<template>
    <div id="loading" v-show="isShow">
        <div id="bigC">
            <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
            
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return{
            
        }
    },
    computed:{
        isShow() {
            return this.$store.state.isLoading
        }
    }
}
</script>
<style lang="less">

@keyframes rotateN {
    from{
        transform: rotateY(0rad);
        // background: #d9534f;
    }
    to{
        transform: rotateY(6.28rad);
        // background: #f4f4f4;
    }
}
@keyframes shadowChange {
    0%{
        box-shadow: 0px 0px 3px darken(@graycolor, 0%);
    }
    50%{
        box-shadow: 0px 0px 10px darken(@graycolor, 20%);
    }
    100%{
        box-shadow: 0px 0px 3px darken(@graycolor, 0%);
    }
}

@redcolor: #d9534f;
@graycolor: #f4f4f4;
    #loading{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 30%;
        left: 50%;
        transform:translateX(-50%);
        border: 1px solid darken(@graycolor, 10%);
        border-radius: 25px;
        background: @graycolor;
        animation: shadowChange 2s infinite;
        z-index: 12;
        #bigC{
            font-size: 30px;
            color: darken(@graycolor, 60%);
            margin-left: 2px;
            margin-top: 7px;
            animation: rotateN 1s infinite;
            animation-timing-function: ease-out;
        }
    }
</style>