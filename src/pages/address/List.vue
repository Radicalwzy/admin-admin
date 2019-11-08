<template>
  <div class="address">
    <h2>地址管理</h2>
    <!-- 按钮 -->
    <div class="btns">
      <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
      <el-button type="danger" size="small" @click="batchDeleteHandler">批量删除</el-button>
    </div>
    <!-- 表单 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="addressForm" :model="form" :rules="rules">
        <el-form-item label="省" label-width="80px" prop="province">
          <el-input v-model="form.province" autocomplete="off" />
        </el-form-item>
        <el-form-item label="市" label-width="80px" prop="city">
          <el-input v-model="form.city" autocomplete="off" />
        </el-form-item>
        <el-form-item label="区" label-width="80px" prop="area">
          <el-input v-model="form.area" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" label-width="80px" prop="address">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="telephone">
          <el-input v-model="form.telephone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="顾客id" label-width="80px" prop="customerId">
          <el-input v-model="form.customerId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button type="primary" size="small" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="addresses.slice((currentPage-1)*pagesize,currentPage*pagesize)" size="small" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="province" label="省" />
      <el-table-column prop="city" label="市" />
      <el-table-column prop="area" label="区" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="telephone" label="电话" />
      <el-table-column prop="customerId" label="顾客id" />
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent="editHandler(record.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="addresses.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      ids: [],
      form: {},
      rules: {
        province: [
          { required: true, message: '请输入省', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入市', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入地区', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请输入顾客id', trigger: 'blur' }
        ]
      },
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      userList: []
    }
  },
  created() {
    this.findAllAddresses()
  },
  computed: {
    ...mapState('address', ['addresses', 'visible', 'title']),
    ...mapGetters('addresses', ['countAddresses', 'addressStatusFilter'])
    // 普通属性
  },
  methods: {
    ...mapActions('address', ['findAllAddresses', 'deleteAddressById', 'saveOrUpdateAddress', 'batchDeleteAddresses']),
    ...mapMutations('address', ['showModal', 'closeModal', 'setTitle']),
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
      this.findAllAddresses()
    },
    batchDeleteHandler() {
      this.batchDeleteAddresses(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    idsChangeHandler(val) {
      this.ids = val.map(item => item.id)
    },
    dialogCloseHandler() {
      this.$refs.addressForm.clearValidate()
    },
    toAddHandler() {
      this.form = {}
      this.setTitle('添加地址信息')
      this.showModal()
    },
    submitHandler() {
      // 表单验证
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          // 2 提交表单
          this.saveOrUpdateAddress(this.form)
            .then((response) => {
              this.$message({ type: 'success', message: response.statusText })
            })
        } else {
          return false
        }
      })
    },
    deleteHandler(id) {
      const promise = this.deleteAddressById(id)
      promise.then((response) => {
        this.$message({ type: 'success', message: response.statusText })
      })
    },
    editHandler(row) {
      this.form = row
      this.setTitle('修改地址信息')
      this.showModal()
    }
  }
}
</script>
<style scoped>

</style>
