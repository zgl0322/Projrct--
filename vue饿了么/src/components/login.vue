<template>
	<div>
		<div class="login">
			<div id="regist-top">
				登录
			</div>
			<div id="regist-center">
				用户名：<br /><input type="text" v-model="user"/><br />
				密码：<br /><input type="password" v-model="pwd"/><br />
				<span style="color: red;">{{prompt}}</span><br />
				<button @click="login(user,pwd)">登录</button><br />
				没有账号请前往<router-link to="/regist" style="color: blue;text-decoration: underline;">注册</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from 'axios'
	export default{
		data(){
			return {
				user:"",
				pwd:"",
				prompt:""
			}
		},
		methods:{
			login(user,pwd){
	            let params=new URLSearchParams();
	            params.append("username",user);
	            params.append("pwd",pwd);
	            //传用户名和密码
	
	            Axios.post("http://localhost:81/login",params).then(res=>{
	                if(res.data.success=="登录成功"){
	                	this.prompt=res.data.success;
	                	//将用户信息存入本地
	                	localStorage.user=JSON.stringify(res.data.user)
	                	//将token放进浏览器缓存中，相当于咱们前端的小数据库
	                	localStorage.setItem("token",res.data.token);
	                	//将id抓到，放到localstorage
	                	localStorage.setItem("id",res.data.id)
	                	this.$router.push("/us")
	                }
	           })
			}
		}
	}
</script>

<style scoped>
	#regist-top{
		padding: 14px 0;
		text-align: center;
		font-size: 22px;
		color: white;
		background: #0296FA;
	}
	#regist-center{
		padding: 40px 0;
		font-size: 20px;
		text-align: center;
	}
	#regist-center input{
		border: solid 1px;
		width: 50%;
		height: 30px;
		margin: 10px 0;
		font-size: 18px;
	}
	#regist-center button{
		border: solid 1px #0296FA;
		width: 80px;
		height: 40px;
		margin: 10px 0;
		font-size: 18px;
		color: white;
		background: #0296FA;
	}
	.login{
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
</style>