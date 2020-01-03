<template id="album">
    <div class="albumContain">
        <div id="titleContain">
            <div class="albumTitle">
                <!-- 文字显示区域 -->
                <div class="albumtitleContain" v-show="editorflag == false"  contenteditable="false">
                    {{this.albumTitle}}
                    <img src="./img/editor.png" alt="" class="editorimg" @click="editorTitle()" v-if="this.editorImg">
                </div>
                <!-- 编辑区域 -->
                <div class="editortextarea" contenteditable="true" v-show="editorflag == true"
                    @keyup.enter.prevent="$event.target.blur" @blur="saveTitle()">
                    {{this.albumTitle}}
                </div>
            </div>
            <div class="userInfo">
                <div class="userImg">
                    <!-- <div class="userImgContain" v-if="createSelfFlag">
                        <img :src="this.customerImage" alt="">
                    </div> -->
                    <span class="ecclipse" v-if="createSelfFlag">{{this.createdBy}}</span>
                    <span>{{this.updateTime}}</span>
                </div>
                <div>
                    {{this.projectNum}}个项目
                </div>
            </div>
        </div>
        <div id="nav">
            <router-link :to="{path:'/project',query:this.query}" @click.native="clearScroll(0)" active-class="RouterActive">
                <span class="navName">项目</span>
                <span class="navCount">{{this.projectNum}}</span>
            </router-link>
            <router-link :to="{path:'/intelligence',query:this.query}" @click.native="clearScroll(1)">
                <span class="navName">相似推荐</span>
                <span class="navCount"></span>
            </router-link>
            <router-link :to="{path:'/organization',query:this.query}" @click.native="clearScroll(2)">
                <span class="navName">机构</span>
                <span class="navCount">{{this.companyNum}}</span>
            </router-link>
            <router-link :to="{path:'/news',query:this.query}" @click.native="clearScroll(3)">
                <span class="navName">新闻</span>
                <span class="navCount">{{this.newsNum}}</span>
            </router-link>
            <!-- <router-link :to="{path:'/activity',query:this.query}" @click.native="clearScroll(4)">
                <span class="navName">活动</span>
                <span class="navCount"></span>
            </router-link>
            <router-link :to="{path:'/report',query:this.query}" @click.native="clearScroll(5)">
                <span class="navName">研报</span>
                <span class="navCount"></span>
            </router-link> -->
        </div>
        <div v-if="this.createdById" style="width:100%;height:90%;position:relative;background:#f4f6f6">
            <keep-alive>
                <router-view :category="this.category" :createdById="this.createdById" @refFather="getAlbumById" :albumTitle="this.albumTitle" :projectNum="this.projectNum"></router-view>
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
                category:'', // 专辑类型
                albumTitle: '', // 专辑标题
                editorflag: false, // 编辑框显示是否显示
                positionTop: 0, // 高度
                activeNav: 0, // 选中
                query:{ // 路由信息
                    "userId":'', // 用户id 
                    "token":'', // 登录信息
                    "albumId":'', // 专辑Id
                },
                customerImage:'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1', // 创建者头像
                createdBy:'',// 创建人
                updateTime:'', // 更新时间
                createdById:'', // 创建人Id
                editorImg:false, // 本人创建并且登录可以编辑
                projectNum:0, // 项目数量
                companyNum:0, // 机构数量
                newsNum:0, // 新闻数量
                albumType:'', // 是否私密
                tips:false,
                text:'超过24个字符',
                shareUrl:'', // 分享链接
                createSelfFlag:false, // 默认是自己创建
            }
        },
        computed:{
           
        },
        created() {
            this.splitHref(window.location.href);
            this.getShareUrl();
        },
        watch:{
            $route(to,from){
                // console.log(to.fullPath)
                // if(to.fullPath !== from.fullPath){
                   
                // }
            },
            albumTitle(data){
                // this.shareWxTitle();
                this.shareSubTitle();
            }
        },
        async mounted() {
            await this.getAlbumById();
            // this.addlisten();
            // this.shareWxTitle();
            await this.shareSubTitle();
            this.share();
        },
        methods: {
            getShareUrl(){ // 分享
                // 测试
                let url = 'http://test1.dyly.com/album/index.html#/project?userId='+ this.query.userId+ '&token='+ '&albumId=' + this.query.albumId;
                // 线上
                // let url = 'https://www.dyly.com/album/index.html#/project?userId='+ this.query.userId+ '&token='+ '&albumId=' + this.query.albumId;
                // console.log(url);
                document.querySelector('meta[property="og:url"]').setAttribute('content',url);
                // console.log(document.querySelector('meta[property="og:url"]').getAttribute('content')) 
            },
            closeTip(){ // 关闭alert
                this.tips = false;
            },
            splitHref(data){ // 分割url
                let params = {};
                let urldata = data.split('#')[1].split("?")[1];
                // console.log(urldata);
                let arr = urldata.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var a = arr[i].split("=");              
                    params[a[0]] = decodeURIComponent(a[1]);                      
                }                               
                this.query = params;
                // this.clearCookie("rememberMatch");
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
                let url = '/vc/albumFlow/queryAlbumById?albumId='+ this.query.albumId;
                await this.axios.post(url).then((res)=>{
                    if(res.data.status == 1){


                        if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
                           
                            console.log('是手机');
                            this.albumTitle = res.data.data.albumTitle; // 标题
                            this.customerImage =  res.data.data.customerImage?res.data.data.customerImage:'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1'; // 创建者头像
                            this.createdBy =  res.data.data.createdBy; // 创建人
                            this.updateTime = res.data.data.updateTime; // 更新时间
                            this.projectNum = res.data.data.projectNum; // 项目数量
                            this.companyNum = res.data.data.companyNum; // 机构数量
                            this.newsNum = res.data.data.newsNum; // 新闻数量
                            this.albumType = res.data.data.albumType; // 是否私密
                            if(res.data.data.userId == this.query.userId && this.query.token.length > 10){ // 本人创建 并且登录 可以编辑
                                this.editorImg = true;
                                this.createSelfFlag = false;
                            }else{
                                this.editorImg = false;
                                this.createSelfFlag = true;
                            }
                            this.createdById = res.data.data.userId; // 专辑创建人Id
                            this.category = res.data.data.category; // 专辑类型判断

                        }else{
                            window.location = 'https://www.dyly.com/#/project/album/detail?albumId='+ res.data.data.albumId+'&albumTitle='+ res.data.data.albumTitle +'&userId='+res.data.data.userId;
                        }

                        
                    }
                })



               
            },
            updateMyAlbum(albumTitle){ // 修改标题
                this.axios.post('/vc/albumFlow/updateMyAlbum',{
                    "albumId": this.query.albumId,
                    "albumTitle": albumTitle,
                    "albumType": this.albumType
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log("修改成功")
                    }else if(res.data.status == 2){
                        this.tips = true;
                        this.text = res.data.msg;
                        let obj = document.querySelector(".editortextarea"); // 元素
                        obj.innerHTML = this.albumTitle;
                    }
                    this.getAlbumById();
                })
            },
            shareWxTitle(){ // 分享标题
                let shareTitle = this.albumTitle
                $(".shareTitle").text(shareTitle);
            },
            async shareSubTitle(){ // 分享副标题
                let url = '/vc/albumFlow/queryAlbumProjectsShare?albumId='+ this.query.albumId;
                await this.axios.post(url).then((res)=>{
                    if(res.data.status == 1){
                        let shareTitle = res.data.data.albumName; // 主标题
                        // console.log(res);
                        let strsub =  res.data.data.total + '个项目：' + res.data.data.projectNames.join(",")
                        // let strsub = '人工智能来助阵，管理项目更轻松，第一路演全新上线'; // 副标题
                        $(".shareDesc").text(strsub); // 副标题
                        $(".shareTitle").text(shareTitle); // 标题

                        document.querySelector('meta[property="og:title"]').setAttribute('content',shareTitle);
                        document.querySelector('meta[property="description"]').setAttribute('content',strsub);
                    }
                })
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
            share(){
                $.getScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(){
                    $.ajax({
                        url: "https://m.dyly.com/weixin/getWxConfig",
                        type: 'POST',
                        data: {
                            url: window.location.href
                        }
                    }).success(function(data){
                        wx.config({
                            appId: data.data.appId,
                            timestamp: data.data.timestamp,
                            nonceStr: data.data.nonceStr,
                            signature: data.data.signature,
                            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
                        });
                        // updateAppMessageShareData
                        wx.ready(function(){
                            // 鏈嬪弸鍦堝垎浜�
                            wx.onMenuShareTimeline({
                                title: $(".shareTitle").text(),
                                link: document.querySelector('meta[property="og:url"]').getAttribute('content'),
                                imgUrl: 'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1'
                            })
                            // 鍒嗕韩缁欐湅鍙�
                            wx.onMenuShareAppMessage({
                                title: $(".shareTitle").text(),
                                desc: $(".shareDesc").text(),
                                link:  document.querySelector('meta[property="og:url"]').getAttribute('content'),
                                imgUrl: 'https://img1.dyly.com/o_1d2kk3tqv14f21mlplq71u5q1k2ht.png?imageView2/2/w/300/ignore-error/1'
                            })
                        })
                    })
                });
            }
        },
        components:{
            "alertInfo":alertInfo
        }
    }
</script>
<style>

</style>