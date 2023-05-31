<template>
  <div class="home page-component">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 2" :key="item">
        <img src="~assets/images/web-banner1.png" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索 -->
    <div class="search-container">
    <div class="search-wrapper">
    <div class="hospital-search">
      <el-autocomplete
      class="search-input"
      prefix-icon="el-icon-search"
      v-model="hosname"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please enter hospital name"
      @select="handleSelect"
      >
        <span slot="suffix" class="search-btn v-link highlight clickable selected">Search </span>
      </el-autocomplete>
    </div>
    </div>
    </div>
    <!-- bottom -->
    <div class="bottom">
    <div class="left">
    <div class="home-filter-wrapper">
    <div class="title"> Hospitals</div>
    <div>
      <div class="filter-wrapper">
        <span
        class="label">Level：</span>
        <div class="condition-wrapper">

          <span
          class="item v-link clickable" :class="hostypeActiveIndex == index ? 'selected' : ''"
          v-for="(item, index) in hostypeList" :key="index" 
          @click="hostypeSelect(item.value, index)">{{ item.name }}</span>
        
        </div>
      </div>
    <div class="filter-wrapper">
      <span
      class="label">District：</span>
      <div class="condition-wrapper">
        <span class="item v-link clickable" :class="provinceActiveIndex == index ? 'selected' : ''"
          v-for="(item, index) in districtList" :key="index"
          @click="districtSelect(item.value, index)">{{ item.name }}</span>
      </div>
      </div>
    </div>
    </div>
    <div class="v-scroll-list hospital-list">


    <div v-for="(item, index) in list" :key="index"   class="v-card clickable list-item">
      <div class="">
        <div
        class="hospital-list-item hos-item" index="0" @click="show(item.hoscode)" >
        <div class="wrapper">
        <div class="hospital-title"> {{item.hosname}}</div>
        <div class="bottom-container">
        <div class="icon-wrapper">
          <span class="iconfont"></span>{{ item.param.hostypeString }}
        </div>
        <div class="icon-wrapper">
          <span class="iconfont"></span>{{ item.bookingRule.releaseTime }}
        </div>
        </div>
        </div>
          <img :src="'data:image/jpeg;base64,'+item.logoData"
            :alt="item.hosname"
            class="hospital-img">
        </div>
      </div>
    </div>




    </div>
    </div>



    <div class="right">
      <div class="common-dept">
      <div class="header-wrapper">
      <div class="title"> Departments</div>
      <div class="all-wrapper"><span>All</span>
      <span class="iconfont icon"></span>
      </div>
      </div>
      <div class="content-wrapper">
      <span class="item v-link clickable dark">Cardiology </span>
      <span class="item v-link clickable dark">Neurology </span>
      <span class="item v-link clickable dark">Orthopedics </span>
      <span class="item v-link clickable dark">Neurosurgery</span>
      <span class="item v-link clickable dark">Nephrology </span>
      <span class="item v-link clickable dark">Pediatrics </span>
      <span class="item v-link clickable dark">General surgery </span>
      <span class="item v-link clickable dark">Medicine </span>
      </div>
    </div>
    <div class="space">
      <div class="header-wrapper">
      <div class="title-wrapper">
      <div class="icon-wrapper"><span
      class="iconfont title-icon"></span>
      </div>
      <span class="title">News</span>
      </div>
      <div class="all-wrapper">
      <span>All</span>
      <span class="iconfont icon"></span>
      </div>
      </div>
      <div class="content-wrapper">
      <div class="notice-wrapper">
      <div class="point"></div>
      <span class="notice v-link clickable dark">关于延长北京大学国际医院放假的通知 </span>
      </div>
      <div class="notice-wrapper">
      <div class="point"></div>
      <span class="notice v-link clickable dark">北京中医药大学东方医院部分科室医生门诊医 </span>
      </div>
      <div class="notice-wrapper">
      <div class="point"></div>
      <span class="notice v-link clickable dark"> 武警总医院号源暂停更新通知 </span>
      </div>
      </div>
    </div>
    <div class="suspend-notice-list space">
    <div class="header-wrapper">
    <div class="title-wrapper">
      <div class="icon-wrapper">
      <span class="iconfont title-icon"></span>
      </div>
      <span class="title">停诊公告</span>
      </div>
      <div class="all-wrapper">
      <span>全部</span>
      <span class="iconfont icon"></span>
      </div>
      </div>
      <div class="content-wrapper">
      <div class="notice-wrapper">
      <div class="point"></div>
      <span class="notice v-link clickable dark"> 中国人民解放军总医院第六医学中心(原海军总医院)呼吸内科门诊停诊公告 </span>
      </div>
      <div class="notice-wrapper">
      <div class="point"></div>
    <span class="notice v-link clickable dark"> 首都医科大学附属北京潞河医院老年医学科门诊停诊公告 </span>
    </div>
      <div class="notice-wrapper">
        <div class="point"></div>
        <span class="notice v-link clickable dark">中日友好医院中西医结合心内科门诊停诊公告 </span>
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>
<script>

import hospApi from '@/api/hosp'
import dictApi from '@/api/dict'

export default{
  asyncData(){
    return hospApi.getPageList(1,10,null)
      .then(response => {
        return {
          list: response.data.content,
          pages: response.data.totalPages
        }
      })
  },
  data(){
    return {
      searchObj: {},
      page: 1,
      limit: 10,

      hosname: '', //医院名称
      hostypeList: [], //医院等级集合
      districtList: [], //地区集合

      hostypeActiveIndex: 0,
      provinceActiveIndex: 0
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      dictApi.findByDictCode('Hostype').then(response => {
        this.hostypeList = []
        this.hostypeList.push({"name":"全部","value":""})


        for(var i = 0; i < response.data.length; i++){
          this.hostypeList.push(response.data[i])
        }
      })

      dictApi.findByDictCode('Beijin').then(response => {
        this.districtList = []
          this.districtList.push({"name":"全部","value":""})
          for(let i in response.data) {
            this.districtList.push(response.data[i])
          }
      })

    },

    //查询医院列表
    getList() {
      hospApi.getPageList(this.page,this.limit,this.searchObj)
        .then(response => {
          for(let i in response.data.content) {
            this.list.push(response.data.content[i])
          }
          this.page = response.data.totalPages
        })
    },

    hostypeSelect(hostype,index) {
      //准备数据
      this.list = []
      this.page = 1
      this.hostypeActiveIndex = index
      this.searchObj.hostype = hostype
      //调用查询医院列表方法
      this.getList()
    },

      //根据地区查询医院
    districtSelect(districtCode, index) {
      this.list = []
      this.page = 1
      this.provinceActiveIndex = index
      this.searchObj.districtCode = districtCode
      this.getList();
    },

        //在输入框输入值，弹出下拉框，显示相关内容
    querySearchAsync(queryString, cb) {
      this.searchObj = []
      if(queryString == '') return
      hospApi.getByHosname(queryString).then(response => {
        for (let i = 0, len = response.data.length; i <len; i++) {
          response.data[i].value = response.data[i].hosname
        }
        cb(response.data)
      })
    },

    //在下拉框选择某一个内容，执行下面方法，跳转到详情页面中
    handleSelect(item) {
      window.location.href = '/hosp/' + item.hoscode
    },

    //点击某个医院名称，跳转到详情页面中
    show(hoscode) {
      window.location.href = '/hosp/' + hoscode
    }





  }


    
}
</script>


