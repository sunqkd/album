<template id="news">
    <div class="newsContain">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" ref="my_scrollerNew" :noDataText="noDataText">
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
        data() {
            return {
                token: '', // 登录信息
                albumId: '', // 专辑Id
                userId: '', // 用户Id
                newsList: [], // 新闻列表
                query: {
                    pageNum: 1,
                    pageSize: 20
                },
                noDataFlag: false,
                nodata:false, // 禁止下拉刷新
                noDataText:'',
                loading:false,
            }
        },
        created() {
            this.token = this.$route.query.token; // 登录信息
            this.albumId = this.$route.query.albumId // 专辑ID
            this.userId = this.$route.query.userId // 用户ID
            this.getNews();
        },
        mounted(){
            let that = this;
            function fn(){
                let {left, top} = that.$refs.my_scrollerNew.getPosition()
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
        methods: {
            refresh(done){ // 下拉刷新
                this.query.pageNum = 1;
                setTimeout(() => {
                    this.axios.post('/vc/albumFlow/queryAlbumNews', {}, {
                        params: {
                            "pageSize": this.query.pageSize,
                            "pageNum": this.query.pageNum,
                            "albumId": this.albumId
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            this.nodata = true;
                            this.newsList = res.data.data.list;
                            if(res.data.data.list.length == 0){
                                this.noDataFlag = true;
                            }else{
                                this.noDataFlag = false;
                            }
                        }else{

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
                    setTimeout(() => {
                        this.query.pageNum++;
                        this.axios.post('/vc/albumFlow/queryAlbumNews', {}, {
                            params: {
                                "pageSize": this.query.pageSize,
                                "pageNum": this.query.pageNum,
                                "albumId": this.albumId
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
            goNewsDetail(data) {
                // console.log(data);
                let newId = data.newId;
                // console.log(newId);
                if (window.webkit) {
                    if(window.webkit.messageHandlers.newsDetail){
                        window.webkit.messageHandlers.newsDetail.postMessage({ body: newId });
                    }else{
                        window.location.href = 'https://m.dyly.com/register/app_h5/news_share.html?newsId='+data.newId;
                    }
                }else if(window.newsDetail){
                    window.newsDetail.sendermsg(newId);
                }else{
                    window.location.href = 'https://m.dyly.com/register/app_h5/news_share.html?newsId='+data.newId;
                }
            },
            getNews(){
                this.loading = true;
                this.axios.post('/vc/albumFlow/queryAlbumNews', {}, {
                    params: {
                        "pageSize": this.query.pageSize,
                        "pageNum": this.query.pageNum,
                        "albumId": this.albumId
                    }
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.nodata = true;
                        this.loading = false;
                        this.newsList = res.data.data.list;
                        if(res.data.data.list.length == 0){
                            this.noDataFlag = true;
                        }else{
                            this.noDataFlag = false;
                        }
                    }else{

                    }
                })
            }
        },
        destroyed(){
            clearInterval(this.timer);
        }
    }
</script>