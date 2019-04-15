<template>
    <div id="alertInfo">
        <div class="alertContain">
            <div class="alertInfoText">
                {{text}}
            </div>
            <div class="containButton">
                <button @click="closeTip()">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        closeTip(){
            this.$emit("closeTip");
        }
    },
    props:{
        text:{
            type:String,
            default(){
                return ''
            }
        }
    }
}
</script>
