var express=require("express")
var app=express()
var fs=require("fs")
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended:false}))

//设置跨域访问 cors跨域 120.0.0.1.8020 =》 8080
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200); /*让options请求快速返回*/
    } else {
      next();
    }
})

//token==>payload cert {过期时间}
let payload={
    user:"shao",
    admin:true
}

//自定义加密文件
let cert="今天天气还不错"

//获取本地用户文件
var userJson="../src/assets/user.json"

//注册接口
app.post("/regist",function(req,res){
	var obj=req.body
//	console.log(obj)
	fs.readFile(userJson,(err,data)=>{
        if(err){
            res.send({err:"数据库读取时候出现问题,请检查后台逻辑业务"})
        }else{
            //将读取到的数据转化为对象
            let arr=JSON.parse(data);
            obj.id=arr.length+1;
            // obj.repwd="";//repwd:"" 
            delete obj.repwd; //删除对象键值对儿 
            // delete obj.token;
//          console.log(obj) 
            arr.push(obj)
            //arr变成字符串
            let str=JSON.stringify(arr)
            //从新写入json文件
            fs.writeFile(userJson,str,(err,data)=>{
                if(err){
                    res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
                }else{
                    res.send({
                        success:"注册成功，点击登录" 
                    })
                }
            })
        }
    })
})

//登录接口
app.post("/login",function(req,res){
	// 登陆，不是注册，
    // 去数据库找数据  找到之后，登陆成功  读取数据库中的数据
    fs.readFile(userJson,(err,data)=>{
        if(err){
            res.send({err:"数据库读取的时候有错误，请您检查后台"})
        }else{
            //读取到数据转化为对象
            let arr=JSON.parse(data);
            //遍历数组
            for(let i in arr){
                if(req.body.username==arr[i].username&&req.body.pwd==arr[i].pwd){
                    let token=jwt.sign(payload,cert,{expiresIn:"60000s"});
                    res.send({
                        success:"登录成功",
                        token:token,
                        id:arr[i].id,
                        user:arr[i]
                    })
                    // return;
                }
            }
        }
    })
})

//验证token写成中间件儿
//验证是否有token
app.use(function jwtVerify(req, res, next) {
    let token = req.body.token;
//  console.log(token) 
    // 先解密
    jwt.verify(token,cert,function(err,decoded){
//      console.log(decoded)
        //登陆过期
        if(err || !decoded){
            res.send({data:null,status:false,msg:err})
        }
        //如果登陆没有过期
        if(decoded.user == payload.user){
            next();
        }
    })
})

//注销接口
app.post("/del",function(req,res){
	var obj=req.body
//	console.log(obj)
	fs.readFile(userJson,(err,data)=>{
        if(err){
            res.send({err:"数据库读取时候出现问题,请检查后台逻辑业务"})
        }else{
            //将读取到的数据转化为对象
            let arr=JSON.parse(data)
            for (var i = 0; i < arr.length; i++) {
            	if(arr[i].id==obj.id){
            		arr.splice(i,1)
            	}
            }
            //arr变成字符串
            let str=JSON.stringify(arr)
            //从新写入json文件
            fs.writeFile(userJson,str,(err,data)=>{
                if(err){
                    res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
                }else{
                    res.send({
                        success:"账号已注销" 
                    })
                }
            })
        }
    })
})

//获取搜索栏接口
app.post("/getData",(req,res)=>{
	fs.readFile("../src/assets/data.json",function(err,data){
		if(err){
			
		}else{
			res.send(data)
		}
	})
})

//获取商品数据
app.post("/food",(req,res)=>{
	fs.readFile("../src/assets/data1.json",function(err,data){
		if(err){
			
		}else{
			res.send(data)
		}
	})
})

//添加购物车
app.post("/addToCar",(req,res)=>{
	fs.readFile("../src/assets/data1.json",function(err,data){
		var arr=JSON.parse(data)
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].id==req.body.id){
				if(arr[i].num==0){
					arr[i].time=new Date().getTime()					
					arr[i].num++
				}else{
					arr[i].num++
				}
			}
		}
		var jsonStr=JSON.stringify(arr)
		fs.writeFile("../src/assets/data1.json",jsonStr,function(err){
			if(err){
				console.log(err)
			}else{
				res.send({success:"添加成功"})
			}
		})
	})
})

//商品增加
app.post("/addCar",(req,res)=>{
	fs.readFile("../src/assets/data1.json",function(err,data){
		var arr=JSON.parse(data)
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].id==req.body.id){
				arr[i].num++
			}
		}
		var jsonStr=JSON.stringify(arr)
		fs.writeFile("../src/assets/data1.json",jsonStr,function(err){
			if(err){
				console.log(err)
			}else{
				res.send({success:"添加成功"})
			}
		})
	})
})

//商品减少
app.post("/reduceCar",(req,res)=>{
	fs.readFile("../src/assets/data1.json",function(err,data){
		var arr=JSON.parse(data)
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].id==req.body.id){
				arr[i].num--
			}
		}
		var jsonStr=JSON.stringify(arr)
		fs.writeFile("../src/assets/data1.json",jsonStr,function(err){
			if(err){
				console.log(err)
			}else{
				res.send({success:"减少成功"})
			}
		})
	})
})

//商品删除
app.post("/delGoods",(req,res)=>{
	fs.readFile("../src/assets/data1.json",function(err,data){
		var arr=JSON.parse(data)
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].id==req.body.id){
				arr[i].num=0
			}
		}
		var jsonStr=JSON.stringify(arr)
		fs.writeFile("../src/assets/data1.json",jsonStr,function(err){
			if(err){
				console.log(err)
			}else{
				res.send({success:"删除成功"})
			}
		})
	})
})

app.listen(81,function(){
	console.log("81 OK")
})
