export interface JSFunction {
  type: 'JSFunction',
  // 字符串形式的函数
  value: string
}


export interface JSDataSource  {
  type: 'DataSource',
  value: DataSource
}


// 它在设置面板中会运行得到函数的结果
export interface JSRunFunction  {
  type: 'JSRunFunction',
  // 字符串形式的函数
  value: string
}

export type PropValue = string | number | JSFunction | undefined | JSDataSource | JSRunFunction | object
