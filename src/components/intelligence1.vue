<template id="intelligence">
    <div class="intelligenceContain">
        <div class="intelligenceBanner">
            <div class="intelligenceLabel">
                <ul class="LabelUL">
                    <li v-for="(item,index) in labels" :key="index" class="noActiveLabel"
                        @click="selectLabelFun(item,0)"
                        :class="selectLabel.indexOf(item.labelCode)!=-1?'activeLabel':''">
                        {{item.labelName}}
                    </li>
                </ul>
            </div>
            <div class="intelligenceCity">
                <ul class="cityUL">
                    <li v-for="(item,index) in cities" :key="index" class="noActiveLabel"
                        @click="selectLabelFun(item,1)"
                        :class="selectCity.indexOf(item.cityCode)!=-1?'activeLabel':''">
                        {{item.cityName}}
                    </li>
                </ul>
            </div>
        </div>
        <div style="position:relative;width:100%;height:100%;">
            <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
                loading-layer-color="#ec4949" :noDataText="noDataText" ref="my_scrollers">
                <!-- 上啦动画 -->
                <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                    <g stroke-width="7" stroke-linecap="round">
                        <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="52" x2="52" y1="16" y2="48">
                            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                                repeatCount="indefinite"></animate>
                        </line>
                    </g>
                </svg>
                <div class="intelligenceContent">
                    <ul class="projectDataContain">
                        <li v-for="(item,index) in intelligenceData" :key="index" style="" @click="goProDetail(item)">
                            <div class="projectLeft">
                                <div class="projectImgContain">
                                    <img :src="item.logo" alt="" v-if="item.logo">
                                    <div v-else>
                                        {{item.name.substring(0,1)}}
                                    </div>
                                </div>
                            </div>
                            <div class="projectRight">
                                <div class="projectOneLine">
                                    <div class="projectName">
                                        {{item.name}}<span>{{item.stockCode}}</span>
                                    </div>
                                    <div class="projectCityName">
                                        {{item.cityName}}
                                    </div>
                                    <div>
                                        <span class="financing" v-if="item.financingNeed == 1">正在融资</span>
                                        <span class="financing" v-if="item.financingNeed == 2">准备融资</span>
                                    </div>
                                    <div class="plusproject" v-if="token.length > 10" @click.stop="addProject(item.projectCode)">
                                        <img src="./img/plus.png" alt="">
                                    </div>
                                </div>
                                <div class="projectTwoLine">
                                    {{item.digest}}
                                </div>
                                <div class="projectThreeLine">
                                    {{item.latestInvDate}}
                                    <i v-if="item.latestInvDate && item.latestRound">·</i>
                                    {{item.latestRound}}
                                    <i
                                        v-if="(item.latestInvDate && item.latestViewRoundMoney) || (item.latestRound && item.latestViewRoundMoney)">·</i>
                                    {{item.latestViewRoundMoney}}
                                </div>
                                <div class="projectFourLine">
                                    <span>{{item.investNames}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="activeContain" v-if="noDataFlag">
                        <img src="./img/nocollect.png" alt="" class="nocontent">
                        <div class="nocontentText">
                            暂无数据
                        </div>
                    </div>
                    <div class="loading" v-if="loading">
                        <svg class="spinner" style="stroke: #4b8bf4;" slot="infinite-spinner" viewBox="0 0 64 64">
                            <g stroke-width="7" stroke-linecap="round">
                                <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                                    <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                                        repeatCount="indefinite"></animate>
                                </line>
                                <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                                    <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                                        repeatCount="indefinite"></animate>
                                </line>
                                <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                                    <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                                        repeatCount="indefinite"></animate>
                                </line>
                                <line x1="52" x2="52" y1="16" y2="48">
                                    <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite">
                                    </animate>
                                    <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                                        repeatCount="indefinite"></animate>
                                </line>
                            </g>
                        </svg>
                    </div>
                </div>
                <!-- 下拉动画 -->
                <svg class="spinner" style="stroke: #4b8bf4;" slot="infinite-spinner" viewBox="0 0 64 64">
                    <g stroke-width="7" stroke-linecap="round">
                        <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                                repeatCount="indefinite"></animate>
                        </line>
                        <line x1="52" x2="52" y1="16" y2="48">
                            <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite">
                            </animate>
                            <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                                repeatCount="indefinite"></animate>
                        </line>
                    </g>
                </svg>
            </scroller>
        </div>
        <projectAlbum v-if="addWorkFlowFlag" @closeFather="closeMask" :projectCodesData="projectCodesData" @closeMaskdiv="closeMaskdiv">
        </projectAlbum>
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
                token: '', // 登录信息
                flowId: '', // 专辑Id
                userId: '', // 用户Id
                intelligenceData: [], // 智能推荐数据
                loading: false,
                query: {
                    pageNum: 1,
                    pageSize: 10
                },
                flag: true,
                noDataFlag: false,
                addWorkFlowFlag: false, // 添加工作流
                projectCodesData: '', // 项目ID
                tips: false, // alert弹窗
                text: '操作成功',
                noDataText:'',
                nodata:false, // 
            }
        },
        async created() {
            this.token = this.$route.query.token; // 登录信息
            this.flowId = this.$route.query.flowId // 专辑ID
            this.userId = this.$route.query.userId // 用户ID
            await this.getAlbumLabel();
            this.getProjectByLabel();
        },
        mounted(){
            this.timer = setInterval(() => {
                let {left, top} = this.$refs.my_scrollers.getPosition()
                this.x = left
                this.y = top
                if(this.y > 100){
                    window.scrollTo(0, 100);
                }else{
                    window.scrollTo(0, 0);
                }
            }, 50)
        },
        methods: {
            refresh(done){ // 下拉刷新
                this.query.pageNum = 1;
                setTimeout(() => {
                    this.getProjectByLabel();
                    done();
                }, 2000)
            },
            infinite(done){ // 上拉加载
                if(this.nodata == false){
                    setTimeout(()=>{
                        done&&done(true);
                    },0);
                }else{
                    setTimeout(()=>{
                        this.query.pageNum++;
                        this.axios.post('/vc/albumFlow/queryAlbumProjectByLabel',{
                            "pageSize": this.query.pageSize,
                            "pageNum": this.query.pageNum,
                            "labels":this.selectLabel,
                            "cities":this.selectCity,
                            "flowId":this.flowId
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
            closeTip() { // 关闭弹窗
                this.tips = false;
            },
            closeMask() { // 关闭 工作流
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
            addProject(data) { // 添加工作流
                this.addWorkFlowFlag = true;
                console.log(data);
                this.projectCodesData = data;
            },
            goProDetail(data) {
                // console.log(data);
                let projectCode = data.projectCode;
                console.log(projectCode);
                if (window.webkit) {
                    window.webkit.messageHandlers.goIntProDetail.postMessage({ body: projectCode });
                } else {
                    window.goIntProDetail.sendermsg(projectCode);
                }
            },
            async getAlbumLabel() { // 获取标签和城市
                this.loading = true;
                let url = '/vc/albumFlow/queryFlowLabel?flowId=' + this.flowId;
                await this.axios.post(url).then((res) => {
                    if (res.data.status == 1) {
                        this.labels = res.data.data.labels;
                        this.cities = res.data.data.cities;
                        if(this.labels[0]){
                            this.selectLabel.push(this.labels[0].labelCode);
                            this.noDataFlag = false;
                        }else{
                            this.noDataFlag = true;
                        }
                    }
                    this.loading = false;
                })
            },
            selectLabelFun(data, index) { // 选择标签
                this.nodata = false;
                if (index == 0) { // 选择标签
                    if (this.selectLabel.indexOf(data.labelCode) != -1) {
                        this.selectLabel.splice(this.selectLabel.indexOf(data.labelCode), 1);
                    } else {
                        this.selectLabel.push(data.labelCode);
                    }
                } else { // 选择城市
                    if (this.selectCity.indexOf(data.cityCode) != -1) {
                        this.selectCity.splice(this.selectCity.indexOf(data.cityCode), 1);
                    } else {
                        this.selectCity.push(data.cityCode);
                    }
                }

                if (this.selectLabel.length == 0) {
                    this.tips = true;
                    this.text = "必须选择一个智能标签";
                    this.intelligenceData = [];
                } else {
                    this.query.pageNum = 1;
                    this.flag = true;
                    this.intelligenceData = [];
                    this.getProjectByLabel();
                }

            },
            getProjectByLabel() { // 通过标签选城市
                this.loading = true;
                this.axios.post('/vc/albumFlow/queryAlbumProjectByLabel', {
                    "pageSize": this.query.pageSize,
                    "pageNum": this.query.pageNum,
                    "labels": this.selectLabel,
                    "cities": this.selectCity,
                    "flowId":this.flowId
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.nodata = true;
                        this.intelligenceData = res.data.data.list;
                        if (this.intelligenceData.length == 0) {
                            this.noDataFlag = true
                        } else {
                            this.noDataFlag = false
                        }
                    }
                    this.loading = false;
                })
            },
            addMoreProject() {
                if (this.flag) {
                    this.query.pageNum++;
                    this.getProjectByLabel(true); // 加载更多
                } else {
                    console.log('没有更多了');
                }
            },
        },
        destroyed(){
            clearInterval(this.timer)
        },
        components: {
            "projectAlbum": projectAlbum,
            "alertInfo": alertInfo
        }
    }
</script>