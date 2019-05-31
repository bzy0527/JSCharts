/************************** 绘制仪表盘图 *****************************/


c.drawInstrumentPanel = function (datas) {
    var w = c.chartW,
        h = c.chartH;
    console.log(w+"\n"+h);

    //TODO:颜色系
    var colors = ["green","orange","red","blue"];
    //TODO:暂时不计算具体的仪表盘中心 先实现一个仪表盘的绘制
    var center_x = w*0.5;
    var center_y = h*0.6;

    //TODO:外圆半径
    var out_r = w*0.38;

    //TODO:内圆半径
    var inner_r = w*0.35;

    //TODO:定义指针的宽度 指针圆点的半径 指针的长度 圆弧的宽度


    //TODO:扇区数量
    var sectionC = 4;

    //TODO:定义仪表盘占得总弧度0-Math.PI*2 仪表盘是个对称圆弧！
    var totalA = Math.PI*4/3;
    var aveA = totalA*0.5;

    //计算起止弧度值
    var starA = Math.PI*0.5+aveA;
    var endA = Math.PI*2.5-aveA;



    //每个扇区的角度
    var sectionA = totalA/sectionC;


    //创建饼状图分组
    var group = document.createElementNS(c.SVG_NS,'g');
    c.svg.appendChild(group);


    var sA = starA;
    //创建扇形区
    for (var j=0;j<sectionC;j++){

        //扇形区域路径
        var  arcPath = document.createElementNS(c.SVG_NS,'path');
        //扇形区域的起始角度和终止角度
        arcPath.startA = sA;
        arcPath.endA = sA - sectionA;

        var arcPathG = document.createElementNS(c.SVG_NS,'g');
        arcPathG.appendChild(arcPath);
        group.appendChild(arcPathG);

        var pathStr = c.drawSector(center_x,center_y,out_r,arcPath.startA,arcPath.endA,inner_r,1);

        arcPath.setAttribute('d',pathStr);
        // arcPathG.setAttribute('stroke',colors[j]);
        // arcPathG.setAttribute('fill',colors[j]);
        // arcPath.setAttribute('stroke',colors[j]);

        arcPath.setAttribute('fill',colors[j]);
        sA -= sectionA;
    }


    //刻度文字的对齐方式
    var text_anchor = "middle";

    //绘制刻度数字
    for(var f = 0;f<=10;f++){
        var p_a = starA - totalA/10*f;
        //计算刻度数字的坐标点值
        var p_x = center_x + w*0.33 * Math.cos(-p_a);
        var p_y = center_y + w*0.33 * Math.sin(-p_a);

        if(p_a>=Math.PI*0.5 && p_a <= Math.PI*1.5){
            text_anchor = "start";
        }else {
            text_anchor = "end";
        }

        //刻度数值
        var limbT = document.createElementNS(c.SVG_NS,'text');
        group.appendChild(limbT);
        limbT.textContent = f*100+"";
        c.setAttr(limbT,{
            'font-size':"18",
            'fill':"#777777",
            "x":p_x,
            "y":p_y,
            "text-anchor":text_anchor
        });

        var p1_x = center_x + w*0.35 * Math.cos(-p_a);
        var p1_y = center_y + w*0.35 * Math.sin(-p_a);

        //刻度线
        var limbP = document.createElementNS(c.SVG_NS,'path');
        var pStr = "M"+" "+p_x+" "+p_y+"L"+" "+p1_x+" "+p1_y;
        console.log(pStr);

        group.appendChild(limbP);
        c.setAttr(limbP,{
            'd':pStr,
            'stroke':"#2c2f30",
            'stroke-width':"3"
        });


    }

    //绘制标题文字
    var tElement = document.createElementNS(c.SVG_NS,'text');
    group.appendChild(tElement);

    tElement.textContent = "合格率";
    c.setAttr(tElement,{
        // 'font-family':"",
        'font-size':"30",
        'fill':"red",
        "x":center_x,
        "y":center_y+h*0.1,
        "text-anchor":"middle"
        // "width":c.chartW,
        // "height":fontsize*1.2
    });


    var subTElement = document.createElementNS(c.SVG_NS,'text');
    group.appendChild(subTElement);

    subTElement.textContent = "75%";
    c.setAttr(subTElement,{
        // 'font-family':"",
        'font-size':"30",
        'fill':"red",
        "x":center_x,
        "y":center_y+h*0.2,
        "text-anchor":"middle"
        // "width":c.chartW,
        // "height":fontsize*1.2
    });


    //绘制指针
    var line = document.createElementNS(c.SVG_NS,'line');
    group.appendChild(line);
    c.setAttr(line,{
        'x1':center_x,
        'y1':center_y,
        'x2':center_x-w*0.3,
        'y2':center_y,
        'stroke':"#6786ff",
        'stroke-width':9
    });

    //绘制指针圆心
    var cir = document.createElementNS(c.SVG_NS,'circle');
    group.appendChild(cir);

    c.setAttr(cir,{
        'cx':center_x,
        'cy':center_y,
        'r':9,
        'stroke':"red",
        'fill':"red"
    });





    //指针指向起始角度
    var originalA = starA > Math.PI ? -(starA-Math.PI): (Math.PI - starA);
    line.setAttribute('transform',"rotate("+originalA*180/Math.PI+" "+center_x+" "+center_y+")");

    //FIXME:指针偏移的角度 角度数值0-360 根据当前数值所占的比例进行计算
    var ratio = 0.75;
    var rotateTotalA = (ratio*totalA+originalA)*180/Math.PI;

    //FIXME:角度的增量需要根据实际情况计算  控制动画的快慢
    var stepA = 2;

    //起始角度
    var rotateA = originalA*180/Math.PI;

    function rotateStep() {
        rotateA += stepA;

        if(rotateA < rotateTotalA){
            line.setAttribute('transform',"rotate("+rotateA+" "+center_x+" "+center_y+")");
            requestAnimationFrame(rotateStep);
        }else {
            line.setAttribute('transform',"rotate("+rotateTotalA+" "+center_x+" "+center_y+")");
        }
    }

    requestAnimationFrame(rotateStep);

}