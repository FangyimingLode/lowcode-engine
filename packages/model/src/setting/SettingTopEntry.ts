import type { Node } from '../model/useNodeStore';
import { create } from 'zustand';
import SettingField from './SettingField';
import type { StoreApi, UseBoundStore } from 'zustand/index';

interface SettingStore {
  fields: SettingField[],
  setField: (settingField: SettingField) => void
}
export default  class SettingTopEntry {
  owner: Node
  useStore: UseBoundStore<StoreApi<SettingStore>>;
  constructor(owner: Node) {
    this.owner = owner
    this.useStore = create<SettingStore>()((set, get) => ({
      fields: [],
      setField: (settingField: SettingField) => {
        set(state => ({
          fields: [ ...state.fields, settingField]
        }))
      }
    }))
    this.setupFields()
  }
  private setupFields() {
    this.owner.componentSpec.configure.forEach(config => {
      // this.useStore.setState({fields:})
      const settingField = new SettingField(this, config)
      const { fields }  = this.useStore.getState()
      fields.push(settingField)

    })
  }

  getProp = (propName: string) => {
    return this.owner.getProp(propName)
  }

  getExtraProp = (propName: string) => {
    return this.owner.getExtraProp(propName)
  }

}
