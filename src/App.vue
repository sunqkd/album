<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
        name: "App"
	};
</script>

<style>
*{margin:0;padding:0;}
a{text-decoration:none;}
ul,li{ padding:0;margin:0;list-style:none}
html,body{width:100%;background:rgba(255,255,255,1);font-size: 16px;font-family:PingFangSC-Medium, Microsoft YaHei,PingFangSC-Light, sans-serif;height: 100%}
#app{
    width:100%;
    height:100%;
    background:#f4f6f6;
}
/* albumzu件 */
#album{
    width:100%;
    position:relative;
}
.albumContain{
    width:100%;
    height:100%;
    position:relative;
}
#titleContain{
    width:100%;
    padding-bottom:29px;
    background:#ffffff;
}
.albumTitle{
    width:100%;
    padding:18px 10px 16px 10px;
    font-size: 20px;
    line-height: 24px;
    box-sizing: border-box;
    font-weight: bold;
    color:rgba(78,88,92,1);
}
.editorimg{
    width:16px;
    height:16px;
    display:inline-block;
}
.userInfo{
    width:100%;
    padding:0 10px;
    box-sizing: border-box;
    display:flex;
    align-items:center;
    justify-content: space-between;
    font-size:12px;
    color:rgba(155,170,176,1);
    line-height: 16px;
}
.userImgContain{
    width: 16px;
    height:16px;
    border-radius: 50%;
    margin-right:8px;
    display:flex;
    justify-content: center;
    align-items: center;
}
.userImgContain img{
    width:100%;
    height:auto;
    border-radius: 50%;
}
.userImg{
    display:flex;
    align-items: center;
}

#nav{
    width:100%;
    height:44px;
    display:flex;
    justify-content: space-between;
    font-size: 0px;
    background: #ffffff;
    top:0;
    z-index: 10;
    padding: 0 6px;
    box-sizing: border-box;
    font-family:PingFangSC-Regular;
}
#nav a{
    display:block;
    height:100%;
    padding:0 4px;
    display:flex;
    justify-content: center;
    font-weight:400;
    color:rgba(78,88,92,1);
}
.navName{
    font-size: 14px;
    display:block;
    height:80%;
    display: flex;
    align-items: center;
    margin-top:5px;
}
.navCount{
    font-size: 10px;
    height:80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top:6px;
}
/* 项目样式 */
.projectContain{
    width:100%;
    background:#f4f6f6;
    padding: 6px 8px 0 8px;
    box-sizing: border-box;
    position: relative;
}
.projectDataContain{
    width:100%;
    padding:6px 8px 0px 8px;
    box-sizing: border-box;
}
.projectDataContain li {
    width:100%;
    margin-bottom: 6px;
    padding: 12px 10px;
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    background:rgba(255,255,255,1);
    border-radius:8px;
}
.projectDataContain li:last-child{
    margin-bottom: 50px;
}
.projectLeft{
    width:40px;
    height:100%;
}
.projectImgContain{
    width:40px;
    height:40px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border:1px solid rgba(240,240,240,1);
}
.projectImgContain img{
    width:100%;
    height:100%;
    border-radius: 8px;
}
.projectImgContain div{
    width:100%;
    height:100%;
    background:#91a3af;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color:#ffffff;
    border-radius: 8px;
}
.projectRight{
    width:calc(100% - 50px);
}
.projectOneLine{
    width:100%;
    position:relative;
}
.projectName{
    font-size:16px;
    font-weight:bold;
    color:rgba(78,88,92,1);
    line-height:20px;
    font-family:PingFangSC-Medium;
}
.projectName .stockCode{
    display:inline-block;
    background:rgba(182,153,106,0.2);
    border-radius:4px;
    padding:1px 6px;
    font-size:11px;
    color:rgba(182,153,106,1);
    font-weight:normal;
    margin:0 6px;
}
.projectCityName{
    font-weight:400;
    font-size:12px;
    color:rgba(155,170,176,1);
    line-height:16px;
}
.financing{
    display:block;
    padding:3px 6px;
    background:rgba(255,79,76,0.16);
    border-radius:8px;
    font-size: 10px;
    color:rgba(255,79,76,1);
}
.checkContain{
    position:absolute;
    display:flex;
    align-items: center;
    right:0;
    top:1px;
    z-index:10;
}
.checkContain input{
    width: 32px;
    height: 20px;
    opacity:0;
    filter:alpha(opacity=0);
    z-index: 5;
    position: relative;
    left: 0;
    top: 0px;
    cursor:pointer;
}
.checkContain input:checked + i{
    background:url('./components/img/yescheck.png') no-repeat;
    background-size: 100% 100%;
}
.checkContain i{
    background:url('./components/img/nocheck.png') no-repeat;
    width: 32px;
    height: 20px;
    background-size: 100% 100%;
    display: inline-block;
    z-index: 3;
    position: absolute;
    left: 0;
    top: 0px;
}

.projectOneLine div{
    display:inline-block;
}
.projectTwoLine{
    font-size:12px;
    font-weight:400;
    color:rgba(78,88,92,1);
    line-height:16px;
    font-family:PingFangSC-Regular;
}
.projectThreeLine{
    font-size:12px;
    font-weight:400;
    color:rgba(78,88,92,1);
    line-height:16px;
    font-family:PingFangSC-Regular;
}
.projectFourLine{
    font-size: 12px;
    font-weight:400;
    color:rgba(182,153,106,1);
    line-height:16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    font-family:PingFangSC-Regular;
}
.bottom-footer{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    height:49px;
    background: #ffffff;
    z-index: 10;
    box-sizing: border-box;
}
.userSelf{
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.userSelf button{
    width:160px;
    height:36px;
    border:none;
    outline: none;
    background:linear-gradient(127deg,rgba(210,184,140,1) 0%,rgba(178,150,105,1) 100%);
    border-radius:19px;
    color:#ffffff;
    font-size:14px;
}
.userSelf button:nth-child(1){
    margin-right:15px;
}
.nouserSelf{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nouserSelf button{
    border:none;
    outline: none;
    width:295px;
    height:36px;
    background:linear-gradient(127deg,rgba(210,184,140,1) 0%,rgba(178,150,105,1) 100%);
    border-radius:18px;
    color:#ffffff;
}
.projectOperation{
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
}
.projectOperation span{
    font-weight:400;
    color:rgba(78,88,92,1);
    font-size: 14px;
}
.projectOperationButton button{
    border:none;
    outline:none;
}
.projectOperationButton button:nth-child(1){
    width:90px;
    height:36px;
    border-radius:19px;
    border:1px solid rgba(182,153,106,1);
    color:rgba(182,153,106,1);
    background: #ffffff;
}
.projectOperationButton button:nth-child(2){
    width:90px;
    height:36px;
    background:rgba(255,79,76,1);
    border-radius:19px;
    color:#ffffff;
}
.projectMask{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:15;
    background:rgba(0,0,0,0.3);
}
.maskContent{
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-135px;
    margin-top:-91px;
    width:270px;
    height:182px;
    background:rgba(255,255,255,1);
    border-radius:16px;
}
.maskContent .text{
    width:230px;
    height:80px;
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(78,88,92,1);
    line-height:80px;
    text-align: center;
    margin-left:20px;
    margin-top:24px;
}
.maskContent .buttons{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:24px;
}
.maskContent .buttons button{
    border:none;
    outline: none;
    width:100px;
    height:30px;
    background:none;
}
.maskContent .buttons button:nth-child(1){
    border-radius:20px;
    border:1px solid rgba(182,153,106,1);
    margin-right:10px;
    color:rgba(182,153,106,1);
}
.maskContent .buttons button:nth-child(2){
    background:linear-gradient(127deg,rgba(210,184,140,1) 0%,rgba(178,150,105,1) 100%);
    border-radius:20px;
    color:rgba(255,255,255,1);
}
/* 智能推荐 */
.intelligenceContain{
    width:100%;
    height:100%;
}
.intelligenceBanner{
    width:100%;
    padding:17px 0 7px 10px;
    box-sizing: border-box;
    background:#f4f6f6;
}
.intelligenceLabel{
    margin-bottom: 12px;
}
.intelligenceLabel,.intelligenceCity{
    width:100%;
    overflow-x: auto;
}
.LabelUL,.cityUL{
    display:flex;
    white-space:nowrap
}
.noActiveLabel {
    padding:4px 11px;
    font-weight:400;
    color:rgba(113,129,135,1);
    font-size: 12px;
    border-radius:12px;
    border:1px solid rgba(113,129,135,1);
    margin-right:6px;
}
.activeLabel{
    color:rgba(255,79,76,1);
    border:1px solid rgba(255,79,76,1);
}
.intelligenceContent{
    width:100%;
    background:#f4f6f6;
    padding:0 8px;
    box-sizing: border-box;
}

/* 机构 */
.orgContain{
    width:100%;
    /* background: #ffffff; */
}
.orgContainUL{
    width:100%;
    padding-top:6px;
    background:#f4f6f6
}
.orgContainLI{
    width:100%;
    height:48px;
    padding:0 16px;
    background: #ffffff;
    box-sizing: border-box;
}
.orgliContent{
    width:100%;
    height:47px;
    display:flex;
    align-items:center;
    justify-content: space-between;
}
.orgTitle{
    font-weight:500;
    color:rgba(78,88,92,1);
    font-size:16px;
}
.rightContain{
    display:flex;
    align-items: center;
}
.orgCount{
    font-weight:400;
    color:rgba(155,170,176,1);
    font-size: 14px;
}
.orgDetail{
    width:8px;
    height:14px;
    padding-left: 8px;
}
.borderBg{
    height:1px;
    background:rgba(240,240,240,1);
}
/* 新闻 */
.newsContain{
    width:100%;
}
.newsContain ul{
    background:#f4f6f6;
    padding-top: 6px;
}
.newsLi{
    width:100%;
    padding: 10px 10px 0 12px;
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    background: #ffffff;
}
.newsLeft{
    width:16px;
    height:100%;
}
.newsLeft img{
    width:16px;
    height:16px;
    margin-top:4px;
}
.newsRight{
    width:calc(100% - 24px);
    padding-bottom:10px;
    border-bottom:1px solid rgba(240,240,240,1);
}
.newsTitle{
    font-size:16px;
    font-weight:400;
    color:rgba(78,88,92,1);
    line-height:20px;
}
.newsTime{
    font-size:12px;
    font-weight:400;
    color:rgba(155,170,176,1);
    line-height:16px;
    margin-top:10px;
}
/* 活动 */
.activeContain{
    width:100%;
}
.nocontent{
    width:100%;
    height:auto;
    margin-top:32px;
}
.nocontentText{
    width:100%;
    text-align: center;
    margin-top:27px;
    font-weight:400;
    color:rgba(156,186,186,1);
    line-height:22px;
    font-size: 16px;
}
/* 研报 */
.reportContain{
    width:100%;
}

/* routerActive */
.RouterActive .navName{
    border-bottom:2px solid rgba(255,79,76,1);
    color:rgba(255,79,76,1)
}
.RouterActive .navCount{
    color:rgba(255,79,76,1)
}
.loading{
    width:100%;
    height:40px;
    display:flex;
    align-items: center;
    justify-content: center;
    color: rgba(156,186,186,1);
    font-weight: 400;
    margin-bottom: 50px;
}
.loading img{
    width:40px;
    height:auto;
}
.nouserSelf .noClick{
    background:#91a3af;
}
.plusproject{
    width:32px;
    height:20px;
    position:absolute;
    right:0;top:0;
}
.plusproject img{
    width:32px;
    height:20px;
}
#projectAlbum{
   width:100%;
}
.workFlow{
    width:100%;
    min-height:100%;
    position: fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
    z-index:20;
}
.bottomWorkFlow{
    width:100%;
    height:55%;
    position:absolute;
    left:0;
    bottom:0;
    background:rgba(255,255,255,1);
}
.workFlowTop{
    width:100%;
    width:100%;
    height:50px;
    background:#ffffff;
    position: fixed;
    left:0;
    top:45%;
    margin-top:-50px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:6px 16px 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(240,240,240,1);
}
.workTest{
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(155,170,176,1);
}
.workButtons{
    height:100%;
    font-size: 0;
}
.workButtons span{
    height:100%;
    display:inline-block;
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(155,170,176,1);
    line-height:44px;
}
.workButtons span:nth-child(1){
    margin-right:30px;
}
.workButtons .activespan{
    color:rgba(255,79,76,1);
    border-bottom:2px solid rgba(255,79,76,1);
}
.workFlowContain{
    width:100%;
    height:350px;
    overflow: scroll;
    padding-bottom:50px;
}
.workFlowBottom{
    width: 100%;
    height: 50px;
    position:fixed;
    left:0;
    bottom:0;
    background:#ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
}
.workFlowBottom button{
    border:none;
    outline: none;
    width:295px;
    height:36px;
    background:linear-gradient(127deg,rgba(210,184,140,1) 0%,rgba(178,150,105,1) 100%);
    border-radius:18px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
}
.spanContain{
    width:100%;
    padding:0 16px;
    box-sizing: border-box;
    margin-bottom:50px;
}
.spanContain li{
    width:100%;
    height:66px;
    border-bottom: 1px solid rgba(240,240,240,1);
    display:flex;
    justify-content: space-between;
    align-items: center;
    position:relative;
}
.collect_left{
    width:100%;
}
.collect_title {
    font-size: 0px;
    max-width:80%;
}
.collect_title span{
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(78,88,92,1);
}
.ellipsis{
    display:inline-block;
    width:100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.lock{
    width:10px;
    height:12px;
    margin-left:5px;
}
.project_Count{
    margin-top:10px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(155,170,176,1);
}

.collect_right{
    position:absolute;
    display:flex;
    align-items: center;
    right:0;
    top:20px;
    z-index:10;
}
.collect_right input{
    width: 24px;
    height: 24px;
    opacity:0;
    filter:alpha(opacity=0);
    z-index: 5;
    position: relative;
    left: 0;
    top: 0px;
    cursor:pointer;
}
.collect_right input:checked + i{
    background:url('./components/img/choose.png') no-repeat;
    background-size: 100% 100%;
}
.collect_right i{
    background:url('./components/img/nochoose.png') no-repeat;
    width: 24px;
    height: 24px;
    background-size: 100% 100%;
    display: inline-block;
    z-index: 3;
    position: absolute;
    left: 0;
    top: 0px;
}

#alertInfo{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:rgba(0,0,0,0.3);
    z-index:25;
    display:flex;
    align-items: center;
    justify-content: center;
}
.alertContain{
    width:270px;
    height:182px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    padding:24px 20px 0 20px;
    box-sizing: border-box;
    position:relative;
}
.alertInfoText{
    width:100%;
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(78,88,92,1);
    text-align:center;
}
.containButton{
    width:100%;
    text-align: center;
    position:absolute;
    bottom:24px;
    left:0;
    /* background:pink; */
}
.containButton button{
    border:none;
    outline: none;
    color:#ffffff;
    width:100px;
    height:30px;
    background:linear-gradient(127deg,rgba(210,184,140,1) 0%,rgba(178,150,105,1) 100%);
    border-radius:20px;
}
</style>