import T from 'element-plus/lib/components/table/index'
import { cloneDeep, debounce } from 'lodash-es'
import { h, resolveComponent, defineComponent } from 'vue'
import Empty from '../Empty/index.vue'

export default defineComponent({
  name: 'SchemaTable',
  emits: ['current-change'],
  components: { Empty },
  data() {
    return {
      selectedRows: [],
      localLoading: false,
      localData: [],
      localPagination: Object.assign(
        {},
        {
          currentPage: 1,
          pageSize: 20,
          total: 0,
          layout: 'total,sizes,prev,pager,next',
          pageSizes: [10, 20, 50, 100],
          background: true,
          hideOnSinglePage: false // 仅有一页时是否隐藏分页
        },
        this.pagination
      ),
      sorter: {},
      currentSelectRow: null,
      autoScrollHeight: '400px' // table 滚动高度
    }
  },
  props: Object.assign({}, T.props, {
    // 渲染循环索引
    rowKey: {
      type: [String, Function],
      required: true
    },
    // 数据
    data: {
      type: Function,
      required: true
    },
    // 表格配置
    columns: {
      type: Array,
      default: () => []
    },
    // 选中的
    selectedArr: {
      type: Array,
      default: () => []
    },
    // 选中事件
    rowSelection: {
      type: Function
    },
    // 自定义CLASS
    cellClassName: {
      type: Function
    },
    // 判断checkbox是否禁用
    selectable: {
      type: Function
    },
    // 展开行
    expand: {
      type: Boolean,
      default: false
    },
    // 序号
    index: {
      type: Boolean,
      default: false
    },
    // 序号label
    indexLabel: {
      type: String,
      default: '序号'
    },
    // 序号label
    customClass: {
      type: String,
      default: ''
    },
    // 自动设置最大高度
    autoHeight: {
      type: Boolean,
      default: false
    },
    // 高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    /**
     * 列固定 可选参数
     * [index | selection | expand]
     */
    fixed: {
      type: Array,
      default: () => []
    },
    // 显示分页
    showPagination: {
      type: Boolean,
      default: true
    },
    // 显示最末行，提示没有数据
    showAppend: {
      type: Boolean,
      default: false
    },
    // 自动请求数据
    auto: {
      type: Boolean,
      default: true
    },
    // 分页配置
    pagination: {
      type: Object,
      default: () => {
      }
    },
    // 是否带边框
    border: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function
    }
  }),
  computed: {
    paginationStyle() {
      return `box-sizing:border-box; width:100%; padding:10px 0 0 10px; display:flex; flex-direction:
      ${this.pagination?.position === 'left' ? 'row' : 'row-reverse'};`
    }
  },
  watch: {
    localLoading() {
      // if (newVal) {
      // 	if (TableLoadingInstance) return
      // 	this.$nextTick(() => {
      // 		TableLoadingInstance = ElLoading.service({
      // 			target: '.el-table__body-wrapper',
      // 			background: 'rgba(230,247,255,0.4)'
      // 		})
      // 	})
      // } else {
      // 	this.$nextTick(() => {
      // 		// 以服务的方式调用的 Loading 需要异步关闭
      // 		TableLoadingInstance.close()
      // 		TableLoadingInstance = null
      // 	})
      // }
    }
  },
  created() {
    if (this.auto) {
      this.loadData()
    }
  },
  activated() {
    if (this.autoHeight) this.getTableScrollHeight()
  },
  mounted() {
    if (this.autoHeight) {
      this.getTableScrollHeight()
      window.addEventListener('resize', this.getTableScrollHeight)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.getTableScrollHeight)
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
      (this.localPagination = Object.assign({}, this.localPagination, {
        currentPage: 1,
        size: this.pagination?.pageSize || this.localPagination?.pageSize || 20
      }))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter = {}) {
      this.localLoading = true
      if (!sorter.prop && this.sorter.prop) {
        sorter = this.sorter
      }
      const parameter = Object.assign(
        {
          current:
            this.localPagination.currentPage || (pagination && pagination.currentPage),
          size:
            this.localPagination.pageSize || (pagination && pagination.size)
        },
        (sorter && sorter.prop && { orders: sorter.prop }) || {},
        (sorter && sorter.order && { orderBy: sorter.order === 'ascending' ? 'asc' : 'desc' }) || {},
        { ...filters }
      )
      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.page, r.total, r.list
      // eslint-disable-next-line
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result.then(r => {
          this.localPagination = Object.assign({}, this.localPagination, {
            currentPage: parameter.current, // 返回结果中的当前分页数
            total: this.showPagination ? r?.pageVO?.total : 0, // 返回结果中的总记录数
            size:
              (pagination && pagination.size) ||
              this.localPagination.pageSize
          })
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (
            r.data &&
            r.data.length === 0 &&
            this.showPagination &&
            this.localPagination.currentPage > 1
          ) {
            this.localPagination.currentPage--
            this.loadData()
            return
          }
          this.localData = r.rows || r.data || [] // 返回结果中的数组数据
          this.$nextTick(() => {
            this.selectedRows = this.selectedArr
            this.initRowSelection(this.selectedRows)
            // this.$refs['ElTableRef'].setCurrentRow()
          })
          this.localLoading = false
        }).finally(() => {
          this.localLoading = false
        })
      }
    },
    // 清除选中状态
    clearSelection() {
      this.$refs['ElTableRef'].clearSelection()
    },
    // 切换行选中状态
    toggleRowSelection(rowItem, flag = null) {
      this.$refs['ElTableRef'].toggleRowSelection(rowItem, flag)
    },
    // 初始化选中数据
    initRowSelection(selectRows) {
      const selectRowsKeys = selectRows.map(item => item[this.rowKey])
      this.localData.forEach(item =>
        this.toggleRowSelection(item, selectRowsKeys.includes(item[this.rowKey]))
      )
    },
    // 分页 页码改变
    paginationCurrentChange(current) {
      this.localPagination.currentPage = current
      this.loadData()
    },
    // 分页 size 改变
    paginationSizeChange(size) {
      this.localPagination.pageSize = size
      this.loadData()
    },
    // 设置当前选中
    setCurrentRow(row) {
      this.$refs['ElTableRef'].setCurrentRow(row)
    },
    // 获取table高度
    getTableScrollHeight: debounce(
      function() {
        this.$nextTick(() => {
          const windowClintHeight = document.documentElement.clientHeight
          const tableRect = document
            .querySelector('.el-table')
            ?.getBoundingClientRect()
          const footerRect = document
            .querySelector('.el-dialog-footer')
            ?.getBoundingClientRect()

          if (!tableRect) return
          const pageBottomPadding = 44 // 写在页面中表格去掉底部留空
          // 52 是 分页器高度
          this.autoScrollHeight = `${
            windowClintHeight - tableRect.top - (footerRect ? footerRect.height : 0) - 52 - pageBottomPadding
          }px`
        })
      },
      600,
      { leading: true }
    ),
    // 获取table columns
    getTableColumns(item) {
      if (item.condition === false) {
        return null
      }
      if (Array.isArray(item.children) && item.children.length) {
        const attrs = {
          sortOrders: ['descending', 'ascending', null]
        }
        Object.keys(item).forEach(key => {
          if (key === 'children' || key === 'prop') return
          attrs[key] = item[key]
        })
        return (
          <el-table-column {...attrs}>
            {item.children.map(son => this.getTableColumns(son))}
          </el-table-column>
        )
      } else {
        Object.assign(item, { sortOrders: ['descending', 'ascending', null] })
        if (item.slots) {
          const TableColumn = resolveComponent('ElTableColumn')
          const slotsTemp = {}
          if (item.slots.customRender) {
            slotsTemp['default'] = e => {
              return (
                this.$slots[item.slots.customRender] &&
                this.$slots[item.slots.customRender](e)
              )
            }
            // slots['default'] = props => {
            //   return (
            //     this.$slots[item.slots.customRender]?.(props)
            //   )
            // }
          }
          if (item.slots.customHeader) {
            slotsTemp['header'] = props => {
              return (
                this.$slots[item.slots.customHeader] &&
                this.$slots[item.slots.customHeader](props)
              )
            }
          }
          return h(TableColumn, { ...item }, slotsTemp)
        } else {
          return <el-table-column {...item}></el-table-column>
        }
      }
    }
  },
  render() {
    const props = {}
    const localKeys = Object.keys(this.$data)
    // 合并localProps到Table的props中
    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })

    // 初始化local配置
    const localColumns = cloneDeep(this.columns)
    // 添加索引序号
    if (this.index) {
      localColumns.unshift({
        type: 'index',
        width: 80,
        align: 'center',
        label: this.indexLabel,
        fixed: this.fixed.includes('index')
      })
    }
    // 添加选择项
    if (typeof this.rowSelection === 'function') {
      localColumns.unshift({
        type: 'selection',
        'reserve-selection': true,
        width: '50',
        align: 'center',
        fixed: this.fixed.includes('selection'),
        selectable: typeof this.selectable === 'function' ? this.selectable : null
      })
    }
    // 添加展开项
    if (this.expand) {
      localColumns.unshift({
        fixed: this.fixed.includes('expand'),
        type: 'expand',
        width: '50',
        slots: { customRender: 'expand' }
      })
    }

    // 表格Columns
    const tableColumns = localColumns.map(item => this.getTableColumns(item)).filter(item => item)
    const slots = {
      empty: () => <Empty desc={'暂无数据'}></Empty>,
    }
    if (this.showAppend) {
      slots['append'] = () => <div class="txt-center color-sub pt10 pb10">没有更多数据～</div>
    }
    // 表格
    const table = (
      <el-table
        style="width: 100%;"
        height="100%"
        ref="ElTableRef"
        size='small'
        class={[this.customClass]}
        {...props}
        v-loading={this.localLoading}
        v-slots={slots}
        onExpandChange={(expandedRows, expanded) => {
          // 展开行
          this.$emit('expand', expandedRows, expanded)
        }}
        onSelectionChange={selection => {
          // 选中变化
          if (typeof this.rowSelection === 'function') {
            this.rowSelection(selection)
          }
        }}
        onSortChange={sortProp => {
          // 排序

          this.sorter = sortProp
          this.loadData(null, {}, sortProp)
        }}
        onFilterChange={filters => {
          // 筛选
          this.$emit('filterChange', filters)
        }}
        onRowDblclick={(row, column, event) => {
          // 行双击
          this.$emit('row-dblclick', row, column, event)
        }}
        onRowClick={(row, column, event) => {
          // 行 点击
          this.$emit('row-click', row, column, event)
        }}
        onRowContextmenu={(row, column, event) => {
          // 行 右击
          this.$emit('row-contextmenu', row, column, event)
        }}
        onCellClick={(row, column, event) => {
          // 单元格 点击
          if (column.type === 'selection') {
            this.$refs['ElTableRef'].toggleRowSelection(row)
          }
          this.$emit('cell-click', row, column, event)
        }}
        onCellDblclick={(row, column, event) => {
          // 单元格双击
          this.$emit('cell-dblclick', row, column, event)
        }}
        onCellContextmenu={(row, column, event) => {
          // 单元格 右击
          this.$emit('cell-contextmenu', row, column, event)
        }}
        onCurrentChange={row => {
          this.currentSelectRow = row
          this.$emit('current-change', row)
        }}
      >
        {tableColumns}
      </el-table>
    )

    // 分页
    const pagination = (
      <el-pagination
        small
        {...this.localPagination}
        onCurrentChange={current => {
          this.paginationCurrentChange(current)
        }}
        onSizeChange={size => {
          this.paginationSizeChange(size)
        }}
      ></el-pagination>
    )
    return (
      <>
        {table}
        {this.showPagination && (
          <div style={this.paginationStyle}>{pagination}</div>
        )}
      </>
    )
  }
})
