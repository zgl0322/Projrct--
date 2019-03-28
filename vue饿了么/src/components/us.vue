<template>
	<div>
		<div class="us">
			<div id="us-top">
				<p><span>我的</span></p>
				<p v-for="item in data">
					<router-link to="/login">
						<span>{{item.name}}</span>
					</router-link>
					<span>{{item.name3}}</span>
					<span id="exit" @click="exit">{{item.name4}}</span>
					<span id="del" @click="del(item.id)">{{item.name5}}</span>
					<router-link to="/regist">
						<span>{{item.name1}}</span>
					</router-link>
				</p>
				<p v-for="item in data">
					{{item.name2}}
				</p>
			</div>
			<div id="us-center">
				<div>我的余额</div>
				<div>我的红包</div>
				<div>我的金币</div>
			</div>
			<div id="us-bottom">
				<p>我的心意卡</p>
				<p>服务中心</p>
				<p>规则中心</p>
			</div>
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
	</div>
</template>

<script>
	import Axios from "axios"
	var liss=[{
		name:"登录",
		name1:"注册",
		name2:"登录后可享受更多特权"
	}]
	export default{
		data(){
			return {
				data:liss
			}
		},
		methods:{
			exit(){
				localStorage.removeItem("user")
				localStorage.removeItem("token")
				this.data=liss
			},
			del(id){
				let params=new URLSearchParams()
	            params.append("id",id)
	            params.append("token",localStorage.getItem("token"))
	            Axios.post("http://localhost:81/del",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else if(res.data.success=="账号已注销"){
	            		localStorage.removeItem("user")
	            		localStorage.removeItem("token")
						this.data=liss
					}
				})
			}
		},
		mounted(){
			if(localStorage.user){
				this.data=JSON.parse(localStorage.user)
				this.data=[
					{
						name3:this.data.username,
						name4:"退出",
						name5:"注销",
						id:this.data.id
					}
				]
			}
		}
	}
</script>

<style scoped>
	#bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		justify-content: space-between;
		display: flex;
		border: solid 1px lightgray;
		border-bottom: none;
		background: white;
	}
	
	#bottom a {
		padding-top: 8px;
		text-align: center;
		width: 33.3%;
	}
	.us{
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}
	#us-top{
		background: #0296FA;
		color: white;
		padding: 10px 40px 20px 40px;
	}
	#us-top a{
		color: white;
		text-decoration: none;
	}
	#us-top p:nth-of-type(1){
		text-align: center;
		font-size: 22px;
	}
	#us-top p:nth-of-type(2){
		padding-top: 20px;
		font-size: 20px;
		margin-top: 10px;
	}
	#us-top p:nth-of-type(3){
		font-size: 16px;
		margin-top: 10px;
	}
	#us-center{
		display: flex;
		justify-content: space-between;
		border-bottom: solid 1px lightgray;
	}
	#us-center div{
		width: 33.3%;
		padding: 44px 0;
		text-align: center;
	}
	#us-center div:nth-of-type(2){
		border-left: solid 1px lightgray;
		border-right: solid 1px lightgray;
	}
	#us-bottom p{
		font-size: 18px;
		padding: 10px 20px;
		border-bottom: solid 1px lightgray;
	}
	#us-bottom p:nth-of-type(1){
		border-top: solid 10px #E6E6E6;
	}
	#exit{
		margin: 0 10px;
		font-size: 15px;
	}
	#del{
		font-size: 15px;
	}
</style>