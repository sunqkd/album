<template id="organization">
    <div class="orgContain" @touchmove="this.touchmoveFun">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" ref="my_scrolleror" :noDataText="noDataText">
            <!-- 上啦动画 -->
            <img src="./img/loading.gif" alt="" slot="refresh-spinner">
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
            <div v-if="loading" style="display:flex;justify-content:center">
                <img src="./img/loading.gif" alt="">
            </div>
            <!-- 下拉动画 -->
            <img src="./img/loading.gif" alt="" slot="infinite-spinner" >
        </scroller>
        <div class="activeContain" v-if="noDataFlag">
            <img src="./img/nocollect.png" alt="" class="nocontent">
            <div class="nocontentText">
                暂无数据
            </div>
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
        mounted(){
            
        },
        methods:{
            touchmoveFun(){
                let {left, top} = this.$refs.my_scrolleror.getPosition()
                this.x = left
                this.y = top
                if(this.y > 200){
                    document.getElementById("titleContain").style.display = 'none'
                }else{
                    document.getElementById("titleContain").style.display = 'block';
                }
            },
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
                        this.loading = false;
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
                    if(window.webkit.messageHandlers.orgDetail){
                        window.webkit.messageHandlers.orgDetail.postMessage({body: companyId});
                    }else{
                        window.location.href = 'https://m.dyly.com/register/app_h5/org_share.html?companyId='+data.companyId
                    }
                }else if(window.orgDetail){
                    window.orgDetail.sendermsg(companyId);
                }else{
                    window.location.href = 'https://m.dyly.com/register/app_h5/org_share.html?companyId='+data.companyId
                }
            },
        },
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>