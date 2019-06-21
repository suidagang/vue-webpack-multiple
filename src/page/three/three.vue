<template>
    <div class="contact-us">
        第三个页面
    </div>
</template>
<script>
    export default {
        name: 'contactUs',
        components: {
           
        },
        data() {
            return {
                num:1
            }
        },
        created() {
           
        },
        mounted() {
           
        },
        methods: {
           btn(){
               this.num++;
           }
        }
    }
</script>

<style scoped>
    .contact-us{
        width: 100%;
        overflow: hidden;
    }
    .btn{
        color: blue;
    }
</style>

