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
                <!-- 上拉加载 -->
                <img src="./img/loading.gif" alt="" slot="refresh-spinner">
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
                <!-- 下拉动画 -->
                <img src="./img/loading.gif" alt="" slot="infinite-spinner" >
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
            this.$router.back(-1);
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