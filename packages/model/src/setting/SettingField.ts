import type SettingTopEntry from './SettingTopEntry';
import { FieldConfig, PropValue } from '@lowcode-engine/types';
import { isJsRunFunction, transformStringToFunction, uniqueId } from '../utils';
export default class SettingField {
  owner: SettingTopEntry
  readonly config: FieldConfig
  fields: SettingField[] = []
  readonly id: string


  constructor(owner: SettingTopEntry, config: FieldConfig) {
    this.owner = owner
    this.config = config
    this.id = uniqueId('settingField')
    if(this.config.fields?.length) {
      this.fields = this.config.fields.map(item => {
        return new SettingField(this.owner, item)
      })
    }
  }
  private  get isGroup(){
    return this.config.type ==='group'
  }
  get title(){
    return this.config.title
  }
  get name(){
    return this.config.name
  }
  get parentName(){
    return this.config.parentName
  }
  get setters(){
    return this.config.setters
  }
  private get isExtra(){
    return !this.isGroup && this.config.isExtra === true
  }
  private get PropKey(){
    const name = this.parentName ? this.parentName : this.name
    const subName = this.parentName ? this.name : undefined
    return { name, subName }
  }
  getValue = () => {
    let value: PropValue| undefined
    const {name, subName} = this.PropKey
    if(!this.isExtra) {
      value = this.owner.getProp(name)
      if(typeof value === 'object') {
        value = this.getSubValue(subName,value)
      }
    } else {
      value = this.owner.getExtraProp(name)
      if(typeof value === 'object') {
        value = this.getSubValue(subName,value)
      }
    }

    if(isJsRunFunction(value)) {
      const temp = transformStringToFunction(value.value)
      return temp(this.owner.owner)
    } else {
      return value
    }
  }
  getSubValue = (subName: string | undefined, value: PropValue) => {
    if(!subName) {
      return value
    } else {
      if(isComplexProp(value)) {
        return (value as any)[subName]
      } else {
        console.error(`不存在 subName 字段`)
        return ''
      }
    }
  }
}
function isComplexProp(prop: any): boolean {
  return prop.value && typeof prop.value === 'object'
}
