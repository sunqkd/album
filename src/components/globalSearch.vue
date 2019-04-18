<template>
    <div>
        <button @click="goback()">返回</button>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        goback(){
            this.$router.back(-1);
        }
    }
}
</script>