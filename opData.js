/*********************************************/

/***查询2导出 */

/*********************************************/

SP5cf725475a984e41a5dc2307=function(obj){
    //
    var data={};
    eval("data="+obj);
    //
    var RData = [],Ret = {};
    //
    if(data.BillTypeName==100){
        //
        if(data.moshi==0){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",Department:"$_id.Department",EmpName:"$_id.EmpName"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",Department:"$_id.Department",EmpName:"$_id.EmpName"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==1){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==100){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
    }
    else{
    }
    //
    if(data.BillTypeName==0){
        //
        if(data.moshi==0){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",Department:"$_id.Department",EmpName:"$_id.EmpName"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",Department:"$_id.Department",EmpName:"$_id.EmpName"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==1){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==100){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],Pan:1,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
    }
    else{
    }
    //
    if(data.BillTypeName==1){
        //
        if(data.moshi==0){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:{$regex:data.ProductName, $options:'i'}},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:0,Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==1){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],OutFlag:1,Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
        //
        if(data.moshi==100){
            //
            if(data.MechanismName=="全部"){
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)}}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
            else{
                var  RData = db.STAT_Sale.aggregate([
                    {$match:{Group_id:data.Group_id,$or:[{BillID:{$regex:data.BillID, $options:'i'}},{ERPBillID:{$regex:data.BillID, $options:'i'}}],$or:[{ProductName:data.ProductName},{PID:{$regex:data.ProductName, $options:'i'}},{ProCode:{$regex:data.ProductName, $options:'i'}},{MemId:{$regex:data.ProductName, $options:'i'}}],$or:[{EntName:{$regex:data.EntName, $options:'i'}},{EntMemId:{$regex:data.EntName, $options:'i'}}],Pan:2,CreDate:{$gte:new Date(data.ProductDate),$lte:new Date(data.DisableDate)},Department:data.MechanismName}}
                    ,{$group:{_id:{CrePerson:("$CrePerson"),BillID:("$BillID"),ERPBillID:("$ERPBillID"),EntAddress:("$EntAddress"),EntName:("$EntName"),CreDate:("$CreDate"),PID:("$PID"),ProductName:("$ProductName"),ProQty:("$ProQty"),Price:("$Price"),Costing:("$Costing"),Total:("$Total"),SupName:("$SupName"),ProBrand:("$ProBrand"),ProductDate:("$ProductDate"),DisableDate:("$DisableDate"),ProCode:("$ProCode"),ProductID:("$ProductID"),LineNum:("$LineNum"),Classify:("$Classify"),System:("$System"),Region:("$Region"),CategName:("$CategName"),CategFlagName:("$CategFlagName"),ProFlagName:("$ProFlagName"),EmpName:("$EmpName"),Department:("$Department"),_id:("$_id")},}}
                    ,{$project:{_id:0,CrePerson:"$_id.CrePerson",BillID:"$_id.BillID",ERPBillID:"$_id.ERPBillID",EntAddress:"$_id.EntAddress",EntName:"$_id.EntName",CreDate:"$_id.CreDate",PID:"$_id.PID",ProductName:"$_id.ProductName",ProQty:"$_id.ProQty",Price:"$_id.Price",Costing:"$_id.Costing",Total:"$_id.Total",SupName:"$_id.SupName",ProBrand:"$_id.ProBrand",ProductDate:"$_id.ProductDate",DisableDate:"$_id.DisableDate",ProCode:"$_id.ProCode",ProductID:"$_id.ProductID",LineNum:"$_id.LineNum",Classify:"$_id.Classify",System:"$_id.System",Region:"$_id.Region",CategName:"$_id.CategName",CategFlagName:"$_id.CategFlagName",ProFlagName:"$_id.ProFlagName",EmpName:"$_id.EmpName",Department:"$_id.Department"}}
                ]).toArray();
            }
        }
        else{
        }
    }
    else{
    }
    Ret.len = RData.length;

    //
    if(RData.length<=data.perPageCount){
        StartNum = 0;

        EndNum = RData.length;

    }
    else{
        StartNum = (data.currentPage*1-1)*data.perPageCount*1;;

        EndNum = data.currentPage*data.perPageCount*1;

    }
    Ret.list = RData.slice(StartNum,EndNum);;

    var tyu = (data.currentPage*1-1)*data.perPageCount*1+1;

    Ret.list.forEach (function(item){
            var  Products =  db.BI_Products.findOne({ProductName:item.ProductName},{});

            //
            if(Products==null){
                item.Unit = "";

            }
            else{
                item.Unit = Products.Unit;

            }
            item.number = tyu;

            tyu = tyu+1;

        }
    )
    db.LX_LOL.insert({Property1:RData.length}).nInserted ;
    return Ret;
}



