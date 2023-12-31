> 配置化表单

```typescript

interface formItemOptions {
  label: String
  value: String | Number
  children?: formItemOptions[]
}

interface formItem {
  field: String
  type:
    | 'input'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'input-number'
    | 'switch'
    | 'cascader'
    | 'date-picker'
    | 'time-picker'
    | 'time-select'
    | VNode,
  props?: ElFormItem
  attr?: any // type对应组件的props属性及事件
  layout?: ElCol
  options?: formItemOptions[] // 选项的数据列表
}

interface formSchema: formItem[]

interface fields {
  [key: string]: any
}

// Element-plus form rules
interface rules extends ElFormRules
```

```javascript
import { createVNode } from "vue";
import UploadFile from "@/components/UploadFile/UploadFile.vue";

export const getFormSchema = () => [
  {
    field: "name",
    type: "input",
    props: { label: "姓名" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
  },
  {
    field: "gender",
    type: "select",
    props: { label: "性别" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    options: [
      { label: "女", value: 0, customLabel: "0-女" },
      { label: "男", value: 1 },
    ],
  },
  {
    field: "age",
    type: "input",
    props: { label: "年龄" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      controlsPosition: "right",
      placeholder: "请输入",
    },
  },
  {
    field: "height",
    type: "input-number",
    props: { label: "身高" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      controlsPosition: "right",
      placeholder: "请输入",
    },
  },
  {
    field: "birthday",
    type: "date-picker",
    props: { label: "出生日期" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      type: "daterange",
      format: "YYYY-MM-DD HH:mm",
      valueFormat: "YYYY-MM-DD HH:mm",
      placeholder: "请选择",
    },
  },
  {
    field: "eatDinnerTime",
    type: "time-picker",
    props: { label: "用餐时间" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      isRange: true,
      format: "HH:mm",
      valueFormat: "HH:mm",
      placeholder: "请选择",
    },
  },
  {
    field: "workingTime",
    type: "time-select",
    props: { label: "上班时间" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      start: "07:00",
      end: "13:00",
      step: "00:30",
      placeholder: "请选择时间",
    },
  },
  {
    field: "single",
    type: "switch",
    props: { label: "是否单身" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      activeText: "是",
      inactiveText: "否",
    },
  },
  {
    field: "loveHistory",
    type: "radio",
    props: { label: "有无恋爱经验" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    options: [
      { label: "无", value: 0 },
      { label: "有", value: 1 },
    ],
  },
  {
    field: "occupation",
    type: "checkbox",
    props: { label: "主要经济来源" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    options: [
      { label: "工作", value: 0 },
      { label: "其他", value: 1 },
    ],
  },
  {
    field: "like",
    type: "cascader",
    props: { label: "兴趣爱好" },
    layout: { xs: 24, sm: 12, md: 8, xl: 6 },
    attr: {
      showAllLevels: false,
      clearable: true,
      collapseTags: true,
      props: {
        expandTrigger: "hover",
        emitPath: false,
        multiple: true,
      },
    },
    options: [
      {
        label: "声乐",
        value: "1",
        children: [
          {
            value: "1-1",
            label: "乐器",
            children: [
              { label: "吉他", value: "1-1-1" },
              { label: "钢琴", value: "1-1-2" },
            ],
          },
          {
            value: "1-2",
            label: "舞蹈",
            children: [
              { label: "宅舞", value: "1-2-1" },
              { label: "民族舞", value: "1-2-2" },
            ],
          },
        ],
      },
      {
        label: "表演",
        value: "2",
        children: [
          {
            value: "2-1",
            label: "话剧",
            children: [
              { label: "抒情", value: "2-1-1" },
              { label: "历史", value: "2-1-2" },
            ],
          },
          {
            value: "1-2",
            label: "电影",
            children: [
              { label: "武打", value: "2-2-1" },
              { label: "现代", value: "2-2-2" },
            ],
          },
        ],
      },
    ],
  },
  {
    field: "desc",
    type: "textarea",
    props: { label: "简介" },
    layout: { span: 24 },
    attr: {
      maxLength: 30,
      placeholder: "请输入内容",
    },
  },
  {
    field: "selfFile",
    type: createVNode(UploadFile, { listType: "text", multiple: true }),
    props: { label: "本人生活照" },
    layout: { span: 24 },
  },
];
```
