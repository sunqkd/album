<template id="project">
    <div class="projectContain" style="height:100%;" @touchmove="this.touchmoveFun">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" :noDataText="noDataText" ref="project1Scroll">
            <!-- 上啦动画 -->
            <img src="./img/loading.gif" alt="" slot="refresh-spinner">
            <ul class="projectDataContain">
                <li v-for="(item,index) in projectDataList" :key="index" @click="gotoProjectDetail(item)">
                    <div class="projectLeft">
                        <div class="projectImgContain">
                            <img :src="item.logo" alt v-if="item.logo">
                            <div v-if="!item.logo">{{item.name.substring(0,1)}}</div>
                            <img src="./img/projectlist_voice.png" alt="" class="voiceTips" v-if="item.speechNum" style="display:none">
                        </div>
                    </div>
                    <div class="projectRight">
                        <div class="projectOneLine">
                            <div class="projectName">
                                <span class="projectName-name">{{item.name}}</span>
                                <span v-if="item.stockCode" class="stockCode">{{item.stockCode}}</span>
                            </div>
                            <div class="threeTips">
                                <span class="financing" v-if="item.financingNeed && item.financingNeed !== 0">融</span>
                                <span class="haveChat" v-if="item.contactNum">聊</span>
                                <span class="haveBp" v-if="item.bpNum">BP</span>
                                <span class="haveSpeech" v-if="item.speechNum">音频</span>
                            </div>
                            <div class="projectCityName" v-if="item.cityName">{{item.cityName?item.cityName:''}}</div>
                            <div class="checkContain" v-if="manageProjectFlag" @click.stop="selecttext()">
                                <input type="checkbox" id="finacingInput" v-model="item.projectChecked"
                                    @change="changeInput()">
                                <i></i>
                            </div>
                            <div class="plusproject" v-if="login == 2">
                                <img src="./img/plus.png" alt @click.stop="addworkflow(item.projectCode)">
                            </div>
                        </div>
                        <div class="projectTwoLine">{{item.digest}}</div>
                        <div class="projectThreeLine">
                            <span>
                                {{item.latestRound}}
                                <i v-if="item.latestRound && item.latestViewRoundMoney">·</i>
                                {{item.latestViewRoundMoney}}
                            </span>
                            <span>{{item.latestInvDate}}</span>
                        </div>
                        <div class="projectFourLine" @click="goToAndroid()">
                            <span style="color:rgba(78,88,92,1)" v-if="item.investNames">投资方：</span>
                            <span>{{item.investNames}}</span>
                        </div>
                        <div class="projectFiveLine" v-if="item.roadShowAlbumName">
                            <img src="./img/roadshow.png" alt="">
                            <span>{{item.roadShowAlbumName=='路演视频'?item.roadShowAlbumName:'来自：'+item.roadShowAlbumName}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 下拉动画 -->
            <img src="./img/loading.gif" alt="" slot="infinite-spinner" >
        </scroller>
        <div class="activeContain" v-if="noDataFlag">
            <img src="./img/nocollect.png" alt class="nocontent">
            <div class="nocontentText">暂无数据</div>
        </div>
        <!-- 初次数据 渲染-->
        <div v-if="loading" style="display:flex;justify-content:center">
            <img src="./img/loading.gif" alt="">
        </div>
        <div class="bottom-footer" v-if="login == 1 || login == 2 || login == 3">
            <!-- 用户登录 用户创建 -->
            <div class="userSelf" v-if="login == 1">
                <button @click="addProject()">+添加项目</button>
                <button @click="manageProject()">管理项目</button>
            </div>
            <!-- 用户登录 非用户创建 -->
            <div class="nouserSelf" v-if="login == 2">
                <button @click="copyToMyalbum()" :disabled="this.buttonClick"
                    :class="this.buttonClick?'noClick':''">{{this.copyText}}</button>
            </div>
            <!-- 用户登录用户创建 删除项目 -->
            <div class="projectOperation" v-if="login == 3">
                <span>已选择{{this.delectCount}}个项目</span>
                <div class="projectOperationButton">
                    <button @click="cancelProject()">取消</button>
                    <button @click="certainCancel()">删除{{this.delectCount}}</button>
                </div>
            </div>
        </div>
        <!-- 用户登录 用户创建  删除操作-->
        <div class="projectMask" v-if="loginflag">
            <div class="maskContent">
                <div class="text">确定要删除这些项目？</div>
                <div class="buttons">
                    <button @click="noDelect()">否</button>
                    <button @click="yesDelect()">是</button>
                </div>
            </div>
        </div>
        <!-- 已经复制到我的专辑 -->
        <div class="projectMask" v-if="copylogin">
            <div class="maskContent">
                <div class="text">已复制到我的专辑</div>
                <div class="buttons">
                    <button @click="IKnow()">我知道了</button>
                    <button @click="manageMyAlbum()">管理该专辑</button>
                </div>
            </div>
        </div>
        <projectAlbum v-if="addWorkFlowFlag" @closeFather="closeMask" :projectCodesData="projectCodesData" @closeMaskdiv="closeMaskdiv">
        </projectAlbum>
        <alertInfo v-if="tips" :text="text" @closeTip="closeTip"></alertInfo>
    </div>
</template>
<script>
    import projectAlbum from "./projectAlbum.vue";
    import alertInfo from "./alertInfo.vue";
    export default {
        data() {
            return {
                finacingInput: false,
                login: 1,
                loginflag: false,
                token: "", // 登录信息
                flowId: "", // 专辑ID
                userId: "", // 用户ID
                queryInfo: {
                    pageSize: 10,
                    pageNum: 1
                },
                projectDataList: [], // 项目列表
                manageProjectFlag: false, // 选中操作
                loading: false, // 加载
                flag: true, // 加载更多
                delectCount: 0, // 要删除的项目
                selectProject: [], // 选中删除的项目
                noDataFlag: false,
                copylogin: false, // 复制到我的专辑
                buttonClick: false, // 复制到我的专辑是否可以点击
                copyText: "+复制到我的专辑", // 复制到我的专辑
                newalbumid: "", // 新创建的 newalbumid
                addWorkFlowFlag: false, // 添加工作流
                projectCodesData: "", // 项目ID
                tips: false, // 弹窗
                text: "删除成功",
                noDataText:'',
                nodata:false,
            };
        },
        beforeRouteUpdate(to, from, next) {
            next();
        },
        watch: {
            
        },
        props: {
            createdById: {}
        },
        created() {
            // console.log(this.$route.query)
            this.token = this.$route.query.token; // 登录信息
            this.flowId = this.$route.query.flowId; // 专辑ID
            this.userId = this.$route.query.userId; // 用户ID
            // console.log(this.token,this.albumId,this.userId)
            // 1、用户已经登录 切是本人创建
            // 2、用户已经登录 不是本人创建
            // 3、用户没有登录
            // console.log(this.createdById);
            if (this.createdById == this.userId && this.token.length > 10) {
                // 自己创建 并且已经登录
                console.log("自己创建并且已经登录");
                this.login = 1;
            } else if (this.createdById != this.userId && this.token.length > 10) {
                // 已登录不是自己创建
                console.log("已经登录不是自己创建");
                this.login = 2;
            } else {
                console.log("未登录");
                this.login = 5;
            }
            this.getAlbumProjects();
        },
        mounted(){
            
        },
        methods: {
            touchmoveFun(){
                let {left, top} = this.$refs.project1Scroll.getPosition()
                this.x = left
                this.y = top
                if(this.y > 200){
                    document.getElementById("titleContain").style.display = 'none'
                }else{
                    document.getElementById("titleContain").style.display = 'block';
                }
            },
            refresh(done){ // 下拉刷新
                this.queryInfo.pageNum = 1;
                setTimeout(() => {
                    this.axios.post("/vc/albumFlow/queryFlowProjects",{},{
                        params: {
                            pageSize: this.queryInfo.pageSize,
                            pageNum: this.queryInfo.pageNum,
                            flowId: this.flowId
                        }
                    }).then(res => {
                        if (res.data.status == 1) {
                            this.nodata=true;
                            let proList = res.data.data.list;
                            for (var i = 0; i < proList.length; i++) {
                                proList[i].projectChecked = false;
                            }
                            this.projectDataList = proList;
                            if (this.projectDataList.length == 0) {
                                this.noDataFlag = true;
                            } else {
                                this.noDataFlag = false;
                            }
                        }else{
                            this.nodata=false;
                        }
                    });
                    done();
                }, 1500)
            },
            infinite(done){ // 上拉加载
                if(this.nodata == false){
                    setTimeout(()=>{
                        done&&done(true);
                    },0);
                }else{
                    setTimeout(()=>{
                        this.queryInfo.pageNum++;
                        this.axios.post("/vc/albumFlow/queryFlowProjects",{},{
                            params: {
                                pageSize: this.queryInfo.pageSize,
                                pageNum: this.queryInfo.pageNum,
                                flowId: this.flowId
                            }
                        }).then(res => {
                            if (res.data.status == 1) {
                                let proList = res.data.data.list;
                                for (var i = 0; i < proList.length; i++) {
                                    proList[i].projectChecked = false;
                                }
                                if(res.data.data.list.length != 0){
                                    this.projectDataList = this.projectDataList.concat(res.data.data.list);
                                    done();
                                }else{
                                    done(true);
                                }
                            }else{

                            }
                        });
                    },0)
                }
            },
            closeTip() {
                this.tips = false;
            },
            selecttext() {
                // 阻止冒泡
                console.log("阻止冒泡");
            },
            closeMask() {  // 关闭添加工作流
                this.addWorkFlowFlag = false;
                let information = '保存成功';
                if(window.webkit){
                    window.webkit.messageHandlers.finishToast.postMessage({body: information});
                }else{
                    window.finishToast.sendermsg(information);
                }
            },
            closeMaskdiv(){
                this.addWorkFlowFlag = false;
            },
            addworkflow(projectCode) {
                // 添加工作流
                this.addWorkFlowFlag = true;
                console.log(projectCode);
                this.projectCodesData = projectCode;
            },
            getAlbumProjects() { // 获取专辑项目
                this.loading = true;
                this.axios.post("/vc/albumFlow/queryFlowProjects",{},{
                    params: {
                        pageSize: this.queryInfo.pageSize,
                        pageNum: this.queryInfo.pageNum,
                        flowId: this.flowId
                    }
                }).then(res => {
                    if (res.data.status == 1) {
                        this.nodata=true;
                        this.loading = false;
                        let proList = res.data.data.list;
                        for (var i = 0; i < proList.length; i++) {
                            proList[i].projectChecked = false;
                        }
                        this.projectDataList = proList;
                        if (this.projectDataList.length == 0) {
                            this.noDataFlag = true;
                        } else {
                            this.noDataFlag = false;
                        }
                    }else{
                        
                    }
                });
            },
            addProject() { // 添加项目
                // let flowId = this.flowId;
                // console.log(flowId);
                // if (window.webkit) {
                //     window.webkit.messageHandlers.addProjectList.postMessage({
                //         body: flowId
                //     });
                // } else {
                //     window.addProjectList.sendermsg(flowId);
                // }
                this.$router.push({path:'/globalSearch',query:{userId:this.userId,token:this.token,flowId:this.flowId}})
                if(window.webkit){
                    window.webkit.messageHandlers.hideShare.postMessage({body: this.flowId});
                }else{
                    window.hideShare.sendermsg(this.flowId);
                }
            },
            manageProject() {  // 管理项目
                this.manageProjectFlag = true;
                this.login = 3;
                this.delectCount = 0;
                for (var i = 0; i < this.projectDataList.length; i++) {
                    this.projectDataList[i].projectChecked = false;
                }
            },
            cancelProject() {  // 取消删除
                this.login = 1;
                this.manageProjectFlag = false;
                this.delectCount = 0;
                for (var i = 0; i < this.projectDataList.length; i++) {
                    this.projectDataList[i].projectChecked = false;
                }
            },
            certainCancel() {  // 删除项目
                if (this.delectCount > 0) {
                    this.loginflag = true;
                } else {
                    this.loginflag = false;
                }
            },
            changeInput(e) {
                this.selectProject = this.projectDataList.filter(
                    item => item.projectChecked == true
                );
                this.delectCount = this.selectProject.length;
            },
            noDelect() { // 不删除
                this.loginflag = false;
            },
            yesDelect() {  // 确定删除
                let projectCodes = [];
                for (var i = 0; i < this.selectProject.length; i++) {
                    projectCodes.push(this.selectProject[i].projectCode);
                }
                // console.log(projectCodes);
                this.axios
                    .post("/vc/albumFlow/deleteFlowProjects", {
                        flowId: this.flowId,
                        projectCodes: projectCodes
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            console.log("删除成功");
                            this.loginflag = false;
                            this.manageProjectFlag = false;
                            this.login = 1;
                            this.queryInfo.pageNum = 1;
                            // 此处执行 父元素的方法
                            this.$emit("refFather");
                            this.getAlbumProjects();
                            this.tips = true;
                            this.text = "删除成功";
                            setInterval(() => {
                                this.tips = false;
                            }, 2000);
                        } else {
                            this.tips = true;
                            this.text = "删除失败";
                            this.loginflag = false;
                            setInterval(() => {
                                this.tips = false;
                            }, 2000);
                        }
                    });
            },
            copyToMyalbum() {
                // 复制到我的专辑
                this.axios
                    .post("/vc/albumFlow/copyToMyAlbum", {
                        albumId: this.albumId
                    })
                    .then(res => {
                        if (res.data.status == 1) {
                            console.log("复制成功");
                            this.copylogin = true;
                            this.newalbumid = res.data.data.albumId;
                        } else {
                            console.log("复制失败");
                            this.copylogin = false;
                        }
                    });
            },
            goToAndroid() {
                console.log("调用Android的方法");
            },
            IKnow() {
                // 我知道了
                this.copylogin = false;
                this.buttonClick = true;
                this.copyText = "已复制整个专辑";
            },
            manageMyAlbum() {
                // 管理整个专辑
                console.log("跳转");
                this.$router.push({
                    path: "/project",
                    query: {
                        userId: this.userId,
                        token: this.token,
                        albumId: this.newalbumid
                    }
                });
                this.copylogin = false;
                window.location.reload();
            },
            gotoProjectDetail(data) {
                // 调用原声方法
                // console.log({body:data});
                let projectCode = data.projectCode;
                console.log(projectCode);
                if (window.webkit) {
                    window.webkit.messageHandlers.goProDetail.postMessage({
                        body: projectCode
                    });
                } else {
                    window.goProDetail.sendermsg(projectCode);
                }
            }
        },
        components: {
            projectAlbum: projectAlbum,
            alertInfo: alertInfo
        },
        destroyed(){
            clearInterval(this.timer)
        }
    };
</script>