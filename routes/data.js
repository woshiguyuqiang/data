var express = require("express");
var fs = require("fs");
var data = require("./file/data.json");
var router = express.Router();
var index;
router.get('/index', function(req, res, next) {
  res.render('index', { list : data.list});
});

router.get("/add/:name",function(req,res,next){
	var name=req.params.name;
	var result=data.list.push({
		"id" : ++data.count,
		"name" : name
	});
fs.writeFileSync(__dirname+"/file/"+"data.json",JSON.stringify(data));
	if(result){
		res.send({"res" : true});
	}else{
		res.send({"res" : false});
	}
})
router.get("/del/:id",function(req,res){
	var id=req.params.id;
	index=parseInt(id);
	var newArr=[];
	newArr=data.list.filter(function(item,ind){
		return item.id!=id;
	})
	data.count--;
	console.log(index);
	for(var i=index-1;i<newArr.length;i++){
		newArr[i].id--;
		console.log("sdsd");
	}
	
	data.list=newArr;
fs.writeFileSync(__dirname+"/file/"+"data.json",JSON.stringify(data));
	if(newArr){
		res.send({"res" : true});
	}else{
		res.send({"res" : false});
	}
})

router.get("/select/:name",function(req,res){
	var name=req.params.name;
	var newArr=[];
	var str="";
	newArr=data.list.filter(function(item){
		return item.name.includes(name);
	})
	newArr.forEach(function(item){
		str+=`<li>${item.id}&nbsp&nbsp&nbsp${item.name}</li>`;
	})
	res.send(str);
})
router.get("/updata/:key/:value",function(req,res){
	var key=req.params.key;
	var value=req.params.value;
	var newArr=[];
	data.list.forEach(function(item){
		if(item.id==key){
			item.name=value;
		}
	})
fs.writeFileSync(__dirname+"/file/"+"data.json",JSON.stringify(data));
	res.send({"res" : true});
})
router.get("/selAll",function(req,res){
	var str="";
	data.list.forEach(function(item){
		str+=`<li>${item.id}&nbsp&nbsp&nbsp${item.name}</li>`;
	})
	res.send(str);
})
module.exports=router;