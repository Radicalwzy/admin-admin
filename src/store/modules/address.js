import request from '@/utils/request'
import { post, post_array } from '@/utils/request'
export default {
  namespaced: true,
  state: {
    visible: false,
    addresses: [],
    title: '添加地址信息'
  },
  getters: {
    countAddresses: (state) => {
      return state.addresses.length
    },
    // 需要为获取器传递参数的写法
    addressStatusFilter: (state) => {
      return function(status) {
        if (status) {
          return state.addresses.filter(item => item.status === status)
        } else {
          return state.addresses
        }
      }
    }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    // 需要接受一个参数，这个参数就是addresses
    refreshAddresses(state, addresses) {
      state.addresses = addresses
    },
    setTitle(state, title) {
      state.title = title
    }
  },
  actions: {
    async batchDeleteAddresses(context, ids) {
      const response = await post_array('/address/batchDelete', { ids })
      context.dispatch('findAllAddresses')
      return response
    },
    async findAllAddresses(context) {
      // 查询所有顾客信息
      const response = await request.get('address/findAll')
      // 将顾客信息设置到state。addresses中
      context.commit('refreshAddresses', response.data)
    },
    async deleteAddressById({ dispatch }, id) {
      // 删除顾客信息
      const response = await request.get('/address/deleteById?id=' + id)
      // 刷新
      dispatch('findAllAddresses')
      // 提示成功
      return response
    },
    async saveOrUpdateAddress({ dispatch, commit }, address) {
      // 提交请求
      const response = await post('/address/saveOrUpdate', address)
      // 关闭模态框
      commit('closeModal')
      // 刷新页面
      dispatch('findAllAddresses')
      // 提示成功
      return response
    }
  }
}
