<template id="projectAlbum">
    <div class="workFlow" @click="closeMaskDIV()">
        <div class="bottomWorkFlow" @click.stop="stopBu()">
            <div class="workFlowTop">
                <div class="workTest">
                    添加到
                </div>
                <div class="workButtons">
                    <span :class="activespan==0?'activespan':''" @click="changeTip(0)">收藏</span>
                    <span :class="activespan==1?'activespan':''" @click="changeTip(1)">项目专辑</span>
                </div>
            </div>
            <div class="workFlowContain">
                <!-- 收藏模块 -->
                <div class="spanOne" v-if="activespan==0">
                    <ul class="spanContain">
                        <li v-for="(item,index) in workFlowData" :key="index">
                            <div class="collect_left">
                                <div class="collect_title">
                                    <span>{{item.flowTitle}}</span>
                                    <span>
                                        <img src="./img/lock.png" alt="" class="lock">
                                    </span>
                                </div>
                                <div class="project_Count">
                                    {{item.projectNum}}个项目
                                </div>
                            </div>
                            <div class="collect_right">
                                <input type="checkbox" v-model="item.existProject" @change="addorDelect(item)">
                                <i></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 项目专辑模块 -->
                <div class="spanTwo" v-if="activespan==1">
                    <ul class="spanContain">
                        <li v-for="(item,index) in projectAlbum" :key="index">
                            <div class="collect_left">
                                <div class="collect_title">
                                    <span class="ellipsis">{{item.albumTitle}}</span>
                                </div>
                                <div class="project_Count">
                                    {{item.projectNum?item.projectNum:0}}个项目
                                </div>
                            </div>
                            <div class="collect_right">
                                <input type="checkbox" v-model="item.existProject" @change="changeProjectCollect(item)">
                                <i></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="workFlowBottom">
                <button @click="closeMask()">完成</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activespan:1,
            projectAlbum:[], // 项目专辑列表
            workFlowData:[], // 工作流信息
        }
    },
    props:{
        projectCodesData:{ // 项目ID

        }
    },
    created(){
        console.log(this.projectCodesData);
        this.getMyAlbumListPage();
        this.getMyFlowListPage();
        ModalHelper.afterOpen();
    },
    mounted(){

    },
    methods:{
        getMyAlbumListPage(){ // 根据项目查询专辑
            this.axios.post('/vc/albumFlow/queryMyAlbumListPage',{
                "pageSize": 100,
                "pageNum": 1,
                "projectCodes": [this.projectCodesData]
            }).then((res)=>{
                if(res.data.status == 1){
                    let dataList = res.data.data.list;
                    this.projectAlbum = dataList;
                }
            })
        },
        addorDelect(item){ // 添加或者删除工作流
            if(item.existProject){ // 选中
                console.log(item);
                this.axios.post('/vc/albumFlow/addProjectToMyFlow',{
                    "flowIds": [item.flowId],
                    "projectCodes": [this.projectCodesData]
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.getMyFlowListPage()
                    }
                })
            }else{ // 未选中
                console.log(item);
                this.axios.post('/vc/albumFlow/deleteFlowProjects',{
                    "flowId": item.flowId,
                    "projectCodes": [this.projectCodesData]
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.getMyFlowListPage()
                    }
                })
            }
           
        },
        changeTip(data){
            this.activespan = data;
        },
        changeProjectCollect(e){ // 选中 或者 不选中
            // console.log(e);
            // console.log(this.projectAlbum)
            if(e.existProject){ // 选中 将项目 添加到我的专辑
                this.axios.post('/vc/albumFlow/addProjectToMyAlbum',{
                    "albumIds": [e.albumId],
                    "projectCodes": [this.projectCodesData]
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.getMyAlbumListPage();
                    }
                })
            }else{ // 不选中 
                this.axios.post('/vc/albumFlow/deleteAlbumProjects',{
                    "albumId": e.albumId,
                    "projectCodes": [this.projectCodesData]
                }).then((res)=>{
                    if(res.data.status == 1){
                        this.getMyAlbumListPage();
                    }
                })
            }
        },
        getMyFlowListPage(){ // 根据项目查找工作流
            this.axios.post('/vc/albumFlow/queryMyFlowListPage',{
                "pageSize": 60,
                "pageNum": 1,
                "projectCodes": [this.projectCodesData]
            }).then((res)=>{
                if(res.data.status == 1){
                    this.workFlowData = res.data.data.list;
                }
            })
        },
        stopBu(){ // 阻止事件冒泡

        },
        closeMask(){ // 完成
            console.log('完成');
            this.$emit("closeFather")
        },
        closeMaskDIV(){ // 点击阴影
            console.log("点击阴影");
            this.$emit("closeMaskdiv");
        },
        touvemove(e){
            e.preventDefault()
        }
    },
    destroyed(){
        ModalHelper.beforeClose();
    }
}
</script>
