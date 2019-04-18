<template id="organization">
    <div class="orgContain" style="height:100%">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" ref="my_scrolleror" :noDataText="noDataText">
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
            <ul class="orgContainUL">
                <li class="orgContainLI" v-for="(item,index) in orgData" :key="index" @click="orgdetail(item)">
                    <div class="orgliContent">
                        <span class="orgTitle">{{item.companyName}}</span>
                        <div class="rightContain">
                            <span class="orgCount">{{item.amount}}次投资事件</span>
                            <img src="./img/right.png" alt="" class="orgDetail" />
                        </div>
                    </div>
                    <div class="borderBg"></div>
                </li>
            </ul>
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
        
        <div class="activeContain" v-if="noDataFlag">
            <img src="./img/nocollect.png" alt="" class="nocontent">
            <div class="nocontentText">
                暂无数据
            </div>
        </div>
        <div v-if="loading" style="display:flex;justify-content:center">
            <img src="./img/loading.gif" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                token:'', // 登录信息
                albumId:'', // 专辑Id
                userId:'', // 用户Id
                orgData:[], // 机构数量
                query:{
                    pageNum:1,
                    pageSize:25
                },
                noDataFlag:false,
                nodata:false,
                noDataText:"",
                loading:false,
            }
        },
        created(){
            this.token = this.$route.query.token; // 登录信息
            this.albumId = this.$route.query.albumId // 专辑ID
            this.userId =  this.$route.query.userId // 用户ID
            this.getAlbumCompany();
        },
        methods:{
            refresh(done){ // 下拉刷新
                this.query.pageNum = 1;
                setTimeout(() => {
                    this.axios.post('/vc/albumFlow/queryAlbumCompany',{},{
                        params:{
                            "pageSize":this.query.pageSize,
                            "pageNum":this.query.pageNum,
                            "albumId":this.albumId
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            this.nodata = true;
                            this.orgData = res.data.data.list;
                            if(res.data.data.list.length == 0){
                                this.noDataFlag = true
                            }else{
                                this.noDataFlag = false
                            }
                        }
                    })
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
                        this.query.pageNum++;
                        this.axios.post('/vc/albumFlow/queryAlbumCompany',{},{
                            params:{
                                "pageSize":this.query.pageSize,
                                "pageNum":this.query.pageNum,
                                "albumId":this.albumId
                            }
                        }).then((res)=>{
                            if(res.data.status == 1){
                                if(res.data.data.list.length != 0){
                                    this.orgData = this.orgData.concat(res.data.data.list);
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
            getAlbumCompany(){
                this.loading = true;
                this.axios.post('/vc/albumFlow/queryAlbumCompany',{},{
                    params:{
                        "pageSize":this.query.pageSize,
                        "pageNum":this.query.pageNum,
                        "albumId":this.albumId
                    }
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.nodata = true;
                        this.loading = true;
                        this.orgData = res.data.data.list;
                        if(res.data.data.list.length == 0){
                            this.noDataFlag = true
                        }else{
                            this.noDataFlag = false
                        }
                    }
                })
            },
            orgdetail(data){ // 去机构
                // console.log(data);
                let companyId = data.companyId;
                // console.log(companyId);
                if(window.webkit){
                    window.webkit.messageHandlers.orgDetail.postMessage({body: companyId});
                }else{
                    window.orgDetail.sendermsg(companyId);
                }
            },
        },
    }
</script>