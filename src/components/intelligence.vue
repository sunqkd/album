<template id="intelligence">
    <div class="intelligenceContain">
        <!-- <div class="intelligenceBanner" id="intelligenceBanner">
            <div class="intelligenceLabel">
                <ul class="LabelUL">
                    <li v-for="(item,index) in labels" :key="index" class="noActiveLabel"
                        @click="selectLabelFun(item,0)" :class="selectLabel.indexOf(item.labelCode)!=-1?'activeLabel':''">
                        {{item.labelName}}
                    </li>
                </ul>
            </div>
            <div class="intelligenceCity">
                <ul class="cityUL">
                    <li v-for="(item,index) in cities" :key="index" class="noActiveLabel"
                        @click="selectLabelFun(item,1)" :class="selectCity.indexOf(item.cityCode)!=-1?'activeLabel':''">
                        {{item.cityName}}
                    </li>
                </ul>
            </div>
        </div> -->
        <div style="position:relative;width:100%;height:100%;" id="odiv" @touchmove="this.touchmoveFun">
            <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
                loading-layer-color="#ec4949" :noDataText="noDataText" ref="my_scroller">
                <!-- 上啦动画 -->
                <img src="./img/loading.gif" alt="" slot="refresh-spinner">
                <div class="intelligenceContent" >
                    <ul class="projectDataContain" id="asdasd">
                        <li v-for="(item,index) in intelligenceData" :key="index" style="" @click="goProDetail(item)">
                            <div class="projectLeft">
                                <div class="projectImgContain" :class="item.name=='VIP用户可见'?'Gaussian':''">
                                    <img :src="item.logo" alt="" v-if="item.logo">
                                    <div v-if="!item.logo">
                                        {{item.name.substring(0,1)}}
                                    </div>
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
                                    <div class="projectCityName" v-if="item.cityName">
                                        {{item.cityName}}
                                    </div>
                                    <div class="plusproject" v-if="token.length > 10" @click.stop="addProject(item.projectCode)">
                                        <img src="./img/plus.png" alt="" >
                                    </div>
                                </div>
                                <div class="projectTwoLine">
                                    {{item.digest}}
                                </div>
                                <div class="projectThreeLine">
                                    <span>
                                        {{item.latestRound}} 
                                        <i v-if="item.latestRound && item.latestViewRoundMoney">·</i>
                                        {{item.latestViewRoundMoney}} 
                                    </span>
                                    <span>
                                        {{item.latestInvDate}} 
                                    </span>
                                </div>
                                <div class="projectFourLine">
                                    <span style="color:rgba(78,88,92,1)" v-if="item.investNames">投资方：</span>
                                    <span>{{item.investNames}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-if="loading" style="display:flex;justify-content:center">
                        <img src="./img/loading.gif" alt="">
                    </div>
                    <div class="activeContain" v-if="noDataFlag">
                        <img src="./img/nocollect.png" alt="" class="nocontent">
                        <div class="nocontentText">
                            暂无数据
                        </div>
                    </div>
                </div>
                <!-- 下拉动画 -->
                <img src="./img/loading.gif" alt="" slot="infinite-spinner" >
            </scroller>
        </div>
        <projectAlbum v-if="addWorkFlowFlag" @closeFather="closeMask" :projectCodesData="projectCodesData" @closeMaskdiv="closeMaskdiv"></projectAlbum>
        <alertInfo v-if="tips" :text="text" @closeTip="closeTip"></alertInfo>
    </div>
</template>
<script> 
    import alertInfo from './alertInfo.vue';
    import projectAlbum from './projectAlbum.vue'
    export default {
        data() {
            return {
                labels: [], // 标签
                cities: [], // 城市
                selectLabel: [], // 选中的标签
                selectCity: [],// 选中的城市
                token:'', // 登录信息
                albumId:'', // 专辑Id
                userId:'', // 用户Id
                intelligenceData:[], // 智能推荐数据
                loading:false,
                query:{
                    pageNum:1,
                    pageSize:10
                },
                noDataFlag:false,
                addWorkFlowFlag:false, // 添加工作流
                projectCodesData:'', // 项目ID
                tips:false, // alert弹窗
                text:'操作成功',
                nodata:false, // 
                noDataText:''
            }
        },
        created() {
            this.token = this.$route.query.token; // 登录信息
            this.albumId = this.$route.query.albumId // 专辑ID
            this.userId =  this.$route.query.userId // 用户ID
            // await this.getAlbumLabel();
            this.getProjectByLabel();
        },
        mounted(){
            
        },
        methods: {
            touchmoveFun(){
                let {left, top} = this.$refs.my_scroller.getPosition()
                this.x = left
                this.y = top
                if(this.y > 200){
                    document.getElementById("titleContain").style.display = 'none'
                    // document.getElementById('intelligenceBanner').style.display = 'none';
                }else{
                    document.getElementById("titleContain").style.display = 'block';
                    // document.getElementById('intelligenceBanner').style.display = 'block';
                }
            },
            refresh(done){
                this.query.pageNum = 1;
                setTimeout(() => {
                    this.axios.post('/vc/albumFlow/queryAlbumProjectByLabel',{
                        "pageSize": this.query.pageSize,
                        "pageNum": this.query.pageNum,
                        "labels":this.selectLabel,
                        "cities":this.selectCity,
                        "albumId": this.albumId
                    }).then((res)=>{
                        if(res.data.status == 1){
                            this.nodata = true;
                            this.intelligenceData = res.data.data.list?res.data.data.list:[];
                            if(this.intelligenceData.length == 0){
                                this.noDataFlag = true
                            }else{
                                this.noDataFlag = false
                            }
                        }else{
                            
                        }
                    })
                    done();
                }, 2000)
            },
            infinite(done){
               if(this.nodata == false){
                    setTimeout(()=>{
                        done&&done(true);
                    },0);
               }else{
                    setTimeout(() => {
                        this.query.pageNum++;
                        this.axios.post('/vc/albumFlow/queryAlbumProjectByLabel',{
                            "pageSize": this.query.pageSize,
                            "pageNum": this.query.pageNum,
                            "labels":this.selectLabel,
                            "cities":this.selectCity,
                            "albumId": this.albumId
                        }).then((res)=>{
                            if(res.data.status == 1){
                                if(res.data.data.list.length != 0){
                                    this.intelligenceData = this.intelligenceData.concat(res.data.data.list);
                                    done();
                                }else{
                                    done(true);
                                }
                            }else{
                                
                            }
                        })
                    },0)
                }
            },
            closeTip(){ // 关闭弹窗
                this.tips = false;
            },
            closeMask(){ // 关闭 工作流
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
            addProject(data){ // 添加工作流
                this.addWorkFlowFlag = true;
                console.log(data);
                this.projectCodesData = data;
            },
            goProDetail(data){
                // console.log(data);
                let projectCode = data.projectCode;
                // console.log(projectCode);
                if(window.webkit){
                    if(window.webkit.messageHandlers.goIntProDetail){
                        window.webkit.messageHandlers.goIntProDetail.postMessage({body: projectCode});
                    }else{
                        if(!(/(localhost|test1|test)/gi.test(window.location.href))){
                            window.location.href = 'https://m.dyly.com/register/app_h5/project_share.html?id='+projectCode
                        }else{
                            window.location.href = 'https://m.dyly.com/register/app_h5/project_share.html?id='+projectCode+'&domain=https://test1.dyly.com'
                        }
                    }
                }else if(window.goIntProDetail){
                    window.goIntProDetail.sendermsg(projectCode);
                }else{
                    if(!(/(localhost|test1|test)/gi.test(window.location.href))){
                            window.location.href = 'https://m.dyly.com/register/app_h5/project_share.html?id='+projectCode
                    }else{
                        window.location.href = 'https://m.dyly.com/register/app_h5/project_share.html?id='+projectCode+'&domain=https://test1.dyly.com'
                    }
                }
            },
            async getAlbumLabel() { // 获取标签和城市
                this.loading = true;
                let url = '/vc/albumFlow/queryAlbumLabel?albumId=' + this.albumId+ '&limitNum=10';
                await this.axios.post(url).then((res) => {
                    if (res.data.status == 1) {
                        this.labels = res.data.data.labels;
                        this.labels.unshift({labelCode:'',labelName:'全部'});
                        this.cities = res.data.data.cities;
                        this.selectLabel.push(this.labels[0].labelCode);
                        this.loading = false;
                    }else{
                        this.loading = false;
                    }
                })
            },
            selectLabelFun(data, index) { // 选择标签
                this.nodata = false;
                if (index == 0) { // 选择标签
                    if(data.labelCode == ""){ // 点击全选
                        this.selectLabel = [];
                    }else{ // 非全选
                        if (this.selectLabel.indexOf(data.labelCode) != -1) {
                            this.selectLabel.splice(this.selectLabel.indexOf(data.labelCode), 1);
                        } else {
                            this.selectLabel.push(data.labelCode);
                        }
                    }
                } else { // 选择城市
                    if (this.selectCity.indexOf(data.cityCode) != -1) {
                        this.selectCity.splice(this.selectCity.indexOf(data.cityCode), 1);
                    } else {
                        this.selectCity.push(data.cityCode);
                    }
                }

                if(this.selectLabel.length == 0){ // 空则全选
                    this.selectLabel.push("");
                }else if(this.selectLabel.length > 1) {
                    this.selectLabel =  this.selectLabel.filter((item)=>{
                        return item.length > 2;
                    })
                }

                this.query.pageNum = 1;
                this.intelligenceData = [];
                this.getProjectByLabel();
            },
            getProjectByLabel() { // 通过标签选城市
                this.loading = true;
                this.axios.post('/vc/albumFlow/queryAlbumProjectByLabel',{
                    "pageSize": this.query.pageSize,
                    "pageNum": this.query.pageNum,
                    "labels":this.selectLabel,
                    "cities":this.selectCity,
                    "albumId": this.albumId
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.nodata = true;
                        this.loading = false;
                        this.intelligenceData = res.data.data.list?res.data.data.list:[];
                        if(this.intelligenceData.length == 0){
                            this.noDataFlag = true
                        }else{
                            this.noDataFlag = false
                        }
                    }else{
                        
                    }
                })
            },
        },
        destroyed(){
            clearInterval(this.timer)
        },
        components:{
            "projectAlbum":projectAlbum,
            "alertInfo":alertInfo
        }
    }
</script>