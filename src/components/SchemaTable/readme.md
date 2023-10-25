>自定义表格说明

```typescript
interface parameter {
  currentPage: Number
  pageSize: Number
  sortField: String
  sortOrder: String
}

interface tableColumnsItemSlots {
  customRender?: String // 内容模板插槽名
  customHeader?: String // 自定义表头插槽名
}

interface tableColumnsItem {
  label: String,
  prop: String,
  width?: Number | String,
  align?: String // left | center | right
  fixed?: Boolean
  showOverflowTooltip?: Boolean
  slots?: tableColumnsItemSlots
}

interface sourceData { // 需要传入的数据格式，根据项目修改
  currentPage: Number
  total: Number
  list: any[]
}

interface props {
  rowKey: String
  columns: tableColumnsItem[]
  data: (e:parameter) => Promise<sourceData>
  rowSelection?: (selection:any) => void
  expand?: Boolean
  index?:Boolean
  autoHeight?: Boolean
  fixed?: Sting[] // | index | selection | expand
  showPagination? Boolean
  pagination?: ElPagination // ElPagination props
}
```

```html
<template>
  <SchemaTable
    :ref="setSchemaTableRef"
    autoHeight
    :fixed="['index', 'selection', 'expand']"
    index
    expand
    rowKey="id"
    :data="loadData"
    :columns="columns"
    :rowSelection="onSelectChange"
    @expand="expandHandler"
    @filter-change="onFilterChange"
    @row-click="onRowClick"
  >
    <template #actionHeader>
        <el-input placeholder="请输入关键字"></el-input>
      </template>
    <template #action="scope">
      <el-button type="primary" text @click.stop="editHandler(scope.row)" >编辑</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-popconfirm :title="`确定删除（${scope.row.name}）的信息吗？`">
        <template #reference>
          <el-button type="primary" text @click.stop="delHandler(scope.row)">删除</el-button >
        </template>
      </el-popconfirm>
    </template>
    <template #expand="scope">
      <span>{{ scope.row.name }}</span>
    </template>
  </SchemaTable>
</template>
```

```javascript
// 表格列 配置项
const columns = [
  {
    width: 50,
    label: "id",
    prop: "id",
    align: "center",
    fixed: true,
  },
  {
    width: 80,
    label: "姓名",
    prop: "name",
    align: "center",
  },
  {
    width: 80,
    label: "性别",
    prop: "gender",
    align: "center",
  },
  {
    width: 150,
    fixed: "right",
    label: "操作",
    prop: "gender",
    align: "center",
    slots: { customRender: "action", customHeader: 'actionHeader' },
  },
];
// 加载数据
const loadData = (parameter) => {
  // getTableList 返回一个 Promise 的请求结果
  return getTableList(Object.assign({}, parameter)).then((res) => {
    return {
      currentPage: res.currentPage || 1,
      total: res.total || 10,
      list: res.list || [],
    };
  });
};
```
