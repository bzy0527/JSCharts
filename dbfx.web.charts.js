DBFX.RegisterNamespace("DBFX.Web.DBChart");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");


//图表基类 cn-chartName
DBFX.Web.DBChart.BaseChart = function (cn) {
    if (cn == undefined)
        cn = "BaseChart";
    var bc = new DBFX.Web.Controls.Control(cn);
    bc.OnCreateHandle();
    bc.OnCreateHandle = function () {
        bc.SVG_NS = 'http://www.w3.org/2000/svg';
        bc.VisualElement = document.createElement("DIV");
        bc.ClientDiv = bc.VisualElement;
        bc.svg = document.createElementNS(bc.SVG_NS,'svg');//.createSVGRect;

        //20190809  添加样式 溢出时显示
        bc.svg.style.overflow = "visible";

        bc.svg.setAttribute('width','100%');
        bc.svg.setAttribute('height','100%');

        bc.VisualElement.appendChild(bc.svg);
        bc.DrawPaper = bc.svg;
    }


    //数据源
    bc.itemSource = [];
    Object.defineProperty(bc,"ItemSource",{
        get:function () {
            return bc.itemSource;
        },
        set:function (v) {
            bc.itemSource = v;
            //绘制图表
            bc.Draw(bc.itemSource);

        }
    });

    //值属性
    bc.valueAttr = "Value";
    Object.defineProperty(bc,"ValueAttr",{
        get:function () {
            return bc.valueAttr;
        },
        set:function (v) {
            bc.valueAttr = v;
        }
    });

    //横坐标显示标识属性
    bc.titleAttr = "Title";
    Object.defineProperty(bc,"TitleAttr",{
        get:function () {
            return bc.titleAttr;
        },
        set:function (v) {
            bc.titleAttr = v;
        }
    });


    //颜色组合
    bc.colorScheme = {
        default:['#7cb5ec','#90ed7d','#f7a35c','#8085e9','#f15c80','#e4d354','#2b908f','#f45b5b','#91e8e1','#434348'],
        afterMoon:['#E03636','#EDD0BE','#FF534D','#EDD0BE','#25C6FC','#EDE387','#EDEDED','#3B200C','#DE8100','#CCFC62'],
        forest:['#82A6F5','#EAF048','#9FF048','#2A5200','#F6D6FF','#EACF02','#6C890B','#ABC327','#DFB5B7','#7F1874'],
        quietDay:['#56A36C','#5E8579','#77C34F','#2E68AA','#7E884F','#FFE957','#F29F3F','#F2753F','#E87E51','#DE8C68'],
        business:['#0E2352','#5579ED','#E8CD56','#9C6628','#0C175C','#B4145E','#35081D','#214579','#F7C482','#EFECC1']
    }

    //
    bc.colorSerie = "default";
    Object.defineProperty(bc,"ColorSerie",{
        get:function () {
            return bc.colorSerie;
        },
        set:function (v) {
            bc.colorSerie = v;
        }
    });

    /**
     * 为SVG元素设置属性
     * @param elem svg元素
     * @param attrs {object} 属性和值
     */
    bc.SetAttr = function (elem,attrs) {

        if(typeof attrs != "object"){
            return;
        }
        Object.keys(attrs).forEach(function (key) {
            elem.setAttribute(key,attrs[key]);
        })
    }


    /**
     * 对象集合进行分组
     * @param array 进行分组的数据集合
     * @param f     分组回调函数 返回值为分组的依据
     * @returns {any[]}
     * @constructor
     */
    bc.GroupBy = function(array, f){
        // debugger;
        var groups = {};
        array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });

        return Object.keys(groups).map(function (group) {
            return groups[group];
        });
    }

    //默认宽高
    bc.chartH = 150;
    bc.chartW = 300;

    /**
     * 显示无数据的提示信息
     * @param t 提示信息的内容 字符串 不传则为"暂无数据"
     * @constructor
     */
    bc.NoDataTip = function (t) {
        var tip = document.createElementNS(bc.SVG_NS,'text');
        tip.textContent = t||'暂无数据';

        if(bc.svg.childNodes.length>=1){
            bc.svg.removeChild(bc.svg.childNodes[0]);
        }

        bc.svg.appendChild(tip);
        bc.SetAttr(tip,{
            'x':bc.chartW*0.5,
            'y':bc.chartH*0.5,
            'fill':'#D4D4D4',
            'dominant-baseline':'hanging',
            'font-size':bc.titleFontSize,
            'font-family':bc.titleFontFamily,
            'letter-spacing':3,
            "text-anchor":"middle"
        });
    }

    /**==================================平台属性配置start=======================================================*/
    bc.SetHeight = function (v) {
        //20191219
        bc.VisualElement.style.height = v;
        var cssObj = window.getComputedStyle(bc.VisualElement,null);
        var h = cssObj.height;

        bc.chartH = parseFloat(h);
        bc.svg.setAttribute("height",h);
        //绘制图表
        bc.Draw(bc.itemSource);
    }

    bc.SetWidth = function (v) {

        bc.VisualElement.style.width = v;
        var cssObj = window.getComputedStyle(bc.VisualElement,null);
        var w = cssObj.width;
        bc.chartW = parseFloat(w);
        // c.VisualElement.style.width = v;
        bc.svg.setAttribute("width",w);

        //绘制图表
        bc.Draw(bc.itemSource);

    }
    /**=======================================平台属性配置end===================================================*/

    bc.OnCreateHandle();
    return bc;
}

/************************** 20191224-绘制漏斗图表 *****************************/
DBFX.Web.DBChart.FunnelledChart = function () {
    var fc = new DBFX.Web.DBChart.BaseChart("FunnelledChart");
    fc.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.FunnelledChartDesigner");
    fc.ClassDescriptor.Serializer = "DBFX.Serializer.FunnelledChartSerializer";

    fc.OnCreateHandle();
    fc.OnCreateHandle = function () {
    }


    /**绘制图表*/
    fc.Draw = function (data) {
        if(!(Array.isArray(data) && data.length >= 2)){
            fc.NoDataTip();
            return;
        }
        var datas = data.slice();
        //数据根据value值降序排列
        datas.sort(function (a, b) { return b[fc.valueAttr] - a[fc.valueAttr] });

        var colors = fc.colorScheme[fc.ColorSerie];

        /**TODO:规划绘制区域
         * 1、倒梯形，最大宽度为整个控件60%；左右分别留20%绘制标题和图例
         * 2、上下留白各5%，每一块间隔3
         *
         * */

        //总数据量
        var len = datas.length;
        //上下留白高度
        var marginTB= fc.chartH*0.05;
        //每块上下间隔
        var marginH = 3;

        var topLineW = fc.chartW*0.6;
        var lw = topLineW;

        //每个图形的高度
        var perH = (fc.chartH-marginTB*2-(len-2)*marginH)/(len-1);

        var preV = datas[0][fc.valueAttr];
        var topL = [fc.chartW*0.2,marginTB];
        var topR = [fc.chartW*0.2 + topLineW,marginTB];


        /**1、保存绘制各个矩形的数据*/
        var polys = [];

        /**2、保存各个数据绘制的中间点坐标centerPoints*/
        var cPoints = [];
        cPoints.push([fc.chartW*0.5,topL[1]]);
        /**3、保存绘制右侧标识的起始点坐标rightPoints*/
        var rightPoints = [];
        rightPoints.push([topR[0]+5,topR[1]]);


        /**4、保存绘制左侧转化率的终点坐标leftPoints*/
        var leftPoints = [];

        var rates = [];


        //TODO:计算所有的绘制数据
        for(var i=1;i<len;i++){

            var rate = datas[i][fc.valueAttr]/preV;
            //计算当前矩形下边的长度
            lw = rate*lw;
            //计算当前梯形上边的长度
            topLineW = topR[0]-topL[0];

            //前一个梯形的底部两个点
            var bottomR = [topR[0]-(topLineW-lw)*0.5,topR[1]+perH];
            var bottomL = [topL[0]+(topLineW-lw)*0.5,topL[1]+perH];

            /**1.绘制矩形的数据*/
            var poly = ""+topL[0]+","+topL[1]+","+topR[0]+","+topR[1]+","+bottomR[0]+","+bottomR[1]+","+bottomL[0]+","+bottomL[1];
            polys.push(poly);

            /**2、数据绘制中心点坐标集合*/
            cPoints.push([fc.chartW*0.5,bottomR[1]]);

            /**3、绘制右侧标识的起始点坐标*/
            rightPoints.push([bottomR[0]+5,bottomR[1]]);

            /**4、绘制左侧转化率的终点坐标*/
            leftPoints.push([(topL[0]+bottomL[0])*0.5,(topL[1]+bottomL[1])*0.5]);
            rates.push(Math.round(rate*100)+"%");


            //计算梯形四个点坐标 左上开始--顺时针
            //当前梯形的上部两个点
            topL = [bottomL[0],bottomL[1]+marginH];
            topR = [bottomR[0],bottomR[1]+marginH];

            preV = datas[i][fc.valueAttr];
        }


        // c.svg.innerHTML = '';
        //!!!清空svg下所有子元素后再绘制，防止图表重叠绘制
        if(fc.svg.childNodes.length){
            //TODO:
            fc.svg.textContent = '';
        }

        //转化率g
        var rateG = document.createElementNS(fc.SVG_NS,'g');
        fc.svg.appendChild(rateG);
        /**1、绘制多边形*/
        /**4、绘制左侧转化率*/
        polys.forEach(function (value,i) {
            // 绘制多边形
            var poly = document.createElementNS(fc.SVG_NS,'polygon');
            fc.svg.appendChild(poly);
            fc.SetAttr(poly,{
                "points":value,
                "fill":colors[i]
            });

            //绘制左侧转化率
            var text = document.createElementNS(fc.SVG_NS,'text');
            rateG.appendChild(text);
            text.textContent = "转化率"+rates[i];
            fc.SetAttr(text,{
                "font-size":12,
                // "x":leftPoints[i][0]-8, //右侧贴近梯形绘制
                'x':0,
                'y':leftPoints[i][1],
                'fill':"#3c3c3c",
                'text-anchor':'start',
                'letter-spacing':1,
                'dominant-baseline':"middle"
            });

        })


        /**2、绘制数据显示*/
        /**3、绘制右侧标识*/
            //绘制数据显示
        var textG = document.createElementNS(fc.SVG_NS,'g');
        //绘制标识显示
        var labelG = document.createElementNS(fc.SVG_NS,'g');
        fc.svg.appendChild(textG);
        fc.svg.appendChild(labelG);
        cPoints.forEach(function (point,i) {
            // 绘制数据显示
            var text = document.createElementNS(fc.SVG_NS,'text');
            textG.appendChild(text);
            text.textContent = datas[i][fc.valueAttr];
            fc.SetAttr(text,{
                "font-size":12,
                "x":point[0],
                'y':point[1]+12,
                'fill':"white",
                'text-anchor':'middle',
                'letter-spacing':1,
                'dominant-baseline':"middle"
            });

            //绘制右侧标识
            var label = document.createElementNS(fc.SVG_NS,'text');
            labelG.appendChild(label);
            label.textContent = datas[i][fc.titleAttr];
            fc.SetAttr(label,{
                "font-size":12,
                // "x":rightPoints[i][0],
                "x":fc.chartW,
                'y':rightPoints[i][1],
                'fill':"#3c3c3c",
                'text-anchor':'middle',
                'letter-spacing':1,
                'dominant-baseline':"middle"
            });

        });

        //获取标识文字绘制后的宽度
        var rateGBox = rateG.getBBox();
        var labelGBox = labelG.getBBox();

        var rateGW = rateGBox.width;
        var labelGW = labelGBox.width;

        rateG.setAttribute("transform","translate("+10+","+0+")");
        labelG.setAttribute("transform","translate("+(-labelGW*0.5-5)+","+0+")");

        //绘制标示线
        var leftLineG = document.createElementNS(fc.SVG_NS,'g');
        fc.svg.appendChild(leftLineG);
        leftPoints.forEach(function (p) {
            var line = document.createElementNS(fc.SVG_NS,'line');
            leftLineG.appendChild(line);
            fc.SetAttr(line,{
                'stroke':"#8d8d8d",
                'stroke-width':1.5,
                'x1':10+rateGW,
                'y1':p[1],
                'x2':p[0]-2,
                'y2':p[1]
            });
        })

        var rightLineG = document.createElementNS(fc.SVG_NS,'g');
        fc.svg.appendChild(rightLineG);
        rightPoints.forEach(function (p) {
            var line = document.createElementNS(fc.SVG_NS,'line');
            rightLineG.appendChild(line);
            fc.SetAttr(line,{
                'stroke':"#8d8d8d",
                'stroke-width':1.5,
                'x1':fc.chartW-labelGW-5,
                'y1':p[1],
                'x2':p[0],
                'y2':p[1]
            });
        })


    }

    fc.OnCreateHandle();
    return fc;
}
DBFX.Design.ControlDesigners.FunnelledChartDesigner = function () {
    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/FunnelledChartDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;
            //是否显示标题设计器设置项
            // od.FormContext.Form.FormControls.cbxIsShowTitle.ItemSource =    [{Text:"显示",Value:true,ImageUrl:""},
            //                                                 {Text:"不显示",Value:false,ImageUrl:""}];

            //设计器中绑定事件处理
            // od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            // od.EventListBox.ItemSource = [{EventName:"CutlineClick",EventCode:undefined,Command:od.dataContext.CutlineClick,Control:od.dataContext}];

        }, obdc);
    }

    //事件处理程序
    obdc.DataContextChanged = function (e) {
        obdc.DataBind(e);
        // if(obdc.EventListBox != undefined){
        //     obdc.EventListBox.ItemSource = [{EventName:"CutlineClick",EventCode:undefined,Command:obdc.dataContext.CutlineClick,Control:obdc.dataContext}];
        // }
    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "漏斗图表设置";
    return obdc;

}
DBFX.Serializer.FunnelledChartSerializer = function () {
    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        DBFX.Serializer.DeSerialProperty("ClassBy", c, xe);
        DBFX.Serializer.DeSerialProperty("ValueAttr", c, xe);
        DBFX.Serializer.DeSerialProperty("TitleAttr", c, xe);
        DBFX.Serializer.DeSerialProperty("ColorSerie", c, xe);

        // DBFX.Serializer.DeSerializeCommand("CutlineClick", xe, c);
    }

    //系列化 开发平台保存设置时调用
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("ClassBy", c.ClassBy, xe);
        DBFX.Serializer.SerialProperty("ValueAttr", c.ValueAttr, xe);
        DBFX.Serializer.SerialProperty("TitleAttr", c.TitleAttr, xe);
        DBFX.Serializer.SerialProperty("ColorSerie", c.ColorSerie, xe);

        // DBFX.Serializer.SerializeCommand("CutlineClick", c.CutlineClick, xe);
    }
}


/************************** 20191224-绘制面积图表 *****************************/
DBFX.Web.DBChart.AreaChart = function () {
    var ac = new DBFX.Web.DBChart.BaseChart("AreaChart");
    ac.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.AreaChartDesigner");
    ac.ClassDescriptor.Serializer = "DBFX.Serializer.AreaChartSerializer";

    ac.OnCreateHandle();
    ac.OnCreateHandle = function () {

    }

    //分类属性
    ac.classBy = "";
    Object.defineProperty(ac,"ClassBy",{
        get:function () {
            return ac.classBy;
        },
        set:function (v) {
            ac.classBy = v;
        }
    });

    //面积填充颜色
    ac.fillC = "#b0c4de";
    Object.defineProperty(ac,"FillC",{
        get:function () {
            return ac.fillC;
        },
        set:function (v) {
            ac.fillC = v;
        }
    });

    //填充区域透明度
    ac.fillOpacity = "0.6";
    Object.defineProperty(ac,"FillOpacity",{
        get:function () {
            return ac.fillOpacity;
        },
        set:function (v) {
            ac.fillOpacity = v;
        }
    });



    /**绘制 */
    ac.Draw = function (datas) {
        if(!(Array.isArray(datas)&&datas.length>0))return;

        // c.svg.innerHTML = '';
        //!!!清空svg下所有子元素后再绘制，防止图表重叠绘制
        if(ac.svg.childNodes.length){
            ac.svg.textContent = '';
        }
        var len = datas.length;

        //所有数据总和
        var totalCount = 0;
        var vArr = [];
        datas.forEach(function (v) {
            totalCount += Math.abs(v[ac.valueAttr]);
            vArr.push(v[ac.valueAttr]);
        });
        //20191129-数据的绝对值总和等于零时 不绘制
        if(isNaN(totalCount)||totalCount<=0){
            ac.NoDataTip("暂无数据");
            return;
        }
        //最大值和最小值
        var minV = Math.min.apply(null,vArr),
            maxV = Math.max.apply(null,vArr);


        //TODO:通过给定的字段进行分组 绘制多个面积图时
        var arrs = ac.GroupBy(datas,function (item) {
            return [item[ac.classBy]];
        })


        /**绘制一个折线面积图 */
        if(arrs.length==1){
            //将图表横向均分12份  左右各一份分别绘制纵坐标值和右侧留白 中间10份用于绘制图表
            //均分值
            var xPerMargin = ac.chartW/12;

            var maginV = maxV - minV,
                // x_margin = c.chartW/(row+2),
                x_margin = len-1<=0?xPerMargin:xPerMargin*10/(len-1),//20190716:只有一个数据时 避免计算结果出现NaN
                y_margin = ac.chartH/15;//y坐标分成15等分


            //通过最大值均分坐标系
            //最大数值的整数部分位数
            var n = Math.ceil(maxV).toString().length;
            var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);
            //假设最大值占y方向上9份，则每份代表的数值
            var perValue_y = (maxAxesV/10).toFixed(2);

            //绘制坐标轴
            var gAxes = document.createElementNS(ac.SVG_NS,'g');
            ac.svg.appendChild(gAxes);

            var start_x = Math.floor(xPerMargin)+0.5,
                end_x = Math.floor(xPerMargin*11)+0.5;

            //FIXME:先绘制横坐标文字图例 然后计算出面积图所在的区域高度
            var leanA = 0;
            if(len == 1){//FIXME:只有一组数据时  图例不倾斜
                leanA = 0;
            }else{
                leanA = 30;
            }

            //TODO：绘制图例
            //绘制图例绘制
            var cutline_g = document.createElementNS(ac.SVG_NS,'g');
            ac.svg.appendChild(cutline_g);
            for(var z=0;z<len;z++){
                var titleT = document.createElementNS(ac.SVG_NS,'text');
                cutline_g.appendChild(titleT);
                titleT.textContent = datas[z]["Title"];
                ac.SetAttr(titleT,{
                    "x":x_margin*z+xPerMargin,
                    "y":0,
                    "fill":"#3c3c3c",
                    "font-size":10,
                    "transform":"rotate(-30,"+(x_margin*z+xPerMargin)+","+0+")",
                    "text-anchor":"end"
                });
            }

            //计算图例所占的高度
            var bBox = cutline_g.getBBox();
            var cutlineW = bBox.width;
            var cutlineH = bBox.height;

            //图例进行下移
            cutline_g.setAttribute("transform","translate("+0+","+(ac.chartH-cutlineH)+") ");
            //计算图表所占的高度
            y_margin = (ac.chartH-cutlineH-10)/12;

            //绘制6条水平线
            for(var k=0;k<=5;k++){

                var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                    end_y = Math.floor(y_margin*2*(k+1))+0.5;

                //坐标
                var xAxes = document.createElementNS(ac.SVG_NS,'path');
                gAxes.appendChild(xAxes);
                var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

                ac.SetAttr(xAxes,{
                    'd':pathV,
                    'stroke':'#c2c2c2',
                    'stroke-width':0.5
                });

                //单位标记数值
                var markText = document.createElementNS(ac.SVG_NS,'text');
                gAxes.appendChild(markText);
                markText.textContent = perValue_y*10000*(10-2*k)/10000;
                ac.SetAttr(markText,{
                    'font-size':10,
                    // 'font-family':ac.titleFontFamily,
                    'fill':"#666",
                    "x":Math.floor(xPerMargin*0.6)+0.5,
                    "y":start_y,
                    "text-anchor":"middle",
                    'dominant-baseline':"middle"
                    // 'letter-spacing':c.labelLetterSpacing
                });
            }

            //TODO:计算折线上所有点坐标
            var allPoints = [];

            //绘制折线图
            var linePath = '';
            //曲线图
            var bethelPath = '';

            //折线上的点
            var pointsG = document.createElementNS(ac.SVG_NS,'g');
            ac.svg.appendChild(pointsG);

            //计算绘制的折线 折线上的点
            for(var i=0;i<len;i++){
                var point_x = x_margin*i+xPerMargin;
                var point_y = Math.floor(y_margin*12)+0.5-datas[i][ac.valueAttr]/perValue_y*y_margin;
                var p = {"x":point_x,"y":point_y};
                allPoints.push(p);

                /**绘制线上的点*/
                var path_point = document.createElementNS(ac.SVG_NS,'circle');
                pointsG.appendChild(path_point);
                ac.SetAttr(path_point,{
                    'cx':point_x,
                    'cy':point_y,
                    'r':1.5,
                    'stroke':"none",
                    'fill':'#b0c4de'

                })

                /**绘制x轴线上的点*/
                var x_point = document.createElementNS(ac.SVG_NS,'circle');
                pointsG.appendChild(x_point);
                ac.SetAttr(x_point,{
                    'cx':point_x,
                    'cy':Math.floor(y_margin*12)+0.5,
                    'r':1.5,
                    'stroke':"none",
                    'fill':'#3c3c3c'
                });


                var nextPoint_x = i<len-1 ? x_margin*(i+1)+xPerMargin:undefined,
                    nextPoint_y = i<len-1 ? Math.floor(y_margin*12)+0.5-datas[i+1][ac.valueAttr]/perValue_y*y_margin:undefined;

                if(i==0){
                    linePath = 'M'+ point_x +' '+ point_y;
                    bethelPath = 'M'+ point_x +' '+ point_y+'C' + Math.abs((nextPoint_x+point_x)*0.5)+','+point_y+' '+Math.abs((nextPoint_x+point_x)*0.5)+','+nextPoint_y+' '+nextPoint_x+
                        ','+nextPoint_y;
                }else {
                    linePath += "L"+point_x+' '+point_y;
                    if(i<len-1){
                        bethelPath += 'C' + Math.abs((nextPoint_x+point_x)*0.5)+','+point_y+' '+Math.abs((nextPoint_x+point_x)*0.5)+','+nextPoint_y+' '+nextPoint_x+
                            ','+nextPoint_y;
                    }
                }
            }


            //绘制区域
            var lineGraph = document.createElementNS(ac.SVG_NS,'path');
            ac.svg.appendChild(lineGraph);

            var point_y = Math.floor(y_margin*12)+0.5;
            /**折线*/
            linePath = linePath+"L"+allPoints[len-1].x+" "+point_y+"L"+allPoints[0].x+" "+point_y;
            /**波浪线*/
            bethelPath = bethelPath+"L"+allPoints[len-1].x+" "+point_y+"L"+allPoints[0].x+" "+point_y;

            ac.SetAttr(lineGraph,{
                'd':linePath,
                'fill':ac.FillC||"#b0c4de",
                // 'stroke':'#666666',
                "opacity":ac.FillOpacity||0.618,
                'stroke-width':1
            });

        }


    }

    ac.OnCreateHandle();
    return ac;
}
DBFX.Design.ControlDesigners.AreaChartDesigner = function () {
    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/AreaChartDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            //是否显示标题设计器设置项
            // od.FormContext.Form.FormControls.cbxIsShowTitle.ItemSource =    [{Text:"显示",Value:true,ImageUrl:""},
            //                                                 {Text:"不显示",Value:false,ImageUrl:""}];

            //设计器中绑定事件处理
            // od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            // od.EventListBox.ItemSource = [{EventName:"CutlineClick",EventCode:undefined,Command:od.dataContext.CutlineClick,Control:od.dataContext}];

        }, obdc);
    }

    //事件处理程序
    obdc.DataContextChanged = function (e) {
        obdc.DataBind(e);
        // if(obdc.EventListBox != undefined){
        //     obdc.EventListBox.ItemSource = [{EventName:"CutlineClick",EventCode:undefined,Command:obdc.dataContext.CutlineClick,Control:obdc.dataContext}];
        // }
    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "面积图表设置";
    return obdc;

}
DBFX.Serializer.AreaChartSerializer = function () {
    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        DBFX.Serializer.DeSerialProperty("ClassBy", c, xe);
        DBFX.Serializer.DeSerialProperty("ValueAttr", c, xe);
        DBFX.Serializer.DeSerialProperty("TitleAttr", c, xe);
        DBFX.Serializer.DeSerialProperty("FillOpacity", c, xe);
        DBFX.Serializer.DeSerialProperty("FillC", c, xe);

        // DBFX.Serializer.DeSerializeCommand("CutlineClick", xe, c);
    }

    //系列化 开发平台保存设置时调用
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("ClassBy", c.ClassBy, xe);
        DBFX.Serializer.SerialProperty("ValueAttr", c.ValueAttr, xe);
        DBFX.Serializer.SerialProperty("TitleAttr", c.TitleAttr, xe);
        DBFX.Serializer.SerialProperty("FillOpacity", c.FillOpacity, xe);
        DBFX.Serializer.SerialProperty("FillC", c.FillC, xe);

        // DBFX.Serializer.SerializeCommand("CutlineClick", c.CutlineClick, xe);
    }
}