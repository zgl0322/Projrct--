<template>
	<div>
		<div class="index">
			<div id="location">
				<h3>飘HOME酒店(北京…</h3>
			</div>
			<div id="find">
				<router-link to="/search">
					<input type="text" placeholder="根据商品分类搜索"/>
				</router-link>
			</div>
			<div id="banner">
				<router-link to="/food">
					<figure>
						<img src="../assets/img/1.jpg"/>
						<figcaption>美食</figcaption>
					</figure>
				</router-link>
				<router-link to="/market">
					<figure>
						<img src="../assets/img/2.jpg"/>
						<figcaption>商超便利</figcaption>
					</figure>
				</router-link>
				<router-link to="/fruit">
					<figure>
						<img src="../assets/img/3.jpg"/>
						<figcaption>水果</figcaption>
					</figure>
				</router-link>
				<router-link to="/dinner">
					<figure>
						<img src="../assets/img/4.jpg"/>
						<figcaption>医药健康</figcaption>
					</figure>
				</router-link>
				<router-link to="/hua">
					<figure>
						<img src="../assets/img/5.jpg"/>
						<figcaption>浪漫鲜花</figcaption>
					</figure>
				</router-link>
				<router-link to="/tui">
					<figure>
						<img src="../assets/img/6.jpg"/>
						<figcaption>跑腿代购</figcaption>
					</figure>
				</router-link>
				<router-link to="/han">
					<figure>
						<img src="../assets/img/7.jpg"/>
						<figcaption>汉堡披萨</figcaption>
					</figure>
				</router-link>
				<router-link to="/chu">
					<figure>
						<img src="../assets/img/8.jpg"/>
						<figcaption>厨房生鲜</figcaption>
					</figure>
				</router-link>
				<router-link to="/zha">
					<figure>
						<img src="../assets/img/9.jpg"/>
						<figcaption>炸鸡炸串</figcaption>
					</figure>
				</router-link>
				<router-link to="/di">
					<figure>
						<img src="../assets/img/10.jpg"/>
						<figcaption>地方菜系</figcaption>
					</figure>
				</router-link>
			</div>
			<div id="pin">
				<img src="../assets/img/banner.jpg"/>
			</div>
			<div id="hui">
				<img src="../assets/img/banner1.jpg"/>
			</div>
			<div class="banner">
				<swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper" v-if="banner.length!=0">
					<swiper-slide v-for="(item,index) in banner" :key="index" >
					   <img :src="item.image" alt="" />
					</swiper-slide>
					<!-- 常见的小圆点 -->
					<div class="swiper-pagination"  v-for="(item,index) in banner" :key="index" slot="pagination" ></div>
					</swiper>
			</div>
			<div id="jian">
				<div class="jian">
					
				</div>
				<div class="jian1">推荐商家</div>
				<div class="jian">
					
				</div>
			</div>
			<div id="lei">
				<div>综合排序</div>
				<div>距离最近</div>
				<div>品质联盟</div>
				<div>筛选</div>
			</div>
			<div id="display">
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
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {swiper, swiperSlide} from "vue-awesome-swiper";
	require("swiper/dist/css/swiper.css");
	import Axios from "axios"
	export default{
		data() {
		    const that = this;
		    return {
		    	food:[],
		        imgIndex: 1,
		        swiperOption: {
			        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
			        notNextTick: true,
			        //循环
			        loop: true,
			        //设定初始化时slide的索引
			        initialSlide: 0,
			        //自动播放
			        autoplay: {
			            delay: 1500,
			            stopOnLastSlide: false,
			            /* 触摸滑动后是否继续轮播 */
			            disableOnInteraction: false
			        },
			        //滑动速度
			        speed: 800,
			        //滑动方向
			        direction: "horizontal",
			        //小手掌抓取滑动
			        grabCursor: true,
			        on:{
			            //滑动之后回调函数
			            slideChangeTransitionStart: function() {
			               /* realIndex为滚动到当前的slide索引值 */
			               that.imgIndex= this.realIndex - 1;
			            }
			        },
			        //分页器设置
			        pagination: {
			            el: ".swiper-pagination",
			            clickable: true,
			            type: "bullets"
			        }
		        },
		        banner:[
				        {image:"https://fuss10.elemecdn.com/1/9c/d8da44b63fa1208476992df88edc9jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/"},
		        		{image:"https://fuss10.elemecdn.com/4/48/37fce9a4ffbec79293357f68ecfcbjpeg.jpeg?imageMogr/format/webp/thumbnail/568x/"},
		        		{image:"https://fuss10.elemecdn.com/8/19/d644c8673b60fe800b71b56be7f19jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/"}
		        	]
		    }
		},
		components: {
		   swiper,
		   swiperSlide
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
						this.food=res.data
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
	#display{
		padding: 0 10px;
		margin-bottom: 53px;
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
	#jian{
		margin: 14px auto;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.jian1{
		margin: 0 10px;
	}
	.jian{
		width: 10%;
		border-top: solid 1px lightgray;
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
		text-align: center;
		width: 33.3%;
		padding-top: 8px;
	}
	#banner{
		padding: 0 10px;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	#banner a{
		width: 18%;
		margin-top: 12px;
		text-align: center;
	}
	#banner figure img{
		width: 62%;
	}
	#banner figure figcaption{
		font-size: 14px;
		color: gray;
	}
	.banner{
		padding: 0 10px;
	}
	.banner img{
		width: 100%;
	}
	#pin{
		margin-top: 24px;
		padding: 0 10px;
	}
	#pin img{
		width: 100%;
	}
	#hui{
		margin-top: 2px;
		padding: 0 10px;
	}
	#hui img{
		width: 100%;
	}
	#location{
		color: white;
		padding: 10px 16px;
		background: #0296FA;
	}
	#lei{
		display: flex;
		padding: 0 10px;
		color: gray;
		margin-bottom: 20px;
		justify-content: space-around;
	}
	#find{
		text-align: center;
		padding: 6px 0;
		background: #0296FA;
	}
	#find input{
		width: 90%;
		text-align: center;
		height: 36px;
		border: solid 1px white;
	}
	.index{
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
</style>
