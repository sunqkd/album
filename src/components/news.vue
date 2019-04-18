<template id="news">
    <div class="newsContain">
        <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" ref="my_scrollerNew" :noDataText="noDataText">
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
                    pageSize: 10
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
                if(that.y > 150){
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
                    window.webkit.messageHandlers.newsDetail.postMessage({ body: newId });
                } else {
                    window.newsDetail.sendermsg(newId);
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