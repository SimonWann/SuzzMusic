<template>
<div id="songInfo">
    
    <div id="songid">
        <img :src="this.$store.state.currentS.al && this.$store.state.currentS.al.picUrl" alt="">
        <div class="alert alert-success" ref="lyric" role="alert" id="lyric">
            
            <div id="box1" ref="lyricBox">
                <h3 id="sname">{{name}}</h3>
                <p v-for="(item,index) in sentence" ref="lyr">{{item.sen}}</p>
            </div>
            
        </div>
    </div>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            
            timeExp: /\[\d+:\d+\.\d+\]+/g,
            fitstE: /\n/,
            top1: 0,
            eachExp: /\d+:\d/g,
            interviala: -1,
            cntb: 0,
            sentenceExp: /\[.*/g,
            tops: 0,
            node: 0,
            i: 1,
            timer: -1,
            switch: false
        }
    },
    // created() {
    //     this.timer = setInterval(() =>{
    //         console.log(this.sentence[this.i].time[0],this.currentTime, this.node)
    //         console.log(this.sentence[this.i].time[0],this.sentence[this.i-1].time[0],this.switch,'i:i-1:switch')
    //         if( this.sentence[this.i].time && this.currentTime > this.sentence[this.i].time[0] ) {
    //             if(Math.abs(this.sentence[this.i].time[0] - this.sentence[this.i - 1].time[0]) >= 5) {
    //                 this.animation(this.sentence[this.i].time[0], this.node)
    //                 this.i++
    //             }
                
    //         }
    //         if(this.switch === true) {
    //             this.i = 1
    //             this.node = 0
    //             this.switch = false
    //         }
    //     }, 1000)
    // },
    computed: {
        name() {
            if(!this.$store.state.cSong.name){
                return '歌词在这儿~'
            }
            return this.$store.state.cSong.name
        },
        lyric() {
            if(!this.$store.state.cSong.lyric){
                return  '[00:00.000] 纯音乐，请欣赏～'
            }
            this.switch = true
            return this.$store.state.cSong.lyric.lyric
        },
        currentTime() {
            return parseInt(this.$store.state.cSong.currentTime)
        },
        duration() {
            return this.$store.state.cSong.duration
        },
        songtime() {
            if( !this.lyric) {
                return 'err'
            }
            return Array.from(new Set(this.lyric.match(this.timeExp).map((current,index) => {
                return current.match(this.eachExp).map( (current2,index2) => {
                    return current2.split(':').reduce((total,current3,index3) => {
                        current3= parseInt(current3)
                        if(index3 === 0){
                            current3 = current3*60
                        }
                        return total += current3
                    },0)
                })
            }).flat()))
        },
        sentence() {
            if( !this.lyric) {
                return '[00:00.000] err'
            }
            return this.lyric.match(this.sentenceExp).map((current, index) => {
                if(current.match(this.timeExp) == null){
                    return '[00:00.000] 纯音乐，请欣赏～'
                }
                return {
                    time: (current.match(this.timeExp).map((current,index) => {
                        return current.match(this.eachExp).map((current2,index2) => {
                            return current2.split(':').reduce((total,current3,index3) => {
                                current3 = parseInt(current3)
                                if(index3 === 0){
                                    current3 = current3*60
                                }
                                return total += current3
                            },0)
                        })
                    })).flat(),
                    sen: current.replace(this.timeExp,'')
                }
            })
        },
        lyricC() {
            if( this.lyric )
            return this.lyric.replace(this.timeExp,'\n').replace(this.fitstE,'')
        },
        
    },
    methods: {
        animation(limit) {
            limit = -limit*17.5
            let post = this.node
            console.log(this.$refs.lyricBox)
            let timer2 = setInterval(() => {
                post = post - 0.5
                this.$refs.lyricBox.style.top = post + 'px'
                if(post <= limit) {
                    clearInterval(timer2)
                    this.node = post
                }
            }, 30)
        }
    }
}
</script>
<style lang="less" scoped>
    #songInfo{
        // border: 1px solid #000;
        
        height: 80px;
        width: 400px;

    }
    #sname{
        padding: 0px 0px;
        font-weight: 700;
    }
    #songid{
        overflow: hidden;
        
        display: flex;
        flex-wrap: nowrap;
        #box1{
            position: relative;
        }
        img{
            margin-left: 7px;
            border-radius: 7px;
            overflow: hidden;
            background: #777;
            width: 60px;
            height: 60px;
            border: 1px solid #eee;
            box-shadow: 1px 1px 1.5px #777;
        }
        #lyric{
            height: inherit;
            width: 300px;
            height: 61px;
            margin-right: 10px;
            margin-left: 13px;
            padding-left: 40px;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            white-space: pre-wrap;
            p{
                line-height: 17.5px;
            }
            div{
                position: relative;
                top: 0px;
                width: 400px;
            }
            
        }
    }
</style>