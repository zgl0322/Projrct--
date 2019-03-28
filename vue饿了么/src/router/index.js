import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import menu from '@/components/menu'
import us from '@/components/us'
import search from '@/components/search'
import food from '@/components/food'
import medicine from '@/components/medicine'
import market from '@/components/market'
import fruit from '@/components/fruit'
import detail from '@/components/detail'
import login from '@/components/login'
import regist from '@/components/regist'
import hua from '@/components/hua'
import tui from '@/components/tui'
import han from '@/components/han'
import chu from '@/components/chu'
import zha from '@/components/zha'
import di from '@/components/di'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
    redirect:"/index"
    },{
    	path:"/index",
    	component:index
    },{
    	path:"/list",
    	component:menu
    },{
    	path:"/us",
    	component:us
    },{
    	path:"/search",
    	component:search
    },{
    	path:"/food",
    	component:food
    },{
    	path:"/dinner",
    	component:medicine
    },{
    	path:"/market",
    	component:market
    },{
    	path:"/fruit",
    	component:fruit
    },{
    	path:"/detail/:id",
    	component:detail
    },{
    	path:"/login",
    	component:login
    },{
    	path:"/regist",
    	component:regist
    },{
    	path:"/hua",
    	component:hua
    },{
    	path:"/tui",
    	component:tui
    },{
    	path:"/han",
    	component:han
    },{
    	path:"/chu",
    	component:chu
    },{
    	path:"/zha",
    	component:zha
    },{
    	path:"/di",
    	component:di
    }
  ]
})
