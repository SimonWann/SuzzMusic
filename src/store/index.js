import Vue from 'vue'
// import { axios } from 'vue/types/umd'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
const instance1 = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})
export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    profile: {
      
    },
    isPlay: false,
    cSong: {
      id: '',
      name: '',
      currentTime: 0,
      duration: 180,
      src: '',
      lyric: {}
    },
    allist: {},
    userId: '',
    songList: {},
    ids: [],
    sdetaillist: [],
    currentUrl: '',
    currentS: {},
    lyricP: {},
    lyricDis: [],
    nextDistance: 30+ 'px',
    Ended: false,
    cindex: 0,
    isSong: true,
    comList: {
      hotComments: [{user: {avatarUrl: '#', nickname: '###'},content: '#####'}],
      comments: [{user: {avatarUrl: '#', nickname: '###'},content: '#####'}]
    },
    dailySong: [],
    isFavorite: false,
    favoriteList: []
  },
  mutations: {
    login(state,payload) {
      // console.log(payload)
      // console.log(payload)
      this.state.isLogin = true
      if(!payload.data.account){
        this.state.isLogin = false
        alert('用户名或密码错误')
      }
      
      this.state.profile = payload.data.profile
      this.state.userInfo = payload.data.account
      // console.log('111')
    },
    playMusic(state) {
      state.isPlay = !state.isPlay
    },
    musicP(state,payload) {
      state.cSong.currentTime = parseInt(payload*state.cSong.duration/100)
    },
    timePlay(state,payload) {
      state.cSong.currentTime = payload.currentTime
      state.cSong.duration = payload.duration
    },
    allistChange(state,payload) {
      state.allist = payload.data
    },
    changSong(state,payload){
      state.songList = payload.data
    },
    detailSong(state,payload) {
      let temp
      // console.log(payload.data)
      if(payload.data.result) {
        temp = payload.data.result.songs
        payload.data.songs = temp.map((value, index) => {
          value.alia = value.alias
          value.al = value.album
          value.ar = value.artists
          value.al.picUrl = value.ar[0].img1v1Url
          return value
        })
      }
      state.sdetaillist = payload.data.songs
    },
    changeUrl(state,payload) {
      // console.log(payload)
      state.currentUrl = payload.data.data[0].url
      state.isPlay = true
    },
    currentSong(state,payload) {
      // console.log(payload)
      state.cSong.id = payload.id
      state.currentS = payload
    },
    changeLyric(state,payload) {
      // console.log(payload.data)
      state.cSong.lyric = payload.data.lrc
    },
    changeDis(state,payload) {
      state.lyricDis = payload
    },
    songEnded(state,payload) {
      state.Ended = payload
    },
    changeIndex(state,payload) {
      // console.log(payload)
      state.cindex = payload
    },
    toggleCom(state,payload){
      state.isSong = !state.isSong
      state.comList = {
        comments: payload.data.comments,
        hotComments: payload.data.hotComments
      }
      // console.log(state.comList)
    },
    updateDaily(state,payload){
      state.dailySong = payload.data.data.dailySongs
      
    },
    updateFavorite(state,payload) {
      state.favoriteList = payload.data.ids
      // console.log(state.favoriteList)
    },
    checkFavorite(state,payload) {
      // console.log('favorite:'+payload)
      state.isFavorite = payload
    },
    changeName(state, payload) {
      this.state.cSong.name = payload
    }
  },
  actions: {
    submitLogin(context,payload) {
      instance1({
        url: '/login/cellphone',
        params: payload
      })
    .then(resolve1 => {
      context.commit('login',resolve1)
      return new Promise((resolve) => {
        // console.log(resolve1)
        instance1({
          url: '/recommend/songs'
        }).then(resolveds => {
          context.commit('updateDaily',resolveds)
        })
        instance1({
          url: '/likelist',
          params: {
            uid: resolve1.data.account.id
          }
        }).then((resolvefa) => {
          context.commit('updateFavorite',resolvefa)
        })
        instance1({
          url: '/user/playlist',
          params: {
            uid: resolve1.data.account.id
          }
        })
        .then(resolve => {
          context.commit('allistChange',resolve)
        })
      })
    }).catch(err => {
      alert('用户名或密码错误')
    })
    },
    getAlList(context,payload) {
      console.log(payload)
      instance1({
        url: '/playlist/detail',
        params: {
          id: context.state.allist.playlist[payload].id
        }
      }).then(resolve1 => {
        context.commit('changSong',resolve1)
        return new Promise((resolve) => {
          context.state.ids.length = 0
          // console.log(resolve1)
          context.state.ids = resolve1.data.privileges.map((current,index) => {
            return current.id
          })
          // console.log(context.state.ids);
          instance1({
            url: 'song/detail',
            params: {
              ids: context.state.ids.toString()
            }
          }).then((resolve => {
            context.commit('detailSong',resolve)
          }))
        })
      })
    },
    getcuUrl(context,payload) {
      console.log(payload.id)
      
      instance1({
        url: '/song/url',
        params: {
          id: payload
        }
      }).then(resolve => {
        context.commit('changeUrl',resolve)
      })
      
    },
    getsonginfo(context,payload) {
      instance1({
        url: '/lyric',
        params: {
          id:payload
        }
      }).then(resolve => {
        context.commit('changeLyric',resolve)
      })
    },
    getCom(context,payload) {
      instance1({
        url: '/comment/music',
        params: {
          id: payload,
          limit: 50
        }
      }).then(resolve1 => {
        context.commit('toggleCom',resolve1)
      })
    },
    getDailySong(context,payload) {
      context.state.ids.length = 0
      context.state.ids = context.state.dailySong.map((current,index) => {
        return current.id
      })
      instance1({
        url: 'song/detail',
        params: {
          ids: context.state.ids.toString()
        }
      }).then(resolve => {
        context.commit('detailSong',resolve)
      })
    },
    getFavoriteSong(context,payload) {

    },
    likeSong(context,payload) {
      return new Promise((resolve, reject) => {
        // console.log(context.state.cSong.id)
        instance1({
          url: '/like',
          params: {
            id: context.state.cSong.id
          }
        }).then(data => {
          context.state.isFavorite = true
          resolve(data)
        })
      }) 
    },
    search(context, payload) {
      return new Promise((resolve, reject) => {
        instance1({
          url: '/search',
          params: {
            keywords: payload
          }
        }).then(data => {
          context.commit('detailSong', data)
          resolve(data)
        })
      })
    },
    hotMenu(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('123')
        instance1({
          url: '/top/playlist',
          params: {
            
          }
        }).then(data => {
          console.log(data)
          instance1({
            url: '/playlist/detail',
            params: {
              id: data.data.playlists[0].id
            }
          }).then(resolve1 => {
            context.commit('changSong',resolve1)
            return new Promise((resolve) => {
              context.state.ids.length = 0
              // console.log(resolve1)
              context.state.ids = resolve1.data.privileges.map((current,index) => {
                return current.id
              })
              // console.log(context.state.ids);
              instance1({
                url: 'song/detail',
                params: {
                  ids: context.state.ids.toString()
                }
              }).then((resolve => {
                context.commit('detailSong',resolve)
              }))
            })
          })
        })
      })
    }
    
  },
  modules: {
  }
})
