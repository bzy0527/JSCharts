DBFX.RegisterNamespace("DBFX.Web.Draw");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");

//判断数组是否包含某个元素
Array.prototype.contains = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
//删除数组中指定元素
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

//公共工具类
DBFX.Web.Draw.Tools = {
    print: function (t) {
        //TODO:平台要打开注释,测试要注释这句代码
        // return;


        var printArr = new Array();
        var date = new Date();  //创建对象
        var y = date.getFullYear();     //获取年份
        var m = date.getMonth() + 1;   //获取月份  返回0-11
        var d = date.getDate(); // 获取日
        // var w = date.getDay();   //获取星期几  返回0-6   (0=星期天)
        var h = date.getHours();
        var minute = date.getMinutes()
        var s = date.getSeconds();
        var time = y + "-" + m + "-" + d + "   " + h + ":" + minute + ":" + s;
        printArr.push(time);
        printArr.push('>>>>>>>>>' + t);
        printArr.push('<br>');

        var p = document.getElementsByClassName("print")[0];
        printArr.forEach(function (t2) {
            p.innerHTML += t2;
        });
    },
    drawKnife: function (context, x, y, w, h) { //画刀具
        context.save();
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.globalAlpha = 1;
        // context.rect(x,y,w,h);
        context.fillStyle = "#FEFEFE";
        context.arc(x + w * 0.5, y, 0.5 * w, Math.PI, Math.PI * 2);
        context.lineTo(x + w, y + h);
        context.arc(x + 0.7 * w, y + h, 0.3 * w, 0, Math.PI);
        context.lineTo(x + 0.4 * w, y + 0.6 * h);
        context.lineTo(x, y + 0.6 * h);
        context.lineTo(x, y);
        context.fill();
        context.stroke();
    },
    drawFork: function (context, x, y, w, h) {
        // context.save();
        var gap = w / 11;
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.fillStyle = "#FEFEFE";
        // context.rect(x,y,w,h);

        for (var i = 0; i < 4; i++) {
            context.arc(x + gap + 3 * i * gap, y, gap, Math.PI, Math.PI * 2, false);
            context.lineTo(x + 2 * gap + 3 * i * gap, y + h * 0.33);
            if (i < 3) {
                context.lineTo(x + 3 * gap + 3 * i * gap, y + h * 0.33);
            }
        }
        context.lineTo(x + w, y + h * 0.4);
        context.arc(x + 0.65 * w, y + h * 0.4, 0.35 * w, 0, Math.PI * 0.5);
        context.lineTo(x + 0.65 * w, y + h);

        //手柄
        context.arc(x + 0.5 * w, y + h, 0.15 * w, 0, Math.PI);
        context.lineTo(x + 0.35 * w, y + h * 0.4 + 0.35 * w);

        context.arc(x + 0.35 * w, y + h * 0.4, 0.35 * w, Math.PI * 0.5, Math.PI);
        context.lineTo(x, y);
        // context.arc(x+gap,y,gap,Math.PI,Math.PI*2,false);
        // context.arc(x+5*gap,y,gap,Math.PI,Math.PI*2,false);
        context.fill();
        context.stroke();

    },
    drawArrow: function (context, x, y, w) {
        context.save();
        var h = 2.8 * w;
        // context.beginPath();
        context.strokeStyle = "black";
        // context.rect(x,y,w,h);
        // context.fillStyle = "black";
        // context.translate(x,y);
        // context.rotate(Math.PI/2);

        context.moveTo(x + 0.5 * w, y);
        context.lineTo(x, y + 0.5 * w / (Math.tan(Math.PI / 6)));
        context.lineTo(x + 0.4 * w, y + 0.5 * w / (Math.tan(Math.PI / 6)));
        context.lineTo(x + 0.4 * w, y + h);
        context.lineTo(x + 0.6 * w, y + h);
        context.lineTo(x + 0.6 * w, y + 0.5 * w / (Math.tan(Math.PI / 6)));
        context.lineTo(x + w, y + 0.5 * w / (Math.tan(Math.PI / 6)));
        context.lineTo(x + 0.5 * w, y);
        context.stroke();
        // context.fill();

        context.restore();
    },
    getIntersection: function (segment1, segment2) {
        // DBFX.Web.Draw.Tools.print("hello");
        var node = new DBFX.Web.Draw.Point();
        //暂时不考虑斜线 只考虑垂直和水平线段
        //1垂直线
        if (segment1.fromPoint.x == segment1.toPoint.x) {
            //2垂直线
            if (segment2.fromPoint.x == segment2.toPoint.x) {
                return "noIntersection";
            }

            //2水平线
            if (segment2.fromPoint.y == segment2.toPoint.y) {
                if ((segment2.fromPoint.x - segment1.fromPoint.x) * (segment2.toPoint.x - segment1.fromPoint.x) <= 0 &&
                    (segment1.fromPoint.y - segment2.fromPoint.y) * (segment1.toPoint.y - segment2.fromPoint.y) <= 0) {
                    node.x = segment1.fromPoint.x;
                    node.y = segment2.fromPoint.y;
                    return node;
                } else {
                    return "noIntersection";
                }
            }

        }

        //1水平线
        if (segment1.fromPoint.y == segment1.toPoint.y) {
            //2垂直线
            if (segment2.fromPoint.x == segment2.toPoint.x) {
                if ((segment1.fromPoint.x - segment2.fromPoint.x) * (segment1.toPoint.x - segment2.fromPoint.x) <= 0 &&
                    (segment2.fromPoint.y - segment1.fromPoint.y) * (segment2.toPoint.y - segment1.fromPoint.y) <= 0) {
                    node.x = segment2.fromPoint.x;
                    node.y = segment1.fromPoint.y;
                    return node;
                } else {
                    return "noIntersection";
                }

            }
            //2水平线
            if (segment2.fromPoint.y == segment2.toPoint.y) {
                return "noIntersection";
            }

        }
    },
    isPointInRect: function (point, rect) {
        if (point.x >= rect.minX &&
            point.x <= rect.maxX &&
            point.y >= rect.minY &&
            point.y <= rect.maxY) {
            return true;
        }
        return false;
    },

    /**
     *     寻找路径
     * @param startNode 起始节点
     * @param endNode   终止节点
     * @param pathArr   有效路径集合
     * @param closedList    无效点集合
     * @param openList      所有有效点集合
     * @param maxWidth      最宽路径宽度
     * @returns {boolean}   返回值
     *
     */
    searchPath: function (startNode, endNode, pathArr, closedList, openList) {

        if (startNode == endNode) {
            openList.push(endNode);
            return true;
        } else {

            if (startNode.subNodes.length == 1) {
                closedList.push(startNode);
            }


            openList.push(startNode);

            // if (openList.length >= 1 && openList.indexOf(startNode)!=-1){
            //     //创建数组保存此节点之前所有经历过的节点
            //     var nodes = [];
            //     for(var t=0;t<=openList.indexOf(startNode);t++){
            //         nodes.push(openList[t]);
            //     }
            // }

            for (var i = 0; i < startNode.subNodes.length; i++) {

                if (!openList.contains(startNode.subNodes[i]) && !closedList.contains(startNode.subNodes[i])) {
                    //如果返回false，说明没有找到终点，将openList删除到此节点位置
                    if (!DBFX.Web.Draw.Tools.searchPath(startNode.subNodes[i], endNode, pathArr, closedList, openList)) {
                        openList.splice(openList.indexOf(startNode) + 1, openList.length);
                    } else {
                        var useFulPath = new DBFX.Web.Draw.Gpath();
                        openList.forEach(function (t2) {
                            useFulPath.gnodes.push(t2);
                        });
                        pathArr.push(useFulPath);
                    }
                }
            }

            return false;
        }

    },

    /**
     * 找到最短路径
     * @param pathArr   所有有效路径集合{Array}
     * @returns {DBFX.Web.Draw.Gpath}
     */
    getMinPath: function (pathArr) {
        // DBFX.Web.Draw.Tools.print("是否为数组类型："+pathArr.constructor == Array);
        var minDis = 0;
        var minPath = new DBFX.Web.Draw.Gpath();
        for (var i = 0; i < pathArr.length; i++) {
            var path = pathArr[i];
            var pathLength = 0;


            for (var k = 0; k < path.gnodes.length - 1; k++) {
                var dis = 0;
                if (path.gnodes[k].xPos == path.gnodes[k + 1].xPos) {
                    dis = Math.abs(path.gnodes[k + 1].yPos - path.gnodes[k].yPos);
                }
                if (path.gnodes[k].yPos == path.gnodes[k + 1].yPos) {
                    dis = Math.abs(path.gnodes[k + 1].xPos - path.gnodes[k].xPos);
                }
                // DBFX.Web.Draw.Tools.print(dis);
                pathLength += dis;
            }

            if (i == 0) {
                minDis = pathLength;
                minPath = path;
            }
            if (minDis > pathLength) {
                minDis = pathLength;
                minPath = path;
            }
        }
        // DBFX.Web.Draw.Tools.print("最短路径长度:"+minDis);
        // DBFX.Web.Draw.Tools.print("最短路径节点个数"+minPath.gnodes.length);

        return minPath;
    },

    drawMinPath: function (minPath) {
        DBFX.Web.Draw.Tools.print("绘制最短路径");

        //绘制新路径前  删除所有之前的路径
        var lines = new Array();
        drawV.shapes.forEach(function (t) {
            if (t.shapeType == "Line") {
                lines.push(t);
            }
        });
        if (lines.length >= 1) {
            lines.forEach(function (t) {
                drawV.shapes.removeByValue(t);
            });
        }

        for (var i = 0; i < minPath.gnodes.length - 1; i++) {
            var node01 = minPath.gnodes[i];
            var node02 = minPath.gnodes[i + 1];
            var line = new DBFX.Web.Draw.Line(node01.xPos, node01.yPos, node02.xPos, node02.yPos);

            line.scale = { x: drawV.currentScale, y: drawV.currentScale };
            line.lineWidth = 2;
            line.strokeStyle = "red";
            drawV.shapes.push(line);
        }
    }

}

//定义节点类
DBFX.Web.Draw.GNode = function () {
    var gnode = new Object();
    gnode.xPos = 0;
    gnode.yPos = 0;
    //子节点数组，可与之走通的节点，类型为
    gnode.subNodes = new Array();
    //当前节点与父节点的距离
    gnode.dis = 0;
    gnode.rank = "";
    //父节点（前一个节点）
    gnode.pathFrom = undefined;
    gnode.parentNode = undefined;
    //标识节点是否被访问过
    gnode.maked = false;
    return gnode;
}

//定义路径类
DBFX.Web.Draw.Gpath = function () {
    var path = new Object();
    //路径上的节点
    path.gnodes = new Array();
    //此路径是否有用
    path.isUseful = false;
    //路径上的节点链
    path.nextNode = undefined;
    path.preNode = undefined;
    path.branchNum = "";
    return path;
}

//定义边类
DBFX.Web.Draw.DNode = function (name, dis) {
    var dnode = new Object();
    dnode.name = name;
    dnode.dis = dis;
    dnode.currentNode = new DBFX.Web.Draw.GNode();

    return dnode;
}

//定义线段对象
DBFX.Web.Draw.Segment = function () {
    var obj = new Object();
    obj.fromPoint = new DBFX.Web.Draw.Point();
    obj.toPoint = new DBFX.Web.Draw.Point();
    return obj;
}

//点对象
DBFX.Web.Draw.Point = function (x, y) {
    var obj = new Object();
    obj.x = x;
    obj.y = y;
    return obj;
}


//绘制视图
DBFX.Web.Draw.DrawView = function (t) {

    if (t == undefined)
        t = "DrawView";

    var drawV = new DBFX.Web.Controls.Control(t);

    drawV.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.DrawViewDesigner");
    drawV.ClassDescriptor.Serializer = "DBFX.Serializer.DrawViewSerializer";
    drawV.shapes = new Array();

    //TODO:测试代码
    drawV.canvas = document.getElementsByClassName("canvas")[0];
    drawV.context = drawV.canvas.getContext("2d");
    //TODO:测试代码


    //TODO:平台代码
    // drawV.canvas = document.createElement("canvas");
    // drawV.VisualElement = drawV.canvas;
    // drawV.ClientDiv = drawV.canvas;
    // drawV.DrawPaper = drawV.canvas;
    // drawV.canvas.allowDrop = true;
    //TODO:平台代码

    drawV.context = drawV.canvas.getContext("2d");

    drawV.paper = {width:900,height:1884};
    //定义事件位置
    drawV.EventPos = {X:-1,Y:-1};

    drawV.SetHeight = function (v) {

        drawV.canvas.height = v.replace("px", "");
        drawV.canvas.style.height = v;
        drawV.draw();
    }
    drawV.SetWidth = function (v) {

        drawV.canvas.width = v.replace("px", "");
        drawV.canvas.style.width = v;
        drawV.draw();
    }

    drawV.canvas.ondragover = function (e) {

        var ve = e.currentTarget;
        if (ve.allowDrop && drawV.canvas == ve) {
            e.preventDefault();
        }


    }

    drawV.canvas.ondrop = function (e) {

        e.preventDefault();
        try {
            var tkitem = DBFX.Web.Controls.Context.DragObject;
            var shape = DBFX.Design.DesignView.CreateControlInstance(tkitem);
            shape.minX = 10;
            shape.minY = 10;
            shape.maxX = 100;
            shape.maxY = 100;
            drawV.shapes.push(shape);
            drawV.draw();
        }
        catch (ex) {
            alert(ex);
        }

    }

    //当前的模式：编辑editMode和使用useMode
    //编辑模式：1；使用模式：2
    drawV.mode = 1;

    drawV.preScale = 1;
    //当前缩放比例
    drawV.currentScale = 1.0;
    //原始缩放比例
    drawV.originalScale = {x:1.0,y:1.0};

    //x-轴向移动的总距离
    drawV.totalDis_X = 0;
    //y-轴向移动的总距离
    drawV.totalDis_Y = 0;


    drawV.activedShape = undefined;
    //记录当前选中的图形
    drawV.selectedShape = undefined;
    //记录前一次选中的图形
    drawV.preSelectShape = undefined;

    drawV.editShape = undefined;

    //记录编辑视图的点击（响应）区域
    drawV.clickedArea = undefined;

    drawV.mouseDownPoint = undefined;
    drawV.mouseMovePoint = undefined;

    //保存绘制页面的所有形状+编辑视图的属性
    drawV.allDatas = new Array();

    drawV.editView = new DBFX.Web.Draw.EditView();

    drawV.editViewShow = false;
    // drawV.shapes.push(drawV.editView);

    /**
     * 通过闸机英文名和餐桌编号绘制路线
     * @param englishText
     * @param tableNum
     */
    drawV.drawMinPath = function (englishText, tableNum) {
        try {
            var fromShape = undefined;
            var toShape = undefined;
            drawV.shapes.forEach(function (t) {
                if (t.shapeType == "TextArea" && t.englishText == englishText) {
                    fromShape = t;
                }

                if (t.shapeType == "RectTable" && t.tableNum == tableNum) {
                    toShape = t;
                }
            });

            if (fromShape != undefined && toShape != undefined) {
                try {

                    drawV.drawRoute(fromShape, toShape);
                    drawV.draw();
                } catch (error) {
                    return error.toString();
                }
                return "绘制路径";
            }

        } catch (error) {
            return error;
        }

    }

    /**
     * 通过餐桌编号返回餐桌对象
     * @param tableNum
     */
    drawV.findTable = function (tableNum) {
        var table = undefined;
        drawV.shapes.forEach(function (t) {
            if (t.shapeType == "RectTable" && t.tableNum == tableNum) {
                table = t;
            }
        });

        if (table != undefined) {
            return table;
        } else {
            return null;
        }
    }


    //绘制路径方法
    drawV.drawRoute = function (fromShape, toShape) {
        DBFX.Web.Draw.Tools.print("drawRoute");

        //所有通道的集合
        var aisleTotalArr = new Array();
        //所有路径交点集合
        var allNodes = new Array();
        //所有路径线段集合
        var segmentArr = new Array();

        //起始点坐标
        var startPoint = new DBFX.Web.Draw.Point((fromShape.minX + fromShape.maxX) * 0.5, (fromShape.minY + fromShape.maxY) * 0.5);
        //终点坐标
        var endPoint = new DBFX.Web.Draw.Point((toShape.minX + toShape.maxX) * 0.5, (toShape.minY + toShape.maxY) * 0.5);

        //路径最大宽度
        var maxWidth = 0;

        //所有路径中计算出minX、minY、maxX、maxY
        var aisleMinX = -1;
        var aisleMaxX = -1;
        var aisleMinY = -1;
        var aisleMaxY = -1;

        //所有节点信息
        var allGnodes = new Array();

        //所有通道宽度集合
        var maxWArr = new Array();

        //保存最长的通道长度
        var maxH = 0;
        var maxV = 0;
        //横向最长通道和纵向最长通道
        var longHSeg = new DBFX.Web.Draw.Segment();
        var longVSeg = new DBFX.Web.Draw.Segment();

        //遍历所有图形 找到通道 取出通道中的路径线段
        drawV.shapes.forEach(function (shape, index) {
            //通道短边宽
            var shortW = 0;
            //通道长
            var longL = 0;

            //取出所有通道图形
            if (shape.shapeType == "Aisle") {
                //路径线段
                var segment = new DBFX.Web.Draw.Segment();

                if ((shape.maxY - shape.minY) < (shape.maxX - shape.minX)) {//横向通道时
                    shortW = shape.maxY - shape.minY;
                    longL = shape.maxX - shape.minX;

                    segment.fromPoint.x = shape.minX;
                    segment.fromPoint.y = shape.minY + shortW * 0.5;
                    segment.toPoint.x = shape.maxX;
                    segment.toPoint.y = shape.minY + shortW * 0.5;

                    if (maxH <= longL) {
                        maxH = longL;
                        longHSeg = segment;
                    }
                } else if ((shape.maxY - shape.minY) > (shape.maxX - shape.minX)) {//垂直通道时
                    shortW = shape.maxX - shape.minX;
                    longL = shape.maxY - shape.minY;

                    segment.fromPoint.x = shape.minX + shortW * 0.5;
                    segment.fromPoint.y = shape.minY;
                    segment.toPoint.x = shape.minX + shortW * 0.5;
                    segment.toPoint.y = shape.maxY;

                    if (maxV <= longL) {
                        maxV = longL;
                        longVSeg = segment;
                    }
                } else {//TODO 倾斜通道 图像倾斜之后 响应点还在原来位置？？


                }


                maxWArr.push(shortW);
                segmentArr.push(segment);
                aisleTotalArr.push(shape);
            }
        });


        maxWidth = Math.max.apply(null, maxWArr);

        //起始点和终止点与邻近通道的交点
        var startH = new DBFX.Web.Draw.Segment();
        startH.fromPoint.x = fromShape.minX - 1.5 * maxWidth;
        startH.fromPoint.y = startPoint.y;
        startH.toPoint.x = fromShape.maxX + 1.5 * maxWidth;
        startH.toPoint.y = startPoint.y;

        var startV = new DBFX.Web.Draw.Segment();
        startV.fromPoint.x = startPoint.x;
        startV.fromPoint.y = fromShape.minY - 1.5 * maxWidth;
        startV.toPoint.x = startPoint.x;
        startV.toPoint.y = fromShape.maxY + 1.5 * maxWidth;

        var endH = new DBFX.Web.Draw.Segment();
        endH.fromPoint.x = toShape.minX - 1.5 * maxWidth;
        endH.fromPoint.y = endPoint.y;
        endH.toPoint.x = toShape.maxX + 1.5 * maxWidth;
        endH.toPoint.y = endPoint.y;

        var endV = new DBFX.Web.Draw.Segment();
        endV.fromPoint.x = endPoint.x;
        endV.fromPoint.y = toShape.minY - 1.5 * maxWidth;
        endV.toPoint.x = endPoint.x;
        endV.toPoint.y = toShape.maxY + 1.5 * maxWidth;

        segmentArr.push(startH, startV, endH, endV);

        // DBFX.Web.Draw.Tools.print("所有线段的个数：" + segmentArr.length);
        //遍历所有路径线段 找出所有路径之间的交点allNodes
        for (var i = 0; i < segmentArr.length - 1; i++) {
            for (var j = i + 1; j < segmentArr.length; j++) {
                var point = DBFX.Web.Draw.Tools.getIntersection(segmentArr[i], segmentArr[j]);
                if (point != "noIntersection") {
                    allNodes.push(point);
                }
            }
        }

        //遍历所有交点 找出每个节点的子节点
        // var dis = -1;

        //取出所有节点
        // var nodeArr = new Array();
        // for(var m=0;m<allNodes.length;m++){
        //     var node = new DBFX.Web.Draw.GNode();
        //     node.xPos = allNodes[m].x;
        //     node.yPos = allNodes[m].y;
        //     nodeArr.push(node);
        // }

        //优化：只取出在一定范围内的节点
        //求出两个图形所在的区域范围，缩小寻找路径的范围
        var minX = Math.min(fromShape.minX, toShape.minX) - 20 * maxWidth;
        var maxX = Math.max(fromShape.maxX, toShape.maxX) + 20 * maxWidth;
        var minY = Math.min(fromShape.minY, toShape.minY) - 20 * maxWidth;
        var maxY = Math.max(fromShape.maxY, toShape.maxY) + 20 * maxWidth;

        //起始点和终点同在垂直主通道的右侧
        if (startPoint.x > longVSeg.fromPoint.x && endPoint.x > longVSeg.fromPoint.x) {
            //TODO
            minX = longVSeg.fromPoint.x - 5 * maxWidth;
        }

        //起始点和终点同在垂直主通道的左侧
        if (startPoint.x < longVSeg.fromPoint.x && endPoint.x < longVSeg.fromPoint.x) {
            maxX = longVSeg.fromPoint.x;
            if(startPoint.x > endPoint.x){
                minX = endPoint.x - 30*maxWidth;
            }else {
                minX = startPoint.x - 30*maxWidth;
            }
        }

        //起始点和终点同在水平主通道的下侧
        if (startPoint.y > longHSeg.fromPoint.y && endPoint.y > longHSeg.fromPoint.y) {
            minY = longHSeg.fromPoint.y;
            if(endPoint.y > startPoint.y){
                maxY = endPoint.y + 7*maxWidth;
            }else {
                maxY = startPoint.y + 7*maxWidth;
            }
        }

        //起始点和终点同在水平主通道的上侧
        if (startPoint.y < longHSeg.fromPoint.y && endPoint.y < longHSeg.fromPoint.y) {
            maxY = longHSeg.fromPoint.y;
        }

        var nodeArr = new Array();
        for (var m = 0; m < allNodes.length; m++) {
            var node = new DBFX.Web.Draw.GNode();
            if (allNodes[m].x >= minX && allNodes[m].x <= maxX &&
                allNodes[m].y >= minY && allNodes[m].y <= maxY) {
                node.xPos = allNodes[m].x;
                node.yPos = allNodes[m].y;
                nodeArr.push(node);
            }
        }

        //创建起始节点和终止节点
        var startNode = new DBFX.Web.Draw.GNode();
        var endNode = new DBFX.Web.Draw.GNode();

        //找到起始节点和终止节点
        nodeArr.forEach(function (t) {
            if (t.xPos == startPoint.x && t.yPos == startPoint.y) {
                startNode = t;
                startNode.rank = "1";
            }
            if (t.xPos == endPoint.x && t.yPos == endPoint.y) {
                endNode = t;
            }
        });


        //1.找到每个节点的子节点
        // for (var n = 0; n < nodeArr.length; n++) {
        //     for (var h = 0; h < nodeArr.length; h++) {
        //
        //         if (n != h && (nodeArr[n].xPos == nodeArr[h].xPos || nodeArr[n].yPos == nodeArr[h].yPos)) {
        //             nodeArr[n].subNodes.push(nodeArr[h]);
        //         }
        //     }
        // }


        //2.找到每个节点的合理子节点
        for (var n = 0; n < nodeArr.length; n++) {
            for (var h = 0; h < nodeArr.length; h++) {

                //如果在同一水平线上
                if (n != h && nodeArr[n].yPos == nodeArr[h].yPos) {
                    //
                    // //起点在终点右侧
                    // if(startNode.xPos >= endNode.xPos && (nodeArr[n].xPos >= (endNode.xPos - 20*maxWidth))
                    //     && (nodeArr[n].xPos <= (startNode.xPos + 20*maxWidth)) && (nodeArr[h].xPos < nodeArr[n].xPos +20*maxWidth) && (nodeArr[h].xPos >= (endNode.xPos - 20*maxWidth))){
                    //     nodeArr[n].subNodes.push(nodeArr[h]);
                    // }
                    //
                    // //起点在终点左侧
                    // if(startNode.xPos <= endNode.xPos && (nodeArr[n].xPos <= (endNode.xPos + 20*maxWidth))
                    //     && (nodeArr[n].xPos >= (startNode.xPos - 20*maxWidth)) && (nodeArr[h].xPos > nodeArr[n].xPos -20*maxWidth) && (nodeArr[h].xPos <= (endNode.xPos + 20*maxWidth))){
                    //     nodeArr[n].subNodes.push(nodeArr[h]);
                    // }

                    nodeArr[n].subNodes.push(nodeArr[h]);

                }

                //如果在同一垂直线上
                if (n != h && nodeArr[n].xPos == nodeArr[h].xPos){

                    //起点在终点的下方
                    if(startNode.yPos >= endNode.yPos && (nodeArr[n].yPos >= (endNode.yPos - 3*maxWidth))
                        && (nodeArr[n].yPos <= (startNode.yPos + 3*maxWidth)) && (nodeArr[h].yPos < nodeArr[n].yPos+7*maxWidth)&& (nodeArr[h].yPos >= (endNode.yPos - 3*maxWidth))){

                        nodeArr[n].subNodes.push(nodeArr[h]);
                    }

                    //起点在终点上方
                    if(startNode.yPos <= endNode.yPos && (nodeArr[n].yPos <= (endNode.yPos + 5*maxWidth))
                        && (nodeArr[n].yPos >= (startNode.yPos - 5*maxWidth)) && (nodeArr[h].yPos > nodeArr[n].yPos-7*maxWidth)&& (nodeArr[h].yPos <= (endNode.yPos + 5*maxWidth))){

                        nodeArr[n].subNodes.push(nodeArr[h]);

                    }
                }
            }
        }


        //创建保存路径数组
        var pathArr = new Array();

        //关闭列表
        var closedList = new Array();
        //开放列表
        var openList = new Array();

        try {
            //寻找路径，所有路径都保存到了pathArr中

            DBFX.Web.Draw.Tools.searchPath(startNode, endNode, pathArr, closedList, openList);
            //在pathArr中找到最短路径

            var minPath = DBFX.Web.Draw.Tools.getMinPath(pathArr);
            // DBFX.Web.Draw.Tools.print("最短路径子节点个数："+minPath.gnodes.length);

            //绘制路径
            drawV.drawMinRoute(minPath);

        } catch (error) {
            DBFX.Web.Draw.Tools.print(error);
        }
    }

    //绘制最短路径
    drawV.drawMinRoute = function (minPath) {
        DBFX.Web.Draw.Tools.print("绘制最短路径");

        //绘制新路径前  删除所有之前的路径
        var lines = new Array();
        drawV.shapes.forEach(function (t) {
            if (t.shapeType == "Line") {
                lines.push(t);
            }
        });
        if (lines.length >= 1) {
            lines.forEach(function (t) {
                drawV.shapes.removeByValue(t);
            });
        }

        for (var i = 0; i < minPath.gnodes.length - 1; i++) {
            var node01 = minPath.gnodes[i];
            var node02 = minPath.gnodes[i + 1];
            var line = new DBFX.Web.Draw.Line(node01.xPos, node01.yPos, node02.xPos, node02.yPos);

            line.scale = { x: drawV.currentScale, y: drawV.currentScale };
            line.lineWidth = 2;
            line.strokeStyle = "red";
            drawV.shapes.push(line);
        }
    }

    //保存当前绘制环境数据
    drawV.saveContext = function () {


        drawV.allDatas.splice(0, drawV.allDatas.length);

        drawV.shapes.forEach(function (shape) {
            //保存各个图形参数到数组
            drawV.allDatas.push({
                shapeClass: shape.shapeClass,
                shapeType: shape.shapeType,
                strokeStyle:shape.strokeStyle,
                alpha: shape.alpha,
                minX: shape.minX,
                minY: shape.minY,
                maxX: shape.maxX,
                maxY: shape.maxY,
                deskColor: shape.deskColor,
                tableColor: shape.tableColor,
                personCount: shape.personCount,
                tableNum: shape.tableNum,
                chineseText: shape.chineseText,
                englishText: shape.englishText,
                fillStyle: shape.fillStyle,
                lineWidth: shape.lineWidth,
                rotateAngle: shape.rotateAngle,
                allowClick: shape.allowClick,
                isVisible:shape.isVisible
            });

        });
        //
        var json = {
            mode: drawV.mode,
            shapes: drawV.allDatas
        };

        localStorage.clear();
        localStorage.setItem("mode", drawV.mode);
        localStorage.setItem("shapes", JSON.stringify(json));

        DBFX.Web.Draw.Tools.print("json:" + JSON.stringify(json));
        return JSON.stringify(json);
    }

    //读取保存的绘制环境
    drawV.readContext = function (datas) {

        //清除当前界面的所有图形
        drawV.shapes.splice(0, drawV.shapes.length);
        //解析JSon成对象
        var jsonData = JSON.parse(datas);
        var shape = undefined;
        var scale_1 = undefined;
        var scale_2 = drawV.canvas.width/drawV.paper.width;
        var scale_3 = drawV.canvas.height/drawV.paper.height;

        if (scale_2 < scale_3) {
            scale_1 = scale_2;
        } else {
            scale_1 = scale_3;
        }

        drawV.totalScale= scale_1;
        drawV.originalScale.x = drawV.canvas.width/drawV.canvas.clientWidth*scale_1;
        drawV.originalScale.y = drawV.canvas.height/drawV.canvas.clientHeight*scale_1;

        //重置当前绘图环境
        // drawV.context.setTransform(drawV.originalScale.x,0,0,drawV.originalScale.y,0,0);
        drawV.Scale(scale_1,scale_1);
        // drawV.currentScale = scale_1;

        jsonData.shapes.forEach(function (s) {
            var create = "new " + s.shapeClass + "();";
            var shape = eval(create);
            shape.minX = s.minX;
            shape.minY = s.minY;
            shape.maxX = s.maxX;
            shape.maxY = s.maxY;
            shape.alpha = s.alpha;
            shape.tableNum = s.tableNum;
            shape.tableColor = s.tableColor;
            shape.deskColor = s.deskColor;
            shape.personCount = s.personCount;
            shape.chineseText = s.chineseText;
            shape.englishText = s.englishText;
            shape.fillStyle = s.fillStyle;
            shape.lineWidth = s.lineWidth;
            shape.rotateAngle = s.rotateAngle;
            shape.allowClick = s.allowClick;
            shape.isVisible = s.isVisible;
            shape.drawV = drawV;

            // shape.scale.x = drawV.canvas.width/drawV.canvas.clientWidth*drawV.canvas.clientHeight / drawV.canvas.height;
            // shape.scale.x = drawV.canvas.width/drawV.canvas.clientWidth*(drawV.canvas.clientHeight / drawV.canvas.height);
            // shape.scale.y = drawV.canvas.height/drawV.canvas.clientHeight*(drawV.canvas.clientHeight / drawV.canvas.height);
            drawV.shapes.push(shape);
        });
        drawV.mode = 2;
        drawV.draw();
    }

    //删除选中的图形
    drawV.removeShape = function () {
        if (drawV.editViewShow == false) {
            return;
        }
        var num = -1;

        for (var i = 0; i < drawV.shapes.length; i++) {
            if (drawV.shapes[i] == drawV.selectedShape) {
                num = i;
                break;
            }
        }

        drawV.shapes.splice(num, 1);
        drawV.editViewShow = false;

        drawV.draw();
    }

    //保存
    drawV.save = function () {
        drawV.context.save();
    }

    //恢复
    drawV.restore = function () {
        drawV.context.restore();
    }

    //缩放倍数
    drawV.scale = 1.0;

    drawV.Scale = function (x,y) {
        drawV.restore();
        drawV.context.setTransform(1,0,0,1,0,0);
        drawV.context.scale(x,y);
        drawV.draw();
    }

    //绘制
    drawV.draw = function () {
        drawV.restore();
        drawV.context.clearRect(0, 0, drawV.canvas.width/(drawV.canvas.clientHeight / drawV.canvas.height), drawV.canvas.height/(drawV.canvas.clientHeight / drawV.canvas.height));

        // drawV.context.clearRect(0,0,drawV.canvas.width,drawV.canvas.height);
        drawV.shapes.forEach(function (shape) {
            shape.draw(drawV.context);
        });
    }
    //点击测试
    drawV.hitEvent = function (x, y) {
        var sourceShape = undefined;

        if (drawV.editViewShow == true) {
            drawV.editView.context = drawV.context;
            drawV.editView.downPoint = new DBFX.Web.Draw.Point(x, y);
            drawV.editView.draw(drawV.context);

            if (drawV.editView.hitEvent(x, y) == true) {
                return "editView";
            } else {
                for (var i = drawV.shapes.length - 1; i >= 0; i--) {
                    var shape = drawV.shapes[i];
                    shape.drawView = drawV;
                    if (shape.hitEvent(x, y) == true) {
                        sourceShape = shape;
                        return sourceShape;
                    }
                }
                return sourceShape;
            }

        } else {
            for (var i = drawV.shapes.length - 1; i >= 0; i--) {
                var shape = drawV.shapes[i];
                shape.drawView = drawV;
                if (shape.hitEvent(x, y) == true) {
                    sourceShape = shape;
                    return sourceShape;
                }
            }
            return sourceShape;
        }
    }

    //切换模式
    drawV.changeMode = function () {
        drawV.shapes.forEach(function (shape) {
            shape.alpha = 1.0;
        });
        drawV.mode = (drawV.mode == 1) ? 2 : 1;

        drawV.draw();
    }

    drawV.SelectedShapes = [];
    //图形选定
    drawV.OnShapeSelected = function (shape) {


        if (drawV.ShapeSelected != undefined) {

            if (drawV.ShapeSelected.GetType() == "Command") {

                drawV.ShapeSelected.Sender = { Shape: shape, DrawView: drawV, FormContext: drawV.FormContext };
                drawV.ShapeSelected.Execute();

            }
            else {

                if (typeof drawV.ShapeSelected == "function")
                    drawV.ShapeSelected(shape);
            }
        }

        //模式
        if (drawV.mode == 1 && shape != undefined) {

            if(drawV.OnObjectSelected != undefined){
                drawV.OnObjectSelected(shape);
            }
            event.cancelBubble = true;
        }
    }

    //实现的方法
    drawV.OnShapeClick = function (shape) {
        //TODO 在Shape选定时调用此方法传入Shape
        if (drawV.ShapeClick != undefined) {

            if (drawV.ShapeClick.GetType() == "Command") {

                drawV.ShapeClick.Sender = { Shape: shape, DrawView: drawV, FormContext: drawV.FormContext };
                drawV.ShapeClick.Execute();
            }
            else {

                if (typeof drawV.ShapeClick == "function")
                    drawV.ShapeClick(shape);
            }

        }
    }

    //鼠标点击
    drawV.canvas.onmousedown = function (event) {

        //如果点击的不是编辑视图，就把点击区域赋值为undefined；
        drawV.editView.clickedArea = undefined;
        drawV.mouseDownPoint = new DBFX.Web.Draw.Point(event.offsetX, event.offsetY);
        drawV.MouseButton = 1;

        if(drawV.mode == 1){//编辑模式
            var shape = drawV.hitEvent(event.offsetX, event.offsetY);
        }else {
            drawV.TSelectShape = undefined;
            drawV.EventPos={X:event.offsetX,Y:event.offsetY};
            drawV.draw();
            var shape = drawV.TSelectShape;
        }

        // var shape = drawV.hitEvent(event.offsetX/drawV.currentScale*(drawV.canvas.width/parseInt(drawV.canvas.style.width)), event.offsetY/drawV.currentScale*(drawV.canvas.height/parseInt(drawV.canvas.style.height)));

        drawV.clickedArea = drawV.editView.clickedArea;
        drawV.editView.editAble = false;
        drawV.editView.moveAble = false;

        //点击到图形之外的区域
        if (typeof shape == "undefined") {

            //使用模式时
            if (drawV.mode == 2) {
                drawV.editViewShow = false;
                if (drawV.preSelectShape == undefined) {

                    drawV.selectedShape = "noShape";

                } else {

                    drawV.preSelectShape.alpha = 1.0;
                }
                drawV.draw();
            }

            if (drawV.mode == 1) {
                drawV.selectedShape = "noShape";
                drawV.editView.edit(drawV.selectedShape);
                drawV.editViewShow = false;
                drawV.draw();
                drawV.editView.draw(drawV.context);
            }

        } else {
            // event.stopPropagation();
            if (shape != "editView") {
                drawV.selectedShape = shape;
                //编辑模式
                if (drawV.mode == 1) {
                    switch (shape.shapeType) {
                        case "Rect":
                        case "RectTable":
                        case "Aisle":
                        case "Partition":
                        case "Toilet":
                        case "Exit":
                        case "Cashier":
                        case "Entrance":
                        case "BarCounter":
                        case "TextArea":
                            drawV.editView = new DBFX.Web.Draw.RectEditView();
                            break;
                        case "Arc":
                        case "ArcTable":
                            drawV.editView = new DBFX.Web.Draw.ArcEditView();
                            break;
                        default:
                            break;
                    }
                    //
                    drawV.editView.edit(drawV.selectedShape);
                    drawV.editViewShow = true;
                    drawV.OnShapeSelected(drawV.selectedShape);

                }
                //使用模式
                if (drawV.mode == 2 && shape.allowClick != false) {

                    if (shape.shapeType == "Toilet" || shape.shapeType == "RectTable" ||
                        shape.shapeType == "TextArea") {

                        //性能优化
                        drawV.selectedShape.alpha = 0.5;
                        drawV.selectedShape.draw(drawV.context);
                        if (drawV.preSelectShape != undefined && drawV.preSelectShape != drawV.selectedShape) {
                            drawV.preSelectShape.alpha = 1.0;
                            drawV.preSelectShape.draw(drawV.context);

                            //TODO:绘制路径  测试时需要打开注释
                            // drawV.drawRoute(drawV.preSelectShape, drawV.selectedShape);
                        }

                        if (drawV.preSelectShape != drawV.selectedShape) {
                            drawV.preSelectShape = drawV.selectedShape;
                        }
                    }

                    drawV.OnShapeClick(drawV.selectedShape);
                    drawV.editView.edit("noShape");
                    drawV.editView.draw(drawV.context);

                }

            } else {//此时点击的是编辑视图
                //设置编辑试图被点击的点
                drawV.editView.mouseDownCursor(drawV.clickedArea,
                                            drawV.canvas);
            }
            drawV.draw();
            drawV.editView.downPoint = new DBFX.Web.Draw.Point(event.offsetX, event.offsetY);
            drawV.editView.draw(drawV.context);
        }
    }

    //鼠标移动
    drawV.canvas.onmousemove = function (event) {

        if (drawV.MouseButton != 1)
            return;

        drawV.mouseMovePoint = new DBFX.Web.Draw.Point(event.offsetX, event.offsetY);


        var offX = drawV.mouseMovePoint.x - drawV.mouseDownPoint.x;
        var offY = drawV.mouseMovePoint.y - drawV.mouseDownPoint.y;

        if (drawV.mode == 2) {
            return;
        }
        //移动时
        if (drawV.editView.moveAble == true) {

            drawV.editView.shape.minX += offX;
            drawV.editView.shape.maxX += offX;
            drawV.editView.shape.minY += offY;
            drawV.editView.shape.maxY += offY;

            drawV.editView.minX += offX;
            drawV.editView.maxX += offX;
            drawV.editView.minY += offY;
            drawV.editView.maxY += offY;

            drawV.mouseDownPoint = drawV.mouseMovePoint;
            // drawV.editView.draw(drawV.context);
        }


        if (drawV.editView.editAble == true) {

            if (drawV.clickedArea == 0) {
                drawV.canvas.style.cursor = "move";
                drawV.editView.moveAble = true;
            } else {
                drawV.canvas.style.cursor = "auto";
            }


            drawV.editView.movePoint = drawV.mouseMovePoint;

            // ！！！！一定要传入drawV.clickedArea，
            // 传入drawV.editView.clickedArea的话会取到0，导致操作不准确
            drawV.editView.mouseMoveHandle(drawV.clickedArea,
                                            drawV.canvas,
                                            event, drawV.mouseDownPoint);

        }

        drawV.editView.edit(drawV.selectedShape);
        drawV.draw();
        drawV.editView.draw(drawV.context);
    }

    //键盘按钮监听
    document.onkeydown = function (e) {

        //点击删除键 删除所选图形
        if (e.keyCode == 46) {
            drawV.removeShape();
        }
    }

    //鼠标抬起
    drawV.canvas.onmouseup = function (event) {
        drawV.MouseButton = 0;

        drawV.canvas.style.cursor = "auto";
        drawV.editView.moveAble = false;
        drawV.editView.editAble = false;

    }

    //鼠标右键
    drawV.canvas.oncontextmenu = function (e) {
        //alert(e);
        e.preventDefault();
    }

    //鼠标移出
    drawV.canvas.onmouseout = function () {
        if (drawV.editShape != undefined) {
            drawV.editShape.editAble = false;
            drawV.editShape = undefined;
        }
    }

    // 手指触摸
    drawV.canvas.addEventListener("touchstart", function (event) {

        //一个手指触碰  点击操作
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            drawV.startPosX = touch.clientX;
            drawV.startPosY = touch.clientY;

            // drawV.EventPos={X:touch.screenX,Y:touch.screenY};
            // drawV.EventPos = {X:touch.clientX - drawV.canvas.clientLeft,Y:touch.clientY - drawV.canvas.clientTop};

            //如果点击的不是编辑视图，就把点击区域赋值为undefined；
            drawV.editView.clickedArea = undefined;
            drawV.mouseDownPoint = new DBFX.Web.Draw.Point(touch.clientX, touch.clientY);
            drawV.MouseButton = 1;

            // drawV.TSelectShape = undefined;
            drawV.draw();
            var shape = drawV.TSelectShape;

            //获取当前触摸图形
            // var shape = drawV.hitEvent((touch.screenX-10) * drawV.originalScale.x*drawV.currentScale, (touch.screenY-10) * drawV.originalScale.y*drawV.currentScale);

            // var shape = drawV.hitEvent((touch.screenX-10), (touch.screenY-10));

            // if(drawV.currentScale == 1){
            //     // var shape = drawV.hitEvent((touch.screenX-10)*((drawV.canvas.width/drawV.canvas.clientWidth)), (touch.screenY-10)*((drawV.canvas.height/drawV.canvas.clientHeight)));
            //     var shape = drawV.hitEvent(touch.screenX,touch.screenY);
            // }
            // if(drawV.currentScale > 1){
            //
            //     var shape = drawV.hitEvent((touch.screenX-10)*((drawV.canvas.width/drawV.canvas.clientWidth)+drawV.currentScale)/drawV.currentScale, (touch.screenY-10)*((drawV.canvas.height/drawV.canvas.clientHeight))+drawV.currentScale)/drawV.currentScale;
            //
            //
            // }

            drawV.clickedArea = drawV.editView.clickedArea;

            drawV.editView.editAble = false;
            drawV.editView.moveAble = false;

            //点击到图形之外的区域
            if (typeof shape == "undefined") {

                //使用模式时
                if (drawV.mode == 2) {
                    drawV.editViewShow = false;
                    if (drawV.preSelectShape == undefined) {

                        drawV.selectedShape = "noShape";

                    } else {

                        drawV.preSelectShape.alpha = 1.0;
                    }

                    drawV.draw();
                }

                if (drawV.mode == 1) {
                    //
                    drawV.selectedShape = "noShape";
                    drawV.editView.edit(drawV.selectedShape);
                    drawV.editViewShow = false;
                    drawV.draw();
                    drawV.editView.draw(drawV.context);
                }

            } else {
                if (shape != "editView") {
                    drawV.selectedShape = shape;

                    event.cancelBubble = true;
                    //编辑模式
                    if (drawV.mode == 1) {
                        switch (shape.shapeType) {
                            case "Rect":
                            case "RectTable":
                            case "Aisle":
                            case "Partition":
                            case "Toilet":
                            case "Exit":
                            case "Cashier":
                            case "Entrance":
                            case "BarCounter":
                            case "TextArea":
                                drawV.editView = new DBFX.Web.Draw.RectEditView();
                                break;
                            case "Arc":
                            case "ArcTable":
                                drawV.editView = new DBFX.Web.Draw.ArcEditView();
                                break;
                            case "Line":
                                break;
                            default:
                                break;
                        }
                        //
                        drawV.OnShapeSelected(drawV.selectedShape);
                        drawV.editView.edit(drawV.selectedShape);
                        drawV.editViewShow = true;
                    }
                    //使用模式
                    if (drawV.mode == 2 && shape.allowClick != false) {


                        if (shape.shapeType == "Toilet" || shape.shapeType == "RectTable" ||
                        shape.shapeType == "TextArea") {

                            //性能优化
                            drawV.selectedShape.alpha = 0.5;
                            drawV.selectedShape.draw(drawV.context);
                            if (drawV.preSelectShape != undefined && drawV.preSelectShape != drawV.selectedShape) {
                                drawV.preSelectShape.alpha = 1.0;
                                drawV.preSelectShape.draw(drawV.context);

                                //TODO:绘制路径 测试时需要打开注释
                                // drawV.drawRoute(drawV.preSelectShape, drawV.selectedShape);
                            }

                            if (drawV.preSelectShape != drawV.selectedShape) {
                                drawV.preSelectShape = drawV.selectedShape;
                            }
                        }

                        drawV.OnShapeClick(drawV.selectedShape);
                        drawV.editView.edit("noShape");
                        drawV.editView.draw(drawV.context);
                    }

                } else {//此时点击的是编辑视图

                    //设置编辑试图被点击的点
                    drawV.editView.mouseDownCursor(drawV.clickedArea,
                                                drawV.canvas);
                }
                drawV.draw();
                drawV.editView.downPoint = new DBFX.Web.Draw.Point(touch.clientX, touch.clientY);
                drawV.editView.draw(drawV.context);
            }
        }

        //两个手指触碰  进行缩放操作
        if (event.targetTouches.length == 2) {
            var touch01 = event.targetTouches[0];
            var touch02 = event.targetTouches[1];
            var startXGap = touch02.clientX - touch01.clientX;
            var startYGap = touch02.clientY - touch01.clientY;
            drawV.startDis = Math.sqrt(Math.pow(startXGap, 2) + Math.pow(startYGap, 2));
        }
    }, false);

    //手指移动
    drawV.canvas.addEventListener("touchmove", function (event) {
        if (event.targetTouches.length == 1) {
            event.preventDefault();
            event.stopPropagation();


            var touch = event.targetTouches[0];
            drawV.movePosX = touch.clientX;
            drawV.movePosY = touch.clientY;
            //手指移动大于10才执行移动操作
            if (Math.abs(drawV.movePosX - drawV.startPosX) < 10 || Math.abs(drawV.movePosY - drawV.startPosY) < 10) {
                return;
            }

            // if(Math.abs(drawV.totalDis_X) > drawV.canvas.width*0.5
            //         || Math.abs(drawV.totalDis_Y) > drawV.canvas.height*0.5){
            //
            //     drawV.totalDis_X = drawV.canvas.width*0.5;
            //     drawV.totalDis_Y = drawV.canvas.height*0.5;
            //     return;
            // }

            DBFX.Web.Draw.Tools.print("========");
            DBFX.Web.Draw.Tools.print("totalDis_X:"+drawV.totalDis_X);
            DBFX.Web.Draw.Tools.print("totalDis_Y:"+drawV.totalDis_Y);
            DBFX.Web.Draw.Tools.print("currentScale:"+drawV.currentScale);

            if(drawV.currentScale == 1){
                if(drawV.totalDis_X < -drawV.canvas.clientWidth*0.5 && (drawV.movePosX - drawV.startPosX)<0){
                    shape.minX += 0;
                    shape.maxX += 0;
                    shape.minY += drawV.movePosY - drawV.startPosY;
                    shape.maxY += drawV.movePosY - drawV.startPosY;
                    return;
                }

                if(drawV.totalDis_X > drawV.canvas.clientWidth*0.5 && (drawV.movePosX - drawV.startPosX)>0){
                    shape.minX += 0;
                    shape.maxX += 0;
                    shape.minY += drawV.movePosY - drawV.startPosY;
                    shape.maxY += drawV.movePosY - drawV.startPosY;
                    return;
                }

                if(drawV.totalDis_Y < -drawV.canvas.clientHeight*0.5 && (drawV.movePosY - drawV.startPosY)<0){
                    shape.minX += drawV.movePosX - drawV.startPosX;
                    shape.maxX += drawV.movePosX - drawV.startPosX;
                    shape.minY += 0;
                    shape.maxY += 0;
                    return;
                }

                if(drawV.totalDis_Y > drawV.canvas.clientHeight*0.5 && (drawV.movePosY - drawV.startPosY)>0){
                    shape.minX += drawV.movePosX - drawV.startPosX;
                    shape.maxX += drawV.movePosX - drawV.startPosX;
                    shape.minY += 0;
                    shape.maxY += 0;
                    return;
                }

            }else {

                DBFX.Web.Draw.Tools.print("++++++++++++");
                if(drawV.totalDis_X < -drawV.canvas.clientWidth*0.6*drawV.currentScale && (drawV.movePosX - drawV.startPosX)<0){
                    shape.minX += 0;
                    shape.maxX += 0;
                    shape.minY += drawV.movePosY - drawV.startPosY;
                    shape.maxY += drawV.movePosY - drawV.startPosY;
                    DBFX.Web.Draw.Tools.print("3");
                    return;
                }

                if(drawV.totalDis_X > 0 && (drawV.movePosX - drawV.startPosX)>0){
                    shape.minX += 0;
                    shape.maxX += 0;
                    shape.minY += drawV.movePosY - drawV.startPosY;
                    shape.maxY += drawV.movePosY - drawV.startPosY;
                    DBFX.Web.Draw.Tools.print("4");
                    return;
                }

                if(drawV.totalDis_Y > 0 && (drawV.movePosY - drawV.startPosY)>0){
                    shape.minX += drawV.movePosX - drawV.startPosX;
                    shape.maxX += drawV.movePosX - drawV.startPosX;
                    shape.minY += 0;
                    shape.maxY += 0;
                    DBFX.Web.Draw.Tools.print("1");
                    return;
                }

                if(drawV.totalDis_Y < -drawV.canvas.clientHeight*0.6*drawV.currentScale && (drawV.movePosY - drawV.startPosY)<0){
                    shape.minX += drawV.movePosX - drawV.startPosX;
                    shape.maxX += drawV.movePosX - drawV.startPosX;
                    shape.minY += 0;
                    shape.maxY += 0;
                    DBFX.Web.Draw.Tools.print("2");
                    return;
                }

            }



            drawV.totalDis_X += (drawV.movePosX - drawV.startPosX);
            drawV.totalDis_Y += (drawV.movePosY - drawV.startPosY);
            // DBFX.Web.Draw.Tools.print("totalDis_X:"+drawV.totalDis_X);
            // DBFX.Web.Draw.Tools.print("totalDis_Y:"+drawV.totalDis_Y);

            drawV.shapes.forEach(function (shape) {

                shape.minX += drawV.movePosX - drawV.startPosX;
                shape.maxX += drawV.movePosX - drawV.startPosX;
                shape.minY += drawV.movePosY - drawV.startPosY;
                shape.maxY += drawV.movePosY - drawV.startPosY;

            });

            drawV.startPosX = drawV.movePosX;
            drawV.startPosY = drawV.movePosY;
        }

        if (event.targetTouches.length == 2) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
            var touch01 = event.targetTouches[0];
            var touch02 = event.targetTouches[1];
            var moveXGap = touch02.clientX - touch01.clientX;
            var moveYGap = touch02.clientY - touch01.clientY;
            drawV.endDis = Math.sqrt(Math.pow(moveXGap, 2) + Math.pow(moveYGap, 2));
            if (drawV.startDis == 0) {
                drawV.startDis = 1;
            }
            var scale = drawV.endDis / drawV.startDis;
            drawV.currentScale = drawV.preScale * scale;

            if (drawV.currentScale >= 4.5) {
                drawV.currentScale = 4.5;
                return;
            }
            if (drawV.currentScale <= 0.5) {
                drawV.currentScale = 0.5;
                return;
            }

            drawV.shapes.forEach(function (shape) {
                shape.scale = { x: drawV.currentScale, y: drawV.currentScale};
            });
        }
        drawV.draw();
    }, false);

    //手指触摸事件结束
    drawV.canvas.addEventListener("touchend", function (event) {

        if (drawV.currentScale == undefined) {
            drawV.preScale = 1;
        } else {
            drawV.preScale = drawV.currentScale;
        }
    }, false);

    return drawV;
}
DBFX.Serializer.DrawViewSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {

    }

    //系列化
    this.Serialize = function (c, xe, ns) {

    }
}
DBFX.Design.ControlDesigners.DrawViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/DrawViewDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "绘制视图设置";
    return obdc;
}


DBFX.Web.Draw.DrawViewer = function () {

    var drwv = DBFX.Web.Controls.Control("DrawViewer");
    drwv.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.DrawViewerDesigner");
    drwv.ClassDescriptor.Serializer = "DBFX.Serializer.DrawViewerSerializer";
    drwv.DrawView = new DBFX.Web.Draw.DrawView("DrawView");
    drwv.VisualElement = document.createElement("DIV");
    drwv.OnCreateHandle();
    drwv.VisualElement.appendChild(drwv.DrawView.VisualElement);
    drwv.Class = "DrawViewer";
    drwv.DrawView.Width = "100%";
    drwv.DrawView.Height = "100%";

    Object.defineProperty(drwv, "ResourceUri", {
        get: function () {
            return drwv.resourceUri;
        },
        set: function (v) {

            drwv.resourceUri = v;

            DBFX.Resources.LoadJSonResource(v, function (jsonobj) {

                var rc = drwv.VisualElement.getBoundingClientRect();
                drwv.DrawView.Width = rc.width + "px";
                drwv.DrawView.Height = rc.height + "px";
                drwv.DrawView.DrawPaper.width = rc.width;//jsonobj.Paper.Width.replace("px", "");
                drwv.DrawView.DrawPaper.height = rc.height;//jsonobj.Paper.Height.replace("px", "");
                drwv.DrawView.paper={width:jsonobj.Paper.Width,height:jsonobj.Paper.Height};
                drwv.DrawView.readContext(JSON.stringify(jsonobj.Shapes));
                drwv.DrawView.ShapeClick = drwv.ShapeClick;
                drwv.DrawView.ShapeSelected = drwv.ShapeSelected;
                drwv.DrawView.FormContext = drwv.FormContext;

                drwv.OnDrawLoaded();

            });
        }
    });


    drwv.OnDrawLoaded = function () {

        
        if (drwv.DrawLoaded != undefined) {

            if (drwv.DrawLoaded.GetType() == "Command") {

                drwv.DrawLoaded.Sender = drwv;
                drwv.DrawLoaded.Execute();

            }
            else {

                if (typeof drwv.ShapeClick == "function")
                    drwv.ShapeClick(drwv);

            }

        }

    }


    return drwv;

}
DBFX.Serializer.DrawViewerSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        DBFX.Serializer.DeSerializeCommand("ShapeClick", xe, c);
        DBFX.Serializer.DeSerializeCommand("ShapeSelected", xe, c);
        DBFX.Serializer.DeSerializeCommand("DrawLoaded", xe, c);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {

        DBFX.Serializer.SerialProperty("ResourceUri", c.ResourceUri, xe);
        DBFX.Serializer.SerialProperty("Height", c.Height, xe);
        DBFX.Serializer.SerialProperty("Width", c.Width, xe);
        DBFX.Serializer.SerializeCommand("ShapeClick", c.ShapeClick, xe);
        DBFX.Serializer.SerializeCommand("ShapeSelected", c.ShapeSelected, xe);
        DBFX.Serializer.SerializeCommand("DrawLoaded", c.DrawLoaded, xe);
    }
}
DBFX.Design.ControlDesigners.DrawViewerDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/DrawViewerDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            //ShapeSelected
            od.EventListBox.ItemSource = [{ EventName: "ShapeClick", EventCode: undefined, Command: od.dataContext.ShapeClick, Control: od.dataContext }, { EventName: "ShapeSelected", EventCode: undefined, Command: od.dataContext.ShapeSelected, Control: od.dataContext }, { EventName: "DrawLoaded", EventCode: undefined, Command: od.dataContext.DrawLoaded, Control: od.dataContext }];


        }, obdc);

    }

    obdc.DataContextChanged = function (e) {

        obdc.DataBind(e);
        if (obdc.EventListBox != undefined)
            obdc.EventListBox.ItemSource = [{ EventName: "ShapeClick", EventCode: undefined, Command: obdc.dataContext.ShapeClick, Control: obdc.dataContext }, { EventName: "ShapeSelected", EventCode: undefined, Command: obdc.dataContext.ShapeSelected, Control: obdc.dataContext }, { EventName: "DrawLoaded", EventCode: undefined, Command: od.dataContext.DrawLoaded, Control: od.dataContext }];


    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "图形查看器设置";
    return obdc;
}

//矩形编辑视图
DBFX.Web.Draw.RectEditView = function () {
    var view = new DBFX.Web.Draw.EditView("rectEditView");

    view.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.RectEditViewDesigner");
    view.ClassDescriptor.Serializer = "DBFX.Serializer.RectEditViewSerializer";

    //记录鼠标点击的坐标和移动时的点坐标
    view.downPoint = 0;
    view.movePoint = 0;

    view.edit = function (shape) {

        view.shape = shape;
        view.rotateAngle = shape.rotateAngle;


        //清空保存编辑区域的数组！！！
        view.editAreas.splice(0, view.editAreas.length);

        if (shape == "noShape") {

            // view.editAreas.splice(0,view.editAreas.length);
            view.minX = 0;
            view.maxX = 0;
            view.minY = 0;
            view.maxY = 0;
            view.editAble = false;
            view.moveAble = false;
        } else {


            view.minX = shape.minX;
            view.minY = shape.minY;
            view.maxX = shape.maxX;
            view.maxY = shape.maxY;

            //左右边长
            var LRHeight = shape.maxY - shape.minY;
            //上下边长
            var UDWidth = shape.maxX - shape.minX;

            //移动区
            view.editAreas.push({
                x: view.minX - 1, y: view.minY - 1,
                width: view.maxX - view.minX + 2, height: view.maxY - view.minY + 2
            });

            //设置每个角的编辑区域宽为editW
            var editW = 10;
            //左上角
            view.editAreas.push({
                x: view.minX - 0.5 * editW, y: view.minY - 0.5 * editW,
                width: editW, height: editW
            });
            //右上角
            view.editAreas.push({
                x: view.maxX - 0.5 * editW, y: view.minY - 0.5 * editW,
                width: editW, height: editW
            });
            //右下角
            view.editAreas.push({
                x: view.maxX - 0.5 * editW, y: view.maxY - 0.5 * editW,
                width: editW, height: editW
            });
            //左下角
            view.editAreas.push({
                x: view.minX - 0.5 * editW, y: view.maxY - 0.5 * editW,
                width: editW, height: editW
            });
            //左边中心点
            view.editAreas.push({
                x: view.minX - 0.5 * editW, y: view.minY + LRHeight * 0.5 - 0.5 * editW,
                width: editW, height: editW
            });
            //上边中心点
            view.editAreas.push({
                x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: view.minY - 0.5 * editW,
                width: editW, height: editW
            });
            //右边中心点
            view.editAreas.push({
                x: view.maxX - 0.5 * editW, y: view.minY + LRHeight * 0.5 - 0.5 * editW,
                width: editW, height: editW
            });
            //下边中心点
            view.editAreas.push({
                x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: view.maxY - 0.5 * editW,
                width: editW, height: editW
            });
            //旋转点
            if (view.minY - LRHeight * 0.45 - 0.5 * editW > 20 && view.minY - 1 > 26) {
                view.editAreas.push({
                    x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: view.minY - LRHeight * 0.45 - 0.5 * editW,
                    width: editW, height: editW
                });
            } else if (view.minY - 1 > 26) {
                view.editAreas.push({
                    x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: 20,
                    width: editW, height: editW
                });
            }

        }

    }


    view.mouseDownCursor = function (point, canvas) {
        switch (point) {
            case 0://中间区域

                canvas.style.cursor = "move";
                view.moveAble = true;
                view.editAble = false;
                break;
            case 1://左上角

                canvas.style.cursor = "nw-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 2://右上角

                canvas.style.cursor = "ne-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 3://右下角

                canvas.style.cursor = "se-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 4://左下角

                canvas.style.cursor = "sw-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 5:
            case 7://左边中心和右边中心
                canvas.style.cursor = "ew-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 6:
            case 8://上边和下边中心
                canvas.style.cursor = "ns-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 9://旋转
                canvas.style.cursor = "";
                view.moveAble = false;
                view.editAble = true;
                break;
            default:
                break;
        }
    }

    view.mouseMoveHandle = function (clickedArea, canvas, event, downPoint) {

        switch (clickedArea) {

            case 1://lefttop
                {
                    // if(event.offsetX > (view.maxX-30) || event.offsetY > (view.maxY-30)) return;
                    view.minY = event.offsetY;
                    view.minX = event.offsetX;

                    view.shape.minY = event.offsetY;
                    view.shape.minX = event.offsetX;

                    canvas.style.cursor = "nw-resize";
                }
                break;
            case 2://righttop
                {
                    // if(event.offsetX < (view.minX+30) || event.offsetY > (view.maxY-30)) return;
                    view.minY = event.offsetY;
                    view.maxX = event.offsetX;

                    view.shape.minY = event.offsetY;
                    view.shape.maxX = event.offsetX;

                    canvas.style.cursor = "ne-resize";

                }
                break;
            case 3://rightbottom
                {
                    // if(event.offsetX < (view.minX+30) || event.offsetY < (view.minY+30)) return;
                    view.maxY = event.offsetY;
                    view.maxX = event.offsetX;

                    view.shape.maxY = event.offsetY;
                    view.shape.maxX = event.offsetX;

                    canvas.style.cursor = "se-resize";
                }
                break;
            case 4://leftbottom
                {
                    // if(event.offsetY < (view.minY+30) || event.offsetX > (view.maxX-30)) return;
                    view.maxY = event.offsetY;
                    view.minX = event.offsetX;

                    view.shape.maxY = event.offsetY;
                    view.shape.minX = event.offsetX;

                    canvas.style.cursor = "sw-resize";
                }
                break;


            case 5://leftcenter
                {
                    // if(event.offsetX > (view.maxX-30)) return;
                    view.minX = event.offsetX;
                    view.shape.minX = event.offsetX;
                    canvas.style.cursor = "ew-resize";
                }
                break;
            case 6://topcenter
                {
                    // if (event.offsetY > (view.maxY-30)) return;
                    view.minY = event.offsetY;
                    view.shape.minY = event.offsetY;
                    canvas.style.cursor = "ns-resize";
                }
                break;
            case 7://rightcenter
                {
                    // if (event.offsetX < (view.minX+30)) return;
                    view.maxX = event.offsetX;
                    view.shape.maxX = event.offsetX;
                    canvas.style.cursor = "ew-resize";
                }
                break;
            case 8://bottomcenter
                {
                    // if(event.offsetY < (view.minY+30)) return;
                    view.maxY = event.offsetY;
                    view.shape.maxY = event.offsetY;
                    canvas.style.cursor = "ns-resize";
                }
                break;
            case 9://rotate
                {
                    var dx = view.movePoint.x - view.downPoint.x;
                    var dy = view.movePoint.y - view.downPoint.y;

                    var tanV = dy / dx;
                    //atan的取值范围为-90~90
                    view.shape.rotateAngle = Math.atan(tanV);

                    canvas.style.cursor = "pointer";
                }
                break;
            default:
                break;
        }

    }

    view.draw = function (context) {


        context.save();

        //旋转控制
        context.translate((view.minX + view.maxX) * 0.5, (view.minY + view.maxY) * 0.5);
        context.rotate(view.rotateAngle);
        context.translate(-(view.minX + view.maxX) * 0.5, -(view.minY + view.maxY) * 0.5);


        view.editAreas.forEach(function (area, index) {
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 1;
            if (index == 9) {
                context.arc(area.x + area.width * 0.5,
                            area.y + area.height * 0.5,
                            area.width * 0.5,
                            0,
                            Math.PI * 2);
                context.moveTo(area.x + area.width * 0.5, area.y);
                context.lineTo(area.x + area.width * 0.15, area.y - area.width * 0.2);
                context.moveTo(area.x + area.width * 0.5, area.y);
                context.lineTo(area.x + area.width * 0.2, area.y + area.width * 0.5);
            } else {
                context.rect(area.x, area.y, area.width, area.height);
            }

            context.stroke();
            //点击测试 使用正序遍历时会出现一个情况：点击重叠区域时会检测到两个区域；
            if (context.isPointInPath(view.downPoint.x, view.downPoint.y)) {
                view.clickedArea = index;

            }
        });

        context.restore();
    }

    view.hitEvent = function (x, y) {

        if (view.clickedArea != undefined) {
            return true;
        } else {
            return false;
        }

    }

    return view;
}


//圆形编辑视图
DBFX.Web.Draw.ArcEditView = function () {

    var view = new DBFX.Web.Draw.EditView("arcEditView");
    view.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ArcEditViewDesigner");
    view.ClassDescriptor.Serializer = "DBFX.Serializer.ArcEditViewSerializer";

    view.edit = function (shape) {
        view.shape = shape;
        //清空5个编辑区域的数组
        view.editAreas.splice(0, view.editAreas.length);
        if (shape != undefined && shape.shapeType != "editView") {
            view.minX = shape.minX;
            view.minY = shape.minY;
            view.maxX = shape.maxX;
            view.maxY = shape.maxY;

            //左右边长
            var LRHeight = shape.maxY - shape.minY;
            //上下边长
            var UDWidth = shape.maxX - shape.minX;

            var editW = 10;
            //移动区域（圆形区域）
            view.editAreas.push({ x: (view.maxX + view.minX) * 0.5, y: (view.minY + view.maxY) * 0.5, r: LRHeight * 0.5 + 1 });

            //左边中心点
            view.editAreas.push({
                x: view.minX - 0.5 * editW, y: view.minY + LRHeight * 0.5 - 0.5 * editW,
                width: editW, height: editW
            });
            //上边中心点
            view.editAreas.push({
                x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: view.minY - 0.5 * editW,
                width: editW, height: editW
            });
            //右边中心点
            view.editAreas.push({
                x: view.maxX - 0.5 * editW, y: view.minY + LRHeight * 0.5 - 0.5 * editW,
                width: editW, height: editW
            });
            //下边中心点
            view.editAreas.push({
                x: view.minX + UDWidth * 0.5 - 0.5 * editW, y: view.maxY - 0.5 * editW,
                width: editW, height: editW
            });

        }
        if (shape == undefined) {
            view.minX = 0;
            view.maxX = 0;
            view.minY = 0;
            view.maxY = 0;
            view.editAble = false;
            view.moveAble = false;
        }
    }

    view.mouseDownCursor = function (point, canvas) {

        switch (point) {
            case 3://rightCenter
            case 1://leftCenter
                canvas.style.cursor = "ew-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 2://topCenter
            case 4://bottomCenter
                canvas.style.cursor = "ns-resize";
                view.moveAble = false;
                view.editAble = true;
                break;
            case 0://innerView
                canvas.style.cursor = "move";
                view.moveAble = true;
                view.editAble = false;
                break;
            default:
                break;
        }

    }

    view.mouseMoveHandle = function (clickedArea, canvas, event, downPoint) {
        switch (clickedArea) {
            case 1://leftCenter
                {

                    if (event.offsetX > (view.maxX - 50)) return;
                    view.shape.minY += (event.offsetX - downPoint.x) * 0.5;
                    view.shape.maxY -= (event.offsetX - downPoint.x) * 0.5;
                    view.shape.minX = event.offsetX;
                    view.minY += (event.offsetX - downPoint.x) * 0.5;
                    view.maxY -= (event.offsetX - downPoint.x) * 0.5;
                    view.minX = event.offsetX;
                    downPoint.x = event.offsetX;

                    canvas.style.cursor = "ew-resize";
                }
                break;
            case 2://topCenter
                {
                    if (event.offsetY > (view.maxY - 50)) return;
                    view.shape.minX += (event.offsetY - downPoint.y) * 0.5;
                    view.shape.maxX -= (event.offsetY - downPoint.y) * 0.5;
                    view.shape.minY = event.offsetY;

                    view.minX += (event.offsetY - downPoint.y) * 0.5;
                    view.maxX -= (event.offsetY - downPoint.y) * 0.5;
                    view.minY = event.offsetY;
                    downPoint.y = event.offsetY;

                    canvas.style.cursor = "ns-resize";
                }
                break;
            case 3://rightCenter
                {
                    if (event.offsetX < (view.minX + 50)) return;
                    view.shape.minY -= (event.offsetX - downPoint.x) * 0.5;
                    view.shape.maxY += (event.offsetX - downPoint.x) * 0.5;
                    view.shape.maxX = event.offsetX;

                    view.minY -= (event.offsetX - downPoint.x) * 0.5;
                    view.maxY += (event.offsetX - downPoint.x) * 0.5;
                    view.maxX = event.offsetX;
                    downPoint.x = event.offsetX;

                    canvas.style.cursor = "ew-resize";
                }
                break;

            case 4://bottomCenter
                {
                    if (event.offsetY < (view.minY + 50)) return;
                    view.shape.minX -= (event.offsetY - downPoint.y) * 0.5;
                    view.shape.maxX += (event.offsetY - downPoint.y) * 0.5;
                    view.shape.maxY = event.offsetY;

                    view.minX -= (event.offsetY - downPoint.y) * 0.5;
                    view.maxX += (event.offsetY - downPoint.y) * 0.5;
                    view.maxY = event.offsetY;

                    downPoint.y = event.offsetY;

                    canvas.style.cursor = "ns-resize";
                }
                break;
            default:
                break;
        }

    }

    //绘制
    view.draw = function (context) {

        view.context = context;
        //绘制边框线
        context.save();

        view.editAreas.forEach(function (area, index) {
            context.beginPath();
            context.strokeStyle = "black";
            context.lineWidth = 1;
            if (index == 0) {

                context.arc(area.x, area.y, area.r, 0, Math.PI * 2);

            } else {
                context.rect(area.x, area.y, area.width, area.height);
            }
            context.stroke();
            //点击测试 使用正序遍历时会出现一个情况：点击重叠区域时会检测到两个区域；
            if (context.isPointInPath(view.downPoint.x, view.downPoint.y)) {
                view.clickedArea = index;
            }
        });

        context.restore();
    }

    view.hitEvent = function (x, y) {
        if (view.clickedArea != undefined) {
            return true;
        } else {
            return false;
        }
    }
    return view;
}


//编辑视图基类
DBFX.Web.Draw.EditView = function (type) {
    var view = new UIObject();
    view.ClassDescriptor.Designers = ["DBFX.Design.ControlDesigners.EditViewDesigner"];
    view.ClassDescriptor.Serializer = "DBFX.Serializer.EditViewSerializer";

    //旋转角度
    view.rotateAngle = 0;
    Object.defineProperty(view, "RotateAngle", {
        get: function () {
            return view.rotateAngle;
        },
        set: function (v) {
            view.rotateAngle = v;
        }
    });

    view.editViewType = type;
    view.shape = undefined;

    //保存编辑点
    view.points = new Array();

    //编辑区域
    view.editAreas = new Array();


    view.editAble = false;
    view.moveAble = false;

    //用于保存被点击的区域
    view.clickedArea = undefined;

    //标记鼠标点击的点
    view.clickedPoint = undefined;
    view.context = undefined;

    view.minX = undefined;
    Object.defineProperty(view, "MinX", {
        get: function () {

            return view.minX;

        },
        set: function (v) {

            view.minX = v;
        }
    });

    view.minY = undefined;
    Object.defineProperty(view, "MinY", {
        get: function () {

            return view.minY;

        },
        set: function (v) {

            view.minY = v;
        }
    });

    view.maxX = undefined;
    Object.defineProperty(view, "MaxX", {
        get: function () {

            return view.maxX;

        },
        set: function (v) {

            view.maxX = v;
        }
    });

    view.maxY = undefined;
    Object.defineProperty(view, "MaxY", {
        get: function () {

            return view.maxY;

        },
        set: function (v) {

            view.maxY = v;
        }
    });

    view.lineWidth = "1";
    Object.defineProperty(view, "LineWidth", {
        get: function () {

            return view.lineWidth;

        },
        set: function (v) {

            view.lineWidth = v;
        }
    });
    //定义透明度
    view.alpha = 1.0;
    Object.defineProperty(view, "Alpha", {
        get: function () {
            return view.alpha;
        },
        set: function (v) {
            view.alpha = v;
        }
    });

    view.strokeStyle = "black";
    Object.defineProperty(view, "StrokeStyle", {
        get: function () {

            return view.strokeStyle;

        },
        set: function (v) {

            view.strokeStyle = v;
        }
    });

    view.fillStyle = "black";
    Object.defineProperty(view, "FillStyle", {
        get: function () {

            return view.fillStyle;

        },
        set: function (v) {

            view.fillStyle = v;
        }
    });

    //图形组合
    view.globalCompositeOperation = "source-over";
    Object.defineProperty(view, "GlobalCompositeOperation", {
        get: function () {

            return view.globalCompositeOperation;

        },
        set: function (v) {

            view.globalCompositeOperation = v;
        }
    });

    view.edit = function (shape) {

    }

    view.estimatePoint = function (event) { }

    view.mouseDownCursor = function (point, canvas) {

    }

    view.mouseMoveHandle = function (clickedArea, canvas, event, downPoint) {

    }
    view.hitEvent = function (x, y) {
        // view.draw(view.drawView.context);
        // return view.drawView.context.isPointInPath(x,y);

    }

    //绘制编辑视图
    view.draw = function (context) {

    }

    return view;
}


//图形基类
DBFX.Web.Draw.Shape = function (type) {
    if (type == undefined)
        type = "Shape";

    var shape = new UIObject(type);
    shape.ClassDescriptor.Designers = [];
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.ShapeSerializer";

    shape.shapeType = type;
    shape.shapeClass = "";

    shape.drawV=undefined;
    //图形触摸点
    shape.touchPoint = undefined;

    shape.draw = function (context) {

    }

    //可用性：是否可用
    shape.allowClick = true;

    //可见性:是否可见
    shape.isVisible = true;


    Object.defineProperty(shape, "AllowClick", {
        get: function () {

            return shape.allowClick;

        },
        set: function (v) {

            shape.allowClick = v;
        }
    });

    shape.hitEvent = function (x, y) {
        // alert(shape.shapeType);
        shape.draw(shape.drawView.context);
        return shape.drawView.context.isPointInPath(x, y);
    }

    shape.hitTest=function()
    {
        if(shape.drawV.context != undefined){
            if(shape.drawV.context.isPointInPath(shape.drawV.EventPos.X,shape.drawV.EventPos.Y))
            {
                shape.drawV.TSelectShape=this;
            }
        }

    }
    //设置旋转角度
    shape.rotateAngle = 0;
    Object.defineProperty(shape, "RotateAngle", {
        get: function () {

            return shape.rotateAngle;

        },
        set: function (v) {

            shape.rotateAngle = v;
        }
    });

    shape.scale = { x: 1.0, y: 1.0 };
    Object.defineProperty(shape, "Scale", {
        get: function () {
            return shape.scale;
        },
        set: function (v) {
            shape.scale = v;
        }
    });

    shape.minX = undefined;
    Object.defineProperty(shape, "MinX", {
        get: function () {

            return shape.minX;

        },
        set: function (v) {

            shape.minX = v;
        }
    });

    shape.minY = undefined;
    Object.defineProperty(shape, "MinY", {
        get: function () {

            return shape.minY;

        },
        set: function (v) {

            shape.minY = v;
        }
    });

    shape.maxX = undefined;
    Object.defineProperty(shape, "MaxX", {
        get: function () {

            return shape.maxX;

        },
        set: function (v) {

            shape.maxX = v;
        }
    });

    shape.maxY = undefined;
    Object.defineProperty(shape, "MaxY", {
        get: function () {

            return shape.maxY;

        },
        set: function (v) {

            shape.maxY = v;
        }
    });

    shape.lineWidth = "1";
    Object.defineProperty(shape, "LineWidth", {
        get: function () {

            return shape.lineWidth;

        },
        set: function (v) {

            shape.lineWidth = v;
        }
    });
    //定义透明度
    shape.alpha = 1.0;
    Object.defineProperty(shape, "Alpha", {
        get: function () {
            return shape.alpha;
        },
        set: function (v) {
            shape.alpha = v;
        }
    });

    shape.strokeStyle = "black";
    Object.defineProperty(shape, "StrokeStyle", {
        get: function () {

            return shape.strokeStyle;

        },
        set: function (v) {

            shape.strokeStyle = v;
        }
    });

    shape.fillStyle = "black";
    Object.defineProperty(shape, "FillStyle", {
        get: function () {

            return shape.fillStyle;

        },
        set: function (v) {

            shape.fillStyle = v;
        }
    });

    //图形组合(谨慎使用 会有一些难以预料的效果)
    shape.globalCompositeOperation = "source-over";
    Object.defineProperty(shape, "GlobalCompositeOperation", {
        get: function () {

            return shape.globalCompositeOperation;

        },
        set: function (v) {

            shape.globalCompositeOperation = v;
        }
    });

    return shape;
}


//直线
DBFX.Web.Draw.Line = function (x1, y1, x2, y2) {
    var shape = new DBFX.Web.Draw.Shape("Line");
    shape.shapeClass = "DBFX.Web.Draw.Line";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.LineDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.LineSerializer";

    //起点x
    shape.fromPoint_X = 0;
    Object.defineProperty(shape, "FromPoint_X", {
        set: function (v) {
            shape.fromPoint_X = v;
        },
        get: function () {
            return shape.fromPoint_X;
        }
    });
    //起点y
    shape.fromPoint_Y = 0;
    Object.defineProperty(shape, "FromPoint_Y", {
        set: function (v) {
            shape.fromPoint_Y = v;
        },
        get: function () {
            return shape.fromPoint_Y;
        }
    });
    //终点x
    shape.toPoint_X = 0;
    Object.defineProperty(shape, "ToPoint_X", {
        set: function (v) {
            shape.toPoint_X = v;
        },
        get: function () {
            return shape.toPoint_X;
        }
    });
    //终点y
    shape.toPoint_Y = 0;
    Object.defineProperty(shape, "ToPoint_Y", {
        set: function (v) {
            shape.toPoint_Y = v;
        },
        get: function () {
            return shape.toPoint_Y;
        }
    });


    shape.draw = function (context) {
        context.save();
        context.beginPath();
        context.scale(shape.scale.x, shape.scale.y);

        context.strokeStyle = shape.strokeStyle;
        context.lineWidth = shape.lineWidth;
        context.moveTo(shape.minX, shape.minY);
        context.lineTo(shape.maxX, shape.maxY);
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.stroke();
        context.closePath();
        context.restore();
    }


    if (x1 != undefined && y1 != undefined && x2 != undefined && y2 != undefined) {
        shape.fromPoint_X = x1;
        shape.fromPoint_Y = y1;
        shape.toPoint_X = x2;
        shape.toPoint_Y = y2;
        if (x1 == x2 && y1 != y2) {//垂直
            shape.minX = x1;
            shape.maxX = x1;
            if (y1 < y2) {
                shape.minY = y1;
                shape.maxY = y2;
            } else {
                shape.minY = y2;
                shape.maxY = y1;
            }
        }
        if (y1 == y2 && x1 != x2) {
            shape.minY = y1;
            shape.maxY = y2;
            if (x1 < x2) {
                shape.minX = x1;
                shape.maxX = x2;
            } else {
                shape.minX = x2;
                shape.maxX = x1;
            }
        }
    } else {
        shape.fromPoint_X = 200;
        shape.fromPoint_Y = 200;
        shape.toPoint_X = 400;
        shape.toPoint_Y = 200;

        shape.minX = 200;
        shape.minY = 200;
        shape.maxX = 400;
        shape.maxY = 200;
    }
    return shape;
}
DBFX.Serializer.LineSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {

    }
}
DBFX.Design.ControlDesigners.LineDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/LineDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "直线设置";
    return obdc;
}

//矩形+圆角矩形
DBFX.Web.Draw.Rect = function (x, y, width, height) {
    var shape = new DBFX.Web.Draw.Shape("Rect");
    shape.shapeClass = "DBFX.Web.Draw.Rect";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.RectDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.RectSerializer";

    shape.draw = function (context) {
        context.save();

        var p1 = shape.fromPoint;
        context.beginPath();

        context.scale(shape.scale.x, shape.scale.y);

        //图形旋转
        context.translate((shape.minX + shape.maxX) * 0.5, (shape.minY + shape.maxY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-(shape.minX + shape.maxX) * 0.5, -(shape.minY + shape.maxY) * 0.5);

        context.strokeStyle = shape.strokeStyle;
        context.lineWidth = shape.lineWidth;


        if (shape.cornerRadius <= 0 ||
            shape.cornerRadius > (shape.maxX - shape.minX) * 0.5 ||
            shape.cornerRadius > (shape.maxY - shape.minY) * 0.5) {

            context.rect(shape.minX, shape.minY, shape.maxX - shape.minX, shape.maxY - shape.minY);

        } else {
            context.moveTo(shape.minX + shape.cornerRadius, shape.minY);
            context.lineTo(shape.maxX - shape.cornerRadius, shape.minY);
            // context.strokeStyle = "blue";

            context.arcTo(shape.maxX, shape.minY, shape.maxX, shape.minY + shape.cornerRadius, shape.cornerRadius);
            context.arcTo(shape.maxX, shape.maxY, shape.maxX - shape.cornerRadius, shape.maxY, shape.cornerRadius);
            context.arcTo(shape.minX, shape.maxY, shape.minX, shape.maxY - shape.cornerRadius, shape.cornerRadius);
            context.arcTo(shape.minX, shape.minY, shape.minX + shape.cornerRadius, shape.minY, shape.cornerRadius);
            context.closePath();
        }

        context.fillStyle = shape.fillStyle;
        // context.scale(shape.scale.x,shape.scale.y);
        context.globalCompositeOperation = shape.globalCompositeOperation;
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }

    shape.cornerRadius = 0;
    Object.defineProperty(shape, "CornerRadius", {
        get: function () {
            return shape.cornerRadius;
        },
        set: function (v) {
            shape.cornerRadius = v;
        }

    });

    shape.fromPoint = { x: 0, y: 0 };
    Object.defineProperty(shape, "FromPoint", {
        get: function () {

            return shape.fromPoint;

        },
        set: function (v) {

            shape.fromPoint = v;
        }
    });

    shape.width = 8;
    Object.defineProperty(shape, "Width", {
        get: function () {

            return shape.width;

        },
        set: function (v) {

            shape.width = v;
        }
    });

    shape.height = 8;
    Object.defineProperty(shape, "Height", {
        get: function () {

            return shape.height;

        },
        set: function (v) {

            shape.height = v;
        }
    });

    if (x != undefined && y != undefined && width != undefined && height != undefined) {
        shape.fromPoint.x = x;
        shape.fromPoint.y = y;
        shape.height = height;
        shape.width = width;

        shape.minX = x;
        shape.minY = y;
        shape.maxX = x + width;
        shape.maxY = y + height;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 300;
        shape.maxY = 300;
    }

    return shape;
}
DBFX.Serializer.RectSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {

    }
}
DBFX.Design.ControlDesigners.RectDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/RectDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "矩形设置";
    return obdc;
}

//圆形
DBFX.Web.Draw.Arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
    var shape = new DBFX.Web.Draw.Shape("Arc");

    shape.draw = function (context) {
        context.save();
        context.beginPath();
        // context.moveTo(x,y);
        context.scale(shape.scale.x, shape.scale.y);
        context.fillStyle = shape.fillStyle;
        //半径
        var r = 0;
        if (shape.maxX - shape.minX <= shape.maxY - shape.minY) {
            r = (shape.maxX - shape.minX) * 0.5;
        } else {
            r = (shape.maxY - shape.minY) * 0.5;
        }
        context.arc((shape.maxX + shape.minX) * 0.5,
                    (shape.maxY + shape.minY) * 0.5,
                    r,
                    startAngle,
                    endAngle,
                    anticlockwise);
        context.globalCompositeOperation = shape.globalCompositeOperation;
        context.strokeStyle = shape.strokeStyle;
        // context.lineWidth = shape.lineWidth;
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.stroke();
        context.fill();
        // context.closePath();
        context.restore();
    }

    if (x != undefined && y != undefined && radius != undefined
        && startAngle != undefined && endAngle != undefined) {
        shape.minX = x - radius;
        shape.minY = y - radius;
        shape.maxX = x + radius;
        shape.maxY = y + radius;
    }

    return shape;
}



//箭头
DBFX.Web.Draw.Arrow = function (x, y, w) {

}

//规则多边形
DBFX.Web.Draw.Polygon = function (xCenter, yCenter, radius, numSides) {
    var shape = new DBFX.Web.Draw.Shape("Polygon");

    shape.draw = function (context) {
        context.save();
        context.beginPath();
        context.scale(shape.scale.x, shape.scale.y);
        //计算出第一个顶点
        var xPos = xCenter + radius * Math.cos(2 * Math.PI * 0 / numSides);
        var yPos = yCenter + radius * Math.sin(2 * Math.PI * 0 / numSides);
        context.moveTo(xPos, yPos);
        //循环计算出其余顶点
        for (var i = 1; i <= numSides; i++) {
            var xPos = xCenter + radius * Math.cos(2 * Math.PI * i / numSides);
            var yPos = yCenter + radius * Math.sin(2 * Math.PI * i / numSides);
            context.lineTo(xPos, yPos);
        }
        context.closePath();

        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.stroke();

        context.fillStyle = '#00F';
        context.fill();


        context.restore();
    }

    return shape;
}


//圆桌
DBFX.Web.Draw.ArcTable = function (xPos, yPos, r) {
    var shape = new DBFX.Web.Draw.Shape("ArcTable");
    shape.shapeClass = "DBFX.Web.Draw.ArcTable";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ArcTableDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.ArcTableSerializer";

    shape.radius = 50;
    //餐桌颜色
    shape.tableColor = "white";
    Object.defineProperty(shape, "TableColor", {
        get: function () {

            return shape.tableColor;

        },
        set: function (v) {

            shape.tableColor = v;
        }
    });
    //凳子颜色
    shape.deskColor = "white";
    Object.defineProperty(shape, "DeskColor", {
        get: function () {

            return shape.deskColor;

        },
        set: function (v) {

            shape.deskColor = v;
        }
    });
    //就餐人数
    shape.personCount = 5;
    Object.defineProperty(shape, "PersonCount", {
        get: function () {

            return shape.personCount;

        },
        set: function (v) {

            shape.personCount = v;
        }
    });

    //餐桌编号
    shape.tableNum = "餐桌";
    Object.defineProperty(shape, "TableNum", {
        get: function () {
            return shape.tableNum;
        },
        set: function (v) {
            shape.tableNum = v;
        }
    });
    //设置最小、最大X轴、y轴值；
    if (xPos != undefined && yPos != undefined && r != undefined) {
        shape.minX = xPos - r;
        shape.maxX = xPos + r;
        shape.minY = yPos - r;
        shape.maxY = yPos + r;
    } else {
        shape.minX = 150;
        shape.maxX = 250;
        shape.minY = 150;
        shape.maxY = 150;
    }

    shape.draw = function (context) {
        var radius = (shape.maxX - shape.minX) * 0.5;
        var x = shape.minX + radius;
        var y = shape.minY + radius;

        context.save();
        context.beginPath();

        context.scale(shape.scale.x, shape.scale.y);

        var radial = context.createRadialGradient(x, y, 1, x, y, 0.6 * radius);
        radial.addColorStop(0, '#FBE9D2');
        radial.addColorStop(0.3, '#FAD8B4');
        radial.addColorStop(0.8, '#F7CA9D');
        radial.addColorStop(1, '#F7BB8A');

        //圆桌大小

        context.lineWidth = 0;
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.fillStyle = shape.tableColor;
        context.strokeStyle = shape.strokeStyle;
        context.arc(x, y, radius * 0.6, 0, Math.PI * 2);
        // context.fillText("餐桌",x-10,y);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        // context.closePath();

        //配置凳子
        var sitR = 0.2 * radius;
        var sitAngle = Math.PI * 2 / shape.personCount;

        var beginAngle = 0;
        var endAngle = 0;


        //循环画出凳子
        for (var i = 0; i < shape.personCount; i++) {
            context.beginPath();
            endAngle = Math.PI * 2 * (i + 1) / shape.personCount;
            context.strokeStyle = shape.deskColor;
            context.lineWidth = 0.12 * radius;
            if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
            context.arc(x, y, 0.75 * radius, beginAngle + sitAngle * 0.2, endAngle - sitAngle * 0.2, false);
            context.stroke();
            if(shape.drawV != undefined){
            this.hitTest();
        }
            beginAngle = endAngle;
        }


        //刀叉

        DBFX.Web.Draw.Tools.drawFork(context, x - 0.15 * radius, y - 0.5 * radius, radius * 0.14, radius * 0.5);
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        DBFX.Web.Draw.Tools.drawKnife(context, x + 0.1 * radius, y - 0.47 * radius, radius * 0.1, radius * 0.45);

        //循环计算出每个凳子的矩形四个点
        for (var i = 0; i < shape.personCount; i++) {
            var xPeak = x + 0.55 * radius * Math.cos(2 * Math.PI * i / shape.personCount);
            var yPeak = y + 0.55 * radius * Math.sin(2 * Math.PI * i / shape.personCount);

            var xPeak1 = x + 0.55 * radius * Math.cos(2 * Math.PI * (i + 1) / shape.personCount);
            var yPeak1 = y + 0.55 * radius * Math.sin(2 * Math.PI * (i + 1) / shape.personCount);
            //
            var xCenter = (xPeak1 + xPeak) * 0.5;
            var yCenter = (yPeak1 + yPeak) * 0.5;

            var sideLength = Math.sqrt(Math.pow((xPeak1 - xPeak), 2) + Math.pow((yPeak1 - yPeak), 2));

            /*
            * 正多边形的每个内角是 2*Math.PI/count
            *
            * 倾斜角度为Math.PI/count
            * */
            var angle = Math.PI * (i + 1) / shape.personCount;

            //假设椅子的宽度为10;/
            var sitW = 10;
            //椅子长度
            var sitL = 0.8 * sideLength;

        }
        // context.closePath();

        //桌子编号
        context.textAlign = "center";
        context.font = "20px '宋体'";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, radius * 0.42 + "px");//替换字体大小
        context.fillText(shape.tableNum, x, y + 0.32 * radius);

        //圆桌总体外框
        context.beginPath();
        context.lineWidth = 0;
        context.strokeStyle = 'transparent';
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.stroke();

        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }
    // shape.hitEvent = function (x,y) {
    //     return false;
    // }
    return shape;

}
DBFX.Serializer.ArcTableSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            deskColor: shape.deskColor,
            tableColor: shape.tableColor,
            personCount: shape.personCount,
            tableNum: shape.tableNum,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.ArcTableDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/ArcTableDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "圆桌设置";
    return obdc;
}

//方桌
DBFX.Web.Draw.RectTable = function (xPos, yPos, w, h) {
    var shape = new DBFX.Web.Draw.Shape("RectTable");
    shape.shapeClass = "DBFX.Web.Draw.RectTable";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.RectTableDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.RectTableSerializer";
    //桌子颜色属性
    shape.tableColor = "white";
    Object.defineProperty(shape, "TableColor", {
        set: function (v) {
            shape.tableColor = v;
        },
        get: function () {
            return shape.tableColor;
        }
    });

    //凳子的颜色属性
    shape.deskColor = "#F7BB8A";
    Object.defineProperty(shape, "DeskColor", {
        get: function () {
            return shape.deskColor;
        },
        set: function (v) {
            shape.deskColor = v;
        }
    });

    //就餐人数
    shape.personCount = 6;
    Object.defineProperty(shape, "PersonCount", {
        get: function () {
            return shape.personCount;
        },
        set: function (v) {
            shape.personCount = v;
        }
    });
    //餐桌编号
    shape.tableNum = "000";
    Object.defineProperty(shape, "TableNum", {
        get: function () {
            return shape.tableNum;
        },
        set: function (v) {
            shape.tableNum = v;
        }
    });

    shape.draw = function (context) {
        context.save();

        context.scale(shape.scale.x, shape.scale.y);

        context.translate((shape.minX + shape.maxX) * 0.5, (shape.minY + shape.maxY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-(shape.minX + shape.maxX) * 0.5, -(shape.minY + shape.maxY) * 0.5);

        context.beginPath();

        context.strokeStyle = shape.strokeStyle;
        context.lineWidth = shape.lineWidth;

        //整体的左上角位置
        var x = shape.minX;
        var y = shape.minY;
        //宽度
        var width = shape.maxX - shape.minX;
        //高度
        var height = shape.maxY - shape.minY;
        //每侧座位数
        var sitC = shape.personCount / 2;
        //每个椅子所占宽度
        var sitW = width / (1.5 * sitC + 0.5);
        //椅子的圆角半径
        var sitRadius = 0.1 * sitW;
        //桌子的圆角半径
        var radius = 0.1 * height;


        //整体边框
        // context.rect(shape.minX, shape.minY, width, height);

        /*
        * radial.addColorStop(0,'#FBE9D2');
          radial.addColorStop(0.3,'#FAD8B4');
          radial.addColorStop(0.8,'#F7CA9D');
          radial.addColorStop(1,'#F7BB8A');
        *
        * */

        // var linear = context.createLinearGradient(  x+radius,y+height*0.15,
        //                                             x+width,y+height*0.15);
        // linear.addColorStop(0.2,'#FBE9D2');
        // linear.addColorStop(0.4,'#FAD8B4');
        // linear.addColorStop(0.7,'#F7CA9D');
        // linear.addColorStop(1.0,'#F7BB8A');
        //桌子
        context.fillStyle = shape.tableColor;
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.moveTo(x + radius, y + height * 0.15);
        context.lineTo(x + width - radius, y + height * 0.15);
        context.arcTo(x + width, y + height * 0.15, x + width, y + height * 0.15 + radius, radius);
        context.arcTo(x + width, y + height * 0.85, x + width - radius, y + height * 0.85, radius);
        context.arcTo(x, y + height * 0.85, x, y + height * 0.85 - radius, radius);
        context.arcTo(x, y + height * 0.15, x + radius, y + height * 0.15, radius);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }



        //椅子
        context.beginPath();
        context.fillStyle = shape.deskColor;
        for (var i = 0; i < sitC; i++) {
            if(shape.isVisible != false){
                context.globalAlpha = shape.alpha;
            }else {
                context.globalAlpha = 0;
            }

            context.moveTo(x + 0.5 * sitW + i * 1.5 * sitW, y + height * 0.11);

            context.lineTo(x + 0.5 * sitW + i * 1.5 * sitW, y + sitRadius);

            context.arcTo(x + 0.5 * sitW + i * 1.5 * sitW,
                            y,
                            x + 0.5 * sitW + i * 1.5 * sitW + sitRadius,
                            y,
                            sitRadius);
            context.arcTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW,
                            y,
                            x + 0.5 * sitW + i * 1.5 * sitW + sitW,
                            y + height * 0.11,
                            sitRadius);
            context.lineTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW, y + height * 0.11);

            context.arc(x + 0.5 * sitW + i * 1.5 * sitW + sitW - 0.1 * sitW, y + height * 0.11, 0.1 * sitW, 0, Math.PI);
            context.bezierCurveTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW - 0.2 * sitW,
                                    y + height * 0.11 - sitW * 0.1,
                                    x + 0.5 * sitW + i * 1.5 * sitW + 0.2 * sitW,
                                    y + height * 0.11 - sitW * 0.1,
                                    x + 0.5 * sitW + i * 1.5 * sitW + 0.2 * sitW,
                                    y + height * 0.11);
            context.arc(x + 0.5 * sitW + i * 1.5 * sitW + 0.1 * sitW,
                        y + height * 0.11,
                        0.1 * sitW,
                        0,
                        Math.PI);

            // context.stroke();


            context.moveTo(x + 0.5 * sitW + i * 1.5 * sitW, y + height * 0.89);
            context.lineTo(x + 0.5 * sitW + i * 1.5 * sitW, y + height - sitRadius);
            context.arcTo(x + 0.5 * sitW + i * 1.5 * sitW,
                            y + height,
                            x + 0.5 * sitW + i * 1.5 * sitW + sitRadius,
                            y + height,
                            sitRadius);
            context.arcTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW,
                            y + height,
                            x + 0.5 * sitW + i * 1.5 * sitW + sitW,
                            y + height - sitRadius,
                            sitRadius);
            context.lineTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW,
                            y + height * 0.89
                            );

            context.arc(x + 0.5 * sitW + i * 1.5 * sitW + sitW - 0.1 * sitW,
                        y + height * 0.89,
                        0.1 * sitW,
                        Math.PI * 2,
                        Math.PI, true);
            context.bezierCurveTo(x + 0.5 * sitW + i * 1.5 * sitW + sitW - 0.2 * sitW,
                                    y + height * 0.89 + 0.1 * sitW,
                                    x + 0.5 * sitW + i * 1.5 * sitW + 0.2 * sitW,
                                    y + height * 0.89 + 0.1 * sitW,
                                    x + 0.5 * sitW + i * 1.5 * sitW + 0.2 * sitW,
                                    y + height * 0.89);
            context.arc(x + 0.5 * sitW + i * 1.5 * sitW + 0.1 * sitW,
                        y + height * 0.89,
                        0.1 * sitW,
                        Math.PI * 2,
                        Math.PI,
                        true);

            // context.arcTo()

            // context.rect(x+0.5*sitW + i*1.5*sitW,y,sitW,height*0.11);
            // context.rect(x+0.5*sitW + i*1.5*sitW,y+height*0.89,sitW,height*0.11);
        }
        context.fill();

        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.stroke();

        //餐盘

        // for (var i = 0; i < sitC; i++) {
        //
        //     context.beginPath();
        //     context.lineWidth = 0.5;
        //     context.globalAlpha = 0.5;
        //     context.arc(x + sitW + i * 1.5 * sitW, y + height * 0.3, 0.15 * sitW, 0, Math.PI * 2);
        //     context.stroke();
        //     // context.beginPath();
        //     // context.lineWidth = 0.5;
        //     // context.arc(x+sitW + i*1.5*sitW,y+height*0.3,0.28*sitW,0,Math.PI*2);
        //     // context.stroke();
        //     context.beginPath();
        //     context.lineWidth = 0.5;
        //     context.globalAlpha = 0.5;
        //     context.arc(x + sitW + i * 1.5 * sitW, y + height * 0.3, 0.25 * sitW, 0, Math.PI * 2);
        //     context.stroke();
        // }
        // for (var i = 0; i < sitC; i++) {
        //     context.beginPath();
        //     context.lineWidth = 0.5;
        //     context.arc(x + sitW + i * 1.5 * sitW, y + height * 0.7, 0.15 * sitW, 0, Math.PI * 2);
        //     context.stroke();
        //     // context.beginPath();
        //     // context.lineWidth = 0.5;
        //     // context.arc(x + sitW + i * 1.5 * sitW, y + height * 0.7, 0.28 * sitW, 0, Math.PI * 2);
        //     // context.stroke();
        //
        //     context.beginPath();
        //     context.lineWidth = 0.5;
        //     context.arc(x + sitW + i * 1.5 * sitW, y + height * 0.7, 0.25 * sitW, 0, Math.PI * 2);
        //     // context.rect(x+0.5*sitW + i*1.5*sitW,y+height*0.6,sitW,0.65*sitW);
        //     context.stroke();
        // }
        context.fillStyle = "#0605FF";
        context.font = "20px Arial";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.46 * height + "px");//替换字体大小
        context.textAlign = "center";
        context.fillText(shape.tableNum, x + 0.5 * width, y + height * 0.6);

        // if(context.isPointInPath(shape.touchPoint.x,shape.touchPoint.y)){
        //     shape.isSelected = true;
        // }

        context.restore();


    }

    if (xPos != undefined && yPos != undefined && w != undefined && h != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + w;
        shape.maxY = yPos + h;
    } else {
        shape.minX = 200;
        shape.minY = 200;
        shape.maxX = 220;
        shape.maxY = 210;
    }

    shape.hitEvent = function (x, y) {
        if (x >= shape.minX && x <= shape.maxX && y >= shape.minY && y <= shape.maxY) {
            return true;
        } else {
            return false;
        }
    }
    return shape;
}
DBFX.Serializer.RectTableSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {

        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            deskColor: shape.deskColor,
            tableColor: shape.tableColor,
            personCount: shape.personCount,
            tableNum: shape.tableNum,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.RectTableDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/RectTableDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "方桌设置";
    return obdc;
}


//隔断
DBFX.Web.Draw.Partition = function (xPos, yPos, width, height) {
    var shape = new DBFX.Web.Draw.Shape("Partition");
    shape.shapeClass = "DBFX.Web.Draw.Partition";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.PartitionDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.PartitionSerializer";

    shape.draw = function (context) {
        var w = shape.maxX - shape.minX;
        var h = shape.maxY - shape.minY;
        var x = shape.minX;
        var y = shape.minY;

        context.save();
        context.beginPath();
        //缩放
        context.scale(shape.scale.x, shape.scale.y);
        //旋转
        context.translate(x + 0.5 * w, y + 0.5 * h);
        context.rotate(shape.rotateAngle);
        context.translate(-x - 0.5 * w, -y - 0.5 * h);

        //设置透明度
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.strokeStyle = shape.strokeStyle;
        context.fillStyle = "#E1E1E1";
        context.lineWidth = 0.5;
        context.rect(x, y, w, h);


        var background = new DBFX.Web.Draw.Pattern();
        var pattern = context.createPattern(background, "repeat");
        context.fillStyle = pattern;

        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }

    if (xPos != undefined && yPos != undefined && width != undefined && height != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + width;
        shape.maxY = yPos + height;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 260;
        shape.maxY = 350;
    }
    return shape;
}
DBFX.Serializer.PartitionSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (c, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.PartitionDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/PartitionDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "隔断设置";
    return obdc;
}


//通道
DBFX.Web.Draw.Aisle = function (xPos, yPos, width, height) {
    var shape = new DBFX.Web.Draw.Shape("Aisle");
    shape.shapeClass = "DBFX.Web.Draw.Aisle";

    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.AisleDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.AisleSerializer";

    shape.draw = function (context) {

        var w = shape.maxX - shape.minX;
        var h = shape.maxY - shape.minY;
        var x = shape.minX;
        var y = shape.minY;
        context.save();
        context.beginPath();

        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        context.translate(x + 0.5 * w, y + 0.5 * h);
        context.rotate(shape.rotateAngle);
        context.translate(-x - 0.5 * w, -y - 0.5 * h);


        //设置透明度
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.moveTo(x, y);

        //隔断填充样式
        // var background = new DBFX.Web.Draw.Pattern_aisle();
        // var pattern = context.createPattern(background,"repeat");
        // context.fillStyle = pattern;

        context.fillStyle = "#E7E7E7";
        context.lineWidth = 0;
        context.strokeStyle = "#E7E7E7";
        context.rect(x, y, w, h);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }


        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "#20FE0D";
        var dashLen = 3;
        var num = 1;

        if (w > h) {
            num = w / dashLen;
            for (var i = 0 ; i < num; i++) {
                context[i % 2 == 0 ? 'moveTo' : 'lineTo'](x + w / num * i, y + h / 2);
            }
        }

        if (h > w) {
            num = h / dashLen;
            for (var j = 0 ; j < num; j++) {
                context[j % 2 == 0 ? 'moveTo' : 'lineTo'](x + w / 2, y + h / num * j);
            }
        }

        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }

    shape.hitEvent = function (x, y) {
        if (x >= shape.minX && x < shape.maxX && y >= shape.minY && y < shape.maxY) {
            return true;
        } else {
            return false;
        }
    }

    if (xPos != undefined && yPos != undefined && width != undefined && height != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + width;
        shape.maxY = yPos + height;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 260;
        shape.maxY = 350;
    }
    return shape;
}
DBFX.Serializer.AisleSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.AisleDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/AisleDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "通道设置";
    return obdc;
}

//隔断填充样式
DBFX.Web.Draw.Pattern = function () {
    var pattern = document.createElement("canvas");

    var w = 30;
    pattern.width = w;
    pattern.height = w;
    var ctx = pattern.getContext("2d");
    ctx.save();
    ctx.beginPath();

    ctx.strokeStyle = "#858585";
    ctx.lineWidth = 0.8;
    ctx.moveTo(0, w / 3);
    ctx.lineTo(w * 2 / 3, w / 3);

    ctx.moveTo(w / 3, w / 3);
    ctx.lineTo(w / 3, w);

    ctx.moveTo(w / 3, w * 2 / 3);
    ctx.lineTo(w, w * 2 / 3);

    ctx.moveTo(w * 2 / 3, w * 2 / 3);
    ctx.lineTo(w * 2 / 3, 0);

    ctx.rect(0, 0, w, w);

    ctx.stroke();
    ctx.restore();
    return pattern;
}


//通道填充样式
DBFX.Web.Draw.Pattern_aisle = function () {
    var pattern = document.createElement("canvas");
    var w = 60;
    pattern.width = w;
    pattern.height = w;
    var ctx = pattern.getContext("2d");
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, w / 2);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(w, w / 2);
    ctx.lineTo(w / 2, w);
    ctx.closePath();

    ctx.moveTo(0, 0);
    ctx.lineTo(w, w);

    ctx.moveTo(0, w);
    ctx.lineTo(w, 0);
    ctx.rect(0, 0, w, w);
    ctx.stroke();
    ctx.restore();
    return pattern;
}


//安全出口
DBFX.Web.Draw.Exit = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("Exit");
    shape.shapeClass = "DBFX.Web.Draw.Exit";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ExitDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.ExitSerializer";
    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + width;
        shape.maxY = yPos + width / 2.7;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 277;
        shape.maxY = 260;
    }

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        //安全出口标识宽度
        var w = 0;

        if (shape.maxX - shape.minX >= (shape.maxY - shape.minY) * 2.6) {
            w = (shape.maxY - shape.minY) * 2.7;
        } else if (shape.maxY - shape.minY >= (shape.maxX - shape.minX) / 2.6) {
            w = shape.maxX - shape.minX;
            // return;
        }
        context.save();
        context.beginPath();
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }

        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        context.translate(shape.minX + (shape.maxX - shape.minX) * 0.5, shape.minY + (shape.maxY - shape.minY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-shape.minX - (shape.maxX - shape.minX) * 0.5, -shape.minY - (shape.maxY - shape.minY) * 0.5);


        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.fillStyle = "#EDFAEF";
        context.rect(x - 2, y - 2, w + 4, w / 2.7 + 4);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.closePath();

        context.beginPath();
        context.strokeStyle = shape.strokeStyle;
        context.fillStyle = "#38453B";

        context.rect(x, y, w, w / 2.7);
        context.fill();

        context.font = "14px bold";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.15 * w + "px");//替换字体大小
        context.textBaseline = "top";
        // context.letterSpacing = "2px";
        context.fillStyle = "#D3F58F";
        context.fillText("安 全 出 口", x + 0.15 * w, y + 0.02 * w);

        context.fillText("E X I T", x + 0.26 * w, y + 0.18 * w);

        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }

    return shape;
}
DBFX.Serializer.ExitSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.ExitDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/ExitDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "安全出口设置";
    return obdc;
}


//卫生间Toilet
DBFX.Web.Draw.Toilet = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("Toilet");
    shape.shapeClass = "DBFX.Web.Draw.Toilet";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ToiletDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.ToiletSerializer";
    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + width;
        shape.maxY = yPos + width;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 330;
        shape.maxY = 330;
    }

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        var w = 0;
        if (shape.maxX - shape.minX <= shape.maxY - shape.minY) {
            w = shape.maxX - shape.minX;
        } else {
            w = shape.maxY - shape.minY;
        }

        context.save();

        //drawBoy
        var personW = 0.28 * w;
        context.beginPath();


        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        //旋转控制
        context.translate(shape.minX + (shape.maxX - shape.minX) * 0.5, shape.minY + (shape.maxY - shape.minY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-shape.minX - (shape.maxX - shape.minX) * 0.5, -shape.minY - (shape.maxY - shape.minY) * 0.5);

        context.fillStyle = "#26497F";
        context.strokeStyle = "#26497F";
        context.lineWidth = 0.4;
        //头
        context.arc(x + 0.28 * w, y + 0.18 * w, 0.25 * personW, 0, Math.PI * 2);
        //左边肩膀开始
        context.moveTo(x + 0.28 * w - 0.3 * personW, y + 0.18 * w + 0.36 * personW);
        context.lineTo(x + 0.28 * w + 0.3 * personW, y + 0.18 * w + 0.36 * personW);
        context.arc(x + 0.28 * w + 0.3 * personW,
                    y + 0.18 * w + 0.56 * personW,
                    0.2 * personW,
                    Math.PI * 1.5,
                    Math.PI * 2);
        context.lineTo(x + 0.25 * w + 0.6 * personW, y + 0.6 * w);

        context.arc(x + 0.25 * w + 0.5 * personW, y + 0.6 * w, 0.1 * personW, 0, Math.PI);
        context.lineTo(x + 0.25 * w + 0.4 * personW, y + 0.18 * w + 0.66 * personW);
        context.lineTo(x + 0.25 * w + 0.35 * personW, y + 0.18 * w + 0.66 * personW);
        context.lineTo(x + 0.25 * w + 0.35 * personW, y + 0.9 * w - 0.1 * personW);

        context.arc(x + 0.25 * w + 0.25 * personW, y + 0.9 * w - 0.1 * personW, 0.1 * personW, 0, Math.PI);
        context.lineTo(x + 0.25 * w + 0.15 * personW, y + 0.55 * w);
        context.lineTo(x + 0.25 * w + 0.05 * personW, y + 0.55 * w);
        context.lineTo(x + 0.25 * w + 0.05 * personW, y + 0.9 * w - 0.1 * personW);

        context.arc(x + 0.25 * w - 0.05 * personW, y + 0.9 * w - 0.1 * personW, 0.1 * personW, 0, Math.PI);
        context.lineTo(x + 0.25 * w - 0.15 * personW, y + 0.18 * w + 0.66 * personW);
        context.lineTo(x + 0.25 * w - 0.2 * personW, y + 0.18 * w + 0.66 * personW);
        context.lineTo(x + 0.25 * w - 0.2 * personW, y + 0.6 * w);
        //
        context.arc(x + 0.25 * w - 0.3 * personW, y + 0.6 * w, 0.1 * personW, 0, Math.PI);
        context.lineTo(x + 0.25 * w - 0.4 * personW, y + 0.18 * w + 0.56 * personW);
        context.arc(x + 0.28 * w - 0.3 * personW, y + 0.18 * w + 0.56 * personW, 0.2 * personW,
                    Math.PI,
                    Math.PI * 1.5);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.closePath();

        context.beginPath();
        //drawGirl
        // context.moveTo(x+0.72*w,y+0.18*w);
        //头
        context.fillStyle = "#CB1723";
        context.strokeStyle = "#CB1723";
        context.arc(x + 0.72 * w, y + 0.18 * w, 0.25 * personW, 0, Math.PI * 2);

        context.moveTo(x + 0.72 * w - 0.25 * personW, y + 0.18 * w + 0.36 * personW);
        context.lineTo(x + 0.72 * w + 0.25 * personW, y + 0.18 * w + 0.36 * personW);
        //肩膀
        context.arc(x + 0.72 * w + 0.25 * personW,
                    y + 0.18 * w + 0.56 * personW,
                    0.2 * personW,
                    Math.PI * 1.5,
                    Math.PI * 1.5 + Math.PI * 70 / 180);

        var a = 0.2 * personW / Math.cos(Math.PI * 20 / 180);
        var b = 0.5 * personW * Math.tan(Math.PI * 20 / 180);

        context.lineTo(x + 0.72 * w + 0.25 * personW + a + b, y + 0.18 * w + 1.11 * personW);

        context.arc(x + 0.72 * w + 0.25 * personW + a + b - 0.1 * personW * Math.sin(70 * Math.PI / 180),
                    y + 0.18 * w + 1.11 * personW + 0.1 * personW * Math.cos(70 * Math.PI / 180),
                    0.1 * personW,
                    Math.PI * 2 - Math.PI * 20 / 180,
                    Math.PI - Math.PI * 20 / 180);

        context.lineTo(x + 0.72 * w + 0.25 * personW, y + 0.18 * w + 0.56 * personW);
        //裙子
        context.lineTo(x + 0.72 * w + 0.25 * personW, y + 0.18 * w + 0.70 * personW);
        //裙角
        context.lineTo(x + 0.72 * w + 0.5 * personW, y + 0.18 * w + 1.5 * personW);
        context.lineTo(x + 0.72 * w + 0.25 * personW, y + 0.18 * w + 1.5 * personW);
        context.lineTo(x + 0.72 * w + 0.25 * personW, y + 0.18 * w + 2.5 * personW);
        context.arc(x + 0.72 * w + 0.15 * personW,
                    y + 0.18 * w + 2.5 * personW,
                    0.1 * personW,
                    0,
                    Math.PI);
        context.lineTo(x + 0.72 * w + 0.05 * personW, y + 0.18 * w + 1.5 * personW);
        context.lineTo(x + 0.72 * w - 0.05 * personW, y + 0.18 * w + 1.5 * personW);
        context.lineTo(x + 0.72 * w - 0.05 * personW, y + 0.18 * w + 2.5 * personW);
        context.arc(x + 0.72 * w - 0.15 * personW,
                    y + 0.18 * w + 2.5 * personW,
                    0.1 * personW,
                    0,
                    Math.PI);
        context.lineTo(x + 0.72 * w - 0.25 * personW, y + 0.18 * w + 1.5 * personW);
        context.lineTo(x + 0.72 * w - 0.5 * personW, y + 0.18 * w + 1.5 * personW);
        //裙子
        context.lineTo(x + 0.72 * w - 0.25 * personW, y + 0.18 * w + 0.70 * personW);
        context.lineTo(x + 0.72 * w - 0.25 * personW, y + 0.18 * w + 0.56 * personW);
        //左手臂
        context.lineTo(x + 0.72 * w - 0.25 * personW - (0.5 * personW + 0.2 * personW * Math.sin(Math.PI * 20 / 180)) * Math.tan(Math.PI * 20 / 180),
                       y + 0.18 * w + 1.11 * personW + 0.2 * personW * Math.sin(Math.PI * 20 / 180));

        context.arc(x + 0.72 * w - 0.25 * personW - a - b + 0.1 * personW * Math.sin(70 * Math.PI / 180),
                    y + 0.18 * w + 1.11 * personW + 0.1 * personW * Math.cos(70 * Math.PI / 180),
                    0.1 * personW,
                    Math.PI * 20 / 180,
                    Math.PI + Math.PI * 20 / 180);
        context.lineTo(x + 0.72 * w - 0.25 * personW - 0.2 * personW * Math.cos(Math.PI * 20 / 180),
                        y + 0.18 * w + 0.56 * personW - 0.2 * personW * Math.sin(Math.PI * 20 / 180));

        context.arc(x + 0.72 * w - 0.25 * personW,
                    y + 0.18 * w + 0.56 * personW,
                    0.2 * personW,
                    Math.PI * 1.5 - Math.PI * 70 / 180,
                    Math.PI * 1.5
                    );


        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.closePath();

        context.beginPath();
        context.moveTo(x + 0.5 * w - 1, y + 0.1 * w);
        context.lineTo(x + 0.5 * w - 1, y + 0.9 * w);
        context.lineWidth = 2;
        context.strokeStyle = "black";
        var radius = 0.1 * w;
        context.moveTo(x + radius, y);
        context.lineTo(x + w - radius, y);
        context.arcTo(x + w, y, x + w, y + radius, radius);
        context.arcTo(x + w, y + w, x + w - radius, y + w, radius);
        context.arcTo(x, y + w, x, y + w - radius, radius);
        context.arcTo(x, y, x + radius, y, radius);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }
    return shape;
}
DBFX.Serializer.ToiletSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.ToiletDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/ToiletDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "卫生间设置";
    return obdc;
}


//收银台Cashier
DBFX.Web.Draw.Cashier = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("Cashier");
    shape.shapeClass = "DBFX.Web.Draw.Cashier";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.CashierDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.CashierSerializer";

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        var w = shape.maxX - shape.minX;
        context.save();

        var fingerW = 0.025 * w;
        context.beginPath();

        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.translate(shape.minX + (shape.maxX - shape.minX) * 0.5, shape.minY + (shape.maxY - shape.minY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-shape.minX - (shape.maxX - shape.minX) * 0.5, -shape.minY - (shape.maxY - shape.minY) * 0.5);



        context.fillStyle = "black";
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        //中指
        context.moveTo(x + 0.5 * w, y + 0.2 * w);
        context.lineTo(x + 0.5 * w, y + 0.1 * w);
        context.arc(x + 0.5 * w + fingerW, y + 0.1 * w, fingerW, Math.PI, Math.PI * 2);
        context.lineTo(x + 0.5 * w + 2 * fingerW, y + 0.2 * w);
        //食指
        context.moveTo(x + 0.5 * w + 2 * fingerW + 3, y + 0.2 * w);
        context.lineTo(x + 0.5 * w + 2 * fingerW + 3, y + 0.12 * w);
        context.arc(x + 0.5 * w + 3 * fingerW + 3, y + 0.12 * w, fingerW, Math.PI, Math.PI * 2);
        context.lineTo(x + 0.5 * w + 4 * fingerW + 3, y + 0.2 * w);

        //无名指
        context.moveTo(x + 0.5 * w - 3, y + 0.2 * w);
        context.lineTo(x + 0.5 * w - 3, y + 0.12 * w);
        context.arc(x + 0.5 * w - fingerW - 3, y + 0.12 * w, fingerW, Math.PI * 2, Math.PI, true);
        context.lineTo(x + 0.5 * w - 2 * fingerW - 3, y + 0.2 * w);
        //小指
        context.moveTo(x + 0.5 * w - 2 * fingerW - 6, y + 0.2 * w);
        context.lineTo(x + 0.5 * w - 2 * fingerW - 6, y + 0.15 * w);
        context.arc(x + 0.5 * w - 3 * fingerW - 6, y + 0.15 * w, fingerW, Math.PI * 2, Math.PI, true);
        context.lineTo(x + 0.5 * w - 4 * fingerW - 6, y + 0.2 * w);

        //手掌
        context.moveTo(x + 0.5 * w - 4 * fingerW - 6, y + 0.46 * w);
        context.lineTo(x + 0.5 * w - 4 * fingerW - 6, y + 0.5 * w);
        context.arc(x + 0.5 * w - 2 * fingerW - 6, y + 0.5 * w, 2 * fingerW, Math.PI, Math.PI / 2, true);
        context.lineTo(x + 0.5 * w - 2 * fingerW - 6, y + 0.62 * w);
        context.lineTo(x + 0.5 * w + 4 * fingerW + 3, y + 0.62 * w);
        context.lineTo(x + 0.5 * w + 4 * fingerW + 3, y + 0.5 * w + fingerW);
        context.lineTo(x + 0.5 * w + 6 * fingerW + 3, y + 0.46 * w);
        context.lineTo(x + 0.5 * w + 6 * fingerW + 3, y + 0.35 * w);
        context.arc(x + 0.5 * w + 5 * fingerW + 3, y + 0.35 * w, fingerW, Math.PI * 2, Math.PI, true);
        context.lineTo(x + 0.5 * w + 4 * fingerW + 3, y + 0.46 * w);


        //￥符号
        context.moveTo(x + 0.5 * w - 4 * fingerW - 6, y + 0.23 * w);
        context.lineTo(x + 0.5 * w - fingerW - 6, y + 0.23 * w);

        context.lineTo(x + 0.5 * w, y + 0.33 * w);
        context.lineTo(x + 0.5 * w + fingerW, y + 0.23 * w);
        context.lineTo(x + 0.5 * w + 4 * fingerW, y + 0.23 * w);
        context.lineTo(x + 0.5 * w + 2 * fingerW, y + 0.32 * w);
        context.lineTo(x + 0.5 * w + 4 * fingerW, y + 0.32 * w);

        context.lineTo(x + 0.5 * w + 4 * fingerW, y + 0.32 * w + fingerW);
        context.lineTo(x + 0.5 * w + fingerW, y + 0.32 * w + fingerW);
        context.lineTo(x + 0.5 * w + fingerW, y + 0.32 * w + 2 * fingerW);
        context.lineTo(x + 0.5 * w + 4 * fingerW, y + 0.32 * w + 2 * fingerW);
        context.lineTo(x + 0.5 * w + 4 * fingerW, y + 0.32 * w + 3 * fingerW);
        context.lineTo(x + 0.5 * w + fingerW, y + 0.32 * w + 3 * fingerW);
        context.lineTo(x + 0.5 * w + fingerW, y + 0.32 * w + 5 * fingerW);
        context.lineTo(x + 0.5 * w - fingerW, y + 0.32 * w + 5 * fingerW);
        context.lineTo(x + 0.5 * w - fingerW, y + 0.32 * w + 3 * fingerW);
        context.lineTo(x + 0.5 * w - 4 * fingerW, y + 0.32 * w + 3 * fingerW);
        context.lineTo(x + 0.5 * w - 4 * fingerW, y + 0.32 * w + 2 * fingerW);
        context.lineTo(x + 0.5 * w - fingerW, y + 0.32 * w + 2 * fingerW);
        context.lineTo(x + 0.5 * w - fingerW, y + 0.32 * w + fingerW);
        context.lineTo(x + 0.5 * w - 4 * fingerW, y + 0.32 * w + fingerW);
        context.lineTo(x + 0.5 * w - 4 * fingerW, y + 0.32 * w);
        context.lineTo(x + 0.5 * w - 2 * fingerW, y + 0.32 * w);
        context.lineTo(x + 0.5 * w - 4 * fingerW - 6, y + 0.23 * w);

        context.textBaseline = "middle";
        context.font = "20px Bold";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.15 * w + "px");//替换字体大小
        context.fillText("收 银 台", x + 0.25 * w, y + 0.75 * w);
        context.font = "20px Bold";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.1 * w + "px");//替换字体大小
        context.fillText("CASHIER", x + 0.32 * w, y + 0.87 * w);

        context.fill();
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.strokeStyle = "black";
        context.rect(x + 0.25 * w, y + 0.2 * w, 0.5 * w, 0.26 * w);
        context.rect(x, y, w, w);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.restore();
    }

    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.minY = yPos;
        shape.maxX = xPos + width;
        shape.maxY = yPos + width;
    } else {
        shape.minX = 250;
        shape.minY = 250;
        shape.maxX = 280;
        shape.maxY = 280;
    }

    return shape;
}
DBFX.Serializer.CashierSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.CashierDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/CashierDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "收银台设置";
    return obdc;
}


//区域文字标识
DBFX.Web.Draw.TextArea = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("TextArea");
    shape.shapeClass = "DBFX.Web.Draw.TextArea";
    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.TextAreaDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.TextAreaSerializer";
    shape.chineseText = "取 餐 区";
    Object.defineProperty(shape, "ChineseText", {
        set: function (v) {
            shape.chineseText = v;
        },
        get: function () {
            return shape.chineseText;
        }
    });
    //
    shape.englishText = "TakeAway";
    Object.defineProperty(shape, "EnglishText", {
        set: function (v) {
            shape.englishText = v;
        },
        get: function () {
            return shape.englishText;
        }
    });

    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.maxX = xPos + width;
        shape.minY = yPos;
        shape.maxY = yPos + width / 2;
    } else {
        shape.minX = 250;
        shape.maxX = 290;
        shape.minY = 250;
        shape.maxY = 270;
    }

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        var w = shape.maxX - shape.minX;
        context.save();

        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        context.translate((shape.minX + shape.maxX) * 0.5, (shape.minY + shape.maxY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-(shape.minX + shape.maxX) * 0.5, -(shape.minY + shape.maxY) * 0.5);



        context.beginPath();
        context.lineWidth = 1.0;
        context.strokeStyle = "black";
        context.textBaseline = "hanging";
        context.textAlign = "center";
        context.font = "20px Bold";
        context.fillStyle = "#E7224A";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.2 * w + "px");//替换字体大小

        context.fillText(shape.chineseText, x + w / 2, y + w / 20);
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.12 * w + "px");//替换字体大小
        context.fillText(shape.englishText, x + w / 2, y + w / 3.8);
        context.rect(x, y, w, w / 2);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.restore();
    }

    return shape;
}
DBFX.Serializer.TextAreaSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            chineseText: shape.chineseText,
            englishText: shape.englishText,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.TextAreaDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/TextAreaDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "区域标识设置";
    return obdc;
}

//入口标识
DBFX.Web.Draw.Entrance = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("Entrance");
    shape.shapeClass = "DBFX.Web.Draw.Entrance";

    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.EntranceDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.EntranceSerializer";
    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.maxX = xPos + width;
        shape.minY = yPos;
        shape.maxY = yPos + width / 2;
    } else {
        shape.minX = 250;
        shape.maxX = 290;
        shape.minY = 250;
        shape.maxY = 270;
    }

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        var w = shape.maxX - shape.minX;
        context.save();
        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        context.translate((shape.minX + shape.maxX) * 0.5, (shape.minY + shape.maxY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-(shape.minX + shape.maxX) * 0.5, -(shape.minY + shape.maxY) * 0.5);



        context.beginPath();
        if(shape.isVisible != false){
            context.globalAlpha = shape.alpha;
        }else {
            context.globalAlpha = 0;
        }
        context.strokeStyle = "white";
        context.fillStyle = "#FFA630";
        context.rect(x, y, w, w / 2);
        context.stroke();
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.lineWidth = 1.5;
        context.rect(x + w / 8, y + w / 8, w / 4, w / 4);
        context.moveTo(x + 1.1 * w / 8, y + w / 4 - 0.01 * w);
        context.lineTo(x + w / 8 + 0.05 * w, y + w / 4 - 0.05 * w);
        context.moveTo(x + 1.1 * w / 8, y + 1.1 * w / 4);
        context.lineTo(x + w / 8 + 0.05 * w, y + 1.1 * w / 4 + 0.04 * w);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.lineWidth = 2.5;
        context.strokeStyle = "white";
        context.lineJoin = "bevel";
        context.moveTo(x + w / 8 + 0.075 * w, y + w / 4 - 0.05 * w);
        context.lineTo(x + w / 8 + 0.075 * w, y + w / 8 + 0.028 * w);
        context.lineTo(x + 3 * w / 8 - 0.04 * w, y + w / 8 + 0.028 * w);
        context.lineTo(x + 3 * w / 8 - 0.04 * w, y + 3 * w / 8 - 0.028 * w);
        context.lineTo(x + w / 8 + 0.075 * w, y + 3 * w / 8 - 0.028 * w);
        context.lineTo(x + w / 8 + 0.075 * w, y + 1.1 * w / 4 + 0.04 * w);

        //箭头
        context.moveTo(x + w / 8 + 0.075 * w, y + w / 4);
        context.lineTo(x + 3 * w / 8 - 0.06 * w, y + w / 4);
        context.moveTo(x + w / 8 + 0.079 * w, y + w / 4);
        context.lineTo(x + w / 8 + 0.125 * w, y + w / 4 - 0.05 * w);
        context.moveTo(x + w / 8 + 0.079 * w, y + w / 4);
        context.lineTo(x + w / 8 + 0.125 * w, y + w / 4 + 0.05 * w);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.fillStyle = "white";
        context.font = "45px '宋体'";
        context.textAlign = "center";
        context.textBaseline = "hanging";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.23 * w + "px");//替换字体大小
        context.fillText("入口", x + 3 * w / 4, y + 0.5 * w / 8);
        context.font = "15px lighter";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.08 * w + "px");//替换字体大小
        context.fillText("ENTRANCE", x + 3 * w / 4, y + 2.4 * w / 8);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.rect(x, y, w, w / 2);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.restore();
    }

    return shape;
}
DBFX.Serializer.EntranceSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.EntranceDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/EntranceDesigner.scrp", function (od) {

            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "入口标识设置";
    return obdc;
}


//吧台
DBFX.Web.Draw.BarCounter = function (xPos, yPos, width) {
    var shape = new DBFX.Web.Draw.Shape("BarCounter");
    shape.shapeClass = "DBFX.Web.Draw.BarCounter";

    shape.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.BarCounterDesigner");
    shape.ClassDescriptor.Serializer = "DBFX.Serializer.BarCounterSerializer";
    shape.chineseText = "吧 台";
    Object.defineProperty(shape, "ChineseText", {
        set: function (v) {
            shape.chineseText = v;
        },
        get: function () {
            return shape.chineseText;
        }
    });

    shape.englishText = "Bar Counter";
    Object.defineProperty(shape, "EnglishText", {
        set: function (v) {
            shape.englishText = v;
        },
        get: function () {
            return shape.englishText;
        }
    });


    if (xPos != undefined && yPos != undefined && width != undefined) {
        shape.minX = xPos;
        shape.maxX = xPos + width;
        shape.minY = yPos;
        shape.maxY = yPos + width / 3;
    } else {
        shape.minX = 250;
        shape.maxX = 340;
        shape.minY = 250;
        shape.maxY = 280;
    }

    shape.draw = function (context) {
        var x = shape.minX;
        var y = shape.minY;
        var w = shape.maxX - shape.minX;
        context.save();

        //缩放
        context.scale(shape.scale.x, shape.scale.y);

        context.translate((shape.minX + shape.maxX) * 0.5, (shape.minY + shape.maxY) * 0.5);
        context.rotate(shape.rotateAngle);
        context.translate(-(shape.minX + shape.maxX) * 0.5, -(shape.minY + shape.maxY) * 0.5);

        context.beginPath();
        // context.rect(x,y,w,w/3);
        context.strokeStyle = "#E7224A";
        context.moveTo(x, y + w / 3);
        context.lineTo(x + w, y + w / 3);
        context.lineTo(x + w, y);
        context.lineTo(x + w / 3, y);
        context.arcTo(x, y, x, y + w / 3, w / 3);

        context.moveTo(x + w - w / 15, y + w / 3);
        context.lineTo(x + w - w / 15, y + w / 15);
        context.lineTo(x + w / 3, y + w / 15);
        context.arcTo(x + w / 15, y + w / 15, x + w / 15, y + w / 3, w / 3 - w / 15);
        context.fillStyle = "#E7224A";
        context.textAlign = "start";
        context.font = "30px '黑体'";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.1 * w + "px");//替换字体大小
        context.fillText(shape.chineseText, x + w / 1.8, y + w / 5);

        context.font = "20px '黑体'";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.06 * w + "px");//替换字体大小
        context.fillText(shape.englishText, x + w / 1.8, y + w / 3.5);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.fillStyle = "#E7224A";
        context.arc(x + w / 3.7, y + w / 5, w / 15, 0, Math.PI * 2);
        context.fill();
        // context.beginPath();
        context.strokeStyle = "white";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "30px '宋体'";
        context.font = context.font.replace(/\d+(\.\d+)?(px|pt|em|%)/i, 0.1 * w + "px");//替换字体大小
        context.fillText("￥", x + w / 3.7, y + w / 5);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.fillStyle = "#E7224A";
        context.arc(x + w / 2.3, y + w / 5, w / 15, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "white";
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.strokeStyle = "white";
        context.fillStyle = "white";
        context.arc(x + w / 2.3, y + w / 5.8, w / 30, Math.PI * 2 - Math.PI / 8, Math.PI + Math.PI / 8);
        context.fill();
        if(shape.drawV != undefined){
            this.hitTest();
        }
        context.closePath();
        context.lineWidth = w / 100;
        context.moveTo(x + w / 2.3, y + w / 5.8 + w / 27);
        context.lineTo(x + w / 2.3, y + w / 5.8 + 2 * w / 27);

        context.moveTo(x + w / 2.3 - w / 60, y + w / 5.8 + 2 * w / 27);
        context.lineTo(x + w / 2.3 + w / 60, y + w / 5.8 + 2 * w / 27);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.beginPath();
        context.strokeStyle = "transparent";
        context.rect(x, y, w, w / 3);
        context.stroke();
        if(shape.drawV != undefined){
            this.hitTest();
        }

        context.restore();
    }
    return shape;
}
DBFX.Serializer.BarCounterSerializer = function () {

    //反系列化
    this.DeSerialize = function (c, xe, ns) {
        return JSON.parse(c);
    }

    //系列化
    this.Serialize = function (shape, xe, ns) {
        var json = {
            shapeClass: shape.shapeClass,
            shapeType: shape.shapeType,
            alpha: shape.alpha,
            minX: shape.minX,
            minY: shape.minY,
            maxX: shape.maxX,
            maxY: shape.maxY,
            chineseText: shape.chineseText,
            englishText: shape.englishText,
            rotateAngle: shape.rotateAngle
        };

        return JSON.stringify(json);
    }
}
DBFX.Design.ControlDesigners.BarCounterDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/DrawingDesignerTemplates/BarCounterDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;

        }, obdc);

    }

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "吧台设置";
    return obdc;
}


