DBFX.RegisterNamespace("DBFX.Web.DBChart");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");

//图表类
DBFX.Web.DBChart.Charts = function () {

    var c = DBFX.Web.Controls.Control("Charts");

    c.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ChartsDesigner");
    c.ClassDescriptor.Serializer = "DBFX.Serializer.ChartsSerializer";

    c.SVG_NS = 'http://www.w3.org/2000/svg';
    // c.doc = window.document;

    c.svg = document.createElementNS(c.SVG_NS,'svg');//.createSVGRect;
    c.svg.setAttribute('width','100%');
    c.svg.setAttribute('height','100%');

    c.VisualElement = document.createElement("DIV");
    c.VisualElement.appendChild(c.svg);
    c.DrawPaper = c.svg;
    c.OnCreateHandle();

    c.svg.allowDrop = true;

    c.svg.ondragover = function (e) {

        var ve = e.currentTarget;
        if (ve.allowDrop && c.svg == ve) {
            e.preventDefault();
        }

    }

    c.svg.ondrop = function (e) {

        e.preventDefault();
        try {
            var tkitem = DBFX.Web.Controls.Context.DragObject;
            var chart = DBFX.Design.DesignView.CreateControlInstance(tkitem);
            chart.chartW = 800;
            chart.screen = 400;

        }
        catch (ex) {
            alert(ex);
        }

    }

    //TODO:图表边界！！测试时打开注释
    // c.VisualElement.style.borderColor = 'aqua';
    // c.VisualElement.style.borderStyle = 'solid';
    // c.VisualElement.style.borderWidth = '1px';

    //通过正则表达式判断是否为手机端运行
    c.isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

    c.x_scale = 1;
    c.y_scale = 1;
    c.t_scale = 1;

    c.SetHeight = function (v) {
        c.chartH = parseInt(v);

        c.x_scale = 800/c.chartW;
        c.y_scale = 500/c.chartH;


        if(c.x_scale > c.y_scale){//宽度上缩放的比例大  按宽度缩放比例缩放
            c.t_scale = c.x_scale;
        }else {//高度上缩放的比例大  按高度缩放比例缩放
            c.t_scale = c.y_scale;
        }

        c.VisualElement.style.height = v;
        c.svg.setAttribute("height",v);
        // c.svg.setAttribute('viewBox','0,0,800,500');

        c.setCenter();
        c.createChart(c.chartType);
    }

    c.SetWidth = function (v) {
        c.chartW = parseInt(v);

        c.x_scale = 800/c.chartW;
        c.y_scale = 500/c.chartH;


        if(c.x_scale > c.y_scale){//宽度上缩放的比例大  按宽度缩放比例缩放
            c.t_scale = c.x_scale;
        }else {//高度上缩放的比例大  按高度缩放比例缩放
            c.t_scale = c.y_scale;
        }

        c.VisualElement.style.width = v;
        c.svg.setAttribute("width",v);
        // c.svg.setAttribute('viewBox','0,0,800,500');

        c.setCenter();
        c.createChart(c.chartType);
    }


    c.svgrender = new DBFX.Web.DBChart.SVGRender(c);
    c.deg2rad = Math.PI *2 /360;
    c.rad2deg = 1/c.deg2rad;

    //配置参数对象
    c.configs = {
        "datas":[
            {date:"2018-02-24",values:[{value:10},{value:20},{value:30},{value:40}]},
            {date:"2018-02-25",values:[{value:28400},{value:12600},{value:22524},{value:6522}]},
            {date:"2018-02-26",values:[{value:54400},{value:15600},{value:18524},{value:7822}]},
            {date:"2018-02-27",values:[{value:38400},{value:17600},{value:25524},{value:10122}]}
        ],
        "labels": ["图例1","图例2","图例3","图例4"]
    };
    Object.defineProperty(c,"Configs",{
        get:function () {
            return c.configs;
        },
        set:function (v) {
            c.configs = v;
            c.createChart(c.chartType);
        }
    });


    //TODO:为了饭口使用饼状图方便 添加一个赋值属性 labels:需要展示的类别;datas:各类别对应的数值；
    c.datas = {datas:[],labels:[]};
    Object.defineProperty(c,"Datas",{
        get:function () {
            return c.datas;
        },
        set:function (d) {

            if(d.values && d.labels){
                var labels = [],
                    values = [],
                    data = {};

                for(var i=0;i<d.values.length;i++){
                    var v = {};
                    v.value = d.values[i];
                    values.push(v);
                }
                data.values = values;

                c.datas.datas.push(data);
                c.datas.labels = d.labels;
                c.Configs = c.datas;
            }
        }
    });

    c.handelDatas = function () {


        // var arr = [{dishName:"排骨豆角",dishQty:8},{dishName:"餐位费",dishQty:6},{dishName:"土豆",dishQty:1}];
        //
        // var values = [];
        // var config = {datas:[],labels:[]};
        // var data = {date:'',values:[]};
        // var labels = [];
        //
        //
        //
        // for(var i=0;i<arr.length;i++){
        //    var dish = {};
        //    config.labels.push(arr[i].dishName);
        //    dish.value = arr[i].dishQty;
        //    values.push(dish);
        // }
        //
        // // console.log(values);
        // data.values = values;
        // config.datas.push(data);


    }



    //保存被点击的扇形区域对应的数据 默认保存第0组数据
    c.clickedDataContext = new Object();

    //保存所有的图表类型
    c.chartTypes = ['pie','pie3D','bar','bar3D','multiBar','multiBar3D','line','multiLine','wavy','multiWavy'];

    //配色系列
    //1.默认
    //['#7cb5ec','#434348','#90ed7d','#f7a35c','#8085e9','#f15c80','#e4d354','#2b908f','#f45b5b','#91e8e1']
    // 2.午后
    //['#E03636','#EDD0BE','#FF534D','#EDD0BE','#25C6FC','#EDE387','#EDEDED','#3B200C','#DE8100','#CCFC62']
    // 3.森林
    //['#82A6F5','#EAF048','#9FF048','#2A5200','#F6D6FF','#EACF02','#6C890B','#ABC327','#DFB5B7','#7F1874']
    // 4.安静一天
    //['#56A36C','#5E8579','#77C34F','#2E68AA','#7E884F','#FFE957','#F29F3F','#F2753F','#E87E51','#DE8C68']
    // 5.商务
    //['#0E2352','#5579ED','#E8CD56','#9C6628','#0C175C','#B4145E','#35081D','#214579','#F7C482','#EFECC1']


    //颜色组合
    c.colorScheme = {
        default:['#7cb5ec','#90ed7d','#f7a35c','#8085e9','#f15c80','#e4d354','#2b908f','#f45b5b','#91e8e1','#434348'],
        afterMoon:['#E03636','#EDD0BE','#FF534D','#EDD0BE','#25C6FC','#EDE387','#EDEDED','#3B200C','#DE8100','#CCFC62'],
        forest:['#82A6F5','#EAF048','#9FF048','#2A5200','#F6D6FF','#EACF02','#6C890B','#ABC327','#DFB5B7','#7F1874'],
        quietDay:['#56A36C','#5E8579','#77C34F','#2E68AA','#7E884F','#FFE957','#F29F3F','#F2753F','#E87E51','#DE8C68'],
        business:['#0E2352','#5579ED','#E8CD56','#9C6628','#0C175C','#B4145E','#35081D','#214579','#F7C482','#EFECC1']
    }

    //TODO:
    c.colorSerie = "default";
    Object.defineProperty(c,"ColorSerie",{
        get:function () {
            return c.colorSerie;
        },
        set:function (v) {
            c.colorSerie = v;
        }
    });

    //默认的颜色系列
    c.colorSeries = c.colorScheme[c.colorSerie];
    Object.defineProperty(c,"ColorSeries",{
        get:function () {
            return c.colorSeries;
        },
        set:function (v) {
            if(!Array.isArray(v)){
                v = eval(v);
            }
            c.colorSeries = v;
        }
    });

    //图表显示的宽度和高度
    c.chartW = 240;
    // Object.defineProperty(c,"ChartW",{
    //     get:function () {
    //         return c.chartW;
    //     },
    //     set:function (v) {
    //         c.chartW = v;
    //         c.VisualElement.style.width = v+'px';
    //         c.svg.setAttribute('viewBox','0,0,800,500');
    //     }
    // });

    c.chartH = 150;
    // Object.defineProperty(c,"ChartH",{
    //     get:function () {
    //         return c.chartH;
    //     },
    //     set:function (v) {
    //         c.chartH = v;
    //         c.VisualElement.style.height = v+'px';
    //         c.svg.setAttribute('viewBox','0,0,800,500');
    //     }
    // });

    /**
     *设置图表类型
     * @type {string}
     */
    c.chartType = 'pie';
    Object.defineProperty(c,"ChartType",{
        get:function () {
            return c.chartType;
        },
        set:function (v) {
            if(c.chartTypes.indexOf(v) != -1){//判断设置的是否为合法的图表类型
                c.chartType = v;//合法的设置值保存下来
            }else {
                c.chartType = 'pie';
            }
            c.createChart(c.chartType);
        }
    });

    /**
     * 饼状图的内环半径
     * @type {number}
     */
    c.insideR = 0;
    Object.defineProperty(c,"InsideR",{
        get:function () {
            return c.insideR;
        },
        set:function (v) {
            if(v<c.chartH*0.35){
                c.insideR = v;
            }else {
                c.insideR = 0;
            }

        }
    });


    /**
     * 设置图表标题
     * @type {string}
     */
    c.chartTitle = '图表标题';
    Object.defineProperty(c,"ChartTitle",{
        get:function () {
            return c.chartTitle;
        },
        set:function (v) {
            c.chartTitle = v;
            c.createChart(c.chartType);
        }
    });


    /**
     * 设置标题颜色
     * @type {string}
     */
    c.titleColor = '#636368';
    Object.defineProperty(c,"TitleColor",{
        get:function () {
            return c.titleColor;
        },
        set:function (v) {
            c.titleColor = v;
        }
    });


    /**
     * 设置标题字体大小
     * @type {number}
     */
    c.titleFontSize = 16;
    Object.defineProperty(c,"TitleFontSize",{
        get:function () {
            return c.titleFontSize;
        },
        set:function (v) {
            c.titleFontSize = v;
        }
    });


    /**
     * 设置标题字体
     * @type {string}
     * 微软雅黑:Microsoft Yahei/宋体：SimSun/黑体:SimHei/楷体:KaiTi/微软正黑体:Microsoft JhengHei
     * 新宋体:NSimSun/仿宋:FangSong/苹方:PingFang SC/华文楷体:STKaiti/华文行楷:STXingkai/华文隶书:STLiti
     */
    c.titleFontFamily = "PingFang SC";
    Object.defineProperty(c,"TitleFontFamily",{
        get:function () {
            return c.titleFontFamily;
        },
        set:function (v) {
            c.titleFontFamily = v;
        }
    });


    /**
     * 是否显示图表标题
     * @type {boolean}
     */
    c.isShowTitle = false;
    Object.defineProperty(c,"IsShowTitle",{
        get:function () {
            return c.isShowTitle;
        },
        set:function (v) {
            c.isShowTitle = v;
        }
    });

    //TODO:是否显示图例
    c.isShowCutline = true;
    Object.defineProperty(c,"IsShowCutline",{
        get:function () {
            return c.isShowCutline;
        },
        set:function (v) {
            c.isShowCutline = v;
        }
    });

    //图例显示的位置 right/down 默认undefined
    c.cutlinePos = undefined;


    /**
     * 有内圆的扇形图表 是否显示内圆 默认不显示
     * @type {boolean}
     */
    c.isShowInsideC = false;
    Object.defineProperty(c,"IsShowInsideC",{
        get:function () {
            return c.isShowInsideC;
        },
        set:function (v) {
            c.isShowInsideC = v;
        }
    });

    c.insideCTitle = '标题';
    Object.defineProperty(c,"InsideCTitle",{
        get:function () {
            return c.insideCTitle;
        },
        set:function (v) {
            c.insideCTitle = v;
        }
    });

    c.insideCValue = '99.99';
    Object.defineProperty(c,"InsideCValue",{
        get:function () {
            return c.insideCValue;
        },
        set:function (v) {
            c.insideCValue = v;
        }
    });

    c.insideCImageURL = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522139851306&di=5480db34fad84e29005c91942afac90b&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F41%2F98%2F65G58PICtUm_1024.png';
    Object.defineProperty(c,"InsideCImageURL",{
        get:function () {
            return c.insideCImageURL;
        },
        set:function (v) {
            c.insideCImageURL = v;
        }
    });

    //配置参数
    c.option3d = {
        depth:100,
        alpha:0,
        beta:-1,
        viewDistance:25,
        inverted:true
    };
    Object.defineProperty(c,"Option3d",{
        get:function () {
            return c.option3d;
        },
        set:function (v) {
            c.option3d = v;
        }
    });

    //TODO:标识文字 横纵坐标文字 设置
    c.labelLetterSpacing = -1;


    //提示框
    c.tip = new DBFX.Web.DBChart.TipLabel();


    //记录鼠标移动时的前一次坐标值
    c.preOffsetX = 0;
    c.preOffsetY = 0;

    //对于平面饼图 交互时外移的距离
    c.pieTransDis = c.chartH*0.05;

    /**
     * 通过图表类型创建相应的图表
     * @param type
     */
    c.createChart = function (type) {

        // c.svg.innerHTML = '';
        //!!!清空svg下所有子元素后再绘制，防止图表重叠绘制
        if(c.svg.childNodes.length){
            //TODO:
            c.svg.textContent = '';
        }

        var count=0;
        if(type=="pie" || type=='pie3D' || type=='line' || type=='bar' || type=='wavy'){
            var values = c.configs.datas[0].values;
            for(var j=0;j<values.length;j++){
                var value = values[j].value;
                count += value;
            }
        }else {
            for(var i=0;i<c.configs.datas.length;i++){
                var values = c.configs.datas[i].values;
                for(var j=0;j<values.length;j++){
                    var value = values[j].value;
                    count += value;
                }
            }
        }


        if(count == 0 || isNaN(count) || typeof(count) == 'string' ){
            c.createNoDataTip();
            return;
        }


        c.colorSeries = c.colorScheme[c.colorSerie];
        //通过图表类型创建相应的图表
        switch (type){
            case 'pie'://绘制平面饼图
                c.drawPie(c.configs);
                break;
            case 'pie3D': //绘制3D饼图
                c.drawPie3D(c.configs);
                break;

            case 'bar': //绘制平面柱状图
                c.drawBar(c.configs);
                break;
            case 'bar3D': //绘制3D柱状图
                c.drawBar3D(c.configs);
                break;

            case 'multiBar': //绘制多组柱状图
                c.drawMultiBar(c.configs);
                break;
            case 'multiBar3D': //绘制3D多组柱状图
                c.drawMultiBar3D(c.configs);
                break;
            case 'wavy':
            case 'line': //绘制折线图
                c.drawLineGraph(c.configs);
                break;
            case 'multiWavy':
            case 'multiLine': //绘制多折线图
                c.drawMultiLineGraph(c.configs);
                break;
            default:
                break;
        }
    }

    //没有数据 或者数据综合为NAN时 提示无数据
    c.createNoDataTip = function () {
        var tip = document.createElementNS(c.SVG_NS,'text');
        tip.textContent = '暂无数据';

        if(c.svg.childNodes.length>=1){
            c.svg.removeChild(c.svg.childNodes[0]);
        }

        c.svg.appendChild(tip);

        c.setAttr(tip,{
            'x':c.pieCenterX,
            'y':c.pieCenterY,
            'fill':'#D4D4D4',
            'dominant-baseline':'hanging',
            'font-size':c.titleFontSize,
            'font-family':c.titleFontFamily,
            'letter-spacing':3,
            "text-anchor":"middle"
            // 'transform':"rotate("+rotateA+","+labelX+","+labelY+")"
        });

    }

    //CSS
    c.css = function(el, styles) {
        if (!c.svg) { // #2686
            if (styles && styles.opacity !== undefined) {
                styles.filter = 'alpha(opacity=' + (styles.opacity * 100) + ')';
            }
        }
        c.extend(el.style, styles);
    }

    //是否为字符串
    c.isString = function(s) {
        return typeof s === 'string';
    };

    //是否为数组
    c.isArray = function(obj) {
        var str = Object.prototype.toString.call(obj);
        return str === '[object Array]' || str === '[object Array Iterator]';
    };

    //是否为undefined或者null
    c.defined = function(obj) {
        return obj !== undefined && obj !== null;
    };

    //是否为对象
    c.isObject = function(obj, strict) {
        return !!obj && typeof obj === 'object' && (!strict || !c.isArray(obj));
    };

    c.objectEach = function(obj, fn, ctx) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(ctx, obj[key], key, obj);
            }
        }
    };


    //属性设置
    c.attr = function(elem, prop, value) {
        var ret;

        // if the prop is a string
        if (c.isString(prop)) {
            // set the value
            if (c.defined(value)) {
                elem.setAttribute(prop, value);

                // get the value
            } else if (elem && elem.getAttribute) {
                ret = elem.getAttribute(prop);
            }

            // else if prop is defined, it is a hash of key/value pairs
        } else if (c.defined(prop) && c.isObject(prop)) {
            c.objectEach(prop, function(val, key) {
                elem.setAttribute(key, val);
            });
        }
        return ret;
    };

    c.extend = function(a, b) {
        var n;
        if (!a) {
            a = {};
        }
        for (n in b) {
            a[n] = b[n];
        }
        return a;
    };

    c.createElement = function(tag, attribs, styles, parent, nopad) {

        var doc = c.doc;

        var el = doc.createElement(tag),
            css = c.css;
        if (attribs) {
            c.extend(el, attribs);
        }
        if (nopad) {
            css(el, {
                padding: 0,
                border: 'none',
                margin: 0
            });
        }
        if (styles) {
            css(el, styles);
        }
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }

    c.shapeArea = function(vertexes) {
        var area = 0,
            i,
            j;
        for (i = 0; i < vertexes.length; i++) {
            j = (i + 1) % vertexes.length;
            area += vertexes[i].x * vertexes[j].y - vertexes[j].x * vertexes[i].y;
        }
        return area / 2;
    };

    c.map = function(arr, fn) {
        var results = [],
            i = 0,
            len = arr.length;

        for (; i < len; i++) {
            results[i] = fn.call(arr[i], arr[i], i, arr);
        }
        return results;
    }

    //Return the first value that is not null or undefined.
    c.pick = function() {
        var args = arguments,
            i,
            arg,
            length = args.length;
        for (i = 0; i < length; i++) {
            arg = args[i];
            if (arg !== undefined && arg !== null) {
                return arg;
            }
        }
    };

    c.rotate3D = function(x, y, z, angles) {
        return {
            x: angles.cosB * x - angles.sinB * z,
            y: -angles.sinA * angles.sinB * x + angles.cosA * y - angles.cosB * angles.sinA * z,
            z: angles.cosA * angles.sinB * x + angles.sinA * y + angles.cosA * angles.cosB * z
        };
    }

    c.perspective3D = function(coordinate, origin, distance) {

        var projection = ((distance > 0) && (distance < Number.POSITIVE_INFINITY)) ? distance / (coordinate.z + origin.z + distance) : 1;

        return {
            x: coordinate.x * projection,
            y: coordinate.y * projection
        };
    }

    c.perspective = function(points) {

           var inverted = c.option3d.inverted,
            origin = {
                x: c.chartW/2,
                y: c.chartH/2,
                //TODO:
                z: c.option3d.depth/2,
                vd: c.pick(c.option3d.depth,1)*c.pick(c.option3d.viewDistance,0)
            },
            scale = 1,
            beta = c.deg2rad *c.option3d.beta * (inverted ? -1 : 1),
            alpha = c.deg2rad * c.option3d.alpha* (inverted ? -1 : 1),

            angles = {
                cosA: Math.cos(alpha),
                cosB: Math.cos(-beta),
                sinA: Math.sin(alpha),
                sinB: Math.sin(-beta)
            };


        // if (!insidePlotArea) {
        //     origin.x += chart.plotLeft;
        //     origin.y += chart.plotTop;
        // }

        // Transform each point
        return c.map(points, function(point) {
            var rotated = c.rotate3D(
                (inverted ? point.y : point.x) - origin.x,
                (inverted ? point.x : point.y) - origin.y,
                (point.z || 0) - origin.z,
                angles
                ),
                coordinate = c.perspective3D(rotated, origin, origin.vd); // Apply perspective

            // Apply translation
            coordinate.x = coordinate.x * scale + origin.x;
            coordinate.y = coordinate.y * scale + origin.y;
            coordinate.z = rotated.z * scale + origin.z;

            return {
                x: (inverted ? coordinate.y : coordinate.x),
                y: (inverted ? coordinate.x : coordinate.y),
                z: coordinate.z
            };
        });
    }


    /**
     * 设置图表标题
     */
    c.setTitle = function () {

        var title = c.chartTitle || "图表标题";
        var titleColor = c.titleColor || '#434348';
        //设置标题字体大小
        var fontsize = c.titleFontSize,
            fontfamily = c.titleFontFamily;

        if(!c.isShowTitle){
            return;
        }

        //绘制图表标题
        var gtitle = document.createElementNS(c.SVG_NS,'g');
        var tElement = document.createElementNS(c.SVG_NS,'text');
        gtitle.appendChild(tElement);
        c.svg.appendChild(gtitle);

        tElement.textContent = title;

        c.setAttr(tElement,{
            'font-family':fontfamily,
            'font-size':fontsize,
            'fill':titleColor,
            "x":c.chartW*0.5,
            "y":fontsize*1.5,
            "text-anchor":"middle",
            "width":c.chartW,
            "height":fontsize*1.2
        });

    }


    /**
     * 为SVG元素设置属性
     * @param elem svg元素
     * @param attrs {object} 属性和值
     */
    c.setAttr = function (elem,attrs) {

        if(typeof attrs != "object"){
            return;
        }
        Object.keys(attrs).forEach(function (key) {
            elem.setAttribute(key,attrs[key]);
        })
    }


    /************************** 绘制多组立方图 *****************************/
    //绘制多组立方图
    c.drawMultiBar3D = function (datas) {

        var totalV = datas.datas,
            colors = c.colorSeries,
            labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;

        //数据组数
        var row = totalV.length;
        //每组数据的个数
        var len = totalV[0].values.length;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }
        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        //遍历所有数据找出最大值 均分坐标系

        //新建数组，保存所有数据
        var tarr = [];
        for (var i=0;i<len;i++){
            for (var j=0;j<totalV.length;j++){
                var values = totalV[j].values;
                var value = values[i];
                tarr.push(value.value);
            }
        }

        var tcount = tarr.length;

        var minV = Math.min.apply(null,tarr),
            maxV = Math.max.apply(null,tarr);

        var maginV = maxV - minV,
            x_margin = c.chartW/(tcount+2),
            y_margin = c.chartH/14;//y坐标分成14等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);

        //假设最大值占y方向上10份，则每份代表的数值
        var perValue_y = maxAxesV/10;

        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(x_margin*0.8)+0.5,
            end_x = Math.floor(x_margin*(tcount+1))+0.5;

        for(var k=0;k<=5;k++){

            var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                end_y = Math.floor(y_margin*2*(k+1))+0.5;

            //坐标
            var xAxes = document.createElementNS(c.SVG_NS,'path');
            gAxes.appendChild(xAxes);
            var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

            c.setAttr(xAxes,{
                'd':pathV,
                'stroke':'#f0f0f0',
                'stroke-width':0.5
            });

            //单位标记数值
            var markText = document.createElementNS(c.SVG_NS,'text');
            gAxes.appendChild(markText);
            markText.textContent = perValue_y*10000*(10-2*k)/10000;

            c.setAttr(markText,{
                'font-size':labelFontSize-2,
                'fill':c.titleColor,
                'x':Math.floor(x_margin*0.6)+0.5,
                "y":start_y,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing,
                'transform':"rotate("+(-60)+","+(Math.floor(x_margin*0.6)+0.5)+","+start_y+")"
            });
        }


        /*
        * 计算每个子数据柱状图显示的宽度w
        * 子数据间距为w/3
        * 组与组之间的间距为2w
        * 每组数据所占横坐标的宽度为2w + groupLen * w + (groupLen-1)*w/3
        * (5+4*groupLen)*w/3
        *
        * */
        var aveBarWidth = (x_margin*tcount/row * 3)/(5 + 4*len);


        //多组立方图
        for(var m=0;m<row;m++){
            var values = totalV[m].values;

            for(var n=0;n<len;n++){
                var value = values[n].value;

                var shapeArgs = new Object();
                //根据数据变化
                shapeArgs.x = x_margin+aveBarWidth/3*n+m*x_margin*tcount/row+aveBarWidth*n;
                shapeArgs.y = y_margin*12;
                shapeArgs.z = 0;
                //根据数据变化
                shapeArgs.height = -value/perValue_y*y_margin;
                shapeArgs.width = aveBarWidth;
                shapeArgs.depth = aveBarWidth;
                shapeArgs.alpha = Math.PI*30/180;
                shapeArgs.beta = Math.PI*30/180;

                var paths = c.svgrender.cuboidPath(shapeArgs);


                var gElement = document.createElementNS(c.SVG_NS,'g');
                gElement.setAttribute('stroke-linejoin','round');
                c.svg.appendChild(gElement);

                var darker = c.svgrender.lightenDarkenColor(colors[n],-40);

                for(var i=0;i<paths.length;i++){

                    if(Array.isArray(paths[i])){
                        var path = document.createElementNS(c.SVG_NS,'path');
                        path.setAttribute("d",paths[i].join(" "));
                        path.setAttribute("stroke-width",1);
                        if (i==0){
                            path.setAttribute("fill",colors[n]);
                            path.setAttribute("stroke",colors[n]);
                            path.style.cursor = 'pointer';
                            //设置需要传递的属性值，处理事件时获取
                            path.title = labels[n];
                            path.value = values[n].value;

                            //添加鼠标事件
                            path.addEventListener('mouseover',c.handleMouseover,false);
                            path.addEventListener('mouseout',c.handleMouseout,false);
                        }else {
                            path.setAttribute("fill",darker);
                            path.setAttribute("stroke",darker);
                        }

                        gElement.appendChild(path);
                    }
                }
            }
        }

        //设置标题
        c.setTitle();

        //绘制横坐标标识
        var x_g = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(x_g);
        for(var z=0;z<row;z++){
            var x_text = document.createElementNS(c.SVG_NS,'text');
            x_g.appendChild(x_text);
            x_text.textContent = totalV[z].date;

            c.setAttr(x_text,{
                'font-size':labelFontSize-3,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":x_margin+(z+0.4)*x_margin*tcount/row,
                "y":y_margin*12.6,
                "text-anchor":"middle",
                "height":12*1.2,
                "letter-spacing":c.labelLetterSpacing,
                'transform':"rotate("+(30)+","+(x_margin+(z+0.4)*x_margin*tcount/row)+","+y_margin*12.6+")"
            });

        }

        //绘制图例
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);

        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }
        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;
        //图例开始位置
        var startP= c.chartW*0.5 - len*0.5*perW;

        for(var m=0;m<len;m++){
            var cir = document.createElementNS(c.SVG_NS,'circle');
            cirG.appendChild(cir);

            c.setAttr(cir,{
                'cx':startP+perW*m,
                'cy':y_margin*13.4,
                'r':labelFontSize*0.5,
                'stroke':colors[m],
                'fill':colors[m]
            });

            var keyText = document.createElementNS(c.SVG_NS,'text');
            cirG.appendChild(keyText);
            keyText.textContent = labels[m];

            c.setAttr(keyText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":startP+perW*m+labelFontSize*0.8,
                "y":y_margin*13.4,
                "text-anchor":"left",
                "dominant-baseline": "middle",
                "height":c.titleFontSize*1.2
            });
        }

    }


    /************************** 绘制立方图 *****************************/
    //！！！绘制立方图
    c.drawBar3D = function (datas) {
        var values = datas.datas[0].values;
        var colors = c.colorSeries;
        var len = values.length;
        var labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }
        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        //所有数据总和
        var totalCount = 0;
        var vArr = [];
        values.forEach(function (v) {
            totalCount += Math.abs(v.value);
            vArr.push(v.value);
        });

        //最大值和最小值
        var minV = Math.min.apply(null,vArr),
            maxV = Math.max.apply(null,vArr);
        var maginV = maxV - minV;
        var x_margin = c.chartW/(len+2);
        var y_margin = c.chartH/14;//y坐标分成14等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);

        //假设最大值占y方向上9份，则每份代表的数值
        var perValue_y = maxAxesV/10;

        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(x_margin*0.8)+0.5,
            end_x = Math.floor(x_margin*(len+1))+0.5;


        for(var k=0;k<=5;k++){

                var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                    end_y = Math.floor(y_margin*2*(k+1))+0.5;

                //坐标
                var xAxes = document.createElementNS(c.SVG_NS,'path');
                gAxes.appendChild(xAxes);
                var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

                c.setAttr(xAxes,{
                    'd':pathV,
                    'stroke':'#f0f0f0',
                    'stroke-width':0.5
                });

                //单位标记数值
                var markText = document.createElementNS(c.SVG_NS,'text');
                gAxes.appendChild(markText);
                markText.textContent = perValue_y*10000*(10-2*k)/10000;

                c.setAttr(markText,{
                    'font-size':labelFontSize,
                    'fill':c.titleColor,
                    "x":Math.floor(x_margin*0.7)+0.5,
                    "y":start_y,
                    "text-anchor":"middle",
                    "height":c.titleFontSize*1.2,
                    'letter-spacing':c.labelLetterSpacing
                });
            }


        //绘制立方图
        for(var j=0;j<len;j++){

                var shapeArgs = new Object();
                //根据数据变化
                shapeArgs.x = x_margin*(j+1);
                shapeArgs.y = y_margin*12;
                shapeArgs.z = 0;
                //根据数据变化
                shapeArgs.height = -values[j].value/perValue_y*y_margin;
                shapeArgs.width = x_margin*0.3;
                shapeArgs.depth = x_margin*0.3;
                // shapeArgs.alpha = Math.PI*30/180;
                // shapeArgs.beta = Math.PI*30/180;

                var paths = c.svgrender.cuboidPath(shapeArgs);
                console.log(paths);

                var gElement = document.createElementNS(c.SVG_NS,'g');
                gElement.setAttribute('stroke-linejoin','round');
                c.svg.appendChild(gElement);

                var darker = c.svgrender.lightenDarkenColor(colors[j],-40);
                for(var i=0;i<paths.length;i++){

                    // console.log(Array.isArray(paths[i]));
                    // console.log(paths[i].constructor ===Array);

                    if(Array.isArray(paths[i])){
                        var path = document.createElementNS(c.SVG_NS,'path');
                        path.setAttribute("d",paths[i].join(" "));

                        path.setAttribute("stroke-width",1);
                        if (i==0){
                            path.setAttribute("fill",colors[j]);
                            path.setAttribute("stroke",colors[j]);
                            path.style.cursor = 'pointer';
                            //设置需要传递的属性值，处理事件时获取
                            path.title = labels[j];
                            path.value = values[j].value;


                            //添加鼠标事件
                            path.addEventListener('mouseover',c.handleMouseover,false);
                            path.addEventListener('mouseout',c.handleMouseout,false);
                        }else {
                            path.setAttribute("fill",darker);
                            path.setAttribute("stroke",darker);
                        }

                        gElement.appendChild(path);
                    }
                }

            }


        //设置标题
        c.setTitle();

        //绘制图例
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);

        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }
        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;
        //图例开始位置
        var startP= c.chartW*0.5 - len*0.5*perW;

        for(var m=0;m<len;m++){
            var cir = document.createElementNS(c.SVG_NS,'circle');
            cirG.appendChild(cir);

            c.setAttr(cir,{
                'cx':startP+perW*m,
                'cy':y_margin*13.4,
                'r':labelFontSize*0.5,
                'stroke':colors[m],
                'fill':colors[m]
            });

            var keyText = document.createElementNS(c.SVG_NS,'text');
            cirG.appendChild(keyText);
            keyText.textContent = labels[m];

            c.setAttr(keyText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":startP+perW*m+labelFontSize*0.8,
                "y":y_margin*13.4,
                "text-anchor":"left",
                "dominant-baseline": "middle",
                "height":c.titleFontSize*1.2
            });
        }

    }


    /************************** 绘制立体饼图 *****************************/
    //！！！绘制立体饼图
    c.drawPie3D = function (datas) {

        var values = datas.datas[0].values;
        var colors = c.colorSeries;

        var labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }
        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        var len = values.length;
        var tcount = 0;
        var arcs = [];

        //获取所有数据总和
        for (var i=0;i<len;i++){
            tcount += values[i].value;
        }

        //获取每个数据占用的弧度
        for (var j=0;j<len;j++){
            arcs.push(values[j].value/tcount*Math.PI*2);
        }

        // var shapeArgs = new Object();
        // shapeArgs.x = c.chartW/2;
        // shapeArgs.y = c.chartH/2;
        // shapeArgs.r = 200;
        // shapeArgs.innerR = 50;
        // shapeArgs.depth = 40;
        // shapeArgs.alpha = Math.PI*45/180;
        // shapeArgs.beta = Math.PI*45/180;
        // shapeArgs.end = 0;


        var startA = 0;
        var endA = 0;
        //保存所有侧边路径的数组
        var sidesArr = [];
        //保存所有顶面路径的数组
        var topsArr = [];

        //循环创建SVG路径元素
        for (var k=0; k<len; k++){
            if(k==0){
                startA = 0;
            }else {
                startA += arcs[k-1];
            }

            if (k==len-1){
                endA = Math.PI*2;
            }else {
                endA += arcs[k];
            }

            var shapeArgs = new Object();
            shapeArgs.x = c.pieCenterX;
            shapeArgs.y = c.pieCenterY;
            shapeArgs.r = c.pieR;
            shapeArgs.innerR = c.insideR;
            shapeArgs.depth = 40;
            shapeArgs.alpha = Math.PI*45/180;
            shapeArgs.beta = Math.PI*0/180;
            shapeArgs.end = endA;
            shapeArgs.start = startA;
            var arc3Dpath = c.svgrender.arc3dPath(shapeArgs);
            console.log(arc3Dpath);


            //颜色变暗
            var darker = c.svgrender.lightenDarkenColor(colors[k],-50);

            //内环面
            var inPath = document.createElementNS(c.SVG_NS,'path');
            // gElement.appendChild(inPath);
            inPath.setAttribute("d",arc3Dpath.inn.join(" "));
            inPath.setAttribute("fill",darker);
            inPath.setAttribute("stroke-width",1);
            // inPath.setAttribute("zIndex",arc3Dpath.zInn);
            inPath.zIndex = arc3Dpath.zInn;



            //外环面
            var outPath = document.createElementNS(c.SVG_NS,'path');
            // gElement.appendChild(outPath);
            outPath.setAttribute("d",arc3Dpath.out.join(" "));
            outPath.setAttribute("fill",darker);
            outPath.zIndex = arc3Dpath.zOut;


            //一侧切面
            var side01Path = document.createElementNS(c.SVG_NS,'path');
            // gElement.appendChild(side01Path);
            side01Path.setAttribute("d",arc3Dpath.side1.join(" "));
            side01Path.setAttribute("fill",darker);
            side01Path.zIndex = arc3Dpath.zSide1;


            //另一侧切面
            var side02Path = document.createElementNS(c.SVG_NS,'path');
            // gElement.appendChild(side02Path);
            side02Path.setAttribute("d",arc3Dpath.side2.join(" "));
            side02Path.setAttribute("fill",darker);
            side02Path.zIndex = arc3Dpath.zSide2;


            //顶面
            var topPath = document.createElementNS(c.SVG_NS,'path');
            // gElement.appendChild(topPath);
            topPath.setAttribute("d",arc3Dpath.top.join(" "));
            topPath.setAttribute("fill",colors[k]);
            topPath.setAttribute("stroke",colors[k]);
            topPath.style.cursor = "pointer";
            topPath.zIndex = arc3Dpath.zTop;

            var boundingRect = topPath.getBoundingClientRect();
            console.log(boundingRect);

            //添加事件
            //鼠标置于元素上方时
            topPath.addEventListener("mouseover",c.handleMouseover,false);
            //鼠标离开元素时
            topPath.addEventListener("mouseout",c.handleMouseout,false);
            topPath.title = labels[k];
            topPath.value = values[k].value;

            sidesArr.push(inPath,side01Path,side02Path,outPath);
            topsArr.push(topPath);

        }


        //按照zIndex大小进行升序排列
        sidesArr.sort(function (a, b) { return a.zIndex-b.zIndex });

        //添加路径
        var gElement = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gElement);

        //按照zIndex大小进行图层绘制
        for(var m=0;m<sidesArr.length;m++){
            gElement.appendChild(sidesArr[m]);
        }

        //遍历绘制元素
        for (var n=0;n<topsArr.length;n++){
            var g = document.createElementNS(c.SVG_NS,'g');
            g.setAttribute('stroke-width',1);
            g.setAttribute('stroke-linejoin','round');
            gElement.appendChild(g);
            g.appendChild(topsArr[n]);
        }


        //绘制图表标题
        c.setTitle();

        var x_margin = c.chartW/(len+2);
        var y_margin = c.chartH/14;//y坐标分成14等分

        //绘制图例
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);

        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }
        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;
        //图例开始位置
        var startP= c.chartW*0.5 - len*0.5*perW;

        for(var m=0;m<len;m++){
            var cir = document.createElementNS(c.SVG_NS,'circle');
            cirG.appendChild(cir);

            c.setAttr(cir,{
                'cx':startP+perW*m,
                'cy':y_margin*13.4,
                'r':labelFontSize*0.5,
                'stroke':colors[m],
                'fill':colors[m]
            });

            var keyText = document.createElementNS(c.SVG_NS,'text');
            cirG.appendChild(keyText);
            keyText.textContent = labels[m];

            c.setAttr(keyText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":startP+perW*m+labelFontSize*0.8,
                "y":y_margin*13.4,
                "text-anchor":"left",
                "dominant-baseline": "middle",
                "height":c.titleFontSize*1.2
            });
        }

    }



    /************************** 绘制平面柱状图 *****************************/
    //绘制柱状图
    c.drawBar = function (datas) {
        var values = datas.datas[0].values;
        var colors = c.colorSeries;
        var len = values.length;
        var labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }
        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        //所有数据总和
        var totalCount = 0;
        var vArr = [];
        values.forEach(function (v) {
            totalCount += Math.abs(v.value);
            vArr.push(v.value);
        });


        //最大值和最小值
        var minV = Math.min.apply(null,vArr),
            maxV = Math.max.apply(null,vArr);
        var maginV = maxV - minV;
        var x_margin = c.chartW/(len+2);
        var y_margin = c.chartH/15;//y坐标分成15等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);

        //假设最大值占y方向上9份，则每份代表的数值
        var perValue_y = maxAxesV/10;

        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(x_margin*0.8)+0.5,
            end_x = Math.floor(x_margin*(len+1))+0.5;


        //绘制6条水平线
        for(var k=0;k<=5;k++){

            var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                end_y = Math.floor(y_margin*2*(k+1))+0.5;

            //坐标
            var xAxes = document.createElementNS(c.SVG_NS,'path');
            gAxes.appendChild(xAxes);
            var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

            c.setAttr(xAxes,{
                'd':pathV,
                'stroke':'#f0f0f0',
                'stroke-width':0.5
            });

            //单位标记数值
            var markText = document.createElementNS(c.SVG_NS,'text');
            gAxes.appendChild(markText);
            markText.textContent = perValue_y*10000*(10-2*k)/10000;

            c.setAttr(markText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":Math.floor(x_margin*0.7)+0.5,
                "y":start_y,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing
            });
        }


        //绘制柱状图
        for(var i=0;i<len;i++){
            var barRect = document.createElementNS(c.SVG_NS,'rect');
            c.svg.appendChild(barRect);

            c.setAttr(barRect,{
                'stroke':'none',
                'fill':colors[i],
                'x':x_margin*(i+1),
                'y':Math.floor(y_margin*12)+0.5-values[i].value/perValue_y*y_margin,
                'width':x_margin*0.3,
                'height':values[i].value/perValue_y*y_margin
            });


            barRect.title = labels[i];
            barRect.value = values[i].value;

            barRect.addEventListener("mouseover",c.handleMouseover,false);
            barRect.addEventListener("mouseout",c.handleMouseout,false);


            // var ani = document.createElementNS(c.SVG_NS,'animate');
            // barRect.appendChild(ani);
            //
            // c.setAttr(ani,{
            //     'attributeName':"width",
            //     'to':x_margin*0.3,
            //     'begin':'indefinite',
            //     'dur':1,
            //     'fill':'freeze'
            // });

        }


        //设置标题
        c.setTitle();


        //绘制图例
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);

        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }

        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;

        //图例所在区域的总宽度
        var labelsW = x_margin*len;

        //每行能放的图例数量
        var perLineCount = Math.floor(labelsW/perW);
        //总共需要多少行
        var rowsCount = Math.ceil(len/perLineCount);


        if(rowsCount == 1){//只需要一行显示
            //图例开始位置
            var startP= c.chartW*0.5 - len*0.5*perW;
            for(var m=0;m<len;m++){

                var cir = document.createElementNS(c.SVG_NS,'circle');
                cirG.appendChild(cir);

                c.setAttr(cir,{
                    'cx':startP+perW*m,
                    'cy':y_margin*13.8,
                    'r':labelFontSize*0.5,
                    'stroke':colors[m],
                    'fill':colors[m]
                });
                var keyText = document.createElementNS(c.SVG_NS,'text');
                cirG.appendChild(keyText);
                keyText.textContent = labels[m];

                c.setAttr(keyText,{
                    'font-size':labelFontSize,
                    'font-family':c.titleFontFamily,
                    'fill':c.titleColor,
                    "x":startP+perW*m+labelFontSize*0.8,
                    "y":y_margin*13.8,
                    "text-anchor":"left",
                    "dominant-baseline": "middle",
                    "height":c.titleFontSize*1.2
                });
            }
        }else { //需要多行显示

            //图例开始位置
            var startP= x_margin;
            var perLineH = y_margin*2/rowsCount;//每行图例所占高度

            //TODO:如果行高小于图例字体大小 需要重新计算行高和每行显示的数量
            if(perLineH < labelFontSize*0.9){
                labelFontSize = perLineH;
                perW = (maxTextC+3)*perLineH;
                perLineCount = Math.floor(labelsW/perW);
                rowsCount = Math.ceil(len/perLineCount);
            }

            //最后一行显示的数量
            var lastLineC = len - perLineCount*(rowsCount-1);

            //保存总循环次数
            var totalC = 0;

            for(var rc=0;rc<rowsCount;rc++){//多少行

                //最后一行且最后一行显示的数量小于每行能显示的数量
                perLineCount = (rc == rowsCount-1 && lastLineC<perLineCount) ? lastLineC : perLineCount;

                for(var pc=0;pc<perLineCount;pc++){//每行多少个

                    var cir = document.createElementNS(c.SVG_NS,'circle');
                    cirG.appendChild(cir);

                    c.setAttr(cir,{
                        'cx':startP+perW*pc,
                        'cy':y_margin*13.1 + rc*perLineH,
                        'r':labelFontSize*0.45,
                        'stroke':colors[totalC],
                        'fill':colors[totalC]
                    });
                    var keyText = document.createElementNS(c.SVG_NS,'text');
                    cirG.appendChild(keyText);

                    keyText.textContent = labels[totalC];

                    c.setAttr(keyText,{
                        'font-size':labelFontSize*0.9,
                        'font-family':c.titleFontFamily,
                        'fill':c.titleColor,
                        "x":startP+perW*pc+labelFontSize*0.8,
                        "y":y_margin*13.1 + rc*perLineH,
                        "text-anchor":"left",
                        "dominant-baseline": "middle",
                        "height":c.titleFontSize*1.2
                    });

                    totalC++;
                }

            }
        }
    }



    /************************** 绘制多组平面柱状图 *****************************/
    //绘制多组柱状图
    c.drawMultiBar = function (datas) {
        var totalV = datas.datas,
            colors = c.colorSeries,
            labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;

        //数据组数
        var row = totalV.length;
        //每组数据的个数
        var len = totalV[0].values.length;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }


        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        //遍历所有数据找出最大值 均分坐标系

        //新建数组，保存所有数据
        var tarr = [];
        for (var i=0;i<len;i++){
            for (var j=0;j<totalV.length;j++){
                var values = totalV[j].values;
                var value = values[i];
                tarr.push(value.value);
            }
        }

        var tcount = tarr.length;

        var minV = Math.min.apply(null,tarr),
            maxV = Math.max.apply(null,tarr);

        var maginV = maxV - minV,
            x_margin = c.chartW/(tcount+2),
            y_margin = c.chartH/15;//y坐标分成15等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);

        //假设最大值占y方向上10份，则每份代表的数值
        var perValue_y = maxAxesV/10;

        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(x_margin*0.8)+0.5,
            end_x = Math.floor(x_margin*(tcount+1))+0.5;



        //绘制横坐标轴线
        for(var k=0;k<=5;k++){

            var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                end_y = Math.floor(y_margin*2*(k+1))+0.5;

            //坐标
            var xAxes = document.createElementNS(c.SVG_NS,'path');
            gAxes.appendChild(xAxes);
            var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;


            c.setAttr(xAxes,{
                'd':pathV,
                'stroke':'#f0f0f0',
                'stroke-width':0.5
            });


            //单位标记数值
            var markText = document.createElementNS(c.SVG_NS,'text');
            gAxes.appendChild(markText);

            markText.textContent = perValue_y*10000*(10-2*k)/10000;
            if(k==0){
                //TODO:需要完善宽度过小时，文字重叠问题，解决办法？
                // console.log((perValue_y*(10-2*k)).toString().length);
            }


            c.setAttr(markText,{
                'font-size':labelFontSize-2,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":Math.floor(x_margin*0.7)+0.5,
                "y":start_y,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing,
                'transform':"rotate("+(-60)+","+(Math.floor(x_margin*0.6)+0.5)+","+start_y+")"

            });
        }


        /*
        * 计算每个子数据柱状图显示的宽度w
        * 子数据间距为w/3
        * 组与组之间的间距为2w
        * 每组数据所占横坐标的宽度为2w + groupLen * w + (groupLen-1)*w/3
        * (5+4*groupLen)*w/3
        *
        * */
        var aveBarWidth = (x_margin*tcount/row * 3)/(5 + 4*len);

        //多组柱状图
        for(var m=0;m<row;m++) {
            var values = totalV[m].values;

            for (var n = 0; n < len; n++) {
                var value = values[n].value;

                var barRect = document.createElementNS(c.SVG_NS,'rect');
                c.svg.appendChild(barRect);

                c.setAttr(barRect,{
                    'x':x_margin+aveBarWidth/3*n+m*x_margin*tcount/row+aveBarWidth*n,
                    'y':Math.floor(y_margin*12)+0.5-value/perValue_y*y_margin,
                    'width':aveBarWidth,
                    'height':value/perValue_y*y_margin,
                    'stroke':'none',
                    'fill':colors[n]
                });

                barRect.title = labels[n];
                barRect.value = values[n].value;

                barRect.addEventListener("mouseover",c.handleMouseover,false);
                barRect.addEventListener("mouseout",c.handleMouseout,false);

            }
        }

        //设置标题
        c.setTitle();

        //绘制横坐标标识
        var x_g = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(x_g);
        for(var z=0;z<row;z++){
            var x_text = document.createElementNS(c.SVG_NS,'text');
            x_g.appendChild(x_text);
            x_text.textContent = totalV[z].date;

            c.setAttr(x_text,{
                'font-size':labelFontSize-3,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":x_margin+(z+0.4)*x_margin*tcount/row,
                "y":y_margin*12.6,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing,
                'transform':"rotate("+(45)+","+(x_margin+(z+0.4)*x_margin*tcount/row)+","+y_margin*12.6+")"
            });

        }


        //TODO:绘制图例  多组折线图的图例方法不适用于这里  会很消耗性能 不显示图形
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);


        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }
        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;
        //图例开始位置
        var startP= c.chartW*0.5 - len*0.5*perW;

        for(var m=0;m<len;m++){
            var cir = document.createElementNS(c.SVG_NS,'circle');
            cirG.appendChild(cir);

            c.setAttr(cir,{
                'cx':startP+perW*m,
                'cy':y_margin*13.4,
                'r':labelFontSize*0.5,
                'stroke':colors[m],
                'fill':colors[m]
            });

            var keyText = document.createElementNS(c.SVG_NS,'text');
            cirG.appendChild(keyText);
            keyText.textContent = labels[m];

            c.setAttr(keyText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":startP+perW*m+labelFontSize*0.8,
                "y":y_margin*13.4,
                "text-anchor":"left",
                "dominant-baseline": "middle",
                "height":c.titleFontSize*1.2
            });
        }
    }



    /************************** 绘制平面饼图 *****************************/
    //绘制平面饼图

    c.drawPie = function (datas) {

        var values = datas.datas[0].values;
        var colors = c.colorSeries;
        var insideR = c.insideR || 0;

        var labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.5 < 12 ? c.titleFontSize/1.5 : 12;

        if(c.pieR/c.titleFontSize < 5){
            labelFontSize = 9;
        }


        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }

        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        var len = values.length;
        var tcount = 0;
        var arcs = [];
        //保存展示数据中最小的值
        var minValue = Number.MAX_VALUE;

        //获取所有数据总和
        for (var i=0;i<len;i++){
            tcount += values[i].value;
            if(values[i].value<minValue){
                minValue = values[i].value;
            }
        }

        //创建饼状图分组
        var group = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(group);

        //定义起始角度
        var starA = 0;

        //设置默认的选中数据为第0个元素
        c.clickedDataContext = values[0];

        //第一个扇形区的中间角度
        var firstMidA = 0;

        //绘制扇形区域
        for (var j=0;j<len;j++){

            arcs.push(values[j].value/tcount*Math.PI*2);

            //扇形区域路径
            var  arcPath = document.createElementNS(c.SVG_NS,'path');

            var arcPathG = document.createElementNS(c.SVG_NS,'g');
            arcPathG.appendChild(arcPath);


            //扇形区域内文字路径
            var textPath = document.createElementNS(c.SVG_NS,'path');
            arcPathG.appendChild(textPath);

            arcPath.title = labels[j];
            arcPath.value = values[j].value;
            //设置事件的类型
            arcPath.type = "pie";
            arcPath.startA = starA;
            arcPath.endA = starA+values[j].value/tcount*Math.PI*2;
            arcPath.r = c.pieR;
            //父元素
            arcPath.superE = arcPathG;
            //父父元素
            arcPath.superEE = group;

            arcPath.insideR = insideR<arcPath.r ? insideR : 0;
            //设置对应的对象
            arcPath.dataContext = values[j];

            //设置初始选择的扇形
            if(j==0){
                c.curSelectE = arcPath;
                c.preSelectE = arcPath;
                firstMidA = (arcPath.startA + arcPath.endA)*0.5;
            }


            if(parseFloat(arcPath.insideR) <= 0 || isNaN(parseFloat(arcPath.insideR))){//内径为0的扇形图


                var tagL = document.createElementNS(c.SVG_NS,'path');//标示线
                var tagText = document.createElementNS(c.SVG_NS,'text');//
                var tspan01 = document.createElementNS(c.SVG_NS,'tspan');//显示比例标签
                var tspan02 = document.createElementNS(c.SVG_NS,'tspan');
                //扇形标识文字内容
                var tagTextCon = '';
                var minRatio = (minValue/tcount*100).toFixed(1);
                var ratio = (values[j].value/tcount*100).toFixed(1);

                //TODO:当显示图例或者占比小于一定比例时  只显示百分比不显示图例文字
                if(c.isShowCutline || ratio <= 10){
                    tagTextCon = ratio+'%';
                    tspan01.textContent = tagTextCon;
                    // tspan02.textContent = tagTextCon;
                }else {
                    tspan01.textContent = labels[j]+': '+ ratio +'%';
                }

                //绘制扇形区域标识线
                //标示线在对应扇形角度区域的中间
                var middleA = (arcPath.startA + arcPath.endA)*0.5;

                //TODO:如果在手机端运行 则没有扇形区域的移动距离
                // if(c.isPhone){
                //     c.pieTransDis = 0;
                // }
                var tagLine = c.drawTagLine(c.pieCenterX,c.pieCenterY,c.insideR,arcPath.r,c.pieTransDis,middleA);

                var tagPathStr = tagLine.path,
                    labelX = tagLine.labelX,
                    labelY = tagLine.labelY,
                    rotateA = tagLine.rotateA;


                if(Math.round(values[j].value/tcount*10000) == 0){

                }else {
                    //当在手机端运行时 不显示标示线！
                    if(!c.isPhone){
                        group.appendChild(tagL);
                    }

                    group.appendChild(tagText);
                    tagText.appendChild(tspan01);
                    tagText.appendChild(tspan02);
                }

                c.setAttr(tspan01,{
                    'x':labelX,
                    'y':labelY
                });

                c.setAttr(tspan02,{
                    'x':labelX,
                    'y':labelY,
                    'dy':labelFontSize
                });

                c.setAttr(tagL,{
                    'd':tagPathStr,
                    'stroke':colors[j],
                    'stroke-width':0.5,
                    'fill':'none'
                });

                // tagText.textContent = tagTextCon;

                c.setAttr(tagText,{
                    'x':labelX,
                    'y':labelY,
                    'fill':colors[j],
                    'dominant-baseline':'middle',
                    'font-size':labelFontSize,
                    'font-family':c.titleFontFamily,
                    'letter-spacing':0,
                    "text-anchor":"middle",
                    'transform':"rotate("+rotateA+","+labelX+","+labelY+")"
                });


                //添加鼠标响应事件
                arcPathG.addEventListener('mouseover',c.handleMouseover,false);
                arcPathG.addEventListener('mouseout',c.handleMouseout,false);
                arcPathG.addEventListener('mousemove',c.handleMousemove,false);

                arcPathG.addEventListener('touchstart',c.handleTouch,false);
                arcPathG.addEventListener('touchend',c.handleTouchend,false);


            }else {//有内圆的环形图
                //让标识文字沿着扇形中间弧线进行排列
                //中间弧线所在的半径
                var midR = arcPath.r*0.7 + arcPath.insideR*0.3;
                var start_x = c.pieCenterX + midR * Math.cos(-arcPath.startA),  //起始X点
                    start_y = c.pieCenterY + midR * Math.sin(-arcPath.startA),   //起始Y点
                    end_x = c.pieCenterX + midR * Math.cos(-arcPath.endA),  //起始X点
                    end_y = c.pieCenterY + midR * Math.sin(-arcPath.endA);   //起始Y点
                var textArcPathStr = ['M',start_x,start_y,'A',midR,midR,0,+(arcPath.endA-arcPath.startA>Math.PI),0,end_x,end_y].join(' ');

                c.setAttr(textPath,{
                   'd':textArcPathStr,
                    'stroke':'none',
                    'stroke-width':0,
                    'fill':'none',
                    'id':'textPath'+j
                });

                var labelT = document.createElementNS(c.SVG_NS,'text');
                var labelTP = document.createElementNS(c.SVG_NS,'textPath');

                // labelTP.textContent = labels[j]+':'+' '+(values[j].value/tcount*100).toFixed(2)+'%';

                var ratio = (values[j].value/tcount*100).toFixed(1);
                //TODO:当占比小于一定比例时  只显示百分比不显示图例文字
                if(ratio < 8){
                    tagTextCon = ratio+'%';
                    labelTP.textContent = tagTextCon;
                    // tspan02.textContent = tagTextCon;
                }else {
                    labelTP.textContent = labels[j]+': '+ ratio +'%';
                }


                labelTP.setAttributeNS("http://www.w3.org/1999/xlink",'href','#textPath'+j);
                labelTP.setAttribute('startOffset','50%');

                labelTP.superE = arcPathG;
                labelTP.superEE = group;
                labelTP.type = 'pie';
                labelTP.startA = arcPath.startA;
                labelTP.endA = arcPath.endA;
                labelTP.value = values[j].value;
                //设置元素对应的数据
                labelTP.dataContext = values[j];



                var rgbC = c.svgrender.hex2rgb(colors[j]);
                var fillC = c.svgrender.oppositeColor(rgbC);

                c.setAttr(labelTP,{
                    'fill':fillC,
                    'font-size':c.titleFontSize*0.5,
                    'font-family':c.titleFontFamily,
                    'text-anchor':'middle'
                });


                labelT.appendChild(labelTP);
                arcPathG.appendChild(labelT);
                //设置鼠标显示样式
                arcPathG.style.cursor = 'pointer';

                //添加鼠标响应事件
                arcPathG.addEventListener('mousedown',c.handleMousedown,false);
                arcPathG.addEventListener('mouseup',c.handleMouseup,false);
            }


            group.appendChild(arcPathG);
            // group.appendChild(textPath);

            var pathStr = c.drawSector(c.pieCenterX,c.pieCenterY,arcPath.r,arcPath.startA,arcPath.endA,arcPath.insideR);


            arcPath.setAttribute('d',pathStr);
            // arcPathG.setAttribute('stroke',colors[j]);
            // arcPathG.setAttribute('fill',colors[j]);
            // arcPath.setAttribute('stroke',colors[j]);

            arcPath.setAttribute('fill',colors[j]);
            starA += values[j].value/tcount*Math.PI*2;

        }


        //如果有内圆 设置初始旋转角度 配置内圆标题、数值、图片
        if(c.insideR>0){

            //设置初始旋转角度，让第一个扇形旋转到正下方
            var firstRotateA = 0;
            //判断第一个扇形的中间角度大小 设置旋转角度为逆时针or顺时针
            if(firstMidA >=0 && firstMidA <= Math.PI*0.5){
                //如果在中间线右侧 顺时针旋转
                firstRotateA = (firstMidA + Math.PI*0.5)*c.rad2deg;
            }else {
                //如果在中间线左侧 逆时针旋转
                firstRotateA = -(Math.PI*1.5 - firstMidA)*c.rad2deg;
            }
            group.setAttribute('transform','rotate('+firstRotateA+','+c.pieCenterX+','+c.pieCenterY+')');

            if(!c.isShowInsideC){
                return;
            }
            //内圆元素组
            var insideG = document.createElementNS(c.SVG_NS,'g');
            c.svg.appendChild(insideG);
            //内圆元素
            var insideC = document.createElementNS(c.SVG_NS,'circle');
            insideG.appendChild(insideC);
            c.setAttr(insideC,{
               'fill':"white",
               'cx':c.pieCenterX,
               'cy':c.pieCenterY,
               'r':insideR
            });

            //内圆标题标签
            var insideTitle = document.createElementNS(c.SVG_NS,'text');
            insideG.appendChild(insideTitle);
            insideTitle.textContent = c.insideCTitle;
            c.setAttr(insideTitle,{
               'x':c.pieCenterX,
               'y':c.pieCenterY-c.insideR*0.4,
                'font-size':c.insideR*0.14,
                'fill':'#D4D4D4',
                'stroke-width':0,
                'font-family':c.titleFontFamily,
                'dominant-baseline':'middle',
                'text-anchor':'middle'
            });

            //数值显示标签
            var insideValue = document.createElementNS(c.SVG_NS,'text');
            insideG.appendChild(insideValue);
            insideValue.textContent = c.insideCValue;
            c.setAttr(insideValue,{
                'x':c.pieCenterX,
                'y':c.pieCenterY,
                'font-size':c.insideR*0.2,
                'fill':'#595959',
                'stroke-width':0,
                'font-family':c.titleFontFamily,
                'dominant-baseline':'middle',
                'text-anchor':'middle'
            });

            //图片显示
            var insideImage = document.createElementNS(c.SVG_NS,'image');
            insideG.appendChild(insideImage);

            insideImage.setAttributeNS("http://www.w3.org/1999/xlink",'href',c.insideCImageURL);
            c.setAttr(insideImage,{
                'x':c.pieCenterX-c.insideR*0.23,
                'y':c.pieCenterY+c.insideR*0.5-c.insideR*0.23,
                'width':c.insideR*0.46,
                'height':c.insideR*0.46
            });


        }

        //设置标题
        c.setTitle();

        //绘制图例
        //图例在右侧
        if(c.cutlinePos == 'right'){
            var cirG = document.createElementNS(c.SVG_NS,'g');
            c.svg.appendChild(cirG);

            //设置图例文字最大的长度:多少个字符
            var maxTextC = 0;
            for(var l=0;l<labels.length;l++){
                if(maxTextC < labels[l].length){
                    maxTextC = labels[l].length;
                }
            }
            //每组图例占据的宽度
            var perW = (maxTextC+3)*labelFontSize;

            //图例所在区域的总高度
            var labelsH = c.chartH*0.7;



            // //初始设置每组图例占据的高度
            // var perH = labelFontSize*3;
            // //从调试来看 每列最大放置的图例数
            // var maxLen = Math.floor(labelsH/labelFontSize/1.2);
            // if(labelsH/perH < len){
            //     perH = labelFontSize*2;
            // }


            var perH = labelsH/len;
            if(perH<labelFontSize*1.5){
                perH = labelFontSize*1.5;
            }


            //图例所在区域的总宽度
            var labelsW = c.chartW-(c.pieCenterX + c.pieR*1.05);

            //每列能放的图例数量
            var perLineCount = Math.floor(labelsH/perH);


            //总共需要多少列
            var rowsCount = Math.ceil(len/perLineCount);
            console.log(rowsCount);

            if(rowsCount == 1){//只需要一列显示
                //图例x开始位置
                var startP= c.pieCenterX + c.pieR*1.3;

                for(var m=0;m<len;m++){
                    var cir = document.createElementNS(c.SVG_NS,'circle');
                    cirG.appendChild(cir);

                    c.setAttr(cir,{
                        'cx':startP,
                        'cy':c.chartH*0.15+perH*m,
                        'r':labelFontSize*0.5,
                        'stroke':colors[m],
                        'fill':colors[m]
                    });
                    var keyText = document.createElementNS(c.SVG_NS,'text');
                    cirG.appendChild(keyText);
                    keyText.textContent = labels[m];

                    c.setAttr(keyText,{
                        'font-size':labelFontSize,
                        'font-family':c.titleFontFamily,
                        'fill':c.titleColor,
                        "x":startP+labelFontSize,
                        "y":c.chartH*0.15+perH*m,
                        "text-anchor":"left",
                        "dominant-baseline": "middle",
                        "height":c.titleFontSize*1.2
                    });
                }
            }else { //需要多列显示

                //图例x开始位置
                var startP= c.pieCenterX + c.pieR*1.4;

                var perLineW = perW;//每列图例所占宽度

                //最后一列显示的数量
                var lastLineC = len - perLineCount*(rowsCount-1);

                //保存总循环次数
                var totalC = 0;

                for(var rc=0;rc<rowsCount;rc++){//多少列

                    //最后一列且最后一列显示的数量小于每列能显示的数量
                    perLineCount = (rc == rowsCount-1 && lastLineC<perLineCount) ? lastLineC : perLineCount;

                    for(var pc=0;pc<perLineCount;pc++){//每列多少个

                        var cir = document.createElementNS(c.SVG_NS,'circle');
                        cirG.appendChild(cir);

                        c.setAttr(cir,{
                            'cx':startP+perW*rc,
                            'cy':c.chartH*0.15 + pc*perH,
                            'r':labelFontSize*0.45,
                            'stroke':colors[totalC],
                            'fill':colors[totalC]
                        });
                        var keyText = document.createElementNS(c.SVG_NS,'text');
                        cirG.appendChild(keyText);

                        keyText.textContent = labels[totalC];

                        c.setAttr(keyText,{
                            'font-size':labelFontSize*0.9,
                            'font-family':c.titleFontFamily,
                            'fill':c.titleColor,
                            "x":startP+labelFontSize+perW*rc,
                            "y":c.chartH*0.15+perH*pc,
                            "text-anchor":"left",
                            "dominant-baseline": "middle",
                            "height":c.titleFontSize*1.2
                        });

                        totalC++;
                    }
                }
            }

        }


        //图例在下方
        if(c.cutlinePos == 'down'){
            var cirG = document.createElementNS(c.SVG_NS,'g');
            c.svg.appendChild(cirG);

            //设置图例文字最大的长度:多少个字符
            var maxTextC = 0;
            for(var l=0;l<labels.length;l++){
                if(maxTextC < labels[l].length){
                    maxTextC = labels[l].length;
                }
            }

            //每组图例占据的宽度
            var perW = (maxTextC+3)*labelFontSize;

            //图例所在区域的总宽度
            var labelsW = c.chartW*0.9;

            //每行能放的图例数量
            var perLineCount = Math.floor(labelsW/perW);
            //总共需要多少行
            var rowsCount = Math.ceil(len/perLineCount);


            if(rowsCount == 1){//只需要一行显示
                //图例开始位置
                var startP= c.chartW*0.5 - len*0.5*perW;
                for(var m=0;m<len;m++){

                    var cir = document.createElementNS(c.SVG_NS,'circle');
                    cirG.appendChild(cir);

                    c.setAttr(cir,{
                        'cx':startP+perW*m,
                        'cy':c.chartW,
                        'r':labelFontSize*0.5,
                        'stroke':colors[m],
                        'fill':colors[m]
                    });
                    var keyText = document.createElementNS(c.SVG_NS,'text');
                    cirG.appendChild(keyText);
                    keyText.textContent = labels[m];

                    c.setAttr(keyText,{
                        'font-size':labelFontSize,
                        'font-family':c.titleFontFamily,
                        'fill':c.titleColor,
                        "x":startP+perW*m+labelFontSize*0.8,
                        "y":c.chartW,
                        "text-anchor":"left",
                        "dominant-baseline": "middle",
                        "height":c.titleFontSize*1.2
                    });
                }
            }else { //需要多行显示

                //图例开始位置
                var startP= c.chartW*0.05;
                var perLineH = (c.chartH-c.chartW)/rowsCount;//每行图例所占高度

                //最后一行显示的数量
                var lastLineC = len - perLineCount*(rowsCount-1);

                //保存总循环次数
                var totalC = 0;

                for(var rc=0;rc<rowsCount;rc++){//多少行

                    //最后一行且最后一行显示的数量小于每行能显示的数量
                    perLineCount = (rc == rowsCount-1 && lastLineC<perLineCount) ? lastLineC : perLineCount;

                    for(var pc=0;pc<perLineCount;pc++){//每行多少个

                        var cir = document.createElementNS(c.SVG_NS,'circle');
                        cirG.appendChild(cir);

                        c.setAttr(cir,{
                            'cx':startP+perW*pc,
                            'cy':c.chartW + rc*perLineH,
                            'r':labelFontSize*0.45,
                            'stroke':colors[totalC],
                            'fill':colors[totalC]
                        });
                        var keyText = document.createElementNS(c.SVG_NS,'text');
                        cirG.appendChild(keyText);

                        keyText.textContent = labels[totalC];

                        c.setAttr(keyText,{
                            'font-size':labelFontSize*0.9,
                            'font-family':c.titleFontFamily,
                            'fill':c.titleColor,
                            "x":startP+perW*pc+labelFontSize*0.8,
                            "y":c.chartW + rc*perLineH,
                            "text-anchor":"left",
                            "dominant-baseline": "middle",
                            "height":c.titleFontSize*1.2
                        });

                        totalC++;
                    }
                }
            }

        }




        // //绘制图例
        // var cirG = document.createElementNS(c.SVG_NS,'g');
        // c.svg.appendChild(cirG);
        //
        // var x_margin = c.chartW/(len+2);
        // var y_margin = c.chartH/14;//y坐标分成14等分
        // for(var m=0;m<len;m++){
        //     var cir = document.createElementNS(c.SVG_NS,'circle');
        //     cirG.appendChild(cir);
        //
        //     c.setAttr(cir,{
        //         'cx':x_margin*(m+1.2),
        //         'cy':y_margin*13,
        //         'r':y_margin*0.3,
        //         'stroke':colors[m],
        //         'fill':colors[m]
        //     });
        //
        //
        //     var keyText = document.createElementNS(c.SVG_NS,'text');
        //     cirG.appendChild(keyText);
        //     keyText.textContent = labels[m];
        //
        //     c.setAttr(keyText,{
        //         'font-size':c.titleFontSize/1.2 < 18 ? c.titleFontSize/1.2 : 17,
        //         'font-family':c.titleFontFamily,
        //         'fill':'black',
        //         "x":x_margin*(m+1.2)+y_margin*0.39,
        //         "y":y_margin*13+y_margin*0.2,
        //         "text-anchor":"left",
        //         "height":c.titleFontSize*1.2
        //     });
        // }


        
    }

    /************************** 绘制折线图 *****************************/
    //绘制折线图
    c.drawLineGraph = function (datas) {
        var values = datas.datas[0].values;
        var colors = c.colorSeries;
        var len = values.length;
        var labels = [];
        //保存所有X轴坐标值，用于动态绘制垂直标识线x坐标判断
        c.allXPoints = [];

        //设置横纵坐标和图例文字的大小
        // var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;
        var labelFontSize = 12;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }

        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;

        //所有数据总和
        var totalCount = 0;
        var vArr = [];
        values.forEach(function (v) {
            totalCount += Math.abs(v.value);
            vArr.push(v.value);
        });

        //最大值和最小值
        var minV = Math.min.apply(null,vArr),
            maxV = Math.max.apply(null,vArr);
        // var maginV = maxV - minV;
        // var x_margin = c.chartW/(len+2);
        // var y_margin = c.chartH/15;//y坐标分成15等分

        //将图表横向均分12份  左右各一份分别绘制纵坐标值和右侧留白 中间10份用于绘制图表
        //均分值
        var xPerMargin = c.chartW/12;

        var maginV = maxV - minV,
            // x_margin = c.chartW/(row+2),
            x_margin = xPerMargin*10/(len-1),
            y_margin = c.chartH/15;//y坐标分成15等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);
        //假设最大值占y方向上9份，则每份代表的数值
        var perValue_y = (maxAxesV/10).toFixed(2);

        console.log("y轴上每份数值大小："+perValue_y);
        if(maxV <=1 && maxV >=0){



        }










        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(xPerMargin)+0.5,
            end_x = Math.floor(xPerMargin*11)+0.5;

        //绘制6条水平线
        for(var k=0;k<=5;k++){

            var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                end_y = Math.floor(y_margin*2*(k+1))+0.5;

            //坐标
            var xAxes = document.createElementNS(c.SVG_NS,'path');
            gAxes.appendChild(xAxes);
            var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

            c.setAttr(xAxes,{
                'd':pathV,
                'stroke':'#f0f0f0',
                'stroke-width':0.5
            });

            //单位标记数值
            var markText = document.createElementNS(c.SVG_NS,'text');
            gAxes.appendChild(markText);
            markText.textContent = perValue_y*10000*(10-2*k)/10000;

            c.setAttr(markText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":Math.floor(xPerMargin*0.6)+0.5,
                "y":start_y,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing
            });
        }


        //如果横坐标过多 就间隔一定距离取值
        //假设横坐标最大显示数量为10
        var maxNum = 10;
        var gap = Math.ceil(len/maxNum);
        var gap01= Math.ceil(len/maxNum/8);

        //绘制折线图
        var linePath = '';

        //曲线图
        var bethelPath = '';


        var points = []
        for(var i=0;i<len;i++){
            //所有X点数组
            c.allXPoints.push(x_margin*i+xPerMargin);
            //折线线上的点
            var cirPoint = document.createElementNS(c.SVG_NS,'circle');
            // c.svg.appendChild(cirPoint);
            points.push(cirPoint);
            if(i%gap01==0 || i==len-1){
                c.setAttr(cirPoint,{
                    'cx':x_margin*i+xPerMargin,
                    'cy':Math.floor(y_margin*12)+0.5-values[i].value/perValue_y*y_margin,
                    'r':2,
                    'stroke':"none",
                    'fill':colors[i]
                });
            }


            cirPoint.title = labels[i];
            // cirPoint.subTitle = datas.datas[0].date;
            cirPoint.subTitle = '2018-12-22 12:30:03';
            cirPoint.value = values[i].value;
            cirPoint.type = "multiLine_point";
            // cirPoint.superE = lineG;

            cirPoint.addEventListener('mouseover',c.handleMouseover,false);
            cirPoint.addEventListener('mouseout',c.handleMouseout,false);

            cirPoint.addEventListener('touchstart',c.handleTouchstart,false);
            cirPoint.addEventListener('touchend',c.handleTouchend,false);

            var point_x = x_margin*i+xPerMargin,
                point_y = Math.floor(y_margin*12)+0.5-values[i].value/perValue_y*y_margin,
                nextPoint_x = i<len-1 ? x_margin*(i+1)+xPerMargin:undefined,
                nextPoint_y = i<len-1 ? Math.floor(y_margin*12)+0.5-values[i+1].value/perValue_y*y_margin:undefined;


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

            //绘制横坐标标识
            // var x_g = document.createElementNS(c.SVG_NS,'g');
            // c.svg.appendChild(x_g);

            if(i%gap==0 || i==len-1){
                //绘制横坐标
                //横坐标点
                var coordinateP = document.createElementNS(c.SVG_NS,'circle');
                c.setAttr(coordinateP,{
                    'cx':x_margin*i+xPerMargin,
                    'cy':Math.floor(y_margin*12)+0.5,
                    'r':1.5,
                    'stroke':"none",
                    'fill':colors[i]
                });
                c.svg.appendChild(coordinateP);

                var x_text = document.createElementNS(c.SVG_NS,'text');
                c.svg.appendChild(x_text);
                x_text.textContent = labels[i];
                c.setAttr(x_text,{
                    'font-size':labelFontSize-3,
                    'font-family':c.titleFontFamily,
                    'fill':c.titleColor,
                    "x":x_margin*i+xPerMargin,
                    "y":y_margin*12.7,
                    "text-anchor":"middle",
                    // "height":c.titleFontSize*1.2,
                    'letter-spacing':c.labelLetterSpacing,
                    // 'transform':"rotate("+(36)+","+(x_margin+(z+0.4)*x_margin*tcount/row)+","+y_margin*12.6+")"
                    'transform':"rotate("+(45)+","+(x_margin*i+xPerMargin)+","+y_margin*12.7+")"
                });
            }

        }

        //提示线
        c.vLine = document.createElementNS(c.SVG_NS,'line');
        c.svg.addEventListener('mousemove',function (ev) {
            // c.lineGraphMouseMove(ev);
        },false);


        //绘制折线
        var lineGraph = document.createElementNS(c.SVG_NS,'path');
        c.svg.appendChild(lineGraph);
        if(c.chartType=="wavy"){
            lineGraph.setAttribute('d',bethelPath);
        }
        if(c.chartType=="line"){
            lineGraph.setAttribute('d',linePath);
        }
        c.setAttr(lineGraph,{
            // 'd':bethelPath,
            'fill':'none',
            'stroke':'#666666',
            'stroke-width':1
        });

        points.forEach(function (point) {
           c.svg.appendChild(point);
        });


        //设置标题
        c.setTitle();


        //TODO:绘制图例 暂时不绘制 以后加一个判断条件再绘制
        if(false){
            var cirG = document.createElementNS(c.SVG_NS,'g');
            c.svg.appendChild(cirG);

            //设置图例文字最大的长度:多少个字符
            var maxTextC = 0;
            for(var l=0;l<labels.length;l++){
                if(maxTextC < labels[l].length){
                    maxTextC = labels[l].length;
                }
            }

            //每组图例占据的宽度
            var perW = (maxTextC+3)*labelFontSize;

            //图例所在区域的总宽度
            var labelsW = x_margin*len;

            //每行能放的图例数量
            var perLineCount = Math.floor(labelsW/perW);

            //总共需要多少行
            var rowsCount = Math.ceil(len/perLineCount);


            if(rowsCount == 1){//只需要一行显示
                //图例开始位置
                var startP= c.chartW*0.5 - len*0.5*perW;
                for(var m=0;m<len;m++){

                    var cir = document.createElementNS(c.SVG_NS,'circle');
                    cirG.appendChild(cir);

                    c.setAttr(cir,{
                        'cx':startP+perW*m,
                        'cy':y_margin*13.8,
                        'r':labelFontSize*0.5,
                        'stroke':colors[m],
                        'fill':colors[m]
                    });
                    var keyText = document.createElementNS(c.SVG_NS,'text');
                    cirG.appendChild(keyText);
                    keyText.textContent = labels[m];

                    c.setAttr(keyText,{
                        'font-size':labelFontSize,
                        'font-family':c.titleFontFamily,
                        'fill':c.titleColor,
                        "x":startP+perW*m+labelFontSize*0.8,
                        "y":y_margin*13.8,
                        "text-anchor":"left",
                        "dominant-baseline": "middle",
                        "height":c.titleFontSize*1.2
                    });
                }
            }else { //需要多行显示

                //图例开始位置
                var startP= x_margin;
                var perLineH = y_margin*2/rowsCount;//每行图例所占高度

                //TODO:如果行高小于图例字体大小 需要重新计算行高和每行显示的数量
                if(perLineH < labelFontSize*0.9){
                    labelFontSize = perLineH;
                    perW = (maxTextC+3)*perLineH;
                    perLineCount = Math.floor(labelsW/perW);
                    rowsCount = Math.ceil(len/perLineCount);
                }

                //最后一行显示的数量
                var lastLineC = len - perLineCount*(rowsCount-1);

                //保存总循环次数
                var totalC = 0;

                for(var rc=0;rc<rowsCount;rc++){//多少行

                    //最后一行且最后一行显示的数量小于每行能显示的数量
                    perLineCount = (rc == rowsCount-1 && lastLineC<perLineCount) ? lastLineC : perLineCount;

                    for(var pc=0;pc<perLineCount;pc++){//每行多少个

                        var cir = document.createElementNS(c.SVG_NS,'circle');
                        cirG.appendChild(cir);

                        c.setAttr(cir,{
                            'cx':startP+perW*pc,
                            'cy':y_margin*13.1 + rc*perLineH,
                            'r':labelFontSize*0.45,
                            'stroke':colors[totalC],
                            'fill':colors[totalC]
                        });
                        var keyText = document.createElementNS(c.SVG_NS,'text');
                        cirG.appendChild(keyText);

                        keyText.textContent = labels[totalC];

                        c.setAttr(keyText,{
                            'font-size':labelFontSize*0.9,
                            'font-family':c.titleFontFamily,
                            'fill':c.titleColor,
                            "x":startP+perW*pc+labelFontSize*0.8,
                            "y":y_margin*13.1 + rc*perLineH,
                            "text-anchor":"left",
                            "dominant-baseline": "middle",
                            "height":c.titleFontSize*1.2
                        });

                        totalC++;
                    }
                }
            }
        }

    }

    //处理单个折线图鼠标移动事件
    c.showVLine = false;
    c.vLineFlag = -1;
    c.lineGraphMouseMove = function (event) {
        //获取当前点X坐标
        var pointX = event.offsetX;


        for(var i=0;i<c.allXPoints.length;i++){

            if(Math.abs(pointX-c.allXPoints[i])<5 && c.vLineFlag == -1){
                c.vLineFlag = i;
                //FIXME:当i=0时，提示线添加不上
                c.setAttr(c.vLine,{
                    'x1':Math.floor(c.allXPoints[i])+0.5,
                    'y1':c.chartH/15*2,
                    'x2':Math.floor(c.allXPoints[i])+0.5,
                    'y2':c.chartH/15*12,
                    'stroke':'#CFCFCF',
                    'stroke-width':1
                });
                c.svg.appendChild(c.vLine);

                c.showVLine = true;
                console.log(i);

                return;
            }else {

                if(c.svg.children[c.svg.children.length-1]==c.vLine && c.showVLine == true && c.vLineFlag != -1){
                    // console.log('1');
                    c.svg.removeChild(c.vLine);
                    c.showVLine = false;
                    c.vLineFlag = -1;
                }
            }

        }

    }

    //绘制多组折线图
    c.drawMultiLineGraph = function (datas) {
        var totalV = datas.datas,
            colors = c.colorSeries,
            labels = [];

        //设置横纵坐标和图例文字的大小
        var labelFontSize = c.titleFontSize/1.2 < 15 ? c.titleFontSize/1.2 : 15;


        //数据组数
        var row = totalV.length;
        //每组数据的个数
        var len = totalV[0].values.length;

        //如果展示的图例数量超过了给定颜色系的个数 那么就要增加颜色系
        if(colors ==  undefined || colors.length<len){
            var addLength = len-colors.length;
            for (var addL=0;addL<addLength;addL++){
                var newColor = c.svgrender.lightenDarkenColor(c.colorSeries[addL%10],Math.ceil((addL+1)/10)*10);
                colors.push(newColor);
            }
        }

        //创建默认图例文字
        for (var q=1;q<=len;q++){
            labels.push("图例"+q);
        }

        labels = datas.labels ? datas.labels : labels;


        //TODO：遍历所有数据找出最大值 均分坐标系

        //新建数组，保存所有数据
        var tarr = [];
        for (var i=0;i<len;i++){
            for (var j=0;j<totalV.length;j++){
                var values = totalV[j].values;
                var value = values[i];
                tarr.push(value.value);
            }
        }

        var tcount = tarr.length;

        var minV = Math.min.apply(null,tarr),
            maxV = Math.max.apply(null,tarr);

        //将图表横向均分12份  左右各一份分别绘制纵坐标值和右侧留白 中间10份用于绘制图表
        //均分值
        var xPerMargin = c.chartW/12;

        var maginV = maxV - minV,
            // x_margin = c.chartW/(row+2),
            x_margin = xPerMargin*10/(row-1),
            y_margin = c.chartH/15;//y坐标分成15等分


        //通过最大值均分坐标系
        //最大数值的整数部分位数
        var n = Math.ceil(maxV).toString().length;
        var maxAxesV = Math.ceil(maxV/0.9/Math.pow(10,n-1))*Math.pow(10,n-1);



        //FIXME:最小数值的整数部分位数
        console.log('FIXME');
        var m = Math.ceil(minV).toString().length;
        var minAxesV = Math.floor(minV/1.01/Math.pow(10,m-1))*Math.pow(10,m-1);

        var perValue_y = ((maxAxesV-minAxesV)/10).toFixed(2);

        console.log("y轴上每份数值大小："+perValue_y);
        if(maxV <=1 && maxV >=0){



        }

        //假设最大值占y方向上10份，则每份代表的数值
        // var perValue_y = maxAxesV/10;

        //绘制坐标轴
        var gAxes = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(gAxes);

        var start_x = Math.floor(xPerMargin)+0.5,
            end_x = Math.floor(xPerMargin*11)+0.5;

        //绘制横坐标轴线
        for(var k=0;k<=5;k++){

            var start_y = Math.floor(y_margin*2*(k+1))+0.5,
                end_y = Math.floor(y_margin*2*(k+1))+0.5;

            //坐标轴线
            var xAxes = document.createElementNS(c.SVG_NS,'path');
            gAxes.appendChild(xAxes);
            var pathV = 'M '+start_x+' '+start_y+'L '+end_x+' '+end_y;

            c.setAttr(xAxes,{
                'd':pathV,
                'stroke':'#f0f0f0',
                'stroke-width':0.5
            });


            //单位标记数值
            var markText = document.createElementNS(c.SVG_NS,'text');
            gAxes.appendChild(markText);

            markText.textContent = perValue_y*10000*(10-2*k)/10000 + minAxesV;


            c.setAttr(markText,{
                'font-size':labelFontSize,
                'font-family':c.titleFontFamily,
                'fill':c.titleColor,
                "x":Math.floor(xPerMargin*0.7)+0.5,
                "y":start_y,
                "text-anchor":"middle",
                "height":c.titleFontSize*1.2,
                'letter-spacing':c.labelLetterSpacing
            });

        }


        //保存所有列的点数据
        var totalPoints = [];
        for(var m=0;m<len;m++){
            var values = [];

            //保存每列的所有点
            var listPoints = [];

            for(var n=0;n<row;n++){
                values = totalV[n].values;
                var value = values[m].value;

                var point = {
                    // x:x_margin*(n+1.3),
                    x:xPerMargin+x_margin*n,
                    y:Math.floor(y_margin*12)+0.5-(value-minAxesV)/perValue_y*y_margin,
                    value:value
                };

                listPoints.push(point);
            }

            totalPoints.push(listPoints);
        }

        // console.log(totalPoints);

        //绘制折线
        //如果横坐标过多 就间隔一定距离取值
        //假设横坐标最大显示数量为40
        var maxNum01 = 15;
        var gap01 = Math.ceil(row/maxNum01);


       for(var p=0;p<len;p++){
           var perlinePoints = totalPoints[p];

           var lineG = document.createElementNS(c.SVG_NS,'g');
           c.svg.appendChild(lineG);

           var linePath = '';
           var bethelPath = '';
           for(var q=0;q<row;q++){

                   var cirPoint = document.createElementNS(c.SVG_NS,'circle');
                   //q%gap01==0 || q==row
                   if(q%gap01==0 || q==row){
                       lineG.appendChild(cirPoint);
                       c.setAttr(cirPoint,{
                           'cx':perlinePoints[q].x,
                           'cy':perlinePoints[q].y,
                           // 'r':y_margin*0.07,
                           'r':1.5,
                           'stroke':"none",
                           'fill':colors[p]
                       });
                   }

                   // points.push(cirPoint);

                   cirPoint.title = labels[p];
                   cirPoint.subTitle = totalV[q].date;
                   cirPoint.value = perlinePoints[q].value;
                   cirPoint.type = "multiLine_point";
                   cirPoint.superE = lineG;

                   cirPoint.addEventListener('mouseover',c.handleMouseover,false);
                   cirPoint.addEventListener('mouseout',c.handleMouseout,false);

               var point_x = perlinePoints[q].x,
                   point_y = perlinePoints[q].y,
                   nextPoint_x = q<row-1 ? perlinePoints[q+1].x:undefined,
                   nextPoint_y = q<row-1 ? perlinePoints[q+1].y:undefined;


                   // if(q==0){
                   //     linePath = 'M'+perlinePoints[q].x+' '+perlinePoints[q].y;
                   // }else {
                   //     linePath += 'L'+perlinePoints[q].x+' '+perlinePoints[q].y;
                   // }

               if(q==0){
                   linePath = 'M'+ point_x +' '+ point_y;
                   bethelPath = 'M'+ point_x +' '+ point_y+'C' + Math.abs((nextPoint_x+point_x)*0.5)+','+point_y+' '+Math.abs((nextPoint_x+point_x)*0.5)+','+nextPoint_y+' '+nextPoint_x+
                       ','+nextPoint_y;
               }else {
                   linePath += "L"+point_x+' '+point_y;
                   if(q<row-1){
                       bethelPath += 'C' + Math.abs((nextPoint_x+point_x)*0.5)+','+point_y+' '+Math.abs((nextPoint_x+point_x)*0.5)+','+nextPoint_y+' '+nextPoint_x+
                           ','+nextPoint_y;
                   }
               }

           }


           var lineGraph = document.createElementNS(c.SVG_NS,'path');
           lineG.appendChild(lineGraph);

           lineGraph.type = "multiLine_line";
           lineGraph.superE = lineG;
           lineGraph.addEventListener('mouseover',c.handleMouseover,false);
           lineGraph.addEventListener('mouseout',c.handleMouseout,false);

           if(c.chartType=="multiWavy"){
               lineGraph.setAttribute('d',bethelPath);
           }
           if(c.chartType=="multiLine"){
               lineGraph.setAttribute('d',linePath);
           }

           c.setAttr(lineGraph,{
               // 'd':linePath,
               'fill':'none',
               'stroke':colors[p],
               'stroke-width':0.5
           });

       }

        //设置标题
        c.setTitle();


        //FIXME:绘制横坐标标识  数据量大时 横坐标标识会挤在一起 解决方案：间隔取值绘制
        var x_g = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(x_g);
        /*=======================初始========================*/
        // for(var z=0;z<row;z++){
        //     var x_text = document.createElementNS(c.SVG_NS,'text');
        //     x_g.appendChild(x_text);
        //     x_text.textContent = totalV[z].date;
        //
        //     c.setAttr(x_text,{
        //         'font-size':labelFontSize-3,
        //         'font-family':c.titleFontFamily,
        //         'fill':c.titleColor,
        //         "x":x_margin*(z+1.3),
        //         "y":y_margin*12.7,
        //         "text-anchor":"middle",
        //         "height":c.titleFontSize*1.2,
        //         'letter-spacing':c.labelLetterSpacing,
        //         // 'transform':"rotate("+(36)+","+(x_margin+(z+0.4)*x_margin*tcount/row)+","+y_margin*12.6+")"
        //         'transform':"rotate("+(45)+","+((z+1.3)*x_margin)+","+y_margin*12.6+")"
        //     });
        // }

        /*=======================更改========================*/

        //如果横坐标过多 就间隔一定距离取值
        //假设横坐标最大显示数量为10
        var maxNum = 10;
        var gap = Math.ceil(row/maxNum);

        // console.log('横坐标数量'+row);
        // console.log('数据间距'+gap);

        for(var z=0;z<row;z++){
            if(z%gap == 0 || z==row-1){
                var x_text = document.createElementNS(c.SVG_NS,'text');
                x_g.appendChild(x_text);
                x_text.textContent = totalV[z].date;

                c.setAttr(x_text,{
                    'font-size':labelFontSize-3,
                    'font-family':c.titleFontFamily,
                    'fill':c.titleColor,
                    // "x":x_margin*(z+1.3),
                    "x":xPerMargin+x_margin*z,
                    "y":y_margin*12.7,
                    "text-anchor":"middle",
                    "height":c.titleFontSize*1.2,
                    'letter-spacing':c.labelLetterSpacing,
                    // 'transform':"rotate("+(36)+","+(x_margin+(z+0.4)*x_margin*tcount/row)+","+y_margin*12.6+")"
                    'transform':"rotate("+(45)+","+(xPerMargin+x_margin*z)+","+y_margin*12.6+")"
                });
            }

        }


        //绘制图例
        var cirG = document.createElementNS(c.SVG_NS,'g');
        c.svg.appendChild(cirG);

        //设置图例文字最大的长度:多少个字符
        var maxTextC = 0;
        for(var l=0;l<labels.length;l++){
            if(maxTextC < labels[l].length){
                maxTextC = labels[l].length;
            }
        }

        //每组图例占据的宽度
        var perW = (maxTextC+3)*labelFontSize;

        //图例所在区域的总宽度
        var labelsW = xPerMargin*10;

        //每行能放的图例数量
        var perLineCount = Math.floor(labelsW/perW);
        //总共需要多少行
        var rowsCount = Math.ceil(len/perLineCount);


        if(rowsCount == 1){//只需要一行显示
            //图例开始位置
            var startP= c.chartW*0.5 - len*0.5*perW;
            for(var m=0;m<len;m++){

                var cir = document.createElementNS(c.SVG_NS,'circle');
                cirG.appendChild(cir);

                c.setAttr(cir,{
                    'cx':startP+perW*m,
                    'cy':y_margin*13.8,
                    'r':labelFontSize*0.5,
                    'stroke':colors[m],
                    'fill':colors[m]
                });
                var keyText = document.createElementNS(c.SVG_NS,'text');
                cirG.appendChild(keyText);
                keyText.textContent = labels[m];

                c.setAttr(keyText,{
                    'font-size':labelFontSize,
                    'font-family':c.titleFontFamily,
                    'fill':c.titleColor,
                    "x":startP+perW*m+labelFontSize*0.8,
                    "y":y_margin*13.8,
                    "text-anchor":"left",
                    "dominant-baseline": "middle",
                    "height":c.titleFontSize*1.2
                });
            }
        }else { //需要多行显示

            //图例开始位置
            var startP= xPerMargin;
            var perLineH = y_margin*2/rowsCount;//每行图例所占高度

            //TODO:如果行高小于图例字体大小 需要重新计算行高和每行显示的数量
            if(perLineH < labelFontSize*0.9){
                labelFontSize = perLineH;
                perW = (maxTextC+3)*perLineH;
                perLineCount = Math.floor(labelsW/perW);
                rowsCount = Math.ceil(len/perLineCount);
            }

            //最后一行显示的数量
            var lastLineC = len - perLineCount*(rowsCount-1);

            //保存总循环次数
            var totalC = 0;

            for(var rc=0;rc<rowsCount;rc++){//多少行

                //最后一行且最后一行显示的数量小于每行能显示的数量
                perLineCount = (rc == rowsCount-1 && lastLineC<perLineCount) ? lastLineC : perLineCount;

                for(var pc=0;pc<perLineCount;pc++){//每行多少个

                    var cir = document.createElementNS(c.SVG_NS,'circle');
                    cirG.appendChild(cir);

                    c.setAttr(cir,{
                        'cx':startP+perW*pc,
                        'cy':y_margin*13.5 + rc*perLineH,
                        'r':labelFontSize*0.45,
                        'stroke':colors[totalC],
                        'fill':colors[totalC]
                    });
                    var keyText = document.createElementNS(c.SVG_NS,'text');
                    cirG.appendChild(keyText);

                    keyText.textContent = labels[totalC];


                    c.setAttr(keyText,{
                        'font-size':labelFontSize*0.9,
                        'font-family':c.titleFontFamily,
                        'fill':c.titleColor,
                        "x":startP+perW*pc+labelFontSize*0.8,
                        "y":y_margin*13.5 + rc*perLineH,
                        "text-anchor":"left",
                        "dominant-baseline": "middle",
                        "height":c.titleFontSize*1.2
                    });

                    totalC++;
                }
            }
            console.log(totalC);
        }
    }

    
    //绘制直线
    c.drawLine = function (points,closed) {
        var result = [];

        // Put "L x y" for each point
        points.forEach(function (point) {
            result.push('L', point.x, point.y);
        });


        if (points.length) {
            // Set the first element to M
            result[0] = 'M';

            // If it is a closed line, add Z
            if (closed) {
                result.push('Z');
            }
        }

        return result;
    }


    //TODO:导出图片
    c.convertToPic = function () {
        var svgXml = c.VisualElement.innerHTML;

        var image = new Image();
        image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml))); //给图片对象写入base64编码的svg流
        // image.src = 'data:image/svg+xml;base64,' + window.btoa(encodeURIComponent(svgXml));

        console.log(encodeURIComponent(svgXml));
        // image.src = 'image.png';

        var canvas = document.createElement('canvas');  //准备空画布
        canvas.width = c.chartW;
        canvas.height = c.chartH;
        var context = canvas.getContext('2d');  //取得画布的2d绘图上下文
        context.drawImage(image, 0, 0);
        // console.log(context);
        c.VisualElement.appendChild(canvas);


        var a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpg');  //将画布内的信息导出为png图片数据
        console.log(a.href);
        a.download = "MapByMathArtSys";  //设定下载名称
        // a.click(); //点击触发下载

    }

    //SVG绘制扇形区域 逆时针 ======>返回路径
    /**
     *
     * @param cx 圆心点x
     * @param cy 圆心点y
     * @param outsideR    外圆半径
     * @param startAngle    起始角度
     * @param endAngle      终止角度
     * @param insideR       内圆半径
     * @returns {string}    返回扇形区域路径
     */
    c.drawSector = function (cx,cy,outsideR,startAngle,endAngle,insideR) {


        if(Math.round((endAngle-startAngle)/Math.PI/2*10000)==10000){
            endAngle = endAngle*0.99999;
        }
        // startAngle = 0;
        // endAngle = Math.PI*2*0.999999;
        var paths = new Array();

        if(insideR == undefined || insideR == 0){
            var x1 = cx + outsideR * Math.cos(-startAngle),        //起始X点
                y1 = cy + outsideR * Math.sin(-startAngle),        //起始Y点
                x2 = cx + outsideR * Math.cos(-endAngle),        //结束X点
                y2 = cy + outsideR * Math.sin(-endAngle);        //结束Y点

            paths.push('M',cx,cy,'L',x1,y1,'A',outsideR,outsideR,0,+(endAngle-startAngle>Math.PI),0,x2,y2,'Z');
        }else {//有内圆的扇形区域
            var x1 = cx + insideR * Math.cos(-startAngle),        //内环起始X点
                y1 = cy + insideR * Math.sin(-startAngle),        //内环起始Y点
                x2 = cx + insideR * Math.cos(-endAngle),        //内环结束X点
                y2 = cy + insideR * Math.sin(-endAngle),        //内环结束Y点

                x3 = cx + outsideR * Math.cos(-startAngle),        //外环起始X点
                y3 = cy + outsideR * Math.sin(-startAngle),        //外环起始Y点
                x4 = cx + outsideR * Math.cos(-endAngle),        //外环结束X点
                y4 = cy + outsideR * Math.sin(-endAngle);        //外环结束Y点

            paths.push('M',x1,y1,'L',x3,y3,'A',outsideR,outsideR,0,+(endAngle-startAngle>Math.PI),0,x4,y4,'L',
                x2,y2,'A',insideR,insideR,0,+(Math.abs(startAngle-endAngle)>Math.PI),1,x1,y1);
        }



        return paths.join(' ');

    }


    /**
     * 绘制饼状图标示线
     * @param cx    饼状图圆心x
     * @param cy    饼状图圆心y
     * @param insideR   内心圆半径
     * @param outsideR  饼状图半径
     * @param angle     扇形图的二分线所在角度
     * @returns {{path: string, labelX: number, labelY: *}} 标示线路径 和 标识label左上角位置
     */
    c.drawTagLine = function (cx,cy,insideR,outsideR,transDis,angle) {

        var pathArr = new Array(),
            peakX = 0,
            peakY = 0,
            labelX = 0,
            rotateA = 0;

        //起始点 在内圆与外圆之间 拐点在外圆之外，外圆半径+交互时移动距离
        var startPiont_x  = cx +(insideR + outsideR)*0.5*Math.cos(-angle);
        var startPiont_y  = cy +(insideR + outsideR)*0.5*Math.sin(-angle);

        var endPiont_x  = cx +(outsideR+transDis+6)*Math.cos(-angle);
        var endPiont_y  = cy +(outsideR+transDis+6)*Math.sin(-angle);

        pathArr.push('M',startPiont_x,startPiont_y,'L',endPiont_x,endPiont_y);

        if((angle >= 0 && angle <= Math.PI*0.5) || (angle > Math.PI*1.5 && angle <= Math.PI*2)){//右侧半圆


            peakX = endPiont_x+transDis;
            peakY = endPiont_y;
            labelX = peakX + 5;

            if(labelX>c.chartW - c.titleFontSize*15 || peakY > c.chartH-c.titleFontSize*15){
                labelX = c.chartW - c.titleFontSize*5;
                labelX = endPiont_x;

                if(angle >= 0 && angle <= Math.PI*0.5){
                    rotateA = (Math.PI*0.5-angle)*c.rad2deg;
                }else {
                    rotateA = -(Math.PI*0.5-Math.PI*2+angle)*c.rad2deg;
                }

            }else {
                pathArr.push('L',peakX,peakY);
                rotateA = 0;
            }

        }else {//左侧半圆

            peakX = endPiont_x-transDis;
            peakY = endPiont_y;
            labelX = endPiont_x - c.titleFontSize*5;
            if(labelX<30 || peakY > c.chartH-c.titleFontSize*15){
                labelX = endPiont_x;

                if(angle > Math.PI*0.5 && angle <= Math.PI){
                    rotateA = -(Math.PI*0.5-Math.PI+angle)*c.rad2deg;
                }else {
                    rotateA = (Math.PI*1.5-angle)*c.rad2deg;
                }

            }else {
                pathArr.push('L',peakX,peakY);
                rotateA = 0;
            }

        }



        // return 'M'+startPiont_x+' '+startPiont_y+'L'+endPiont_x+' '+endPiont_y;
        return {path:pathArr.join(' '),
                labelX:labelX,
                labelY:endPiont_y,
                rotateA:rotateA
                };
    }

    //TODO:配置图表中心点和饼图半径
    c.setCenter = function () {
        //短边长
        var r = 0;
        if(c.chartW<c.chartH){//图表高度大于宽度时
            r = c.chartW;
            var marginL = c.chartH-c.chartW;

            //是否显示标题
            if(c.isShowTitle){

                //是否显示图例 图例显示在下方
                if(c.isShowCutline){
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartW*0.5;
                    c.pieCenterY = c.chartW*0.5;
                    //饼图半径
                    c.pieR = r*0.32;
                    c.cutlinePos = "down";
                }else {
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartW*0.5;
                    c.pieCenterY = c.chartW*0.5;
                    //饼图半径
                    c.pieR = r*0.35;
                }

            }else {
                //是否显示图例 图例显示在下方
                if(c.isShowCutline){
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartW*0.5;
                    c.pieCenterY = c.chartW*0.5;
                    //饼图半径
                    c.pieR = r*0.33;
                    c.cutlinePos = "down";
                }else {
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartW*0.5;
                    c.pieCenterY = c.chartW*0.5;
                    //饼图半径
                    c.pieR = r*0.37;
                }
            }

        }else {//图表高度小于宽度时
            r = c.chartH;

            //是否显示标题
            if(c.isShowTitle){

                //是否显示图例 图例显示在右方
                if(c.isShowCutline){
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartH*0.5;
                    c.pieCenterY = c.chartH*0.5;
                    //饼图半径
                    c.pieR = r*0.32;
                    c.cutlinePos = "right";
                }else {
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartH*0.5;
                    c.pieCenterY = c.chartH*0.5;
                    //饼图半径
                    c.pieR = r*0.35;
                }
            }else {
                //是否显示图例 图例显示在右方
                if(c.isShowCutline){
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartH*0.5;
                    c.pieCenterY = c.chartH*0.5;
                    //饼图半径
                    c.pieR = r*0.33;
                    c.cutlinePos = "right";
                }else {
                    //饼图圆心点坐标
                    c.pieCenterX = c.chartH*0.5;
                    c.pieCenterY = c.chartH*0.5;
                    //饼图半径
                    c.pieR = r*0.37;
                }
            }
        }

        c.pieTransDis = c.pieR*0.1;
    }


    /************************** 事件处理 *****************************/
    //单折线图处理手指点击屏幕
    c.handleTouchstart = function (event) {
        event.preventDefault();
        var touch = event.targetTouches[0];
        var et = touch.target;

        var box = et.getBBox();
        var x = box.x,
            y = box.y,
            w = box.width,
            h = box.height;
        //设置配置参数
        var configs = {
            title:et.title,
            color:et.getAttribute('fill'),
            value:et.value
        }
        c.tip.setFrame(x+w*0.5-44,y-44,88,44,configs);
        c.svg.appendChild(c.tip);

    }

    //移动端触摸屏幕
    c.handleTouch = function (event) {

        event.preventDefault();
        var touch = event.targetTouches[0];
        var et = touch.target;

        var x = touch.clientX,
            y = touch.clientY;

        //设置配置参数
        var configs = {
            title:et.title,
            color:et.getAttribute('fill'),
            value:et.value
        }

        c.tip.setFrame(x-c.pieR*0.5,y-c.pieR*0.64,c.pieR*0.8,c.pieR*0.4,configs);
        c.svg.appendChild(c.tip);
    }

    //移动端手指离开
    c.handleTouchend = function (event) {

        setTimeout(function () {
            if(c.svg.contains(c.tip)){
                c.svg.removeChild(c.tip);
            }
        },500);

    }


    //鼠标置于元素上方
    c.handleMouseover = function (event) {


        var et = event.target;
        et.setAttribute("fill",c.svgrender.lightenDarkenColor(et.getAttribute('fill'),10));

        if(et.type == 'pie'){//平面饼图

            var superE = et.superE;
            var angle = (et.startA + et.endA)*0.5;

            // var transx = et.r*0.3*Math.cos(-angle),
            //     transy = et.r*0.3*Math.sin(-angle);

            // et.setAttribute('transform','rotate('+45+','+c.chartW*0.5+','+c.chartH*0.5+')');


            var transx= 0,
                transy = 0;
            var translateL = 0;

            function step() {
                translateL += 1;
                transx = translateL*Math.cos(-angle);
                transy = translateL*Math.sin(-angle);
                superE.setAttribute('transform','translate('+(transx)+','+(transy)+')');
                if(translateL < c.pieTransDis){
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);


        }else if(et.type == "multiLine_line" || et.type == "multiLine_point") {
            var superE = et.superE;

           if(et.type == "multiLine_line"){

                   superE.childNodes.forEach(function (el) {
                       if(el.type == "multiLine_line"){
                           el.setAttribute("stroke",c.svgrender.lightenDarkenColor(el.getAttribute('stroke'),20));
                           el.setAttribute('fill','none');
                           el.setAttribute('stroke-width',0.5*1.5);
                       }else {
                           el.setAttribute("fill",c.svgrender.lightenDarkenColor(el.getAttribute('fill'),20));
                           el.setAttribute("r",el.getAttribute('r')*1.3);
                       }
                   });

           }else {
               var box = et.getBBox();
               var x = box.x,
                   y = box.y,
                   w = box.width,
                   h = box.height;
               //设置配置参数
               var configs = {
                   title:et.title,
                   color:et.getAttribute('fill'),
                   value:et.value,
                   subTitle:et.subTitle
               }
               c.tip.setFrame(x+w*0.5-44,y-44,88,44,configs);
               c.svg.appendChild(c.tip);
           }

        }else {

                var box = et.getBBox();
                var x = box.x,
                    y = box.y,
                    w = box.width,
                    h = box.height;
                //设置配置参数
                var configs = {
                    title:et.title,
                    color:et.getAttribute('fill'),
                    value:et.value,
                    subTitle:et.subTitle
                }
                c.tip.setFrame(x+w*0.5-44,y-44,88,44,configs);
            c.svg.appendChild(c.tip);
        }
    }


    //当前选择的元素
    c.curSelectE = undefined;
    //前一个选择的元素
    c.preSelectE = undefined;
    //是否在旋转
    c.isRotate = false;


    //鼠标点击
    c.handleMousedown = function (event) {

        event.preventDefault();

        //点击的对象
        var et = event.target,
            startA = et.startA,
            endA = et.endA;

        var superE = et.superE;
        var superEE = et.superEE;

        var middleA = (startA + endA)*0.5;
        var rotateA = 0;
        var timer;

        //设置选中的扇形区数据
        c.clickedDataContext = et.dataContext;

        c.curSelectE = et;

        console.log(c.clickedDataContext);

        if(c.preSelectE == undefined){
            c.preSelectE = et;
        }else if(c.curSelectE != c.preSelectE && et.superE != c.preSelectE.superE){

            c.curSelectE = et;
        }else {

            return;
        }


        cancelAnimationFrame(timer);

        if(middleA < Math.PI*0.5){//0度在水平向右，逆时针增加
            rotateA = (middleA + Math.PI*0.5)*c.rad2deg;

        }else if(middleA <= Math.PI*1.5){
            rotateA = -(Math.PI*1.5 - middleA)*c.rad2deg;

        }else {
            rotateA = (middleA - Math.PI*1.5)*c.rad2deg;

        }


        var stepA = 0;
        //处理旋转动画
        function step() {

            if(rotateA < 0){

                stepA -= 1;
                if(stepA > rotateA){
                    superEE.setAttribute('transform','rotate('+stepA+','+c.pieCenterX+','+c.pieCenterY+')');
                    timer = requestAnimationFrame(step);
                }else {
                    c.isRotate = true;
                }
            }else {

                stepA += 2;
                if(stepA < rotateA){
                    superEE.setAttribute('transform','rotate('+stepA+','+c.pieCenterX+','+c.pieCenterY+')');
                    timer = requestAnimationFrame(step);
                }else {
                    c.isRotate = true;
                }
            }
        }

        timer = requestAnimationFrame(step);


    }

    //鼠标离开
    c.handleMouseup = function (event) {
        var et = event.target;
        c.preSelectE = c.curSelectE;
        // console.log(event.target);
    }

    //鼠标移动
    c.handleMousemove = function (event) {

        return;

        var et = event.target;
        var x,y;


        //设置配置参数
        var configs = {
            title:et.title,
            color:et.getAttribute('fill'),
            value:et.value
        }


        if(c.y_scale > c.x_scale){
            // console.log('1');
            if(c.chartW == 800){
                // console.log('10');

                x = (event.offsetX-c.chartW*0.5)*c.y_scale +c.chartW*0.5;
                y = event.offsetY*c.y_scale;
                c.tip.setFrame(x-44-5,y-44-5,88,44,configs);
            }else {
                // console.log('11');
                console.log(event.offsetX);
                x = event.offsetX;
                y = event.offsetY;
                c.tip.setFrame(x-44-5,y-88-5,88,44,configs);
            }


        }else if(c.y_scale<c.x_scale){
            console.log('2');
            y = (event.offsetY-c.chartH*0.5)*c.x_scale +c.chartH*0.5;
            x = event.offsetX*c.x_scale;
            c.tip.setFrame(x-44+5,y-88-5,88,44,configs);
        }else {
            console.log('3');
            x = event.offsetX;
            y = event.offsetY;
            c.tip.setFrame(x-44-5,y-44-5,88,44,configs);
        }


        c.svg.appendChild(c.tip);


        // c.preOffsetX = x;
        // c.preOffsetY = y;

    }

    //鼠标离开元素
    c.handleMouseout = function (event) {
        var et = event.target;
        et.setAttribute('fill',c.svgrender.lightenDarkenColor(et.getAttribute('fill'),-10));

        if(et.type == 'pie'){

            var angle = (et.startA + et.endA)*0.5;

            // var transx = et.r*0.3*Math.cos(-angle),
            //     transy = et.r*0.3*Math.sin(-angle);

            var superE = et.superE;

            var transx= 0,
                transy = 0;

            var translateL = et.r*0.2;

            //改变选中元素的位置
            function step() {
                translateL -= 1;
                transx = translateL*Math.cos(-angle);
                transy = translateL*Math.sin(-angle);
                superE.setAttribute('transform','translate('+(transx)+','+(transy)+')');
                if(translateL > 0){
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);

            if(et.insideR == 0){

                for(var i=0;i<c.svg.childNodes.length;i++){
                    if(c.svg.childNodes[i] === c.tip){
                        c.svg.removeChild(c.tip);
                    }else {

                    }
                }
                // console.log(c.tip);
                // c.svg.removeChild(c.tip);
            }



        }else if(et.type == "multiLine_line" || et.type == "multiLine_point") {
            var superE = et.superE;
            if(et.type == "multiLine_line"){

                superE.childNodes.forEach(function (el) {
                    if(el.type == "multiLine_line"){
                        el.setAttribute("stroke",c.svgrender.lightenDarkenColor(el.getAttribute('stroke'),-20));
                        el.setAttribute('fill','none');
                        el.setAttribute('stroke-width',0.5);
                    }else {
                        el.setAttribute("fill",c.svgrender.lightenDarkenColor(el.getAttribute('fill'),-20));
                        el.setAttribute("r",el.getAttribute('r')/1.3);
                    }
                });

            }else {
                c.svg.removeChild(c.tip);

            }
        }else {
            c.svg.removeChild(c.tip);
        }

    }


    //创建时调用
    c.onLoad = function () {
        // c.svg.setAttribute("width",c.chartW);
        // c.svg.setAttribute("height",c.chartH);
        c.VisualElement.style.width = c.chartW+'px';
        c.VisualElement.style.height = c.chartH+'px';
        // c.svg.setAttribute('viewBox','0,0,400,250');

        c.setCenter();

        //TODO:外边框
        // var rect = document.createElementNS(c.SVG_NS,"rect");
        // c.svg.appendChild(rect);
        // rect.setAttribute("x","0");
        // rect.setAttribute("y","0");
        // rect.setAttribute("width",c.chartW);
        // rect.setAttribute("height",c.chartH);
        // rect.setAttribute("fill","red");
        // rect.setAttribute("stroke","red");
        // rect.setAttribute("stroke-width","1");


        var shapeArgs = {
            x:c.chartW/2,
            y:c.chartH/2,
            start:0,
            end:Math.PI*0.8,
            r:200,
            innerR:150,
            depth:40,
            alpha:Math.PI*30/180,
            beta:Math.PI*0/180
        };

    }
    c.onLoad();

    return c;
}
DBFX.Serializer.ChartsSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        DBFX.Serializer.DeSerialProperty("chartW", c, xe);
        DBFX.Serializer.DeSerialProperty("chartH", c, xe);
        // DBFX.Serializer.DeSerialProperty("Configs", c, xe);
        DBFX.Serializer.DeSerialProperty("ChartType", c, xe);
        DBFX.Serializer.DeSerialProperty("InsideR", c, xe);
        DBFX.Serializer.DeSerialProperty("ChartTitle", c, xe);
        DBFX.Serializer.DeSerialProperty("TitleColor", c, xe);
        DBFX.Serializer.DeSerialProperty("TitleFontSize", c, xe);
        DBFX.Serializer.DeSerialProperty("TitleFontFamily", c, xe);
        DBFX.Serializer.DeSerialProperty("IsShowTitle", c, xe);
        DBFX.Serializer.DeSerialProperty("Option3d", c, xe);
        DBFX.Serializer.DeSerialProperty("ColorSerie", c, xe);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {
        DBFX.Serializer.SerialProperty("chartW", c.chartW, xe);
        DBFX.Serializer.SerialProperty("chartH", c.chartH, xe);
        // DBFX.Serializer.SerialProperty("Configs", c.Configs, xe);
        DBFX.Serializer.SerialProperty("ChartType", c.ChartType, xe);
        DBFX.Serializer.SerialProperty("InsideR", c.InsideR, xe);
        DBFX.Serializer.SerialProperty("ChartTitle", c.ChartTitle, xe);
        DBFX.Serializer.SerialProperty("TitleColor", c.TitleColor, xe);
        DBFX.Serializer.SerialProperty("TitleFontSize", c.TitleFontSize, xe);
        DBFX.Serializer.SerialProperty("TitleFontFamily", c.TitleFontFamily, xe);
        DBFX.Serializer.SerialProperty("IsShowTitle", c.IsShowTitle, xe);
        DBFX.Serializer.SerialProperty("Option3d", c.Option3d, xe);
        DBFX.Serializer.SerialProperty("ColorSerie", c.ColorSerie, xe);
    }
}
DBFX.Design.ControlDesigners.ChartsDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/ChartsDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            //是否显示标题设计器设置项
            od.FormContext.Form.FormControls.cbxIsShowTitle.ItemSource =    [{Text:"显示",Value:true,ImageUrl:""},
                                                            {Text:"不显示",Value:false,ImageUrl:""}];

            //是否显示内圆设计器设置项
            od.FormContext.Form.FormControls.cbxIsShowInsideC.ItemSource =  [{Text:"显示",Value:true,ImageUrl:""},
                                                            {Text:"不显示",Value:false,ImageUrl:""}];
        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图表设置";
    return obdc;
}



/**
 * 提示标签
 *
 * @returns {SVGClipPathElement*}
 * @constructor
 */
DBFX.Web.DBChart.TipLabel = function () {
    var tip = document.createElementNS('http://www.w3.org/2000/svg','g');

    tip.SVG_NS = 'http://www.w3.org/2000/svg';
    tip.isShow = true;

    //初始化时调用
    tip.initTip = function () {
        tip.setAttribute('class','tip');
        //外边框
        tip.boundingP = document.createElementNS(tip.SVG_NS,'path');
        tip.appendChild(tip.boundingP);
        //标记圆
        tip.cir = document.createElementNS(tip.SVG_NS,'circle');
        tip.appendChild(tip.cir);
        //标题
        tip.titleE = document.createElementNS(tip.SVG_NS,'text');
        tip.appendChild(tip.titleE);

        //副标题
        tip.subTitleE = document.createElementNS(tip.SVG_NS,'text');
        tip.appendChild(tip.subTitleE);

        //数值
        tip.valueE = document.createElementNS(tip.SVG_NS,'text');
        tip.appendChild(tip.valueE);


    }
    tip.initTip();


    //设置尺寸和样式
    tip.setFrame = function (x,y,w,h,configs) {
        if(!tip.isShow || x==undefined || y==undefined || h==undefined || w==undefined){
            return;
        }

        var pathV = 'M'+(Math.floor(x)+0.5)+' '+(Math.floor(y)+0.5)+
            'L'+(Math.floor(x+w)+0.5)+' '+(Math.floor(y)+0.5)+
            'L'+(Math.floor(x+w)+0.5)+' '+(Math.floor(y+h*0.8)+0.5)+
            'L'+ (Math.floor(x+0.5*w+0.15*h*Math.tan(Math.PI*30/180))+0.5)+' '+(Math.floor(y+h*0.8)+0.5)+
            'L'+(Math.floor(x+0.5*w)+0.5)+' '+(Math.floor(y+h*0.95)+0.5)+
            'L'+(Math.floor(x+0.5*w-0.15*h*Math.tan(Math.PI*30/180))+0.5)+' '+(Math.floor(y+h*0.8)+0.5)+
            'L'+(Math.floor(x)+0.5)+' '+(Math.floor(y+h*0.8)+0.5)+
            'Z';
        tip.boundingP.setAttribute('d',pathV);
        tip.boundingP.setAttribute('stroke','#7cb5ec');
        tip.boundingP.setAttribute('fill','white');
        tip.boundingP.setAttribute('stroke-width',1);
        tip.boundingP.setAttribute('fill-opacity',0.5);
        tip.boundingP.setAttribute('stroke-opacity',0.5);


        //设置标记颜色
        tip.cir.setAttribute('cx',x+w*0.08);
        tip.cir.setAttribute('cy',y+h*0.15);
        tip.cir.setAttribute('r',h*0.1);
        tip.cir.setAttribute('stroke',configs.color);
        tip.cir.setAttribute('fill',configs.color);

        //设置标题
        tip.titleE.textContent = configs.title;
        tip.titleE.setAttribute('font-size',h*0.22);
        tip.titleE.setAttribute('font-family','华文宋体');
        tip.titleE.setAttribute('fill','black');
        tip.titleE.setAttribute("x",x+w*0.5);
        tip.titleE.setAttribute("y",y+h*0.15);
        // tip.titleE.setAttribute("text-anchor","left");
        tip.titleE.setAttribute("height",12*1.2);
        tip.titleE.setAttribute("text-anchor",'middle');
        tip.titleE.setAttribute("dominant-baseline",'middle');

        //设置副标题
        if(configs.subTitle){
            tip.subTitleE.textContent = configs.subTitle;

        }else {
            tip.subTitleE.textContent = '';
        }


        tip.subTitleE.setAttribute('font-size',h*0.22);
        tip.subTitleE.setAttribute('font-family','方正');
        tip.subTitleE.setAttribute('fill','black');
        tip.subTitleE.setAttribute("x",x+w*0.5);
        tip.subTitleE.setAttribute("y",y+h*0.4);
        // tip.subTitleE.setAttribute("text-anchor","left");
        tip.subTitleE.setAttribute("height",12*1.2);
        tip.subTitleE.setAttribute("text-anchor",'middle');
        tip.subTitleE.setAttribute("dominant-baseline",'middle');



        //设置数值
        tip.valueE.textContent = configs.value;
        tip.valueE.setAttribute('font-size',h*0.22);
        tip.valueE.setAttribute('font-family','方正');
        tip.valueE.setAttribute('fill','black');
        tip.valueE.setAttribute("x",x+w*0.5);
        tip.valueE.setAttribute("y",y+h*0.65);
        tip.valueE.setAttribute("text-anchor","middle");
        tip.valueE.setAttribute("width",222);
        tip.valueE.setAttribute("height",12*1.2);
        tip.valueE.setAttribute("dominant-baseline",'middle');
    }


    //从图表中移除
    tip.remove = function () {
        // //TODO:删除所有子元素---不确定是否会产生Bug
        // while (tip.childNodes.length){
        //     tip.childNodes.forEach(function (child) {
        //         tip.removeChild(child);
        //         // child = null;
        //     });
        // }
        // c.svg.removeChild(tip);

        tip.isShow = false;
        tip.setFrame();
    }

    return tip;
}


//定义元素类
DBFX.Web.DBChart.SVGElement = function (c) {
    var e = new Object();
    e.opacity = 1;
    e.SVG_NS = 'http://www.w3.org/2000/svg';
    e.textProps = ['direction', 'fontSize', 'fontWeight', 'fontFamily',
        'fontStyle', 'color', 'lineHeight', 'width', 'textAlign',
        'textDecoration', 'textOverflow', 'textOutline'
    ];

    e.init = function(renderer, nodeName) {

        /**
         * The primary DOM node. Each `SVGElement` instance wraps a main DOM
         * node, but may also represent more nodes.
         *
         * @name  element
         * @memberOf SVGElement
         * @type {SVGDOMNode|HTMLDOMNode}
         */
        this.element = nodeName === 'span' ?
            c.createElement(nodeName) :
            doc.createElementNS(this.SVG_NS, nodeName);

        /**
         * The renderer that the SVGElement belongs to.
         *
         * @name renderer
         * @memberOf SVGElement
         * @type {SVGRenderer}
         */
        this.renderer = renderer;
    }

    e.destroy = function() {
        var wrapper = this,
            element = wrapper.element || {},
            parentToClean =
                wrapper.renderer.isSVG &&
                element.nodeName === 'SPAN' &&
                wrapper.parentGroup,
            grandParent,
            ownerSVGElement = element.ownerSVGElement,
            i,
            clipPath = wrapper.clipPath;

        // remove events
        element.onclick = element.onmouseout = element.onmouseover =
            element.onmousemove = element.point = null;
        stop(wrapper); // stop running animations

        if (clipPath && ownerSVGElement) {
            // Look for existing references to this clipPath and remove them
            // before destroying the element (#6196).
            each(
                // The upper case version is for Edge
                ownerSVGElement.querySelectorAll('[clip-path],[CLIP-PATH]'),
                function(el) {
                    var clipPathAttr = el.getAttribute('clip-path'),
                        clipPathId = clipPath.element.id;
                    // Include the closing paranthesis in the test to rule out
                    // id's from 10 and above (#6550). Edge puts quotes inside
                    // the url, others not.
                    if (
                        clipPathAttr.indexOf('(#' + clipPathId + ')') > -1 ||
                        clipPathAttr.indexOf('("#' + clipPathId + '")') > -1
                    ) {
                        el.removeAttribute('clip-path');
                    }
                }
            );
            wrapper.clipPath = clipPath.destroy();
        }

        // Destroy stops in case this is a gradient object
        if (wrapper.stops) {
            for (i = 0; i < wrapper.stops.length; i++) {
                wrapper.stops[i] = wrapper.stops[i].destroy();
            }
            wrapper.stops = null;
        }

        // remove element
        wrapper.safeRemoveChild(element);


        wrapper.destroyShadows();


        // In case of useHTML, clean up empty containers emulating SVG groups
        // (#1960, #2393, #2697).
        while (
            parentToClean &&
            parentToClean.div &&
            parentToClean.div.childNodes.length === 0
            ) {
            grandParent = parentToClean.parentGroup;
            wrapper.safeRemoveChild(parentToClean.div);
            delete parentToClean.div;
            parentToClean = grandParent;
        }

        // remove from alignObjects
        if (wrapper.alignTo) {
            erase(wrapper.renderer.alignedObjects, wrapper);
        }

        objectEach(wrapper, function(val, key) {
            delete wrapper[key];
        });

        return null;
    }


    return e;
}


//渲染器
DBFX.Web.DBChart.SVGRender = function (C) {

    var render = new Object();


    render.createElement = function(nodeName) {
        var wrapper = new DBFX.Web.DBChart.SVGElement();
        wrapper.init(this, nodeName);
        return wrapper;
    }

    render.g = function (name) {
        var elem = render.createElement('g');
        return name ? elem.attr({
            'class': 'highcharts-' + name
        }) : elem;
    }

    // set to 0-PI range
    render.toZeroPIRange = function (angle) {
        angle = angle % (2 * Math.PI);
        if (angle > Math.PI) {
            angle = 2 * Math.PI - angle;
        }
        return angle;
    }

   //绘制直线方法
    render.toLinePath = function (points, closed) {
        var result = [];

        // Put "L x y" for each point
        points.forEach(function (point) {
            result.push('L', point.x, point.y);
        });


        if (points.length) {
            // Set the first element to M
            result[0] = 'M';

            // If it is a closed line, add Z
            if (closed) {
                result.push('Z');
            }
        }

        return result;
    }

    //绘制不连续线段
    render.toLineSegments = function (points) {
        var result = [];

        var m = true;
        points.forEach(function (point) {
            result.push(m ? 'M' : 'L', point.x, point.y);
            m = !m;
        });
        return result;
    }



    //多面体:polyhedron
    render.polyhedron = function (args) {
        var renderer = render,
            result = render.g(),
            destroy = result.destroy;


        result.attr({
            'stroke-linejoin': 'round'
        });


        result.faces = [];


        // destroy all children
        result.destroy = function() {
            for (var i = 0; i < result.faces.length; i++) {
                result.faces[i].destroy();
            }
            return destroy.call(this);
        };

        wrap(result, 'attr', function(proceed, hash, val, complete, continueAnimation) {
            if (typeof hash === 'object' && defined(hash.faces)) {
                while (result.faces.length > hash.faces.length) {
                    result.faces.pop().destroy();
                }
                while (result.faces.length < hash.faces.length) {
                    result.faces.push(renderer.face3d().add(result));
                }
                for (var i = 0; i < hash.faces.length; i++) {
                    result.faces[i].attr(hash.faces[i], null, complete, continueAnimation);
                }
                delete hash.faces;
            }
            return proceed.apply(this, [].slice.call(arguments, 1));
        });

        wrap(result, 'animate', function(proceed, params, duration, complete) {
            if (params && params.faces) {
                while (result.faces.length > params.faces.length) {
                    result.faces.pop().destroy();
                }
                while (result.faces.length < params.faces.length) {
                    result.faces.push(renderer.face3d().add(result));
                }
                for (var i = 0; i < params.faces.length; i++) {
                    result.faces[i].animate(params.faces[i], duration, complete);
                }
                delete params.faces;
            }
            return proceed.apply(this, [].slice.call(arguments, 1));
        });

        return result.attr(args);
    }

    //立方体
    render.cuboidPath = function(shapeArgs) {
        var x = shapeArgs.x,
            y = shapeArgs.y,
            z = shapeArgs.z,
            h = shapeArgs.height,
            w = shapeArgs.width,
            d = shapeArgs.depth,
            // chart = charts[this.chartIndex],
            front,
            back,
            top,
            bottom,
            left,
            right,
            shape,
            path1,
            path2,
            path3,
            isFront,
            isTop,
            isRight,
            // options3d = chart.options.chart.options3d,
            //内旋角
            // alpha = options3d.alpha,
            alpha = 0,

            // Priority for x axis is the biggest,
            // because of x direction has biggest influence on zIndex
            incrementX = 10000,
            // y axis has the smallest priority in case of our charts
            // (needs to be set because of stacking)
            incrementY = 10,
            incrementZ = 100,
            zIndex = 0;

        // The 8 corners of the cube
        var pArr = [{
            x: x,
            y: y,
            z: z
        }, {
            x: x + w,
            y: y,
            z: z
        }, {
            x: x + w,
            y: y + h,
            z: z
        }, {
            x: x,
            y: y + h,
            z: z
        }, {
            x: x,
            y: y + h,
            z: z + d
        }, {
            x: x + w,
            y: y + h,
            z: z + d
        }, {
            x: x + w,
            y: y,
            z: z + d
        }, {
            x: x,
            y: y,
            z: z + d
        }];


        // apply perspective
        pArr = C.perspective(pArr);

        // helper method to decide which side is visible
        function mapPath(i) {
            return pArr[i];
        }

        /*
         * First value - path with specific side
         * Second  value - added information about side for later calculations.
         * Possible second values are 0 for path1, 1 for path2 and -1 for no path choosed.
         */
        var pickShape = function(path1, path2) {
            var ret = [
                [], -1
            ];
            path1 = C.map(path1, mapPath);
            path2 = C.map(path2, mapPath);

            if (C.shapeArea(path1) < 0) {
                ret = [path1, 0];
            } else if (C.shapeArea(path2) < 0) {
                ret = [path2, 1];
            }
            return ret;
        };


        // front or back
        front = [3, 2, 1, 0];
        back = [7, 6, 5, 4];
        shape = pickShape(front, back);

        path1 = shape[0];
        isFront = shape[1];


        // top or bottom
        top = [1, 6, 7, 0];
        bottom = [4, 5, 2, 3];
        shape = pickShape(top, bottom);
        path2 = shape[0];
        isTop = shape[1];

        // side
        right = [1, 2, 5, 6];
        left = [0, 7, 4, 3];
        shape = pickShape(right, left);
        path3 = shape[0];
        isRight = shape[1];

        /*
         * New block used for calculating zIndex. It is basing on X, Y and Z position of specific columns.
         * All zIndexes (for X, Y and Z values) are added to the final zIndex, where every value has different priority.
         * The biggest priority is in X and Z directions, the lowest index is for stacked columns (Y direction and the same X and Z positions).
         * Big differents between priorities is made because we need to ensure that even for big changes in Y and Z parameters
         * all columns will be drawn correctly.
         */

        if (isRight === 1) {
            zIndex += incrementX * (1000 - x);
        } else if (!isRight) {
            zIndex += incrementX * x;
        }


        zIndex += incrementY * (!isTop ||
            (alpha >= 0 && alpha <= 180 || alpha < 360 && alpha > 357.5) ? // Numbers checked empirically
                C.chartH - y : 10 + y
        );

        if (isFront === 1) {
            zIndex += incrementZ * (z);
        } else if (!isFront) {
            zIndex += incrementZ * (1000 - z);
        }

        zIndex = -Math.round(zIndex);

        return [
            this.toLinePath(path1, true),
            this.toLinePath(path2, true),
            this.toLinePath(path3, true),
            zIndex
        ]; // #4774
    }

    //曲线
    render.curveTo = function(cx, cy, rx, ry, start, end, dx, dy) {
        var result = [],
            arcAngle = end - start;
        var dFactor = (4 * (Math.sqrt(2) - 1) / 3) / (Math.PI / 2);

        if ((end > start) && (end - start > Math.PI / 2 + 0.0001)) {
            result = result.concat(render.curveTo(cx, cy, rx, ry, start, start + (Math.PI / 2), dx, dy));
            result = result.concat(render.curveTo(cx, cy, rx, ry, start + (Math.PI / 2), end, dx, dy));
            return result;
        }
        if ((end < start) && (start - end > Math.PI / 2 + 0.0001)) {
            result = result.concat(render.curveTo(cx, cy, rx, ry, start, start - (Math.PI / 2), dx, dy));
            result = result.concat(render.curveTo(cx, cy, rx, ry, start - (Math.PI / 2), end, dx, dy));
            return result;
        }
        return [
            'C',
            cx + (rx * Math.cos(start)) - ((rx * dFactor * arcAngle) * Math.sin(start)) + dx,
            cy + (ry * Math.sin(start)) + ((ry * dFactor * arcAngle) * Math.cos(start)) + dy,
            cx + (rx * Math.cos(end)) + ((rx * dFactor * arcAngle) * Math.sin(end)) + dx,
            cy + (ry * Math.sin(end)) - ((ry * dFactor * arcAngle) * Math.cos(end)) + dy,
            cx + (rx * Math.cos(end)) + dx,
            cy + (ry * Math.sin(end)) + dy
        ];
    }

    //！！！平面圆弧转换成立体圆弧，返回各个面的轨迹数据
    render.arc3dPath = function(shapeArgs) {
        var PI = Math.PI,
            sin = Math.sin,
            cos = Math.cos;
        var curveTo = render.curveTo,
            toZeroPIRange = render.toZeroPIRange;


        var cx = shapeArgs.x, // x coordinate of the center
            cy = shapeArgs.y, // y coordinate of the center
            start = shapeArgs.start, // start angle
            end = shapeArgs.end - 0.00001, // end angle
            r = shapeArgs.r, // radius
            ir = shapeArgs.innerR, // inner radius
            d = shapeArgs.depth, // depth
            alpha = shapeArgs.alpha, // alpha rotation of the chart
            beta = shapeArgs.beta; // beta rotation of the chart

        // Derived Variables 推导变量
        var cs = Math.cos(start), // cosinus of the start angle
            ss = Math.sin(start), // sinus of the start angle
            ce = Math.cos(end), // cosinus of the end angle
            se = Math.sin(end), // sinus of the end angle
            rx = r * Math.cos(beta), // x-radius
            ry = r * Math.cos(alpha), // y-radius
            irx = ir * Math.cos(beta), // x-radius (inner)
            iry = ir * Math.cos(alpha), // y-radius (inner)
            dx = d * Math.sin(beta), // distance between top and bottom in x
            dy = d * Math.sin(alpha); // distance between top and bottom in y

        // TOP
        var top = ['M', cx + (rx * cs), cy + (ry * ss)];
        top = top.concat(render.curveTo(cx, cy, rx, ry, start, end, 0, 0));
        top = top.concat([
            'L', cx + (irx * ce), cy + (iry * se)
        ]);

        top = top.concat(render.curveTo(cx, cy, irx, iry, end, start, 0, 0));
        top = top.concat(['Z']);
        // OUTSIDE
        var b = (beta > 0 ? Math.PI / 2 : 0),
            a = (alpha > 0 ? 0 : Math.PI / 2);

        var start2 = start > -b ? start : (end > -b ? -b : start),
            end2 = end < Math.PI - a ? end : (start < Math.PI - a ? Math.PI - a : end),
            midEnd = 2 * Math.PI - a;

        // When slice goes over bottom middle, need to add both, left and right outer side.
        // Additionally, when we cross right hand edge, create sharp edge. Outer shape/wall:
        //
        //            -------
        //          /    ^    \
        //    4)   /   /   \   \  1)
        //        /   /     \   \
        //       /   /       \   \
        // (c)=> ====         ==== <=(d)
        //       \   \       /   /
        //        \   \<=(a)/   /
        //         \   \   /   / <=(b)
        //    3)    \    v    /  2)
        //            -------
        //
        // (a) - inner side
        // (b) - outer side
        // (c) - left edge (sharp)
        // (d) - right edge (sharp)
        // 1..n - rendering order for startAngle = 0, when set to e.g 90, order changes clockwise (1->2, 2->3, n->1) and counterclockwise for negative startAngle

        var out = ['M', cx + (rx * cos(start2)), cy + (ry * sin(start2))];
        out = out.concat(curveTo(cx, cy, rx, ry, start2, end2, 0, 0));

        if (end > midEnd && start < midEnd) { // When shape is wide, it can cross both, (c) and (d) edges, when using startAngle
            // Go to outer side
            out = out.concat([
                'L', cx + (rx * cos(end2)) + dx, cy + (ry * sin(end2)) + dy
            ]);
            // Curve to the right edge of the slice (d)
            out = out.concat(curveTo(cx, cy, rx, ry, end2, midEnd, dx, dy));
            // Go to the inner side
            out = out.concat([
                'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
            ]);
            // Curve to the true end of the slice
            out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end, 0, 0));
            // Go to the outer side
            out = out.concat([
                'L', cx + (rx * cos(end)) + dx, cy + (ry * sin(end)) + dy
            ]);
            // Go back to middle (d)
            out = out.concat(curveTo(cx, cy, rx, ry, end, midEnd, dx, dy));
            out = out.concat([
                'L', cx + (rx * cos(midEnd)), cy + (ry * sin(midEnd))
            ]);
            // Go back to the left edge
            out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end2, 0, 0));
        } else if (end > PI - a && start < PI - a) { // But shape can cross also only (c) edge:
            // Go to outer side
            out = out.concat([
                'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
            ]);
            // Curve to the true end of the slice
            out = out.concat(curveTo(cx, cy, rx, ry, end2, end, dx, dy));
            // Go to the inner side
            out = out.concat([
                'L', cx + (rx * Math.cos(end)), cy + (ry * Math.sin(end))
            ]);
            // Go back to the artifical end2
            out = out.concat(curveTo(cx, cy, rx, ry, end, end2, 0, 0));
        }

        out = out.concat([
            'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
        ]);
        out = out.concat(curveTo(cx, cy, rx, ry, end2, start2, dx, dy));
        out = out.concat(['Z']);

        // INSIDE
        var inn = ['M', cx + (irx * cs), cy + (iry * ss)];
        inn = inn.concat(curveTo(cx, cy, irx, iry, start, end, 0, 0));
        inn = inn.concat([
            'L', cx + (irx * Math.cos(end)) + dx, cy + (iry * Math.sin(end)) + dy
        ]);
        inn = inn.concat(curveTo(cx, cy, irx, iry, end, start, dx, dy));
        inn = inn.concat(['Z']);


        // SIDES
        var side1 = [
            'M', cx + (rx * cs), cy + (ry * ss),
            'L', cx + (rx * cs) + dx, cy + (ry * ss) + dy,
            'L', cx + (irx * cs) + dx, cy + (iry * ss) + dy,
            'L', cx + (irx * cs), cy + (iry * ss),
            'Z'
        ];
        var side2 = [
            'M', cx + (rx * ce), cy + (ry * se),
            'L', cx + (rx * ce) + dx, cy + (ry * se) + dy,
            'L', cx + (irx * ce) + dx, cy + (iry * se) + dy,
            'L', cx + (irx * ce), cy + (iry * se),
            'Z'
        ];

        // correction for changed position of vanishing point caused by alpha and beta rotations
        var angleCorr = Math.atan2(dy, -dx),
            angleEnd = Math.abs(end + angleCorr),
            angleStart = Math.abs(start + angleCorr),
            angleMid = Math.abs((start + end) / 2 + angleCorr);


        angleEnd = toZeroPIRange(angleEnd);
        angleStart = toZeroPIRange(angleStart);
        angleMid = toZeroPIRange(angleMid);

        // *1e5 is to compensate pInt in zIndexSetter
        var incPrecision = 1e5,
            a1 = angleMid * incPrecision,
            a2 = angleStart * incPrecision,
            a3 = angleEnd * incPrecision;

        return {
            top: top,
            zTop: Math.PI * incPrecision + 1, // max angle is PI, so this is allways higher
            out: out,
            zOut: Math.max(a1, a2, a3),
            inn: inn,
            zInn: Math.max(a1, a2, a3),
            side1: side1,
            zSide1: a3 * 0.99, // to keep below zOut and zInn in case of same values
            side2: side2,
            zSide2: a2 * 0.99
        };
    }


    //让给定颜色变暗或者变亮
    render.lightenDarkenColor = function (col,amt) {
        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col,16);
        var r = (num >> 16) + amt;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }


    /**
     * 十六进制颜色转为rgb颜色:hex---->rgb
     * @param hex 十六进制颜色值#aaa or #ff1122
     * @returns {string}  rgb(255,255,255)
     */
    render.hex2rgb = function(hex) {

        var sColor = hex.toLowerCase();

        //十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i=1; i<4; i+=1) {
                    sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i=1; i<7; i+=2) {
                sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        }
        return sColor;
    }

    /**
     * rgb颜色转为hex
     * @param rgb rgb颜色值
     * @returns {*} hex颜色值
     */
    render.rgb2hex = function (rgb) {
        var that = rgb;
        //十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 如果是rgb颜色表示
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i=0; i<aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/,"").split("");
            if (aNum.length === 6) {
                return that;
            } else if(aNum.length === 3) {
                var numHex = "#";
                for (var i=0; i<aNum.length; i+=1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        }
        return that;
    }


    /**
     * 取颜色的反色
     * @param rgb rgb颜色值 'rgb(233,233,233)'
     * @returns {string}  rgb颜色值 'rgb(12,12,12)'
     */
    render.oppositeColor = function (rgb) {
        var rgbColor = 'rgb(';
        if (/^(rgb|RGB)/.test(rgb)) {
            var aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");

            for(var i=0;i<3;i++){
                if(parseInt(aColor[i]) <= 255){
                    if(i==2){
                        rgbColor += (255-parseInt(aColor[i]))
                    }else {
                        rgbColor += (255-parseInt(aColor[i])) + ",";
                    }
                }
            }
            rgbColor += ")";
        }

        return rgbColor;
    }



    return render;
};