<template>
    <div class="container">
        <Category title="美食" :listData="foods">
            <img slot="center" src="https:s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="" srcset="">
            <a slot="footer" href="http://baidu.com">更多美食</a>
        </Category>
        <Category title="游戏">
            <ul slot="center">
                <li v-for="(item, index) in games" :key="index">
                    {{item}}
                </li>
            </ul>
            <div class="foot" slot="footer">
                <a href="http://baidu.com">单机游戏</a>
                <a href="http://baidu.com">网络游戏</a>
            </div>
        </Category>
        <Category title="电影">
            <video slot="center" src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" controls></video>
            <template v-slot:footer>
                <div class="foot">
                    <a href="http://baidu.com">景点</a>
                    <a href="http://baidu.com">热门</a>
                    <a href="http://baidu.com">推荐</a>
                </div>
                <h4>欢迎前来观影</h4>
            </template>
        </Category>
    </div>
</template>

<script>
import Category from "./components/Category"

export default {
    name: 'App',
    components: {
        Category
    },
    data() {
        return {
            foods:['火锅','烧烤','小龙虾','牛排'],
            games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
            films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
        }
    },
}
</script>

<style lang="css" scoped>
   .container, .foot{
     display: flex;
     justify-content: space-around;
   }
   video {
     width: 100%;
   }
   img{
     width: 100%;
   }
   h4{
       text-align: center;
   }
</style>