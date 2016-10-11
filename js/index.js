'use strict';
(function(){
    var audio = document.querySelector("#audio"),
        voice = document.querySelector('#voice'),
        video,
        $scMusicBtn = $('#scMusicBtn'),
        isPlay,
        $html = $('html'),
        $scStartBtn = $('#scStartBtn'),
        $scIndexWrap = $('#scIndexWrap'),
        $scWrongTipWrap = $('#scWrongTipWrap'),
        $scReloadBtn = $('#scReloadBtn'),
        $scRePlayBtn = $('#scRePlayBtn'),
        $scContinueWrap = $('#scContinueWrap'),
        $scContinueTpl = $('#scContinueTpl'),
        $scSuccessWrap = $('#scSuccessWrap'),
        $scSuccessTpl = $('#scSuccessTpl'),
        $scEndWrap = $('#scEndWrap'),
        $scShareMask = $('#scShareMask'),
        $scFullSuccessWrap = $('#scFullSuccessWrap'),
        $scDetailWrap = $('#scDetailWrap'),
        $scDetailTpl = $('#scDetailTpl'),
        $scCountDown = $('#scCountDown'),
        $scTelWrap = $('#scTelWrap'),
        $scXueShenAvatar = $('.js_xueshen_avatar'),
        $scXueShenName = $('.js_xueshen_name'),
        $scXueShenUnivs = $('.js_xueshen_univs'),
        $scVideoWrap = $('#scVideoWrap'),
        $scVideo = $('#scVideo'),
        $scTelAnswerBtn = $('#scTelAnswerBtn'),
        $scRejectBtn=$('#scRejectBtn'),
        $scShareBtn = $('#scShareBtn'),
        intervalid,
        oData,
        type,
        ctype,
        name,
        avatar,
        infoList,
        video,
        univs,
        wid,
        nid,
        pid,
        thisIndex,
        parentIndex,
        nextIndex,
        answer,
        index,
        qWrapHtml,
        arrHtml,
        arrList,
        strHtml,
        strList,
        oHtml,
        qData,
        len,
        alen,
        i=0,
        j=0,
        num=0,
        $q0,
        $parent;
    function playSong() {
        audio.play();
    };
    function stopSong(){
        audio.pause();
    };
    function playVoice(){
        voice.play();
    };
    function stopVoice(){
        voice.pause();
    };
    function control(){//音乐控制
        $scMusicBtn.off('click').on('click',function(){
            var $self = $(this);
            isPlay = $self.hasClass('play');
            if(isPlay){
                $self.removeClass('play');
                stopSong();
            }else{
                $self.addClass('play');
                playSong();
            }
        });
    };
    function toPlay(){//播放控制方法
        $scMusicBtn.addClass("show play");
        playSong();
        control();
    };
    function scRePlay(){//重玩游戏方法
        $scReloadBtn.off('click').on('click',function(){
            $scEndWrap.removeClass('show');
            $scIndexWrap.addClass('show');
            $scMusicBtn.addClass('show');
        });
    };
    function scPlay(){//玩游戏方法
        function answerListHtmlRender(data){
            arrList = [];
            alen = data.length;
            for(j=0;j<alen;j++){
                arrList.push('<a href="javascript:;" class="js_sc_answer" action-index="'+j+'">'+data[j]+'</a>');
            }
            strList = arrList.join('');
            return strList;
        }
        function questionHtmlRender(data){ //问题渲染方法
            arrHtml = [];
            len = data.length;
            for(i=0;i<len;i++){
                num = i+1;
                oHtml = [
                '<div class="sc-wrap sc-wrap-2 question js_sc_wrap" id="q'+i+'" action-index='+i+'>',
                    '<div class="con q-con">',
                        '<span class="circle circle-back"></span>',
                        '<span class="circle circle-font">Q'+num+'</span>',
                        '<div class="q-title">'+data[i].question+'</div>',
                        '<div class="q-answers-list">'+answerListHtmlRender(data[i].answerList)+'</div>',
                    '</div>',
                '</div>'
                ].join('');
                arrHtml.push(oHtml);
            }
            strHtml = arrHtml.join('');
            return strHtml;
        };
        qData = [
            {
                question:'“沧海横流，方显出英雄本色”这句诗的作者是？',
                answerList:['A.郭沫若','B.郭敬明','C.郭德纲','D.郭美美'],
                answer:0  //=>A
            },
            {
                question:'两篇《狂人日记》的作者分别是？',
                answerList:['A.果戈里、鲁迅','B.伏尔泰、鲁迅','C.大仲马、莫言','D.蒲松龄、雨果'],
                answer:0
            },
            {
                question:'青蛙除了用肺呼吸外，还用什么呼吸？',
                answerList:['A.肌肉','B.皮肤','C.脾脏','D.眼睛'],
                answer:1 //=>B
            },
            {
                question:'算盘是中国传统计算工具，利用算盘能否进行开平方运算吗？',
                answerList:['A.能','B.不能'],
                answer:0,
                type:'heitao',
                ctype:'黑桃',
                name:'肖茂超',
                avatar:'http://publicqn.saikr.com/3c6c67b942b05652a31258ec103771fc1473733539226.jpg',
                video:'http://publicqn.saikr.com/sk57d6928bea4160.427614421473680120727.mp4?attname=%E8%82%96%E8%8C%82%E8%B6%85.mp4',
                univs:'清华大学',
                infoList:[
                            '<p>来自 清华大学研一 的学神</p>',
                            '<p>本科前三年平均成绩91.32分</p>',
                            '<p>专业排名1/137</p>',
                            '<p>大学连续两年获得国家奖学金</p>',
                            '<p>7项省级以上学科竞赛获奖、1篇论文</p>'
                        ]
            },
            {
                question:'若abcd × 9 = dcba，则a=？',
                answerList:['A.1','B.2','C.0','D.9'],
                answer:0,
                type:'hongtao',
                ctype:'红桃',
                name:'徐延',
                avatar:'http://publicqn.saikr.com/3c6c67b942b05652a31258ec103771fc1473733391849.jpg',
                video:'http://publicqn.saikr.com/sk57d6928bea4160.427614421473680150817.mp4?attname=%E5%BE%90%E5%BB%B6.mp4',
                univs:'南京大学',
                infoList:[
                            '<p>南京大学 2011级本科生</p>',
                            '<p>14-15学年 江苏省学联主席</p>',
                            '<p>14-15学年 校学生会主席</p>',
                            '<p>第17届南京大学支教团团长</p>'
                        ]
            },
            {
                question:'五条直线相交，最多能有多少个交点？',
                answerList:['A.10','B.12','C.8','D.9'],
                answer:0,
                type:'fangpian',
                ctype:'方片',
                name:'李雨抒',
                avatar:'http://publicqn.saikr.com/e93d303673ae9bdc6df8d87415fb2a201473738275083.jpg',
                video:'http://publicqn.saikr.com/sk57d6928bea4160.427614421473680095094.mp4?attname=%E6%9D%8E%E9%9B%A8%E6%8A%92.mp4',
                univs:'清华大学',
                infoList:[
                            '<p>来自清华大学（在研）的学神</p>',
                            '<p>专业排名：1/ 58（所在专业为精英班）</p>',
                            '<p>保研课程综合成绩 97. 39</p>',
                            '<p>参与第十期SRTP国家创新训练计划</p>'
                        ]
            },
            {
                question:'古时候称皇帝为“陛下”，“陛下”的“陛”是指？',
                answerList:['A.太阳','B.台阶','C.天空','D.神'],
                answer:1,
                type:'meihua',
                ctype:'梅花',
                name:'赵松',
                avatar:'http://publicqn.saikr.com/3c6c67b942b05652a31258ec103771fc1473733335207.jpg',
                video:'http://publicqn.saikr.com/2016/xueshen/zhaosong_xueshen_jiyu_.mp4',
                univs:'中国科学院大学',
                infoList:[
                            '<p>中国科学院自动化所博士生（休学）</p>',
                            '<p>13项省级以上竞赛获奖</p>',
                            '<p>大学生竞赛活动社区-赛氪联合创始人</p>'
                        ]
            }
        ];
        
        qWrapHtml = questionHtmlRender(qData);//渲染问题模板
        $scIndexWrap.after(qWrapHtml);//添加到页面
        $q0 = $('#q0');
        $scStartBtn.off('click').on('click',function(){
            var $t = $(this);
            $parent = $t.parents('.js_sc_wrap');
            $parent.removeClass('show');
            $q0.addClass('show');
        });
        //选择问题
        $html.off('click','.js_sc_answer').on('click','.js_sc_answer',function(){
            var $t = $(this);
            thisIndex = parseInt($t.attr('action-index'));
            $parent = $t.parents('.js_sc_wrap');
            parentIndex = parseInt($parent.attr('action-index'));
            nid = '#q'+(parentIndex+1);
            answer = qData[parentIndex].answer;
            $parent.removeClass('show');
            if(thisIndex == answer){
                if(parentIndex<2){//如果是前两个问题，答对后直接进入下一题
                    $(nid).addClass('show');
                }else if(parentIndex == 2){//如果是第三个问题
                    nextIndex = parentIndex+1;
                    oData = qData[nextIndex];
                    type = oData.type;
                    ctype = oData.ctype;
                    infoList = oData.infoList.join('');
                    if($scContinueTpl[0] && $scContinueWrap[0]){
                        strHtml = $scContinueTpl[0].innerHTML;
                        strHtml = strHtml.replace(/{t}/g, type);
                        strHtml = strHtml.replace(/{i}/g, infoList);
                        strHtml = strHtml.replace(/{ct}/g, ctype);
                        $scContinueWrap[0].innerHTML = strHtml;
                        $scContinueWrap.attr('action-index',parentIndex).addClass('show');
                    }
                }else{
                    nextIndex = parentIndex+1;
                    len = qData.length;
                    num = len-nextIndex;
                    if(num > 0){
                        oData = qData[parentIndex];
                        type = oData.type;
                        ctype = oData.ctype;
                        if($scSuccessTpl[0] && $scSuccessWrap[0]){
                            strHtml = $scSuccessTpl[0].innerHTML;
                            strHtml = strHtml.replace(/{t}/g, type);
                            strHtml = strHtml.replace(/{ct}/g, ctype);
                            strHtml = strHtml.replace(/{i}/g, num);
                            $scSuccessWrap[0].innerHTML = strHtml;
                            $scSuccessWrap.attr('action-index',parentIndex).addClass('show');
                        }
                    }else{
                        $scFullSuccessWrap.addClass('show');
                    }
                }
            }else{
                $parent.find('.js_sc_answer').removeClass('active');
                pid = 'q'+parentIndex;
                $scWrongTipWrap.addClass('show').attr('action-pid',pid);
            }
        });
        //重玩此关
        $scRePlayBtn.off('click').on('click',function(){
            var $t = $(this);
            pid = '#'+ $scWrongTipWrap.attr('action-pid');
            $(pid).addClass('show');
            $scWrongTipWrap.removeClass('show');
        });
        //继续答题
        $html.off('click','.js_continue_btn').on('click','.js_continue_btn',function(){
            var $t = $(this);
            $parent = $t.parents('.js_sc_wrap');
            parentIndex = parseInt($parent.attr('action-index'));
            nextIndex = parentIndex+1;
            nid = '#q'+nextIndex;
            $parent.removeClass('show');
            $(nid).addClass('show');
        });
        function showTelWrap(){//显示接听界面方法
            $scDetailWrap.removeClass('show')
            $scTelWrap.addClass('show');
            $scMusicBtn.removeClass('show play');
            stopSong();
            playVoice();
        };
        function countDown(callback){//倒计时方法
            $scCountDown = $('#scCountDown');
            i=5;//初始时间为5s
            function fun() { 
                if (i == 0) { 
                    clearInterval(intervalid);
                    callback();//执行回调函数
                    return false;
                }
                $scCountDown.text(i);
                i--; 
            };
            intervalid = setInterval(fun, 1000); 
            fun();//执行倒计时
        };
        //选择学神卡片
        $scFullSuccessWrap.off('click','.js_xueshen_card_btn').on('click','.js_xueshen_card_btn',function(){
            var $t = $(this);
            thisIndex = $t.attr('action-index');
            $scFullSuccessWrap.removeClass('show');
            oData = qData[thisIndex];
            type = oData.type;
            name = oData.name,
            infoList = oData.infoList.join('');
            avatar = oData.avatar;
            video = oData.video;
            univs = oData.univs;
            if($scDetailTpl[0] && $scDetailWrap[0]){
                strHtml = $scDetailTpl[0].innerHTML;
                strHtml = strHtml.replace(/{t}/g, type);
                strHtml = strHtml.replace(/{i}/g, infoList);
                strHtml = strHtml.replace(/{n}/g, name);
                strHtml = strHtml.replace(/{a}/g, 'src="'+avatar+'"');
                $scDetailWrap[0].innerHTML = strHtml;
                $scFullSuccessWrap.removeClass('show');
                $scDetailWrap.addClass('show');
                $scXueShenAvatar.attr('src',avatar);
                $scXueShenName.text(name);
                $scXueShenUnivs.text(univs);
                $scVideo.attr('src',video);
                countDown(showTelWrap);//执行倒计时
            }
        });
        //显示结束页面
        function showEndWrap(){
            $scVideoWrap.removeClass('show');
            $scEndWrap.addClass('show');
            document.title = '我用尽洪荒之力集齐了四张K 召唤到了学神';
        };
        //接听方法
        $scTelAnswerBtn.off('click').on('click',function(){
            $scTelWrap.removeClass('show');
            $scVideoWrap.addClass('show');
            stopVoice();
            video = document.querySelector('#scVideo');
            video.play();
            video.removeEventListener("ended",showEndWrap,false);
            video.addEventListener("ended",showEndWrap,false);
        });
        //拒绝方法
        $scRejectBtn.off('click').on('click',function(){
            showEndWrap();
            video = document.querySelector('#scVideo');
            video.pause();
        });
        //分享浮层打开方法
        $scShareBtn.off('click').on('click',function(){
            $scShareMask.addClass('show');
        });
        //分享浮层关闭方法
        $scShareMask.off('click').on('click',function(){
            $(this).removeClass('show');
        });
    };
    $(function(){
        if(/i(Phone|P(o|a)d)/.test(navigator.userAgent)){
            $(document).one('touchstart',function(){//兼容IOS自动播放
                toPlay();
            });
        }
        audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕
            function() {
                toPlay();
        }, false);
        scRePlay();//执行重玩游戏方法
        scPlay();//执行玩游戏方法
    });
})();
