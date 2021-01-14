<template>
    <div id="loginPlace">
        <div id="alertM" class="alert alert-danger" role="alert">
            <form class="form-inline">
            <div class="form-group" id="username">
                <label for="phone"></label>
                <div class="input-group">
                    <div class="input-group-addon"><span class="glyphicon glyphicon-earphone"></span></div>
                    <input type="text" v-model="phone" class="form-control" id="phone" placeholder="Phone Number">
                </div>
                
            </div>
            <div class="form-group" id="passwd">
                <label for="passwd"></label>
                <div class="input-group">
                    <div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div>
                    <input v-model="passwd" type="password" class="form-control" id="passwd" placeholder="Password">
                </div>
                
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="LoginClick">登入</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            phone: '',
            passwd: ''
        }
    },
    methods: {
        LoginClick() {
            this.$store.dispatch('submitLogin',{
                phone: this.phone,
                password: this.passwd
            }).then(resolve => {
                console.log('resolved!')
                this.$router.replace('/')
            })
            
        }
    }
}
</script>
<style lang="less" scoped>
    #loginPlace{
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        height: 720px;
        z-index: 1;
    }
    button{
        margin: 20px 0px;
        display: block;
    }
    #alertM{
        padding: 300px 30px;
        width: 100%;
        height: 100%;
        margin: 0px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        #username{
            margin-bottom: 20px;
        }
        #passwd{

        }
    }
</style>