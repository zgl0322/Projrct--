<template>
	<div class="search">
		<div id="search-top">
			<router-link to="/">
				<span><img src="../assets/img/1.png"/></span>
			</router-link>
			<input type="text" v-model="search"/>
		</div>
		<div id="items">
			<div v-for="items in searchData">
				<p v-for="value in items.menuList">
					{{value.name}}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Axios from "axios"
	export default{
		data(){
			return {
				search:"",
				menuList:"",
			}
		},
		methods:{
			get(){
				let params=new URLSearchParams()
	            params.append("token",localStorage.getItem("token"))
				Axios.post("http://localhost:81/getData",params).then((res)=>{
					if(res.data.status==false){
						localStorage.removeItem("token")
						localStorage.removeItem("user")
						alert("您的登录已经过期，跳转至登录界面")
						this.$router.push("/login")
					}else{
						this.menuList=res.data
					}
				})
			}
		},
		computed:{
			searchData(){
				if(this.search){
					//数组过滤方法 true false
					let resultsArr=this.menuList.filter((items)=>{
						if(items.title.indexOf(this.search)!=-1){
							return true
						}else{
							return false
						}
					})
					return resultsArr
				}else{
					return [{
								"menuList":[
									{"name":"热搜：杨国福麻辣烫"}
								]
							}]
				}
			}
		},
		mounted(){
			this.get()
		}
	}
</script>

<style scoped>
	#search-top{
		display: flex;
		padding: 10px 20px;
		align-items: center;
		border-bottom: solid 1px lightgray;
	}
	#search-top input{
		height: 30px;
		margin-left: 10px;
		width: 84%;
		border: solid 1px gray;
		font-size: 18px;
	}
	#items{
		padding: 0 20px;
	}
	#items p{
		font-size: 20px;
		margin: 5px 0;
	}
</style>