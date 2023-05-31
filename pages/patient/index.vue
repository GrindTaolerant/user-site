<template>
    <!-- header -->
    <div class="nav-container page-component">
        <!--左侧导航 #start -->
        <div class="nav left-nav">
            <div class="nav-item ">
                <span class="v-link clickable dark" onclick="javascript:window.location='/user'">User Authentication</span>
                </div>
                <div class="nav-item ">
                <span class="v-link clickable dark" onclick="javascript:window.location='/order'"> Appointment Orders </span>
                </div>
                <div class="nav-item selected">
                <span class="v-link selected dark" onclick="javascript:window.location='/patient'"> Paitent List </span>
                </div>
                <div class="nav-item ">
                <span class="v-link clickable dark"> Update Account </span>
                </div>
                <div class="nav-item ">
                <span class="v-link clickable dark"> Feedback</span>
            </div>
        </div>
        <!-- 左侧导航 #end -->
        
        <!-- 右侧内容 #start -->
        <div class="page-container">
        <div class="personal-patient">
        <div class="header-wrapper">
            <div class="title"> Patient Management</div>
        </div>
        <div class="content-wrapper">
        <el-card class="patient-card" shadow="always" v-for="item in patientList" :key="item.id">
            <div slot="header" class="clearfix">
                <div>
                    <span class="name">{{ item.name }}</span>
                    <span>{{ item.certificatesNo }} {{ item.param.certificatesTypeString == '身份证' ? 'SSN' : '医保卡' }}</span>
                    <div  class="detail" @click="show(item.id)"> Detail Info <span  class="iconfont"></span></div>
                </div>
            </div>
            <div class="card SELF_PAY_CARD">
                <div class="info">
                    <span class="type">{{ item.isInsure == 0 ? 'Self Pay' : 'Insurance'}}</span>
                    <span class="card-no">{{ item.certificatesNo }}</span>
                    <span class="card-view">{{ item.param.certificatesTypeString == '身份证' ? 'SSN' : '医保卡'}}</span>
                </div>
                <span class="operate"></span>
            </div>
            <div class="card">
                <div class="text bind-card"></div>
            </div>
        </el-card>
        <div class="item-add-wrapper v-card clickable" @click="add()">
            <div class="">
                <div>+ Add Patient</div>
            </div>
        </div>
        </div>
        </div>
    </div>
    <!-- 右侧内容 #end -->
    </div>
    <!-- footer -->
</template>
<script>
import '~/assets/css/hospital_personal.css'
import '~/assets/css/hospital.css'
import '~/assets/css/personal.css'
import patientApi from '@/api/patient'
export default {
    data() {
        return {
            patientList: []
        }
    },
    created() {
        this.findPatientList()
    },
    methods: {
        findPatientList() {
            patientApi.findList().then(response => {
                this.patientList = response.data
            })
        },
        add() {
            window.location.href = '/patient/add'
        },
        show(id) {
            window.location.href = '/patient/show?id=' + id
            }
        }
    }
</script>
<style>
  .header-wrapper .title {
    font-size: 16px;
    margin-top: 0;
  }
  .content-wrapper {
    margin-left: 0;
  }
  .patient-card .el-card__header .detail{
    font-size: 14px;
  }
</style>
