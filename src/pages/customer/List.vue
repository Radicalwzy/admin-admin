<template>
  <div class="customer">
    
    <el-row>
      <!-- 搜索 -->
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="customer.realname"
            size="small"
            style="display: inline-block;width: 20%;"
            clearable>
          </el-input>
          <el-button @click="toSearch" size="small" type="primary">搜索</el-button>
        </div>
      </el-col>
      
    </el-row>
		
		<!-- 表格 -->
		<div>
      <el-table :data="customers.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        
        <el-table-column label="操作">
          <template #default="record">
              <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
		</div>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="customers.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>

import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  data(){
    return {
      currentPage:1, //初始页
      pagesize:2,    //    每页的数据
      value: 'true',
      searchInput:"",
      // 
      customer:{},
      ids:[],
      // 校验规则
      rules:{
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      userList: []
    }
  },
  computed:{
    ...mapState("customer",["customers"]),
    ...mapGetters("customer",["orderCustomer","customerSize"])
  },
  created(){
    this.findAllCustomers();
  },
  methods:{
    ...mapActions("customer",["findAllCustomers"]),
    // 普通方法
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleUserList() {
      this.findAllWaiters()
    },
    //跳转
    toDetailsHandler(customer){
      //跳转到详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path:"/customer/details",
        query:{id:customer.id, customer}
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    },
    toSearch() {
      this.findAllCustomers()
    },
  }

}
</script>
<style scoped>

</style>