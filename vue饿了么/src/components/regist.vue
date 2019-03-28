<template>
	<div>
		<div class="regist">
			<div id="regist-top">
				注册
			</div>
			<div id="regist-center">
				用户名：<br /><input type="text" v-model="user"/><br />
				密码：<br /><input type="password" v-model="pwd"/><br />
				确认密码：<br /><input type="password" v-model="repwd"/><br />
				<span style="color: red;">{{prompt}}</span><br />
				<button @click="regist">注册</button><br />
				<router-link to="/login" style="color: blue;text-decoration: underline;">登录</router-link>
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
				repwd:"",
				prompt:""
			}
		},
		methods:{
			regist(){
				if(this.pwd!=this.repwd){
					this.prompt="确认密码错误"
				}else{
					let params=new URLSearchParams()
					params.append("username",this.user)
					params.append("pwd",this.pwd)
					params.append("repwd",this.repwd)
					this.prompt=""
					Axios({
						method:"post",
						url:"http://localhost:81/regist",
						data:params
					}).then((res)=>{
						this.prompt=res.data.success
						this.user=""
						this.pwd=""
						this.repwd=""
					})
				}
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
</style>