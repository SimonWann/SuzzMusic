<template>
    <div>
        <div id="alertM" class="alert alert-danger" role="alert">
            <form class="form-inline">
            <div class="form-group">
                <label for="phone"></label>
                <div class="input-group">
                    <div class="input-group-addon"><span class="glyphicon glyphicon-earphone"></span></div>
                    <input type="text" v-model="phone" class="form-control" id="phone" placeholder="Phone Number">
                </div>
                
            </div>
            <div class="form-group">
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
    button{
        margin-left: 50px;
    }
    #alertM{
        margin: 0px;
    }
</style>