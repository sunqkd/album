<template>
    <div id="globalSearch">
        <!-- 搜索头 -->
        <div class="gSearchInfo">
            <div class="inputContain">
                <div class="leftInput">
                    <img src="./img/search.png" alt="">
                </div>
                <input type="text"  class="inputSearch" v-model="keyWord" @keyup.enter="getSearchInfo()"/>
                <div class="rightInput">
                    <img src="./img/slice.png" alt="" @click="cancelkeyWord()">
                </div>
            </div>
            <span class="cancelGoBack" @click="goback()">取消</span>
        </div>
        <!-- 搜索内容 -->
        <div class="searinfoContent">
            
            <scroller  :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
            loading-layer-color="#ec4949" :noDataText="noDataText" ref="projectScroll">
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
                <ul class="searinfoContentUl">
                    <li class="searinfoContentLi" v-for="(item,index) in searchData" :key="index" @click="addProjectToAlbum(item.projectId)">
                        <div class="infoContentLilogo">
                            <img :src="item.logo" v-if="item.logo" alt="">
                            <div class="gImgContain" v-else>
                                {{item.name?item.name.substring(0,1):''}}
                            </div>
                        </div>
                        <div class="infoContentLiRight">
                            <div class="searchTitle">
                                <span>{{item.name}}</span>
                                <span>{{item.cityName}}</span>
                            </div>
                            <div class="digist">
                                {{item.digest}}
                            </div>
                        </div>
                    </li>
                </ul>
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
            <!-- 提示消息 -->
            <div class="projectMask" v-if="loginflag">
                <div class="maskContent">
                    <div class="text">添加项目成功</div>
                    <div class="buttons">
                       <button @click="goback()">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            keyWord:'',
            pageSize:20,
            pageNum:1,
            searchData:[], // 搜索结果
            noDataFlag:false,
            noDataText:'',
            params:{}, // 
            loginflag:false, // 
            nodata:false,
            loading:false,
        }
    },
    created(){
        this.geturl(window.location.href);
    },  
    methods:{
        geturl(data){
            let urldata = data.split('#')[1].split("?")[1];
            // console.log(urldata);
            let arr = urldata.split("&");
            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split("=");              
                this.params[a[0]] = decodeURIComponent(a[1]);                      
            }   
            console.log(this.params);                            
        },
        refresh(done){ // 下拉刷新
            this.pageNum = 1;
            setTimeout(() => {
                this.axios.post('/vc/homeSearch/queryListPage',{},{
                params:{
                    "keyWord":this.keyWord,
                    "searchType":1,
                    "pageNum":1,
                    "pageSize":20
                }
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.searchData = res.data.data.list;
                        if(res.data.data.list.length == 0){
                        this.noDataFlag = true;
                        }else{
                            this.noDataFlag = false;
                        }
                        this.nodata = true;
                    }else{
                        this.nodata = false;
                    }
                })
                done();
            }, 1500)
        },
        infinite(done){ // 上啦加载
            if(this.nodata == false){
                setTimeout(()=>{
                    done&&done(true);
                },0);
            }else{
                setTimeout(()=>{
                    this.pageNum++;
                    this.axios.post('/vc/homeSearch/queryListPage',{},{
                        params:{
                            "pageSize":this.pageSize,
                            "pageNum":this.pageNum,
                            "searchType":1,
                            "keyWord":this.keyWord,
                        }
                    }).then((res)=>{
                        if(res.data.status == 1){
                            if(res.data.data.list.length != 0){
                                this.searchData = this.searchData.concat(res.data.data.list);
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
        cancelkeyWord(){ // 清空输入框
            this.keyWord = '';
        },
        goback(){ // 返回
            // this.$router.back(-1);
            
        },
        getSearchInfo(){ // 搜索数据
            this.searchData = [];
            this.loading = true;
            this.nodata = false;
            this.axios.post('/vc/homeSearch/queryListPage',{},{
                params:{
                    "keyWord":this.keyWord,
                    "searchType":1,
                    "pageNum":1,
                    "pageSize":20
                }
            }).then((res)=>{
                if(res.data.status == 1){
                    this.searchData = res.data.data.list;
                    this.nodata = true;
                    this.loading = false;
                    if(res.data.data.list.length == 0){
                        this.noDataFlag = true;
                    }else{
                        this.noDataFlag = false;
                    }
                }else{
                    this.nodata = false;
                }
            })
        },
        addProjectToAlbum(projectId){
            if(this.params.albumId){ // 将项目添加到我的专辑
                this.axios.post('/vc/albumFlow/addProjectToMyAlbum',{
                    "albumIds": [this.params.albumId],
                    "projectCodes": [projectId]
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log("添加成功");
                        this.loginflag = true;
                    }else{

                    }
                })
            }else{ // 将项目添加到我的工作流
                this.axios.post('/vc/albumFlow/addProjectToMyFlow',{
                    "flowIds": [this.params.flowId],
                    "projectCodes": [projectId]
                }).then((res)=>{
                    if(res.data.status == 1){
                        console.log("添加成功");
                        this.loginflag = true;
                    }else{

                    }
                })
            }
        }
    }
}
</script>