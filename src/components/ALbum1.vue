<template id="album">
    <div class="albumContain">
        <div id="titleContain">
            <div class="albumTitle">
                <!-- 文字显示区域 -->
                <div class="albumtitleContain" v-show="editorflag == false"  contenteditable="false">
                    {{this.flowTitle}}
                    <img src="./img/editor.png" alt="" class="editorimg" @click="editorTitle()" v-if="this.editorImg">
                </div>
                <!-- 编辑区域 -->
                <div class="editortextarea" contenteditable="true" v-show="editorflag == true"
                    @keyup.enter.prevent="$event.target.blur" @blur="saveTitle()">
                    {{this.flowTitle}}
                </div>
            </div>
            <div class="userInfo">
                <div class="userImg">
                    <div class="userImgContain">
                        <!-- <img :src="this.customerImage" alt=""> -->
                    </div>
                    <!-- <span>{{this.createdBy}}</span> -->
                </div>
                <div>
                    {{this.projectNum}}个项目
                </div>
            </div>
        </div>
        <div id="nav">
            <router-link :to="{path:'/collect/project1',query:this.query}" @click.native="clearScroll(0)" active-class="RouterActive">
                <span class="navName">项目</span>
                <span class="navCount">{{this.projectNum}}</span>
            </router-link>
            <router-link :to="{path:'/collect/intelligence1',query:this.query}" @click.native="clearScroll(1)">
                <span class="navName">相似推荐</span>
                <span class="navCount"></span>
            </router-link>
            <router-link :to="{path:'/collect/organization1',query:this.query}" @click.native="clearScroll(2)">
                <span class="navName">机构</span>
                <span class="navCount">{{this.companyNum}}</span>
            </router-link>
            <router-link :to="{path:'/collect/news1',query:this.query}" @click.native="clearScroll(3)">
                <span class="navName">新闻</span>
                <span class="navCount">{{this.newsNum}}</span>
            </router-link>
            <!-- <router-link :to="{path:'/collect/activity1',query:this.query}" @click.native="clearScroll(4)">
                <span class="navName">活动</span>
                <span class="navCount"></span>
            </router-link>
            <router-link :to="{path:'/collect/report1',query:this.query}" @click.native="clearScroll(5)">
                <span class="navName">研报</span>
                <span class="navCount"></span>
            </router-link> -->
        </div>
        <div v-if="this.createdById" style="width:100%;height:90%;position:relative;background:#f4f6f6">
            <keep-alive>
                <router-view :createdById="this.createdById" @refFather="getAlbumById"></router-view>
            </keep-alive>
        </div>
        <alertInfo v-if="tips" :text="text" @closeTip="closeTip"></alertInfo>
    </div>
</template>
<script>
    import alertInfo from './alertInfo.vue';
    export default {
        data() {
            return {
                flowTitle: '', // 专辑标题
                editorflag: false, // 编辑框显示是否显示
                positionTop: 0, // 高度
                activeNav: 0, // 选中
                query:{ // 路由信息
                    "userId":'', // 用户id 
                    "token":'', // 登录信息
                    "flowId":'', // 专辑Id
                },
                customerImage:'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1', // 创建者头像
                createdBy:'',// 创建人
                createdById:'', // 创建人Id
                editorImg:false, // 本人创建并且登录可以编辑
                projectNum:0, // 项目数量
                companyNum:0, // 机构数量
                newsNum:0, // 新闻数量
                albumType:'', // 是否私密
                tips:false,
                text:'超过25个字符',
            }
        },
        computed:{
           
        },
        created() {
            this.splitHref(window.location.href);
        },
        watch:{
            // albumTitle(data){
            //     this.shareWxTitle();
            // }
        },
        async mounted() {
            await this.getAlbumById();
            // this.addlisten();
            this.shareWxTitle();
        },
        methods: {
            closeTip(){ // 关闭alert
                this.tips = false;
            },
            splitHref(data){ // 分割url
                let params = {};
                let urldata = data.split('?')[1];
                let arr = urldata.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var a = arr[i].split("=");              
                    params[a[0]] = decodeURIComponent(a[1]);                      
                }                               
                this.query = params;
                this.clearCookie("rememberMatch");
                if(this.query.token && this.query.token.length > 10){ // 用户已经登录
                    console.log("用户已经登录");
                    let cname = this.query.token.split("=")[0];
                    let cvalue = this.query.token.split("=")[1];
                    this.setCookie(cname,cvalue,7);
                    console.log(document.cookie);
                }else{ // 未登录
                    console.log('未登录');
                    this.clearCookie("rememberMatch");
                    console.log(document.cookie);
                }
            },
            editorTitle() {  // 编辑标题
                // 焦点出现在最后面
                this.editorflag = true;
                this.$nextTick(() => {
                    var edit = document.querySelector('.editortextarea')
                    edit.onfocus = function () {
                        window.setTimeout(function () {
                            var sel, range;
                            if (window.getSelection && document.createRange) {
                                range = document.createRange();
                                range.selectNodeContents(edit);
                                range.collapse(true);
                                range.setEnd(edit, edit.childNodes.length);
                                range.setStart(edit, edit.childNodes.length);
                                sel = window.getSelection();
                                sel.removeAllRanges();
                                sel.addRange(range);
                            } else if (document.body.createTextRange) {
                                range = document.body.createTextRange();
                                range.moveToElementText(edit);
                                range.collapse(true);
                                range.select();
                            }
                        }, 1)
                    }
                    edit.focus();
                })
            },
            saveTitle() { // enter键 保存标题
                this.editorflag = false;
                let obj = document.querySelector(".editortextarea"); // 元素
                var dd = obj.innerHTML.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g,"").replace(/(^\s*)|(\s*$)/g, "");
                obj.innerHTML = dd;
                this.updateMyAlbum(dd);
            },
            addlisten() {// 监听页面滚动
                let offsetTop = document.getElementById('titleContain').offsetTop; // 距离顶部的高度
                let offsetHeight = document.getElementById('titleContain').offsetHeight; // 自身高度
                this.positionTop = offsetTop + offsetHeight;
                window.addEventListener('scroll', this.handleScroll);// 滚动事件
            },
            handleScroll() { // 页面监听函数
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var nav = document.getElementById('nav');
                if (scrollTop >= this.positionTop) {
                    nav.style.position = "fixed"
                } else {
                    nav.style.position = "relative"
                }
            },
            clearScroll(data) { // 置顶操作
                window.scrollTo(0, 0);
                this.activeNav = data;
                document.getElementById("titleContain").style.display = 'block';
            },
            async getAlbumById(){ // 获取专辑详情
                let url = '/vc/albumFlow/queryFlowById?flowId='+ this.query.flowId;
                await this.axios.post(url).then((res)=>{
                    if(res.data.status == 1){
                        this.flowTitle = res.data.data.flowTitle; // 标题
                        this.customerImage =  res.data.data.customerImage?res.data.data.customerImage:'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1'; // 创建者头像
                        this.createdBy =  res.data.data.createdBy; // 创建人
                        this.projectNum = res.data.data.projectNum; // 项目数量
                        this.companyNum = res.data.data.companyNum; // 机构数量
                        this.newsNum = res.data.data.newsNum; // 新闻数量
                        this.albumType = res.data.data.albumType; // 是否私密
                        if(res.data.data.userId == this.query.userId && this.query.token.length > 10 && res.data.data.flowType == '0'){ // 本人创建 并且登录 可以编辑
                            this.editorImg = true;
                        }else{
                            this.editorImg = false;
                        }
                        this.createdById = res.data.data.userId; // 专辑创建人Id
                    }
                })
               
            },
            updateMyAlbum(flowTitle){ // 修改标题
                this.axios.post('/vc/albumFlow/updateMyFlow',{
                    "flowId": this.query.flowId,
                    "flowTitle": flowTitle,
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log("修改成功")
                    }else if(res.data.status == 2){
                        this.tips = true;
                        this.text = res.data.msg;
                        let obj = document.querySelector(".editortextarea"); // 元素
                        obj.innerHTML = this.flowTitle;
                    }
                    this.getAlbumById();
                })
            },
            shareWxTitle(){ // 分享标题
                let shareTitle = this.albumTitle
                $(".shareTitle").text(shareTitle);
            },
            goAndroid(data){
                console.log(data)
                console.log(window.webkit)
                window.webkit.messageHandlers.senderModel.postMessage({body: data});
                console.log(data);
                window.appAn.sendermsg(data)
                alert(data);
            },
            goAndroid2(data){
                window.appAn.sendermsg(data);
            },
            goAndroid3(data){
                if(window.webkit){
                    window.webkit.messageHandlers.senderModel.postMessage({body: data});
                }else{
                    window.appAn.sendermsg(data);
                }
            },
            setCookie(cname, cvalue, exdays) { // 存储cookie
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires+';path=/';
            },
            clearCookie(name) { // 清除cookie
               this.setCookie(name, "", -1); 
            },
        },
        components:{
            "alertInfo":alertInfo
        }
    }
</script>
<style>

</style>