<template>
	<div>
		<div class="food">
			<router-link to="/">
				<span id="return"><img src="../assets/img/2.png"/></span>
			</router-link>
			<div id="display-con" v-for="item in food">
				<router-link :to="{path:'/detail/'+item.id}">
					<div>
						<img :src="item.url"/>
					</div>
					<div>
						<p><span id="display-con-pin">品牌</span><strong>{{item.name}}</strong></p>
						<p id="display-p1"><span>{{item.price}}</span><span id="juli">{{item.juli}}</span></p>
						<p id="display-p2"><span id="display-con-jian">减</span>{{item.jian}}</p>
						<p id="display-p3"><span id="display-con-te">特</span>{{item.te}}</p>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from "axios"
	export default{
		data(){
			return {
				food:[]
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
							if(res.data[i].type=="hua"){
								newArr.push(res.data[i])
							}
						}
						this.food=newArr
					}
				})
			}
		},
		mounted(){
			this.get()
		}
	}
</script>

<style scoped>
	#return{
		top: 0px;
		left: 0px;
		width: 100%;
		padding-top: 5px;
		position: fixed;
		background: #0296FA;
	}
	#return img{
		margin-left: 10px;
		width: 30px;
	}
	.food{
		margin-top: 40px;
		padding: 0 10px;
	}
	#display-con:nth-of-type(1){
		border-top: solid 1px lightgray;
	}
	#display-con a{
		display: flex;
		padding: 18px 0;
		border-bottom: solid 1px lightgray;
		align-items: flex-start;
		justify-content: flex-start;
	}
	#display-con div:nth-of-type(1){
		width: 24%;
	}
	#display-con div:nth-of-type(2){
		width: 76%;
		padding: 0 8px;
	}
	#display-con p{
		font-size: 12px;
		color: gray;
	}
	#display-p1{
		margin: 16px 0;
	}
	#juli{
		float: right;
	}
	#display-con-te{
		color: white;
		padding: 1px;
		margin-right: 6px;
		background: #F1884F;
	}
	#display-p2{
		margin: 8px 0;
	}
	#display-con-jian{
		color: white;
		padding: 1px;
		margin-right: 6px;
		background: #F07373;
	}
	#display-con div:nth-of-type(2) p:nth-of-type(1){
		margin-top: 0;
	}
	#display-con strong{
		color: black;
		font-size: 15px;
		margin: 0 6px;
	}
	#display-con img{
		width: 100%;
	}
	#display-con-pin{
		color: black;
		font-size: 12px;
		padding: 2px;
		background: #FFE62B;
	}
</style>