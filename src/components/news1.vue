<template id="news">
    <div class="newsContain">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" ref="my_scrollernew1" :noDataText="noDataText">
            <!-- 上啦动画 -->
            <img src="./img/loading.gif" alt="" slot="refresh-spinner">
            <ul>
                <li class="newsLi" v-for="(item,index) in newsList" :key="index" @click="goNewsDetail(item)">
                    <div class="newsLeft">
                        <img src="./img/news.png" alt="">
                    </div>
                    <div class="newsRight">
                        <div class="newsTitle">
                        {{item.title}}
                        </div>
                        <div class="newsTime">
                            <span>{{item.pushDate}}</span>
                            <span>|</span>
                            <span>{{item.source}}</span>
                        </div>
                    </div>
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
    data(){
        return {
            token:'', // 登录信息
            flowId:'', // 专辑Id
            userId:'', // 用户Id
            newsList:[], // 新闻列表
            loading:false, // 加载
            query:{
                pageNum:1,
                pageSize:20
            },
            noDataFlag:false,
            noDataText:'',
            nodata:false,
        }
    },
    created(){
        this.token = this.$route.query.token; // 登录信息
        this.flowId = this.$route.query.flowId // 专辑ID
        this.userId =  this.$route.query.userId // 用户ID
        this.getNews();
    },
    mounted(){
        let that = this;
        function fn(){
            let {left, top} = that.$refs.my_scrollernew1.getPosition()
            that.x = left
            that.y = top
            if(that.y > 200){
                document.getElementById("titleContain").style.display = 'none'
            }else{
                document.getElementById("titleContain").style.display = 'block';
            }
        }
        that.timer = setInterval(fn, 10)
    },
    methods:{
        refresh(done){
            this.query.pageNum = 1;
            setTimeout(() => {
                this.axios.post('/vc/albumFlow/queryFlowNews',{},{
                    params:{
                        "pageSize":this.query.pageSize,
                        "pageNum":this.query.pageNum,
                        "flowId":this.flowId
                    }
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.nodata = true;
                        this.newsList = res.data.data.list;
                        if(this.newsList.length == 0){
                            this.noDataFlag = true
                        }else{
                            this.noDataFlag = false
                        }
                    }
                })
                done();
            }, 1500)
        },
        infinite(done){
            if(this.nodata == false){
                setTimeout(()=>{
                    done&&done(true);
                },0);
            }else{
                setTimeout(()=>{
                    this.query.pageNum++;
                    this.axios.post('/vc/albumFlow/queryFlowNews', {}, {
                        params: {
                            "pageSize": this.query.pageSize,
                            "pageNum": this.query.pageNum,
                            "flowId":this.flowId
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            if(res.data.data.list.length != 0){
                                this.newsList = this.newsList.concat(res.data.data.list);
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
        goNewsDetail(data){
            let newId = data.newId;
            if(window.webkit){
                window.webkit.messageHandlers.newsDetail.postMessage({body: newId});
            }else{
                window.newsDetail.sendermsg(newId);
            }
        },
        getNews(){
            this.loading = true;
            this.axios.post('/vc/albumFlow/queryFlowNews',{},{
                params:{
                    "pageSize":this.query.pageSize,
                    "pageNum":this.query.pageNum,
                    "flowId":this.flowId
                }
            }).then((res)=>{
                if(res.data.status == 1){
                    this.nodata = true;
                    this.loading = false;
                    this.newsList = res.data.data.list;
                    if(this.newsList.length == 0){
                        this.noDataFlag = true
                    }else{
                        this.noDataFlag = false
                    }
                }
            })
        },
    },
    destroyed(){
        clearInterval(this.timer);
    }
}
</script>

