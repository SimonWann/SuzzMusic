<template>
    <div>
        <div id="loginMessage">
            <router-view></router-view>
        </div>
        <div id="main">
            <audio id="player1" ref="player" @canplay="playN" @play.once="autoMusicP" :src="this.$store.state.currentUrl"></audio>
            
            <div id="control">
                <span class="glyphicon glyphicon-minus-sign" @click="backSong"></span>
                <span class="glyphicon glyphicon-play" @click="playBtn" :style="playChangeStyle"></span>
                <span class="glyphicon glyphicon-plus-sign" @click="forwardSong"></span>
                <span class="glyphicon glyphicon-comment" @click="openCom" :style="comChangeStyle"></span>
                <span>
                    <span v-if="this.$store.state.isFavorite" @click="notLike" class="glyphicon glyphicon-heart"></span>
                    <span v-else @click="beLike" class="glyphicon glyphicon-heart-empty"></span>
                </span>
                <span class="glyphicon glyphicon-volume-down" @click="VolShow"></span>
                <div v-if="isVol" id="volP" ref="volwidth1"  @click="changeVol($event)" class="progress">
                    <div id="volP2" class="progress-bar" ref="volwidth2" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width: VolWidth*2+'%'}">
                        <span class="sr-only">60% Complete</span>
                    </div>
                </div>
            </div>
            <div v-if="$store.state.isLogin" id="userInfo" class="userInfo2">
                <img id="avator" :src="$store.state.profile.avatarUrl" />
            </div>
            <div v-else id="userInfo">
                <router-link to="/login" tag="button" class="btn btn-default">登陆</router-link>
                
            </div>
        </div>
        <div id="progress">
            <span id="ctime">{{parseInt(currentTime/60)}}:{{parseInt(currentTime%60)}}</span>
            <div @click="changeSongP" id="progressline" class="progress">
                <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width: parseInt(this.$store.state.cSong.currentTime/this.$store.state.cSong.duration*100) + '%'}">
                </div>
                <button id="dragBtn"  :style="{left: dragBtnLeft+'px'}" ></button>
            </div>
            <span id="ttime">{{parseInt(duration/60)}}:{{parseInt(duration%60)}}</span>
        </div>
    </div>
    
</template>
<script>
export default {
    data: function() {
        return {
            playStyle: {
                textShadow: 1+'px ' +1 + 'px '+ 5 + 'px '+  '#6b0b0b'
            },
            playStyle2: {
                textShadow: ''
            },
            VolWidth: 100,
            isVol: false,
            p: 0,
            cindex: 0,
            orLike: false,
            dragBtnLeft: 0,
            timer: true
        }
    },
    computed: {
        playChangeStyle() {
            if(this.$store.state.isPlay){
                return this.playStyle;
            } else {
                return this.playStyle2;
            }
        },
        comChangeStyle() {
            if(!this.$store.state.isSong){
                    return this.playStyle;
                } else {
                    return this.playStyle2;
                }
        },
        currentTime() {
            console.log('正在监听音乐时间')
            this.$store.state.cSong.currentTime
            if(this.$refs.player) {
                if( this.$refs.player.ended ) {
                    this.cindex = this.$store.state.cindex
                    this.cindex++
                    if(this.cindex >= this.$store.state.sdetaillist.length){
                        this.cindex = 0
                    }
                    this.$store.commit('currentSong',this.$store.state.sdetaillist[this.cindex])
                    this.cUrl = this.$store.state.sdetaillist[this.cindex].id
                    this.$store.commit('changeName', this.$store.state.sdetaillist[this.cindex].name)
                    this.$store.commit('changeIndex',this.cindex)
                    this.$store.dispatch('getcuUrl',this.cUrl)
                    this.$store.dispatch('getsonginfo',this.cUrl)
                    for(let item of this.$store.state.favoriteList){
                        if( this.cUrl == item ){
                            this.$store.state.isFavorite = true
                        } else {
                            this.$store.state.isFavorite = false
                        }
                    }
                    
                }
                console.log('播放时间为：'+this.$refs.player.currentTime)
                for(let i; i<this.$store.state.lyricDis ; i++){
                    this.$store.state.lyricDis[i] <=  this.$refs.player.currentTime && console.log('checked~')
                }
                return this.$refs.player.currentTime;
            }else {
                return 0;
            }
            
        },
        duration() {
            this.$store.state.cSong.currentTime
            if(this.$refs.player) {
                return this.$refs.player.duration;
            }else {
                return 0
            }
            
        }
    },
    methods: {
        playBtn() {
            this.$store.commit('playMusic')
            if(this.$store.state.isPlay){
                this.$refs.player.play()
                console.log('开始播放')
            }else {
                this.$refs.player.pause()
                console.log('暂停播放')
            }
            
        },
        changeVol(e) {
            this.VolWidth = e.offsetX
            this.$refs.player.volume = this.VolWidth*2/100
        },
        VolShow() {
            this.isVol = !this.isVol 
            return this.isVol
        },
        changeSongP(e) {
            
            if(this.timer){
                this.timer = false
                setTimeout(() => {
                    this.timer = true
                    console.log(e.offsetX)
                    this.p = e.offsetX/3
                    this.$store.commit('musicP',this.p)
                    this.$refs.player.currentTime = this.p/100*this.$refs.player.duration
                    console.log(this.p)
                    
                }, 30);
            }else {
                console.log('false')
                return
            }
            
            
        },
        autoMusicP() {
            setInterval(() =>{
                console.log('正在更新播放进度条')
                if( this.$refs.player ) {
                    this.$store.commit('timePlay',{
                        currentTime: this.$refs.player.currentTime,
                        duration: this.$refs.player.duration
                    })
                }
            },1000) 
        },
        playN() {
            // console.log(this.$store.state.isPlay)
            if(this.$store.state.isPlay){
                this.$refs.player.play()
                console.log('开始播放')
            }else {
                this.$refs.player.pause()
                console.log('暂停播放')
            }
        },
        backSong() {
            this.cindex = this.$store.state.cindex
            this.cindex--
            if(this.cindex < 0){
                this.cindex = this.$store.state.sdetaillist.length-1
            }
            this.$store.commit('currentSong',this.$store.state.sdetaillist[this.cindex])
            this.cUrl = this.$store.state.sdetaillist[this.cindex].id
            this.$store.commit('changeName', this.$store.state.sdetaillist[this.cindex].name)
            this.$store.commit('changeIndex',this.cindex)
            this.$store.dispatch('getcuUrl',this.cUrl)
            this.$store.dispatch('getsonginfo',this.cUrl)
            this.$store.commit('checkFavorite',false)
            for(let item of this.$store.state.favoriteList){
                if( this.cUrl == item ){
                    this.$store.commit('checkFavorite',true)
                }
            }
        },
        forwardSong() {
            this.cindex = this.$store.state.cindex
            this.cindex++
            if(this.cindex >= this.$store.state.sdetaillist.length){
                this.cindex = 0
            }
            
            this.$store.commit('currentSong',this.$store.state.sdetaillist[this.cindex])
            this.cUrl = this.$store.state.sdetaillist[this.cindex].id
            this.$store.commit('changeName', this.$store.state.sdetaillist[this.cindex].name)
            this.$store.commit('changeIndex',this.cindex)
            this.$store.dispatch('getcuUrl',this.cUrl)
            this.$store.dispatch('getsonginfo',this.cUrl)
            this.$store.commit('checkFavorite',false)
            for(let item of this.$store.state.favoriteList){
                if( this.cUrl == item ){
                    this.$store.commit('checkFavorite',true)
                }
            }
        },
        openCom() {
            
            this.$store.dispatch('getCom',{id: this.$store.state.sdetaillist[this.$store.state.cindex].id})
        },
        beLike() {
            console.log('click')
            this.orLike = true
            this.$store.dispatch('likeSong', this.orLike)
            .then(data => {
                console.log(data)
            })
        },
        notLike() {
            this.orLike = false
            this.$store.dispatch('likeSong', this.orLike)
        },
        moveDragBtn() {
            console.log('ss')
        }
    }
}
</script>
<style lang="less" scoped>
    @keyframes btnColor {
        from{
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            background: darken(@redcolor, 20%); 
        }
        to{
            box-shadow: 0px 0px 7px darken(@redcolor, 20%); 
            background: darken(@redcolor, -5%); 
        }
    }
    @keyframes volColor {
        from{
            box-shadow: 0px 0px 3px darken(@redcolor, 20%); 
            
        }
        to{
            box-shadow: 0px 0px 7px darken(@redcolor, 20%); 
            
        }
    }
    @redcolor: #d9534f;
    #control{
        width: 370px;
        height: 68px;
        background: #d9534f;
        font-size: 17px;
        color: lighten(#000, 93.5%);
        
        span{
            padding: 5px;
            &:hover{
                text-shadow: 1px 1px 5px #6b0b0b;
            }
        }
        padding: 20px;
    display: inline-block;
    border-bottom: 1px solid #eccdcd;
    }
    #userInfo{
        padding: 18px 0px 18px 18px;
        #avator{
            width: 35px;
            height: 35px;
            background: #fff;
            border-radius: 7px;
            overflow: hidden;
            border: 1px solid darken(@redcolor, 30%);
            box-shadow: 0px 0px 3px darken(@redcolor, 10%);
        }
        background: #d9534f;
        width: 100px;
        height: 68px;
        border-bottom: 1px solid #eccdcd;
    }
    
    #main{
        width: 400px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    #loginMessage{
        position: relative;
    }
    #volP{
        #volP2{
            background: darken(@redcolor, 20%);
            &:hover{
                    animation: btnColor 0.3s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
        }
        width: 50px; 
        height: 14px;
        position: relative;
        left: 165px;
        top: -20px;
        box-shadow: inset 0px 0px 3px #e8e8e8;
        border: 1px solid darken(@redcolor, 70%);
        box-shadow: 0px 0px 3px darken(@redcolor, 20%);
        &:hover{
                    animation: volColor 0.3s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
    }
    #progress{
        height: 30px;
        margin: 20px 0px 0px 0px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        #progressline{
            height: 14px;
            width: 300px;
            margin: 0px 12px;
            overflow: visible;
            white-space: nowrap;
            #dragBtn{
                position: relative;
                top: -1px;
                left: 0px;
                background: darken(@redcolor, 20%);
                transform: translateX(-50%);
                width: 15px;
                height: 17px;
                border: 1px solid darken(@redcolor, 70%);
                border-radius: 9px;
                box-shadow: 0px 0px 3px darken(@redcolor, 20%);
                outline: none;
                
                &:hover{
                    animation: btnColor 0.3s;
                    animation-fill-mode: forwards;
                    animation-timing-function: ease-out;
                }
                
            }
        }
        span{
            line-height: 17px;
        }

            
    }
</style>