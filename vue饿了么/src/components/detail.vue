<template>
	<div>
		<div class="detail">
			<div id="detail-con" v-for="item in data">
				<img v-bind:src="item.url"/>
				<div id="detail-con1">
					<div id="detail-con1-1">
						<p id="zhao"><span>招牌</span>{{item.name}}</p>
						<p id="jia">{{item.price}}</p>
						<p id="jia1">￥{{item.price1}}</p>
						<p id="te">{{item.te}}</p>
					</div>
					<div id="detail-con1-2">
						<button @click="add(item.id)">+</button>
					</div>
				</div>
			</div>
			<div id="pro" v-show="bol">
				添加成功
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from "axios"
	export default{
		data(){
			return {
				data:"",
				bol:false,
				arrList:JSON.parse(localStorage.list)
			}
		},
		methods:{
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
						for(let i in res.data){
							if(res.data[i].id==this.$route.params.id){
								newArr.push(res.data[i])
							}
						}
						this.data=newArr
					}
				})
			},
			add(id){
				let params=new URLSearchParams();
	            params.append("token",localStorage.getItem("token"))
	            params.append("id",id)
				Axios.post("http://localhost:81/addToCar",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						this.bol=true
						setTimeout(this.dis,1500)
					}
				})
			},
			dis(){
				this.bol=false
			}
		},
		mounted(){
			this.get()
		}
	}
</script>

<style scoped>
	.detail{
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
	img{
		width: 100%;
		height: 300px;
	}
	#detail-con1{
		display: flex;
		padding: 0 16px;
		align-items: center;
		justify-content: space-between;
	}
	#zhao{
		padding: 4px;
		font-size: 20px;
	}
	#zhao span{
		font-size: 12px;
		background: #F79B2F;
		color: white;
		padding: 1px;
		margin-right: 6px;
	}
	#jia{
		font-size: 13px;
		color: gray;
		padding: 6px 0;
	}
	#jia1{
		font-size: 22px;
		color: #FD6B5A;
		padding: 4px 0;
	}
	#te{
		font-size: 14px;
		color: gray;
		padding: 4px 0;
	}
	#detail-con1-2 button{
		color: white;
		font-size: 22px;
		padding: 0px 6px;
		border: solid 1px #5AB0FA;
		background: #5AB0FA;
		border-radius: 50%;
		outline: none;
	}
	#pro{
		width: 200px;
		color: white;
		position: fixed;
		left: 94px;
		bottom: 100px;
		padding: 10px 0;
		font-size: 22px;
		text-align: center;
		border: solid 1px;
		border-radius: 10px;
		background-color: rgba(0,0,0,0.6);
	}
</style>