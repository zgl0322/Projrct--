<template>
	<div>
		<div id="container">
			<div id="list" v-for="item in listmenu">
				<div id="list-top">
					<div id="list-top-img">
						<img v-bind:src="item.url"/>
					</div>
					<div id="list-top-con">
						<p id="list-top-con-name">{{item.name}}<a @click="del(item.id)">删除</a></p>
						<p id="time">{{item.time}}</p>
						<p id="price">{{item.te}}<strong>￥{{item.price1}}.00</strong></p>
					</div>
				</div>
				<div id="list-bottom">
					<strong id="xiao">小计：{{item.xiao}}</strong>
					<span id="dian">
						<button id="button1" @click="reduce(item.id)">-</button>
						<span>{{item.num}}</span>
						<button id="button2" @click="add(item.id)">+</button>
					</span>
				</div>
			</div>
		</div>
		<div id="kong" v-show="bol">您暂时还没有订单~</div>
		<div id="total" v-show="bol1"><h2>总价：{{total}}</h2></div>
		<div id="bottom">
			<router-link to="/">
					<div><img src="../assets/img/bot1.jpg"/></div>
				</router-link>
				<router-link to="/list">
					<div><img src="../assets/img/bot2.jpg"/></div>
				</router-link>
				<router-link to="/us">
					<div><img src="../assets/img/bot3.jpg"/></div>
				</router-link>
		</div>
	</div>
</template>

<script>
	import Axios from "axios"
	export default{
		data(){
			return {
				listmenu:[],
				total:0,
				bol:false,
				bol1:true
			}
		},
		methods:{
			del(id){
				let params=new URLSearchParams();
	            params.append("token",localStorage.getItem("token"))
	            params.append("id",id)
				Axios.post("http://localhost:81/delGoods",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						if(res.data.success=="删除成功"){
							this.get()
						}
					}
				})
			},
			add(id){
				let params=new URLSearchParams();
	            params.append("token",localStorage.getItem("token"))
	            params.append("id",id)
				Axios.post("http://localhost:81/addCar",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						if(res.data.success=="添加成功"){
							this.get()
						}
					}
				})
			},
			reduce(id){
				let params=new URLSearchParams();
	            params.append("token",localStorage.getItem("token"))
	            params.append("id",id)
				Axios.post("http://localhost:81/reduceCar",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						if(res.data.success=="减少成功"){
							this.get()
						}
					}
				})
			},
			get(){
				let params=new URLSearchParams();
	            params.append("token",localStorage.getItem("token"))
				Axios.post("http://localhost:81/food",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						var newArr=[]
						var sum=0
						for (var i = 0; i < res.data.length; i++) {
							if(res.data[i].num>0){
								res.data[i].time=this.time(res.data[i].time)
								res.data[i].xiao=res.data[i].num*res.data[i].price1
								newArr.push(res.data[i])
								sum+=res.data[i].xiao
							}
						}
						this.listmenu=newArr
						this.total=sum
						if(this.listmenu.length==0){
							this.bol=true
							this.bol1=false
						}
					}
				})
			},
			time(time){
				var date=new Date(time)
				var y=date.getFullYear()
				var mon=date.getMonth()+1
				if(mon>=10){
					mon=mon
				}else{
					mon="0"+mon
				}
				var d=date.getDate()
				var h=date.getHours()>=10?date.getHours():"0"+date.getHours()
				var m=date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes()
				return y+"-"+mon+"-"+d+" "+h+":"+m
			}
		},
		mounted(){
			this.get()
		}
	}
</script>

<style scoped>
	#container{
		margin-bottom: 90px;
	}
	#bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		display: flex;
		border: solid 1px lightgray;
		border-bottom: none;
		background:white;
	}
	#bottom a{
		padding-top: 8px;
		text-align: center;
		width: 33.3%;
	}
	#total{
		width: 100%;
		text-align: center;
		position: fixed;
		background: white;
		bottom: 55px;
	}
	#list-top{
		display: flex;
		padding: 16px;
	}
	#xiao{
		margin-left: 14px;
	}
	#list-top-img{
		width: 20%;
	}
	#list-top-con{
		width: 80%;
	}
	#list-top-img img{
		width: 80%;
	}
	#list-top-con-name{
		font-size: 20px;
	}
	#list-top-con-name a{
		float: right;
		font-size: 16px;
	}
	#time{
		color: gray;
		padding-bottom: 12px;
	}
	#price{
		border-top: solid 1px lightgray;
		border-bottom: solid 1px lightgray;
		padding: 14px 0;
	}
	#price strong{
		float: right;
	}
	#list-bottom{
		overflow: hidden;
		padding: 0 16px 16px 16px;
		border-bottom: solid 1px lightgray;
	}
	#dian{
		float: right;
	}
	#dian button{
		color: white;
		font-size: 22px;
		padding: 0px 6px;
		border: solid 2px #5AB0FA;
		background: white;
		border-radius: 50%;
		outline: none;
	}
	#dian button:nth-of-type(1){
		color: #5AB0FA;
		padding: 0px 9px;
		border: solid 2px;
	}
	#dian button:nth-of-type(2){
		background: #5AB0FA;
	}
	#kong{
		color: gray;
		position: fixed;
		width: 100%;
		bottom: 400px;
		font-size: 20px;
		text-align: center;
	}
</style>