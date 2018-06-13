DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");
//////////////////////////////SVG///////////////////////////////////////////////

/*
    SVG 容器设计器
    lishuang
    20170412
*/
DBFX.Design.ControlDesigners.SVGPanelDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGPanelDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}


/*
    SVG 图形容器
    lishuang
    20170412
*/
DBFX.Web.Controls.SVGPanel = function (v) {
    var SVGPanel = new DBFX.Web.Controls.Panel(v);
    SVGPanel.ClassDescriptor.DisplayName = "图形控件容器";
    SVGPanel.ClassDescriptor.Description = "图形控件 SVG容器";
    SVGPanel.ClassDescriptor.Serializer = "DBFX.Serializer.SVGPanel";
    //SVGPanel.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGPanelDesigner");
    SVGPanel.OnCreateHandle();
    SVGPanel.SVGObj = new Object();
    SVGPanel.OnCreateHandle = function () {
        SVGPanel.Class = "SVG-Panel";
        SVGPanel.Name = "DBFX_SVGDrawingMap";
        //alert(SVGPanel.VisualElement.getBoundingClientRect().top);
        //SVGPanel.CTop = SVGPanel.VisualElement.getBoundingClientRect().top;
    }



    //相对坐标
    SVGPanel.GetCRX = function (c) {//获取元素相对于这个页面的x坐标。        
        return c.VisualElement.style.left;
    }
    //相对坐标
    SVGPanel.GetCRY = function (c) {//获取元素相对于这个页面的y坐标。
        return c.VisualElement.style.top;
    }

    //获取控件
    SVGPanel.GetControl = function (Name) {
        return SVGPanel.Controls.NamedControls[Name];
    }


    SVGPanel.OnCreateHandle();
    return SVGPanel;
}
/*
  SVG 图形控制器 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGPanel = function () {

    var base = new DBFX.Serializer.PanelSerializer();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);

    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);

    }


}

/*
    SVG 图形图层
    lishuang
    20170412
*/
DBFX.Web.Controls.SVGLayer = function (v) {
    var SVGPanel = new DBFX.Web.Controls.Panel(v);
    SVGPanel.ClassDescriptor.DisplayName = "图形控件图层";
    SVGPanel.ClassDescriptor.Description = "图形控件 SVG图层";
    SVGPanel.ClassDescriptor.Serializer = "DBFX.Serializer.SVGLayer";
    SVGPanel.OnCreateHandle();
    SVGPanel.SVGObj = new Object();
    SVGPanel.OnCreateHandle = function () {
        SVGPanel.Class = "SVG-Layer";
    }


    SVGPanel.OnCreateHandle();
    return SVGPanel;
}
/*
  SVG 图形控制器 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGLayer = function () {

    var base = new DBFX.Serializer.PanelSerializer();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}

/*
    SVGBase 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.SVGBaseDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGBaseDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

/*
    SVG 基础类
    lishuang
    20170412
*/
DBFX.Web.Controls.SVGBase = function (v)
{
    if (v == undefined)
        v = "SVGBase";
    var SVGBase = new DBFX.Web.Controls.Panel(v);
    SVGBase.ClassDescriptor.DisplayName = "图形基础控件";
    SVGBase.ClassDescriptor.Description = "图形基础控件 SVG";
    SVGBase.ClassDescriptor.Serializer = "DBFX.Serializer.SVGBase";
    SVGBase.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGBaseDesigner");
    SVGBase.OnCreateHandle();
    SVGBase.NS = 'http://www.w3.org/2000/svg';
    SVGBase.OnCreateHandle = function () {

        SVGBase.SVG = document.createElementNS(SVGBase.NS, 'svg');
        SVGBase.SVG.setAttribute("width", "100%");
        SVGBase.SVG.setAttribute("height", "100%");
        SVGBase.VisualElement.appendChild(SVGBase.SVG);
        //SVGBase.ClientDiv = SVGBase.SVG;

    }

    //旋转
    Object.defineProperty(SVGBase, "Rotate", {
        set: function (v) {
            if (v) {
                SVGBase.rotate = v;
                SVGBase.transform();
            }

        },
        get: function () {
            return SVGBase.rotate;
        }
    });
    //旋转
    Object.defineProperty(SVGBase, "Scale", {
        set: function (v) {
            if (v) {
                SVGBase.scale = v;
                SVGBase.transform();
            }

        },
        get: function () {
            return SVGBase.scale;
        }
    });
    //重构TransForm
    SVGBase.transform = function () {
        var v = ""
        if (SVGBase.rotate) {
            v = v + " rotate(" + SVGBase.rotate + "deg)";
        }
        if (SVGBase.scale) {
            v = v + " scale(" + SVGBase.scale / 100 + ")";
        }
        if (v.length > 0) {
            SVGBase.ClientDiv.style.webkitTransform = v;
            SVGBase.ClientDiv.style.MozTransform = v;
            SVGBase.ClientDiv.style.msTransform = v;
            SVGBase.ClientDiv.style.OTransform = v;
            SVGBase.ClientDiv.style.transform = v;
        }
    }

    //前景色
    Object.defineProperty(SVGBase, "Fill", {
        set: function (v) {

            if (SVGBase.SetFill) {
                SVGBase.SetFill(v);
            } else {
                SVGBase.SVG.setAttribute("fill", v);
            }



        },
        get: function () {
            if (SVGBase.GetFill) {
                return SVGBase.GetFill();
            } else {
                return SVGBase.SVG.getAttribute("fill");
            }
        }
    });


    //SVGBase.OnCreateHandle();
    return SVGBase;
}
/*
  SVG 基础类 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGBase = function () {
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        DBFX.Serializer.DeSerialProperty("Rotate", c, xe);
        DBFX.Serializer.DeSerialProperty("Scale", c, xe);
        DBFX.Serializer.DeSerialProperty("Fill", c, xe);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        DBFX.Serializer.SerialProperty("Rotate", c.Rotate, xe);
        DBFX.Serializer.SerialProperty("Scale", c.Scale, xe);
        DBFX.Serializer.SerialProperty("Fill", c.Fill, xe);
    }
}


/*
    SVGImage 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.SVGImageDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGImageDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}
/*
    SVG 图片
    lishuang
    20170412
*/
DBFX.Web.Controls.SVGImage = function () {
    var SVGImage = new DBFX.Web.Controls.SVGBase();
    SVGImage.ClassDescriptor.DisplayName = "图形控件 图片";
    SVGImage.ClassDescriptor.Description = "图形控件 图片";
    SVGImage.ClassDescriptor.Serializer = "DBFX.Serializer.SVGImage";
    SVGImage.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGImageDesigner");
    SVGImage.OnCreateHandle();
    SVGImage.OnCreateHandle = function () {
        SVGImage.VisualElement.className = "SVGImage";
        SVGImage.image = document.createElementNS(SVGImage.NS, 'image');
        SVGImage.image.setAttribute("width", "100%");
        SVGImage.image.setAttribute("height", "100%");
        SVGImage.SVG.appendChild(SVGImage.image);

    }

    Object.defineProperty(SVGImage, "ImageUrl", {
        set: function (v) {
            if (v) {
                SVGImage.image.setAttribute("href", v)
            }

        },
        get: function () {
            return SVGImage.image.getAttribute("href");
        }
    });


    SVGImage.OnCreateHandle();
    return SVGImage;
}
/*
  SVG 图片 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGImage = function () {

    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
        DBFX.Serializer.DeSerialProperty("ImageUrl", c, xe);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("ImageUrl", c.ImageUrl, xe);
    }
}

/*
    SVGDiningTable 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.SVGDiningTableDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGDiningTableDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}

    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

/*
    SVG 餐桌
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGDiningTable = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGDiningTable";
    SVGPath.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGDiningTableDesigner");
    SVGPath.NS = 'http://www.w3.org/2000/svg';
    SVGPath.SVGs = [];
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {

        SVGPath.VisualElement.className = "DiningTable";

        SVGPath.VisualElement.innerHTML = "<DIV class=\"svg_stool1\"></DIV>" +
                                            "<DIV class=\"svg_tables\">" +
                                            "<DIV class=\"svg_table1\"></DIV>" +
                                            "<DIV class=\"svg_table2\"></DIV>" +
                                            "</DIV>" +
                                            "<DIV class=\"svg_stool2\"></DIV>";
        SVGPath.SVG = SVGPath.VisualElement;
        //SVGPath.ClientDiv = SVGPath.SVG;

        SVGPath.stool1 = SVGPath.VisualElement.querySelector("DIV.svg_stool1");
        SVGPath.table = SVGPath.VisualElement.querySelector("DIV.svg_tables");
        SVGPath.table1 = SVGPath.VisualElement.querySelector("DIV.svg_table1");
        SVGPath.table2 = SVGPath.VisualElement.querySelector("DIV.svg_table2");
        SVGPath.stool2 = SVGPath.VisualElement.querySelector("DIV.svg_stool2");

        //桌子

        //餐具        
        SVGPath.tableware_d = "M529.28 116.096c-188.224 0-341.344 151.552-341.344 337.792 0 186.272 153.152 337.792 341.344 337.792 188.256 0 341.44-151.52 341.44-337.792C870.688 267.648 717.536 116.096 529.28 116.096zM529.28 764.48c-173.088 0-313.888-139.328-313.888-310.592 0-171.264 140.8-310.592 313.888-310.592 173.12 0 313.952 139.328 313.952 310.592C843.232 625.152 702.368 764.48 529.28 764.48zM529.28 170.464c-157.92 0-286.432 127.136-286.432 283.424 0 156.288 128.48 283.424 286.432 283.424 157.984 0 286.496-127.136 286.496-283.424C815.744 297.6 687.264 170.464 529.28 170.464zM529.28 686.848c-129.824 0-235.392-104.512-235.392-232.96 0-128.448 105.568-232.928 235.392-232.928 129.824 0 235.488 104.48 235.488 232.928C764.768 582.336 659.104 686.848 529.28 686.848zM170.624 313.728c0 30.08-10.208 52.416-38.624 68.672l-23.648 12.736 0 39.296L62.336 434.432l0-38.848-24.544-13.568c-29.728-19.392-37.696-37.664-37.696-68.32l0.032-186.304 25.376 0 0 182.912c0 6.336 5.152 11.392 11.552 11.392 6.304 0 11.52-5.088 11.52-11.392L48.576 127.424l25.44 0 0 201.152c0 6.336 5.184 11.424 11.488 11.424 6.4 0 11.552-5.12 11.552-11.424L97.056 127.424l25.472 0 0 182.912c0 6.336 5.152 11.392 11.552 11.392 6.368 0 11.52-5.088 11.52-11.392L145.6 127.424 170.56 127.424 170.624 313.728zM965.312 393.44l-47.104 0.032L918.208 161.216c0-76.544 44.672-76.544 93.056-76.544l0.128 350.88-46.08 0L965.312 393.44zM725.504 453.888c0 107.2-87.904 194.112-196.224 194.112-108.352 0-196.16-86.944-196.16-194.112 0-107.2 87.808-194.112 196.16-194.112C637.6 259.776 725.504 346.688 725.504 453.888zM61.024 473.248c-5.504 5.888-8.992 13.632-8.992 22.272l0 327.584c0 18.24 14.944 33.024 33.344 33.024 18.432 0 33.376-14.752 33.376-33.024L118.752 495.52c0-8.64-3.52-16.384-8.992-22.272L61.024 473.248zM1020.064 491.104c-1.024-6.464-4.032-12.16-8.288-16.736l-46.88 0c-5.376 5.696-8.8 13.28-8.8 21.696l0 4.16c-0.064 1.024-0.288 2.016-0.288 3.04l0 319.808c0 18.24 14.944 33.024 33.344 33.024 18.432 0 33.376-14.752 33.376-33.024l0-319.808C1022.528 498.976 1021.632 494.88 1020.064 491.104z";
        //凳子        
        SVGPath.stool_d = "M171.831,39.912c4.646-0.861,8.169-4.928,8.169-9.824v-20c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10v20c0,4.896,3.522,8.963,8.169,9.824C34.091,33.855,61.555,30.588,90,30.588S145.909,33.855,171.831,39.912z";
        SVGPath.Count = 4;
    }
    SVGPath.CreateView = function (num) {
        for (var i = SVGPath.stool1.childNodes.length - 1; i >= 0 ; i--) {
            SVGPath.stool1.removeChild(SVGPath.stool1.childNodes[i]);
        }
        for (var i = SVGPath.table1.childNodes.length - 1; i >= 0 ; i--) {
            SVGPath.table1.removeChild(SVGPath.table1.childNodes[i]);
        }
        for (var i = SVGPath.table2.childNodes.length - 1; i >= 0 ; i--) {
            SVGPath.table2.removeChild(SVGPath.table2.childNodes[i]);
        }
        for (var i = SVGPath.stool2.childNodes.length - 1; i >= 0 ; i--) {
            SVGPath.stool2.removeChild(SVGPath.stool2.childNodes[i]);
        }

        //餐具
        for (var i = 0; i < num / 2; i++) {
            var svg = document.createElementNS(SVGPath.NS, 'svg');
            SVGPath.table1.appendChild(svg);
            svg.setAttribute("viewBox", "0 0 1024 1024");
            var path = document.createElementNS(SVGPath.NS, 'path');
            svg.appendChild(path);
            path.setAttribute("d", SVGPath.tableware_d);
            SVGPath.SVGs.push(svg);
        }
        //餐具
        for (var i = 0; i < num / 2; i++) {
            var svg = document.createElementNS(SVGPath.NS, 'svg');
            SVGPath.table2.appendChild(svg);
            svg.setAttribute("viewBox", "0 0 1024 1024");
            var path = document.createElementNS(SVGPath.NS, 'path');
            svg.appendChild(path);
            path.setAttribute("d", SVGPath.tableware_d);
            SVGPath.SVGs.push(svg);
        }
        //凳子
        for (var i = 0; i < num / 2; i++) {
            var svg = document.createElementNS(SVGPath.NS, 'svg');
            svg.setAttribute("viewBox", "0 0 180 40");
            var path = document.createElementNS(SVGPath.NS, 'path');
            svg.appendChild(path);
            path.setAttribute("d", SVGPath.stool_d);
            SVGPath.stool1.appendChild(svg);
            SVGPath.SVGs.push(svg);
        }
        //凳子
        for (var i = 0; i < num / 2; i++) {
            var svg = document.createElementNS(SVGPath.NS, 'svg');
            svg.setAttribute("viewBox", "0 0 180 40");
            var path = document.createElementNS(SVGPath.NS, 'path');
            svg.appendChild(path);
            path.setAttribute("d", SVGPath.stool_d);
            path.setAttribute("transform", "rotate(180,90 20)");
            SVGPath.stool2.appendChild(svg);
            SVGPath.SVGs.push(svg);
        }

    }
    //
    SVGPath.SetFill = function (v) {
        for (var i = 0; i < SVGPath.SVGs.length; i++) {
            SVGPath.SVGs[i].setAttribute("fill", v);
        }
        SVGPath.table.style.borderColor = v;
    }

    SVGPath.GetFill = function () {
        return SVGPath.table.style.borderColor;
    }


    Object.defineProperty(SVGPath, "Count", {
        set: function (v) {
            if (v) {
                SVGPath.count = v;
                SVGPath.CreateView(v);
            }

        },
        get: function () {
            return SVGPath.count;
        }
    });



    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 餐桌 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGDiningTable = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
        DBFX.Serializer.DeSerialProperty("Count", c, xe);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("Count", c.Count, xe);
    }
}

/*
    SVGChannel 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.SVGChannelDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGChannelDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}
/*
    SVG 通道
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGChannel = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGChannel";
    SVGPath.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGChannelDesigner");
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGChannel";
        SVGPath.VisualElement.innerHTML = "<DIV class=\"SVGChannel-left\"></DIV><DIV class=\"SVGChannel-right\"></DIV>"
        SVGPath.SVG = SVGPath.VisualElement;
        SVGPath.borderLine = SVGPath.SVG.querySelector("DIV.SVGChannel-left");


        //SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        //SVGPath.SVG.appendChild(SVGPath.path);
        //SVGPath.path.setAttribute("d", "M214.177162 952.607586 952.607586 214.177162 1024 142.784748 881.215252 0 809.822838 71.392414 71.392414 809.822838 0 881.215252 142.784748 1024 214.177162 952.607586 214.177162 952.607586Z");

    }


    SVGPath.SetFill = function (v) {
        SVGPath.SVG.style.backgroundColor = v;
    }
    SVGPath.GetFill = function (v) {
        return SVGPath.SVG.style.backgroundColor;
    }
    //中间线颜色
    Object.defineProperty(SVGPath, "StrokeColor", {
        set: function (v) {
            if (v) {
                SVGPath.borderLine.style.borderColor = v;
            }

        },
        get: function () {
            return SVGPath.borderLine.style.borderColor;
        }
    });

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 通道 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGChannel = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
        DBFX.Serializer.DeSerialProperty("StrokeColor", c, xe);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("StrokeColor", c.StrokeColor, xe);
    }
}
/*
    SVG 吧台
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGBarCounter = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGBarCounter";
    SVGPath.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGBarCounterDesigner");
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGBarCounter";

        SVGPath.SVG.setAttribute("viewBox", "0 0 400 200");

        SVGPath.SvgText = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.SvgText);
        SVGPath.SvgText.setAttribute("transform", "matrix(1 0 0 1 237.4668 105.9453)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.SvgText.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "吧台";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "18");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.SvgText.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "Bay Counter";
        SVGPath.tspan2.setAttribute("font-family", "FZHTJW--GB1-0");
        SVGPath.tspan2.setAttribute("font-size", "10");
        SVGPath.tspan2.setAttribute("x", "0");
        SVGPath.tspan2.setAttribute("y", "18");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M149.999,49C94.308,49,49,94.309,49,150v1h21h1h258h1h21V49H149.999z M71.025,149c0.54-43.1,35.749-78,78.975-78h179v78H71.025z M349,149h-18V69H150c-44.331,0-80.458,35.793-80.994,80H51.005C51.542,94.869,95.745,51,150,51h199V149z");

        SVGPath.path2 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path2);
        SVGPath.path2.setAttribute("d", "M148.425,93.084c-9.943,0-18.006,8.061-18.006,18.006c0,9.943,8.063,18.004,18.006,18.004s18.004-8.061,18.004-18.004C166.429,101.145,158.368,93.084,148.425,93.084z M156.245,104.813c0,3.967-2.953,7.242-6.78,7.752c0.304,2.76-0.236,7.846-0.429,9.49l5.948,0.641v0.84h-13.122v-0.84l5.946-0.66c-0.193-1.668-0.728-6.723-0.426-9.471c-3.826-0.51-6.78-3.785-6.78-7.752c0-0.027,0.001-0.053,0.002-0.08h-0.002l0.631-6.09h14.383l0.629,6.09h-0.002C156.243,104.76,156.245,104.785,156.245,104.813z");

        SVGPath.path3 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path3);
        SVGPath.path3.setAttribute("d", "M200,93.084c-9.943,0-18.006,8.061-18.006,18.006c0,9.943,8.063,18.004,18.006,18.004c9.944,0,18.005-8.061,18.005-18.004C218.005,101.145,209.944,93.084,200,93.084z M207.475,109.482v3.047h-4.57l-0.586,1.055v0.938h5.156v2.93h-5.156v4.1h-4.57v-4.1h-5.273v-2.93h5.273v-0.938l-0.586-1.055h-4.57l-0.117-3.047h3.75l-3.75-8.672h4.805l3.047,9.023l3.164-9.023h4.688l-3.75,8.672H207.475z");

        //SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        //SVGPath.SVG.appendChild(SVGPath.path);
        //SVGPath.path.setAttribute("d", "M857.3 4.7 693.6 4.7c-10.2 0-18.7 5.6-22.2 13.6-3.1 3-5.7 6.8-6.9 11.5l-66.3 200.6-126 0c0-93.5-75.8-169.3-169.3-169.3s-169.2 75.8-169.2 169.3S209.5 399.5 303 399.5c9.6 0 19-1.3 28.2-2.9l0 72.2c0 19.2 0.6 38.2 1.7 56.8-0.4 0.2-1.7 0.8-1.7 0.8l0 14.1c0 0 1.4-0.7 2.8-1.3 10 133.2 53.2 242.1 180.6 253.9l0 184.7-88.8 0c-13.2 0-23.9 9.5-23.9 21.2 0 11.7 10.7 21.1 23.9 21.1l220.1 0c13.3 0 23.9-9.5 23.9-21.1 0-11.7-10.7-21.2-23.9-21.2l-88.8 0L557.1 794.2c138.7-2.5 183.5-111.4 194.1-247.3 2.3-3.7 3.4-6.3 3.4-6.3l0-14.1c0 0-0.8 1.5-1.7 3.4 1.1-19.9 1.7-40.3 1.7-61L754.6 257.4c0-16.7-12-27-29.1-27l-82.6 0L703.2 47l154.2 0c13.1 0 23.9-9.5 23.9-21.1S870.5 4.7 857.3 4.7zM331.1 257.4l0 96.5c-9.1 2.1-18.5 3.4-28.2 3.4-70.1 0-126.9-56.9-126.9-126.9S232.9 103.4 303 103.4s126.9 56.9 126.9 126.9l-66 0C346.9 230.4 331.1 240.7 331.1 257.4zM550.9 752.1l-12.6 0c-129.4 0-158.7-103.5-163.9-230.1 29.8-11.4 69.3-23.8 101.9-23.8 71.7 0 111.4 84.6 188.6 84.6 17.2 0 31-2.4 42.4-5.9C696.4 677.3 660.7 752.1 550.9 752.1zM686.7 272.6c14.7 0 25.3 9.1 25.3 23.5l0 172.9c0 32.4-1 63.7-3.6 93.5-11.8 3.7-26 6.2-44.1 6.2-76.9 0-115.9-84.6-187.2-84.6-32.9 0-72.9 12.5-102.9 23.9-0.3-12.9-0.7-25.8-0.7-39.1L373.5 296.2c0-14.5 13.6-23.5 28.5-23.5l182.3 0-20.7 62.8c-3.4 12.8 3 25.5 14.3 28.5 11.2 3 23.1-4.8 26.6-17.6l24.3-73.7L686.7 272.7zM433.2 630.5l-8.6 11.2c0 0 9.8 25.3 27.3 38.8 15.9 12.2 39.7 12.8 39.7 12.8l8.6-11.2c0 0-23.6-0.4-39.5-12.6C443.2 656 433.2 630.5 433.2 630.5z");


    }


    SVGPath.SetText = function (v) {

        SVGPath.tspan1.textContent = v;
        SVGPath.cnText = v;
    }

    SVGPath.GetText = function () {

        return SVGPath.cnText;

    }


    Object.defineProperty(SVGPath, "EnText", {
        get: function () {

            return SVGPath.enText;

        },
        set: function (v) {

            SVGPath.enText = v;
            SVGPath.tspan2.textContent = v;

        }
    });


    SVGPath.OnCreateHandle();
    return SVGPath;
}


DBFX.Design.ControlDesigners.SVGBarCounterDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGBarCounterDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

/*
  SVG 吧台 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGBarCounter = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("EnText", c.enText, xe);
    }
}
/*
    SVG 卫生间
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGToilet = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGToilet";
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGToilet";

        SVGPath.SVG.setAttribute("viewBox", "0 0 400 200");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M360.918,29.951H39.078c-2.764,0-5.012,2.222-5.012,4.953v130.189c0,2.732,2.248,4.955,5.012,4.955h321.84c2.766,0,5.016-2.223,5.016-4.955V34.904C365.934,32.173,363.684,29.951,360.918,29.951z M364.332,165.094c0,1.85-1.531,3.354-3.414,3.354H39.078c-1.881,0-3.41-1.504-3.41-3.354V34.904c0-1.849,1.529-3.352,3.41-3.352h321.84c1.883,0,3.414,1.503,3.414,3.352V165.094z");

        SVGPath.path2 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path2);
        SVGPath.path2.setAttribute("d", "M47.2,159.741h119.189V40.552H47.2V159.741z M49.202,42.554h115.186v115.186H49.202V42.554z");

        SVGPath.text = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.text);
        SVGPath.text.setAttribute("transform", "matrix(1 0 0 1 213 87.3335)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "卫生间";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "38");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "   Toilet";
        SVGPath.tspan2.setAttribute("font-family", "Arial-BoldMT");
        SVGPath.tspan2.setAttribute("font-size", "30");
        SVGPath.tspan2.setAttribute("x", "0");
        SVGPath.tspan2.setAttribute("y", "38");


        SVGPath.path3 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path3);
        SVGPath.path3.setAttribute("d", "M89.32,72.367c-2.478-0.44-4.633-0.729-6.651-0.885v-2.024c1.664-1.083,2.769-2.955,2.769-5.083c0-3.348-2.721-6.071-6.066-6.071c-3.347,0-6.068,2.724-6.068,6.071c0,2.127,1.104,3.999,2.767,5.082v2.003c-2.077,0.144-4.215,0.425-6.573,0.888c-2.195,0.669-4.032,2.463-4.372,4.323l0.052,30.536l0.001,0.119l0.082,0.088c1.231,1.316,2.742,1.354,4.376,0.086l0.116-0.092l0.231-24.637c0.564-0.199,1.128-0.193,1.698,0.02l-0.004,56.428l0.017,0.1c0.401,1.16,1.535,1.883,2.958,1.883c1.301-0.002,2.824-0.67,3.3-2.166l0.026-31.721c1.217-0.314,1.584-0.313,2.805,0.002l0.027,31.713l0.011,0.08c0.339,1.24,1.563,2.041,3.116,2.041c1.551,0,2.869-0.803,3.357-2.043l0.021-0.055l0.002-56.271c0.508-0.182,1.014-0.168,1.525,0.042l0.057,24.448l0.099,0.092c1.39,1.279,2.995,1.295,4.459,0.047l0.106-0.092l0.049-30.998C93.424,74.406,91.338,72.96,89.32,72.367z");

        SVGPath.path4 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path4);
        SVGPath.path4.setAttribute("d", "M138.543,101.631l-0.234-15.322c0.378-0.252,1.203-0.268,1.528-0.006l0.004,0.557c0.044,6.744,0.087,13.113,4.474,18.865l0.076,0.072c1,0.648,2.129,0.523,2.744-0.271c0.484-0.623,0.611-1.566,0.35-2.588l-0.053-0.107c-2.381-3.161-3.569-6.881-3.531-11.057c0.018-1.9,0.174-3.66,0.324-5.361c0.213-2.401,0.434-4.885,0.238-7.757c-0.557-2.362-2.061-3.511-4.597-3.511c-0.139,0-0.295,0.015-0.442,0.022c-1.099-0.404-2.373-0.716-3.764-0.909v-0.786c1.476-1.041,2.444-2.755,2.444-4.695c0-3.164-2.575-5.739-5.74-5.739c-3.168,0-5.746,2.575-5.746,5.739c0,1.938,0.968,3.652,2.443,4.692v0.788c-4.437,0.615-7.678,2.438-7.834,4.612c-0.001,0.002-0.002,0.003-0.003,0.005l-0.03,0.097c-0.404,2.813-0.263,5.104-0.113,7.53c0.098,1.578,0.198,3.211,0.172,5.157c-0.059,4.31-1.388,8.092-3.988,11.304c-0.514,1.068-0.328,1.76-0.081,2.152c0.555,0.879,2.063,1.047,3.089,0.227c3.735-4.033,4.221-6.232,4.749-12.004l0.309-6.984c0.44-0.236,0.865-0.236,1.319,0.004l-0.625,15.512l-9.286,18.82h9.453l0.008,20.176c0.31,1.266,1.507,1.832,2.557,1.832c1.229,0,2.239-0.713,2.573-1.816l0.013-20.191h1.802l0.008,20.176c0.31,1.266,1.507,1.832,2.556,1.832c1.229,0,2.238-0.713,2.572-1.816l0.013-20.191h9.692L138.543,101.631z");


    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 卫生间 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGToilet = function () {

    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}
/*
    SVG 安全出口
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGSafeEXIT = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGSafeEXIT";
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGSafeEXIT";

        SVGPath.SVG.setAttribute("viewBox", "0 0 400 200");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M46.076,39.53V160.47h307.848V39.53H46.076z M351.924,158.47H48.076V41.53h303.848V158.47z");

        SVGPath.path2 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path2);
        SVGPath.path2.setAttribute("d", "M156.563,77.839c0,3.05,2.529,5.537,5.63,5.537c3.103,0,5.63-2.487,5.63-5.537c0-3.051-2.527-5.538-5.63-5.538C159.092,72.301,156.563,74.788,156.563,77.839z");

        SVGPath.path3 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path3);
        SVGPath.path3.setAttribute("d", "M146.773,55.196l-0.409,79.832l4.781,5.676h5.23l-6.004-7.127l0.181-35.279c0.251,0.125,0.522,0.239,0.837,0.327l10.209-0.455c1.548-0.127,2.541-0.594,3.547-1.514l5.151-4.486l7.656,14.813l-5.139,4.851c-3.031,2.422-4.247,4.751-4.223,7.011l0.735,14.571c0.04,3.02,6.743,3.911,6.872-0.447l0.083-15.845l5.893-4.614l13.583,20.894c3.791,2.871,7.506-0.237,5.875-3.102l-12.3-21.012l3.143-2.486c2.878-1.616,3.075-4.264,1.815-7.639l-4.589-10.244l7.302,2.83l4.998,7.279c1.75,1.66,5.791,1.142,4.771-2.156l-5.814-8.117c-1.549-1.59-4.102-2.927-7.035-3.879l-14.501-3.909c-3.776-1.39-6.786-0.939-9.035,1.349c-2.798,3.834-6.026,7.018-9.118,10.154c-1.198,1.216-0.764,1.408-3.344,1.465l-6.41,0.107c-0.349,0.006-0.66,0.06-0.941,0.144l0.179-34.969l56.874,0.303l-0.213,81.184h4.001l0.222-85.162L146.773,55.196z");

        SVGPath.polygon = document.createElementNS(SVGPath.NS, 'polygon');
        SVGPath.SVG.appendChild(SVGPath.polygon);
        SVGPath.polygon.setAttribute("fill-rule", "evenodd");
        SVGPath.polygon.setAttribute("clip-rule", "evenodd");
        SVGPath.polygon.setAttribute("points", "83.889,82.621 105.042,82.947 91.077,93.717 131.826,93.522 132.125,104.162 91.182,103.974 105.075,116.678 85.896,117.38 63.483,100.192");


        SVGPath.text = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.text);
        SVGPath.text.setAttribute("transform", "matrix(1 0 0 1 224.7207 90.2896)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "安全出口";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "28");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "SAFE EXIT";
        SVGPath.tspan2.setAttribute("font-family", "FZHTJW--GB1-0");
        SVGPath.tspan2.setAttribute("font-size", "22");
        SVGPath.tspan2.setAttribute("x", "0");
        SVGPath.tspan2.setAttribute("y", "36");

        //SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        //SVGPath.SVG.appendChild(SVGPath.path);
        //SVGPath.path.setAttribute("d", "M512 32c264.672 0 480 215.328 480 480s-215.328 480-480 480S32 776.672 32 512 247.328 32 512 32M512 0C229.216 0 0 229.216 0 512s229.216 512 512 512 512-229.216 512-512S794.784 0 512 0L512 0zM768 192 256 192C238.336 192 224 206.336 224 224l0 608 64 0 0-273.344 72.704 4.224c14.432 1.664 25.472-3.424 33.28-15.328l33.568-47.936 39.744 89.792L353.344 832 416 832l105.216-215.488 9.856 99.04c0.896 9.376 4.576 16.832 11.2 22.656 6.624 5.952 14.72 8.768 24.128 8.768L736 746.976 736 832l64 0L800 224C800 206.336 785.664 192 768 192zM736 695.872l-149.28 0-6.496-90.24c-0.864-20.992-5.152-39.456-12.96-55.392l-38.72-82.08 59.04 0 38.88 67.168c2.496 5.216 6.336 8.96 11.328 10.88 5.024 2.112 9.728 1.952 14.144-0.448 5.472-2.528 9.152-6.24 11.2-11.296 1.92-4.928 1.76-9.984-0.448-15.2l-34.592-68.96c-6.336-11.904-13.248-20.256-21.056-25.152-7.808-4.768-17.536-7.168-29.312-7.168l-102.336 0c-16.032 0-31.2 3.744-45.184 11.328-14.144 7.616-25.504 17.888-34.176 30.976l-37.984 54.208L288 510.816 288 224l448 0L736 695.872zM416 352m-64 0a2 2 0 1 0 128 0 2 2 0 1 0-128 0Z");


    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 安全出口 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGSafeEXIT = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}

/*
    SVG 取餐区
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGDiningArea = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGDiningArea";
    SVGPath.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGDiningAreaDesigner");
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGDiningArea";
        SVGPath.SVG.setAttribute("viewBox", "0 0 400 200");
        //SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        //SVGPath.SVG.appendChild(SVGPath.path);
        //SVGPath.path.setAttribute("d", "M1024 512c0 282.8-229.2 512-512 512S0 794.8 0 512 229.2 0 512 0s512 229.2 512 512zM503.8 389.2c-70.5 60.2-157.7 111.2-261.6 153.1 7.9 9.7 15.2 20.4 22 32.2 32.2-14.7 63.7-30.6 94.5-47.8v166.5c0 11.1-4.5 20.4-13.4 27.9l20.9 32.2c9-4.7 17-8.1 24.2-10.2 32.9-8.2 71.6-16.5 116-24.7 0-12.5 0.4-24.2 1.1-34.9-46.2 10.4-84 18.4-113.3 24.2v-71.4h232.6v12.4h27.9c-14.3 8.2-31 17.2-50 26.9-38-10.4-78.8-21.3-122.5-32.8l-13.4 27.9c88.4 22.6 174.2 49.2 257.3 80l17.2-33.3c-29.4-9.7-61.6-19.7-96.7-30.1 29-14 55.5-27.7 79.5-41.4L702.6 618c-14 10-27.8 19-41.4 26.9V519.8c30.8 14.7 63.7 28.6 98.8 41.9 8.2-12.9 16.7-24.7 25.2-35.4C690 499 606.8 456.9 535.5 400l9.1-10.7h-40.8zM354 418.8c-32.2 17.2-67.7 31.3-106.3 42.4 9.7 10 17.7 20.1 24.2 30.1 91.3-32.6 164.5-80.6 219.7-143.9v-29.5H426v-37.6h89.2v-27.9H426v-31.7h-35.4v97.2h-43c6.8-9 13.2-18.4 19.3-28.5l-33.3-9.7c-20.8 34-49.2 65.5-85.4 94.5 8.6 4.7 18.4 11.3 29.5 19.9 17.5-15 33.7-31.2 48.3-48.3h124.6c-20.1 20.4-42.4 38.7-67.1 54.8-14.3-11.8-29.9-24-46.7-36.5l-22 21.5c15.7 12.8 28.8 23.9 39.2 33.2z m272.8 105.3v29.5H394.3v-29.5h232.5z m-232.5 85.4v-30.1h232.6v30.1H394.3z m106.9-112.3h-93.5c36.9-22.9 72-47.4 105.3-73.6 38.3 30.4 74.3 55 108 73.6h-82.2c-6.4-14.7-14-28.8-22.6-42.4l-31.7 12.4c5.7 9.6 11.3 19.6 16.7 30z m105.2-137c-17.9 10-36.7 18.4-56.4 25.2 10 11.1 18.6 20.9 25.8 29.5 22.9-9.7 44.9-21.5 66.1-35.4 33.7 19.3 67.5 39 101.5 59.1l23.1-31.7c-31.2-17.2-62.3-34-93.5-50.5 27.9-22.2 53.7-48.7 77.3-79.5v-29H549v30.6h157.4c-20.4 23.3-42.6 43.5-66.6 60.7-26.5-13.6-53-27-79.5-40.3L541 324.1c21.7 12 43.6 24 65.4 36.1z");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M361,161H39V39h322V161z M41,159h318V41H41V159z");

        SVGPath.SvgText = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.SvgText);
        SVGPath.SvgText.setAttribute("transform", "matrix(1 0 0 1 166.189 97.1094)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.SvgText.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "取餐区";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "24");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.SvgText.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "Takeaway";
        SVGPath.tspan2.setAttribute("font-family", "Arial-BoldMT");
        SVGPath.tspan2.setAttribute("font-size", "16");
        SVGPath.tspan2.setAttribute("x", "0");
        SVGPath.tspan2.setAttribute("y", "22");

        SVGPath.path2 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path2);
        SVGPath.path2.setAttribute("d", "M133.147,100.644c0.977-9.681,1.086-19.661,0.319-29.358c-0.152-2.09-1.61-2.133-2.608-0.027c-4.588,10.354-4.678,18.91-0.321,29.36c-0.195-0.471-0.878,19.081-1.041,28.452c-0.012,0.672,0.916,1.229,2.064,1.231c1.154,0,2.081-0.56,2.069-1.231c-0.16-8.963-0.311-19.657-0.464-28.622C133.159,100.514,133.155,100.579,133.147,100.644z");


        SVGPath.path3 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path3);
        SVGPath.path3.setAttribute("d", "M67.16,70.956V81h-1.05V70.956h-1.24V81h-1.051V70.956h-1.243V81h-1.051V70.956h-1.24V81v0.706v2.215c0,1.924,1.058,3.567,2.553,4.24c-0.188,13.422-0.371,26.848-0.56,40.272c-0.013,0.832,0.913,1.521,2.065,1.522c1.153,0,2.077-0.69,2.066-1.522c-0.189-13.424-0.373-26.848-0.561-40.272c1.496-0.672,2.555-2.315,2.555-4.24v-2.215V81V70.956H67.16z");

        SVGPath.path4 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path4);
        SVGPath.path4.setAttribute("d", "M98.227,71.456c-16.017,0-29,12.983-29,29c0,16.016,12.983,29,29,29s29-12.984,29-29C127.227,84.439,114.244,71.456,98.227,71.456z M111.714,85.496c1.164,0,2.11,0.945,2.11,2.111s-0.946,2.111-2.11,2.111c-1.165,0-2.111-0.945-2.111-2.111S110.549,85.496,111.714,85.496z M81.782,104.059c-0.214-0.21-0.434-0.426-0.698-0.609c-0.395-0.272-0.731-0.641-1.086-1.03l-0.168-0.185c-0.213-0.229-0.442-0.416-0.668-0.598c-0.27-0.215-0.523-0.42-0.639-0.627c-0.248-0.447-0.399-1.021-0.544-1.58l-0.029-0.105c-0.045-0.182,0.012-0.471,0.075-0.773c0.061-0.289,0.131-0.619,0.131-0.971c0-0.387-0.099-0.742-0.182-1.059c-0.073-0.275-0.15-0.559-0.112-0.709c0.148-0.568,0.448-1.143,0.72-1.629l0.104-0.193c0.264-0.475,0.535-0.967,0.861-1.324c0.26-0.277,0.629-0.521,1.023-0.779c0.146-0.094,0.293-0.189,0.436-0.289c0.111-0.078,0.229-0.16,0.342-0.244c0.387-0.275,0.785-0.564,1.182-0.729c0.37-0.154,0.821-0.234,1.299-0.32c0.157-0.027,0.314-0.055,0.47-0.086c0.204-0.041,0.437-0.059,0.757-0.059c0.161,0,0.326,0.006,0.491,0.008c0.425,0.012,0.853,0.008,1.249-0.018c0.211-0.012,0.412-0.023,0.6-0.023c0.199,0,0.359,0.014,0.499,0.041c0.17,0.033,0.347,0.064,0.521,0.094c0.468,0.08,0.91,0.154,1.262,0.303c0.18,0.074,0.377,0.301,0.585,0.541c0.212,0.242,0.45,0.516,0.754,0.725c0.47,0.326,0.88,0.688,1.294,1.137c0.349,0.379,0.59,0.814,0.869,1.316l0.057,0.102c0.182,0.33,0.438,0.592,0.662,0.824c0.205,0.211,0.417,0.43,0.46,0.594c0.093,0.346,0.075,0.777,0.063,1.236c-0.008,0.182-0.014,0.361-0.014,0.541c0,0.221-0.124,0.48-0.27,0.783c-0.117,0.25-0.252,0.535-0.334,0.848c-0.076,0.287-0.111,0.57-0.143,0.822c-0.043,0.348-0.08,0.646-0.202,0.863c-0.112,0.203-0.342,0.385-0.604,0.594c-0.214,0.168-0.449,0.357-0.666,0.592c-0.252,0.271-0.42,0.586-0.568,0.861c-0.146,0.269-0.281,0.521-0.436,0.627c-0.479,0.334-1.075,0.594-1.595,0.813c-0.245,0.102-0.573,0.129-0.922,0.158c-0.27,0.018-0.55,0.041-0.844,0.1c-0.318,0.063-0.606,0.173-0.882,0.281c-0.313,0.119-0.605,0.234-0.852,0.234c-0.219,0-0.494-0.121-0.785-0.248c-0.277-0.121-0.591-0.259-0.936-0.326c-0.147-0.031-0.299-0.041-0.467-0.041c-0.253,0-0.502,0.031-0.723,0.062c-0.186,0.023-0.358,0.047-0.501,0.047c-0.106,0-0.163-0.014-0.189-0.023C82.267,104.529,82.033,104.3,81.782,104.059zM92.291,118.204c-5.359,0-9.707-3.953-9.707-8.828c0-1.12,0.233-2.19,0.651-3.176c0.053-0.006,0.105-0.014,0.159-0.021c0.186-0.025,0.362-0.049,0.51-0.049c0.063,0,0.115,0.005,0.157,0.012c0.175,0.035,0.384,0.129,0.605,0.225c0.409,0.179,0.874,0.383,1.425,0.383c0.543,0,1.012-0.182,1.425-0.344c0.225-0.086,0.437-0.167,0.618-0.203c0.203-0.041,0.424-0.059,0.66-0.078c0.434-0.033,0.93-0.072,1.408-0.273c0.598-0.25,1.283-0.551,1.889-0.971c0.469-0.324,0.725-0.801,0.93-1.182c0.115-0.213,0.225-0.416,0.338-0.539c0.132-0.143,0.301-0.277,0.484-0.42c0.346-0.276,0.739-0.588,1.009-1.068c0.136-0.246,0.221-0.496,0.276-0.74c3.976,1.104,6.869,4.464,6.869,8.444C101.998,114.251,97.652,118.204,92.291,118.204z M104.583,110.751c-0.866-10.749-6.889-19.651-16.727-24.044c-0.723-0.307-0.808-1.059,0.65-1.008c1.438,0.18,1.933-0.615,5.426,0.916c7.844,4.316,11.334,8.787,13.263,17.445c0.36,2.041,0.146,3.127-0.468,3.951c-0.388,0.696-0.514,2.077-0.927,2.755C105.185,111.779,104.647,111.746,104.583,110.751zM107.759,118.15c-1.166,0-2.11-0.947-2.11-2.112c0-1.166,0.944-2.112,2.11-2.112s2.112,0.946,2.112,2.112C109.872,117.203,108.925,118.15,107.759,118.15z M111.937,106.2c-0.304,2.05-0.85,3.011-1.691,3.601c-0.588,0.538-1.143,1.807-1.749,2.321c-0.904,0.768-1.403,0.565-1.148-0.398c2.568-10.474-0.337-20.821-8.288-28.095c-0.59-0.518-0.431-1.26,0.937-0.75c1.31,0.623,2.025,0.025,4.862,2.58C110.937,92.031,112.837,97.375,111.937,106.2zM114.666,109.885c-1.164,0-2.111-0.945-2.111-2.112c0-1.165,0.947-2.112,2.111-2.112c1.168,0,2.115,0.947,2.115,2.112C116.781,108.939,115.833,109.885,114.666,109.885z M116.49,98.58c-1.166,0-2.111-0.945-2.111-2.111s0.945-2.111,2.111-2.111s2.111,0.945,2.111,2.111S117.656,98.58,116.49,98.58z");

        SVGPath.path5 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path5);
        SVGPath.path5.setAttribute("d", "M284.85,80.467l-0.609-12.884c0.104-0.087,0.172-0.218,0.172-0.365v-2.107c0-0.263-0.215-0.48-0.48-0.48h-4.896c-0.263,0-0.479,0.217-0.479,0.48v2.107c0,0.146,0.067,0.277,0.172,0.364l-0.611,12.885c-3.131,0.99-4.28,4.006-4.28,7.574v27.98v5.742c0,0,0,0,0,0.004v1.471c0,1.057,0.862,1.919,1.917,1.919h11.462c1.056,0,1.918-0.862,1.918-1.919v-1.471v-5.746v-27.98C289.133,84.473,287.982,81.457,284.85,80.467z M278.889,121.834c0,0.467-0.379,0.846-0.847,0.846c-0.467,0-0.847-0.379-0.847-0.846V86.486c0-0.467,0.38-0.847,0.847-0.847c0.468,0,0.847,0.38,0.847,0.847V121.834z");

        SVGPath.path6 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path6);
        SVGPath.path6.setAttribute("d", "M308.453,96.25c0.685,2.287,2.218,4.168,4.317,5.299c1.298,0.697,2.758,1.066,4.222,1.066c0.321,0,0.64-0.021,0.954-0.055c0.01-0.645,0.012-1.276,0.008-1.879c0.02,3.142-0.121,7.047-0.557,9.391c-0.795,4.297-4.219,13.333,5.905,13.807v9.17c-3.086,0.067-5.481,0.559-5.481,1.155c0,0.637,2.728,1.154,6.111,1.164v0.001c0.016,0,0.03,0,0.045,0c0.01,0,0.019,0,0.028,0s0.02,0,0.029,0c0.015,0,0.029,0,0.045,0v-0.001c3.383-0.01,6.111-0.527,6.111-1.164c0-0.597-2.396-1.088-5.482-1.155v-9.17c10.125-0.474,6.701-9.51,5.905-13.807c-0.642-3.461-0.645-10.331-0.435-13.113c0.04-0.061,0.069-0.874,0.085-1.47c0.003-0.032,0.009-0.062,0.009-0.095v-0.482c0-0.502-0.411-0.914-0.913-0.914h-0.624l3.056-11.717l7.417-4.205l-0.636-1.122l-7.892,4.476l-3.279,12.568h-1.479c0.117-3.294-1.585-6.532-4.675-8.195c-1.296-0.698-2.756-1.067-4.219-1.067c-3.298,0-6.317,1.805-7.881,4.71C308.017,91.547,307.77,93.964,308.453,96.25zM320.822,87.635c-0.002,0.002-0.005,0.006-0.008,0.009l-2.845,3.704l0.491-4.644c0.001-0.005,0.001-0.011,0.002-0.015c0.004,0.002,0.008,0.004,0.011,0.004l2.334,0.933L320.822,87.635z M323.58,91.146c-0.003,0.001-0.008,0.002-0.012,0.004l-4.511,1.218l3.207-3.395c0.004-0.004,0.008-0.007,0.012-0.011c0.003,0.004,0.006,0.007,0.009,0.012l1.289,2.162C323.577,91.141,323.578,91.145,323.58,91.146z M321.023,99.43c0-0.41,0.334-0.744,0.744-0.744c0.411,0,0.744,0.334,0.744,0.744v18.922c0,0.412-0.333,0.746-0.744,0.746c-0.41,0-0.744-0.334-0.744-0.746V99.43z M319.718,93.998l-0.219-0.08l4.579-0.923c0.004-0.001,0.008-0.001,0.012-0.003c0,0.006,0,0.01,0,0.015l-0.076,0.991h-0.457H319.718z M317.249,100.777c0-0.004,0.001-0.008,0.001-0.012l0.289-4.66l0.25,0.473c-0.001-0.018-0.001-0.037-0.003-0.055c0.014,0.234,0.028,0.409,0.046,0.436c0.067,0.887,0.112,2.19,0.122,3.665l-0.7,0.151C317.252,100.777,317.25,100.777,317.249,100.777z M317.758,95.826c-0.001-0.028-0.002-0.055-0.002-0.082C317.756,95.771,317.757,95.798,317.758,95.826z M317.768,96.106c-0.001-0.032-0.003-0.064-0.004-0.097C317.765,96.042,317.767,96.074,317.768,96.106z M317.779,96.365c-0.002-0.031-0.004-0.061-0.005-0.094C317.775,96.303,317.777,96.336,317.779,96.365z M312.583,88.2l2.604,3.88l-4.256-1.957c0.002-0.002,0.005-0.006,0.007-0.008l1.631-1.916c0.003-0.004,0.006-0.006,0.008-0.009C312.578,88.193,312.581,88.197,312.583,88.2z M316.478,91.225l-2.214-4.109c-0.003-0.004-0.005-0.008-0.007-0.012c0.004-0.002,0.009-0.003,0.014-0.003l2.453-0.548c0.005-0.001,0.01-0.002,0.015-0.002c0,0.004,0,0.008,0,0.014L316.478,91.225z M313.029,99.627c0.002-0.003,0.004-0.006,0.006-0.008l2.981-3.599l-0.662,4.622c0,0.007-0.001,0.012-0.002,0.016c-0.004-0.001-0.008-0.002-0.012-0.005l-2.288-1.013L313.029,99.627zM310.469,96.224c0.004-0.001,0.008-0.003,0.013-0.004l4.505-1.245l-3.188,3.412c-0.004,0.004-0.007,0.008-0.01,0.012c-0.003-0.004-0.005-0.008-0.008-0.012l-1.306-2.153C310.473,96.23,310.471,96.227,310.469,96.224z M309.949,94.382c0-0.003,0-0.007,0-0.013l0.174-2.512c0-0.004,0.001-0.008,0.002-0.012c0.004,0.001,0.007,0.002,0.012,0.004l4.396,1.575l-4.567,0.954C309.96,94.381,309.954,94.382,309.949,94.382z");

        SVGPath.path7 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path7);
        SVGPath.path7.setAttribute("d", "M293.756,105.398l0.065-0.002c-0.013-0.008-0.025-0.018-0.041-0.026h3.918c0.115-0.282,0.342-0.554,0.68-0.796l-0.603-0.991c-0.923,0.435-1.661,0.147-2.048-0.509c-0.382-0.647-0.283-1.42,0.514-2.014l-2.806-4.615l0.483-0.293l2.809,4.618c0.924-0.435,1.659-0.146,2.047,0.509c0.383,0.646,0.285,1.42-0.514,2.014l0.595,0.978l0.057-0.032l-0.057,0.032l0.014,0.022c0.899-0.401,1.616-0.111,1.996,0.531c0.103,0.176,0.169,0.359,0.199,0.546h10.486l-8.388,12.204v12.686c2.39,0.048,4.252,0.427,4.252,0.887c0,0.494-2.131,0.895-4.762,0.895c-2.63,0-4.761-0.4-4.761-0.895c0-0.478,2.005-0.868,4.525-0.891v-12.682L293.756,105.398z");


    }

    SVGPath.SetText = function (v) {

        SVGPath.tspan1.textContent = v;
        SVGPath.cnText = v;
    }

    SVGPath.GetText = function () {

        return SVGPath.cnText;

    }


    Object.defineProperty(SVGPath, "EnText", {
        get: function () {

            return SVGPath.enText;

        },
        set: function (v) {

            SVGPath.enText = v;
            SVGPath.tspan2.textContent = v;

        }
    });

    SVGPath.OnCreateHandle();
    return SVGPath;
}


DBFX.Design.ControlDesigners.SVGDiningAreaDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGDiningAreaDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}


/*
  SVG 取餐区 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGDiningArea = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("EnText", c.enText, xe);
    }
}
/*
    SVG 柱子
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGShadow = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGShadow";
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGShadow";
        SVGPath.SVG.setAttribute("viewBox", "0 0 200 200");
        SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path);
        SVGPath.path.setAttribute("d", "M0,0v200h200V0H0z M3.999,4h9.518l-9.518,9.518V4z M3.999,16.346L16.345,4h9.518L3.999,25.863V16.346zM3.999,28.691L28.691,4h10.171L3.999,38.863V28.691z M3.999,41.691L41.69,4h10.172L3.999,51.862V41.691z M3.999,54.69L54.69,4h10.172L3.999,64.862V54.69z M3.999,67.691L67.69,4h10.172L3.999,77.862V67.691z M3.999,80.691L80.69,4h10.172L3.999,90.862V80.691zM3.999,93.69L93.69,4h9.875L3.999,103.565V93.69z M3.999,106.394L106.394,4h9.215L3.999,115.609V106.394z M3.999,118.438L118.438,4h10.171L3.999,128.607V118.438z M3.999,131.438L131.438,4h10.171L3.999,141.607V131.438z M3.999,144.438L144.438,4h10.171L3.999,154.607V144.438z M3.999,157.438L157.438,4h10.171L3.999,167.607V157.438z M3.999,170.437L170.438,4h10.171L3.999,180.607V170.437z M3.999,183.437L183.438,4h10.171L3.999,193.607V183.437z M196,196h-10.091L196,185.909V196z M196,183.081L183.081,196h-10.172L196,172.909V183.081z M196,170.081L170.081,196h-10.172L196,159.909V170.081z M196,157.081L157.081,196h-10.173L196,146.909V157.081z M196,144.081L144.08,196h-10.172L196,133.909V144.081z M196,131.081L131.08,196h-10.172L196,120.909V131.081zM196,118.081L118.08,196h-10.172L196,107.909V118.081z M196,105.081L105.08,196H94.908L196,94.909V105.081z M196,92.081L92.08,196H81.908L196,81.909V92.081z M196,79.081L79.08,196H68.908L196,68.909V79.081z M196,66.081L66.08,196h-9.644L196,56.438V66.081zM196,53.609L53.608,196H43.437L196,43.438V53.609z M196,40.609L40.607,196H30.436L196,30.438V40.609z M196,27.609L27.607,196H17.436L196,17.438V27.609z M196,14.609L14.607,196H4.436L196,4.438V14.609z");


    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 柱子 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGShadow = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}

/*
    SVG 入口
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGEntrance = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGEntrance";
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGEntrance";

        SVGPath.SVG.setAttribute("viewBox", "0 0 200 100");

        SVGPath.text = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.text);
        SVGPath.text.setAttribute("transform", "matrix(1 0 0 1 106.667 51.0781)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "入口";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "30");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "ENTRANCE";
        SVGPath.tspan2.setAttribute("font-family", "FZHTJW--GB1-0");
        SVGPath.tspan2.setAttribute("font-size", "14");
        SVGPath.tspan2.setAttribute("x", "0");
        SVGPath.tspan2.setAttribute("y", "20");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M0,0v100h200V0H0z M196,96H4V4h192V96z M47.39,34.078h26v34h-26v-7h2.786v3h18.571v-26H50.176v3H47.39V34.078z M54.167,41.247l-9.823,9.823l0.008,0.008l-0.008,0.008l9.823,9.823h6.364l-7.818-7.818h12.944v-4H52.687l7.844-7.844H54.167z M38.052,49.079l7.071-7.071l-1.414-1.414l-7.071,7.071L38.052,49.079z M80,30.078v42c0,2.209-1.791,4-4,4H34c-2.209,0-4-1.791-4-4v-42c0-2.209,1.791-4,4-4h42C78.209,26.078,80,27.869,80,30.078z M78,30.078c0-1.104-0.896-2-2-2H34c-1.104,0-2,0.896-2,2v42c0,1.104,0.896,2,2,2h42c1.104,0,2-0.896,2-2V30.078z M45.124,60.15l-7.071-7.071l-1.414,1.414l7.071,7.071L45.124,60.15z");


    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 柱子 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGEntrance = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}

/*
    SVG 出口
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGEXIT = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase();
    SVGPath.ClassDescriptor.DisplayName = "图形控件";
    SVGPath.ClassDescriptor.Description = "图形控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGEXIT";
    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGEXIT";

        SVGPath.SVG.setAttribute("viewBox", "0 0 200 200");

        SVGPath.text = document.createElementNS(SVGPath.NS, 'text');
        SVGPath.SVG.appendChild(SVGPath.text);
        SVGPath.text.setAttribute("transform", "matrix(1 0 0 1 106.999 50)");
        //SVGPath.text.innerHTML = "<tspan x=\"0\" y=\"0\" fill=\"#727272\" font-family=\"'FZDHTJW--GB1-0'\" font-size=\"38\">卫生间</tspan><tspan x=\"0\" y=\"36\" fill=\"#727272\" font-family=\"'Arial-BoldMT'\" font-size=\"30\"> Toilet</tspan>";
        SVGPath.tspan1 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan1);
        SVGPath.tspan1.textContent = "出口";
        SVGPath.tspan1.setAttribute("font-family", "FZDHTJW--GB1-0");
        SVGPath.tspan1.setAttribute("font-size", "30");
        SVGPath.tspan1.setAttribute("x", "0");
        SVGPath.tspan1.setAttribute("y", "0");
        SVGPath.tspan2 = document.createElementNS(SVGPath.NS, 'tspan');
        SVGPath.text.appendChild(SVGPath.tspan2);
        SVGPath.tspan2.textContent = "EXIT";
        SVGPath.tspan2.setAttribute("font-family", "FZHTJW--GB1-0");
        SVGPath.tspan2.setAttribute("font-size", "14");
        SVGPath.tspan2.setAttribute("x", "4");
        SVGPath.tspan2.setAttribute("y", "22");

        SVGPath.path = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path);
        SVGPath.path.setAttribute("d", "M0,0v100h200V0H0z M196,96H4V4h192V96z M57.604,64.078H39.033v-26h18.571v3h2.786v-7h-26v34h26v-7h-2.786V64.078z M70.484,41.234H64.12l-9.824,9.825l0.008,0.006l-0.008,0.01l9.824,9.822h6.364l-7.818-7.817h12.943v-4H62.64L70.484,41.234z M45.638,47.664l7.071-7.071l1.414,1.414l-7.071,7.071L45.638,47.664z M52.709,61.564l-7.071-7.07l1.414-1.414l7.071,7.07L52.709,61.564z M76,26.078H34c-2.209,0-4,1.791-4,4v42c0,2.209,1.791,4,4,4h42c2.209,0,4-1.791,4-4v-42C80,27.869,78.209,26.078,76,26.078z M78,72.078c0,1.104-0.896,2-2,2H34c-1.104,0-2-0.896-2-2v-42c0-1.104,0.896-2,2-2h42c1.104,0,2,0.896,2,2V72.078z");


    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 柱子 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGEXIT = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}


/*
    SVGClientPanel 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.SVGClientPanelDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/SVGClientPanelDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}

/*
    SVG 图形用户可视区
    lishuang
    20170412
*/
DBFX.Web.Controls.SVGClientPanel = function () {
    var SVGClient = new DBFX.Web.Controls.Control("SVGClientPanel");
    SVGClient.ClassDescriptor.DisplayName = "图形控件容器";
    SVGClient.ClassDescriptor.Description = "图形控件 SVG容器";
    SVGClient.ClassDescriptor.Serializer = "DBFX.Serializer.SVGClientPanel";
    SVGClient.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.SVGClientPanelDesigner");
    SVGClient.VisualElement = document.createElement("DIV");
    SVGClient.OnCreateHandle();
    SVGClient.OnCreateHandle = function () {
        SVGClient.Class = "SVG-ClientPanel";
        SVGClient.ShapePanel = new DBFX.Web.Controls.Panel();
        SVGClient.VisualElement.appendChild(SVGClient.ShapePanel.VisualElement);
        
        SVGClient.ShapePanel.FormContext = new Object();
        SVGClient.ShapePanel.FormContext.Form = SVGClient.ShapePanel;
        SVGClient.ShapePanel.FormControls = new Object();
        SVGClient.ShapePanel.Class = "SVG-ClientPanelDiv";
        
    }


    SVGClient.TouchStart = function (e) {

        if (e.touches.length>=2) {

            SVGClient.pts = { x1: e.touches[0].pageX, y1: e.touches[0].pageY, x2: e.touches[1].pageX, y2: e.touches[1].pageY };
            SVGClient.VScale = SVGClient.viewScale;
        }

    }

    SVGClient.TouchMove = function (e) {

        try{
            if (e.touches.length >= 2) {

                var opts=SVGClient.pts;
                var npts={ x1: e.touches[0].pageX, y1: e.touches[0].pageY , x2: e.touches[1].pageX, y2: e.touches[1].pageY };
                var d1 = Math.TwoPointDistance(opts.x1, opts.y1, opts.x2, opts.y2);
                var d2 = Math.TwoPointDistance(npts.x1, npts.y1, npts.x2, npts.y2);

                var scale = (d2 / d1) * (SVGClient.VScale * 1.0);

              


                SVGClient.ViewScale = scale;

                
                

            }
        } catch (ex) {
            SVGClient.TestLabel.Text = ex.toString();
        }

        event.cancelBubble = true;

    }

    SVGClient.TouchEnd = function (e) {
       


    }

    SVGClient.Click = function (e) {


        

    }

    SVGClient.AddControl=function(c)
    {

        SVGClient.ShapePanel.AddControl(c);

    }

    SVGClient.Clear = function () {

        SVGClient.ShapePanel.Clear();

    }

    SVGClient.Remove = function (c) {

        SVGClient.ShapePanel.Remove(c);

    }



    //起点
    SVGClient.startPositionStyle = "red";
    Object.defineProperty(SVGClient, "StartPositionStyle", {
        set: function (v) {
            if (v) {
                SVGClient.startPositionStyle = v;
            }

        },
        get: function () {
            return SVGClient.startPositionStyle;
        }
    });

    //终点
    SVGClient.endPositionStyle = "red";
    Object.defineProperty(SVGClient, "EndPositionStyle", {
        set: function (v) {
            if (v) {
                SVGClient.endPositionStyle = v;
            }

        },
        get: function () {
            return SVGClient.endPositionStyle;
        }
    });


    //指定资源文件
    Object.defineProperty(SVGClient, "MapResouorceScrp", {
        set: function (v) {
            if (v) {
                if (SVGClient.mapResouorceScrp != v) {
                    SVGClient.mapResouorceScrp = v;
                    SVGClient.loadResource(v);
                }
            }

        },
        get: function () {
            return SVGClient.mapResouorceScrp;
        }
    });


    //指定旋转角度
    SVGClient.rotatAngle = 0;
    Object.defineProperty(SVGClient, "RotateAngle", {
        set: function (v) {
            if (v) {
                if (SVGClient.rotatAngle != v) {
                    SVGClient.rotatAngle = v;
                    SVGClient.TransForm();
                }
            }

        },
        get: function () {
            return SVGClient.rotatAngle;
        }
    });


    //指定放缩比例
    SVGClient.viewScale = 0;
    Object.defineProperty(SVGClient, "ViewScale", {
        set: function (v) {
            if (v) {
                if (SVGClient.viewScale != v) {
                    SVGClient.viewScale = v;
                    SVGClient.ShapePanel.VisualElement.style.zoom = v;
                }
            }

        },
        get: function () {
            return SVGClient.viewScale;
        }
    });

    SVGClient.TransForm = function (angle) {


        if (angle != undefined)
            SVGClient.rotatAngle = angle;


        var scalestr = "";

        var rstr="";
        if (SVGClient.rotatAngle != 0)
            rstr = "rotate(" + SVGClient.rotatAngle + "deg)";
        var h = (SVGClient.OrgSize.sw - SVGClient.OrgSize.sh)/2 * SVGClient.viewScale;

        SVGClient.ShapePanel.VisualElement.style.left = (h * -1) + "px";
        SVGClient.ShapePanel.VisualElement.style.top = (h +10) + "px";

        SVGClient.ShapePanel.VisualElement.style.transform = rstr;


    }

    Object.defineProperty(SVGClient, "FromPosition", {
        get: function () {
            return SVGClient.fromPosition;
        },
        set: function (v) {

            SVGClient.fromPosition = v;
            var fromshape =undefined;
            if (v != undefined) {

                fromshape = SVGClient.ShapePanel.FormControls[v];
                if (fromshape != undefined)
                    fromshape.BackgroundColor = SVGClient.startPositionStyle;

            }

        }
    });


    Object.defineProperty(SVGClient, "ToPosition", {
        get: function () {
            return SVGClient.toPosition;
        },
        set: function (v) {

            SVGClient.toPosition = v;
                    if (v != undefined) {

                var toshape = SVGClient.ShapePanel.FormControls[v];
                if (toshape != undefined)
                    toshape.BackgroundColor = SVGClient.endPositionStyle;

            }

        }
    });


    //设置位置
    SVGClient.SetPosition = function (StartPosition, EndPosition) {
        var startDraw = SVGClient.Controls.NamedControls[StartPosition];//FormContext.Form.FormControls
        startDraw.BackgroundColor = SVGClient.StartPositionStyle;
        var endDraw = SVGClient.Controls.NamedControls[EndPosition];
        endDraw.BackgroundColor = SVGClient.EndPositionStyle;
    }

    SVGClient.OrgSize = new Object();
    //加载地图资源
    SVGClient.loadResource = function (v) {
        DBFX.Resources.LoadResource(v, function (ctrlpart) {

            var w = ctrlpart.VisualElement.clientWidth;
            var h = ctrlpart.VisualElement.clientHeight;


            SVGClient.OrgSize.sw = w;
            SVGClient.OrgSize.sh = h;
            SVGClient.OrgSize.w=SVGClient.VisualElement.clientWidth;
            SVGClient.OrgSize.h=SVGClient.VisualElement.clientHeight;


            SVGClient.TransForm();

            SVGClient.FromPosition = SVGClient.fromPosition;
            SVGClient.ToPosition = SVGClient.toPosition;


        }, SVGClient.ShapePanel);
    }


    SVGClient.OnCreateHandle();
    return SVGClient;
}
/*
  SVG 图形控制器 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGClientPanel = function () {

    var base = new DBFX.Serializer.PanelSerializer();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
        DBFX.Serializer.DeSerialProperty("StartPosition", c, xe);
        DBFX.Serializer.DeSerialProperty("EndPosition", c, xe);
        DBFX.Serializer.DeSerialProperty("MapResouorceScrp", c, xe);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
        DBFX.Serializer.SerialProperty("StartPosition", c.StartPosition, xe);
        DBFX.Serializer.SerialProperty("EndPosition", c.EndPosition, xe);
        DBFX.Serializer.SerialProperty("MapResouorceScrp", c.MapResouorceScrp, xe);
    }


}

//////////////////////////////score////////////////////////////////////

/*
    评分控件 设计器
    lishuang
    20170415
*/
DBFX.Design.ControlDesigners.ScorePanelDesigner = function () {


    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        DBFX.Resources.LoadResource("design/designertemplates/drawingdesignertemplates/ScorePanelDesigner.scrp", function (ctrlpart) {
            ctrlpart.DataContext = obdc.dataContext;
        }, obdc);

    }
    //当前项设置上下文
    //obdc.DataContextChanged = function (v) {


    //}


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "页面设计器";
    return obdc;

}



/*
    评分控件
    lishuang
    20170412
*/
DBFX.Web.Controls.ScorePanel = function () {
    var ScorePanel = new DBFX.Web.Controls.Panel("ScorePanel");
    ScorePanel.ClassDescriptor.DisplayName = "评分控件";
    ScorePanel.ClassDescriptor.Description = "评分容器";
    ScorePanel.ClassDescriptor.Serializer = "DBFX.Serializer.ScorePanel";
    ScorePanel.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.ScorePanelDesigner");
    ScorePanel.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.BaseBindingDesigner");
    ScorePanel.OnCreateHandle();

    ScorePanel.OnCreateHandle = function () {
        ScorePanel.Class = "ScorePanel";
        ScorePanel.VisualElement.innerHTML = "<DIV class=\"Score-Panel-Center\"></DIV><DIV class=\"Score-Panel-BG\"></DIV><DIV class=\"Score-Panel-Font\"></DIV>";
        ScorePanel.font = ScorePanel.VisualElement.querySelector("DIV.Score-Panel-Font");
        ScorePanel.center = ScorePanel.VisualElement.querySelector("DIV.Score-Panel-Center");
        ScorePanel.bg = ScorePanel.VisualElement.querySelector("DIV.Score-Panel-BG");
        ScorePanel.MaxCount = 5;
        ScorePanel.MaxScore = 10;
        ScorePanel.StarColor = "red";
        ScorePanel.Drawing(5);
    }

    //初始
    ScorePanel.Drawing = function (count) {

        for (var i = ScorePanel.center.childNodes.length - 1; i >= 0 ; i--) {
            ScorePanel.center.removeChild(ScorePanel.center.childNodes[i]);
        }
        for (var i = ScorePanel.font.childNodes.length - 1; i >= 0 ; i--) {
            ScorePanel.font.removeChild(ScorePanel.font.childNodes[i]);
        }
        for (var i = ScorePanel.bg.childNodes.length - 1; i >= 0 ; i--) {
            ScorePanel.bg.removeChild(ScorePanel.bg.childNodes[i]);
        }
        for (var i = 0; i < count; i++) {
            var star = new DBFX.Web.Controls.SVGScoreStar();
            star.SetFill("none");
            star.SetBorderColor(ScorePanel.StarColor);
            ScorePanel.bg.appendChild(star.VisualElement);
        }
        for (var i = 0; i < count * 2; i++) {
            var a = document.createElement("a");
            a.setAttribute("index", i + 1);
            ScorePanel.font.appendChild(a);
            ScorePanel.OnScoreClick(i + 1, count, a);
        }
    }

    //点击
    ScorePanel.OnScoreClick = function (index, count, a) {
        a.onclick = function (e) {
            ScorePanel.SetScoreByIndex(index, count, a);
        }

    }
    ScorePanel.SetScoreByIndex = function (index, count, a) {
        for (var i = ScorePanel.center.childNodes.length - 1; i >= 0 ; i--) {
            ScorePanel.center.removeChild(ScorePanel.center.childNodes[i]);
        }
        for (var i = 0; i < count ; i++) {
            if (i < Math.floor(index / 2)) {
                var star = new DBFX.Web.Controls.SVGScoreStar();
                star.SetFill(ScorePanel.StarColor);
                star.SetBorderColor(ScorePanel.StarColor);
                ScorePanel.center.appendChild(star.VisualElement);
            } else if ((index % 2 == 1) && (i < Math.ceil(index / 2))) {
                var star = new DBFX.Web.Controls.SVGScoreStar();
                star.SetHalfFill(ScorePanel.StarColor);
                star.SetBorderColor(ScorePanel.StarColor);
                ScorePanel.center.appendChild(star.VisualElement);
            } else {
                var star = new DBFX.Web.Controls.SVGScoreStar();
                star.SetFill("none");
                star.SetBorderColor("none");
                ScorePanel.center.appendChild(star.VisualElement);
            }

        }
        //设置分数
        ScorePanel.Score = (ScorePanel.MaxScore / ScorePanel.MaxCount / 2) * index;
    }


    //最大个数
    Object.defineProperty(ScorePanel, "MaxCount", {
        set: function (v) {
            if (v) {
                ScorePanel.maxCount = v;
                if (v && v > 0) {
                    ScorePanel.Drawing(v);
                }
            }

        },
        get: function () {
            return ScorePanel.maxCount;
        }
    });
    //最大分数
    Object.defineProperty(ScorePanel, "MaxScore", {
        set: function (v) {
            if (v) {
                ScorePanel.maxScore = v;
            }

        },
        get: function () {
            return ScorePanel.maxScore;
        }
    });
    Object.defineProperty(ScorePanel, "DefaultScore", {
        set: function (v) {
            if (v) {
                if (ScorePanel.defaultScore != v) {
                    ScorePanel.SetScoreByIndex(v / (ScorePanel.maxScore / ScorePanel.maxCount) * 2, ScorePanel.maxCount);
                    ScorePanel.defaultScore = v;
                }

            }

        },
        get: function () {
            return ScorePanel.defaultScore;
        }
    });


    Object.defineProperty(ScorePanel, "Score", {
        set: function (v) {
            if (v) {
                ScorePanel.score = v;

            }

        },
        get: function () {
            return ScorePanel.score;
        }
    });

    //星星颜色
    Object.defineProperty(ScorePanel, "StarColor", {
        set: function (v) {
            if (v) {
                ScorePanel.starColor = v;
            }

        },
        get: function () {
            return ScorePanel.starColor;
        }
    });


    ScorePanel.OnCreateHandle();
    return ScorePanel;
}
/*
  SVG 图形控制器 序列化
 lishuang
 20170412
*/
DBFX.Serializer.ScorePanel = function () {

    var base = new DBFX.Serializer.PanelSerializer();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);

    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);

        DBFX.Serializer.SerialProperty("StarColor", c.StarColor, xe);
        DBFX.Serializer.SerialProperty("DefaultScore", c.DefaultScore, xe);
        DBFX.Serializer.SerialProperty("MaxScore", c.MaxScore, xe);
        DBFX.Serializer.SerialProperty("MaxCount", c.MaxCount, xe);
    }


}
/*
    SVG 星星
    lishuang
    20170412
 */
DBFX.Web.Controls.SVGScoreStar = function () {
    var SVGPath = new DBFX.Web.Controls.SVGBase("SVGScoreStar");
    SVGPath.ClassDescriptor.DisplayName = "评分星星控件";
    SVGPath.ClassDescriptor.Description = "评分星星控件 SVG";
    SVGPath.ClassDescriptor.Serializer = "DBFX.Serializer.SVGScoreStar";

    SVGPath.OnCreateHandle();
    SVGPath.OnCreateHandle = function () {
        SVGPath.VisualElement.className = "SVGStar";
        SVGPath.SVG.setAttribute("viewBox", "0 0 120 120");

        SVGPath.path1 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path1);
        SVGPath.path1.setAttribute("d", "M90.27,106.634L59.969,84.617v-7.026l19.488,14.161l-7.443-22.914l19.491-14.163H67.412l-7.443-22.909v-18.4l11.574,35.625H109L78.697,71.009L90.27,106.634z");

        SVGPath.path2 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path2);
        SVGPath.path2.setAttribute("d", "M60.035,77.591v7.026l-0.002-0.001l-30.305,22.017l11.575-35.626L11,48.989h37.46l11.575-35.623v18.4l-0.002-0.006l-7.445,22.913H28.495l19.49,14.163L40.541,91.75l19.492-14.16L60.035,77.591z");

        SVGPath.path3 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path3);
        SVGPath.path3.setAttribute("d", "M60.002,31.767v45.824L60,77.59L40.508,91.75l7.444-22.914l-19.49-14.163h24.093L60,31.761L60.002,31.767z");

        SVGPath.path4 = document.createElementNS(SVGPath.NS, 'path');
        SVGPath.SVG.appendChild(SVGPath.path4);
        SVGPath.path4.setAttribute("d", "M79.49,91.752L60.002,77.591V31.767l7.443,22.909h24.093L72.047,68.838L79.49,91.752z");

    }
    SVGPath.SetFill = function (v) {
        SVGPath.path1.setAttribute("fill", v);
        SVGPath.path2.setAttribute("fill", v);
        SVGPath.path3.setAttribute("fill", v);
        SVGPath.path4.setAttribute("fill", v);
    }
    //一半颜色
    SVGPath.SetHalfFill = function (v) {
        SVGPath.path1.setAttribute("fill", v);
        SVGPath.path2.setAttribute("fill", v);
        SVGPath.path3.setAttribute("fill", v);
        SVGPath.path4.setAttribute("fill", "none");
    }
    //边框颜色
    SVGPath.SetBorderColor = function (v) {
        SVGPath.path1.setAttribute("fill", v);
        SVGPath.path2.setAttribute("fill", v);
    }

    SVGPath.GetFill = function () {
        return SVGPath.path1.getAttribute("fill");
    }

    SVGPath.OnCreateHandle();
    return SVGPath;
}
/*
  SVG 柱子 序列化
 lishuang
 20170412
*/
DBFX.Serializer.SVGScoreStar = function () {
    var base = new DBFX.Serializer.SVGBase();
    base.PDeSerialize = base.DeSerialize;
    base.PSerialize = base.Serialize;
    //反序列化
    this.DeSerialize = function (c, xe, ns) {
        base.PDeSerialize(c, xe, ns);
    }
    //序列化
    this.Serialize = function (c, xe, ns) {
        base.Serialize(c, xe, ns);
    }
}