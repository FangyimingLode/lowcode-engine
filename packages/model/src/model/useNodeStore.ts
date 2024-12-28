import { create, StoreApi, UseBoundStore } from 'zustand';
import { ContainerSchema, NodeSchema } from '@lowcode-engine/types';
import { uniqueId } from '../utils';
import { useDesignerStore } from './useDesignerStore';
import { useEngineStore } from './useEngineStore';
import { PropValue } from '@lowcode-engine/types';
import SettingTopEntry from '../setting/SettingTopEntry';

interface NodeStore {
  props: { [key: string]: PropValue };
  extraProps: { [key: string]: PropValue };
  parent: Node | undefined;
  children: Node[];
  packageName: string;
  setProps: (prop: {[key: string]: PropValue}) => void
}

export class Node<S extends NodeSchema = NodeSchema> {
  readonly id: string;
  readonly componentName: string;
  readonly isContainer: boolean;
  readonly containerType?: ContainerSchema['containerType']; // 不
  readonly isFormControl: boolean;
  private _settingEntry: SettingTopEntry | undefined

  useStore: UseBoundStore<StoreApi<NodeStore>>;

  constructor(initSchema: S, parent: Node<S> | undefined) {
    this.id = initSchema.id || uniqueId('node'); // 不
    this.componentName = initSchema.componentName; // 不
    this.isContainer = initSchema.isContainer; // 不
    this.containerType = initSchema.containerType; // 不
    this.isFormControl = !!initSchema.isFormControl; // 不

    this.useStore = create<NodeStore>((set) => ({
      props: initSchema.props,
      extraProps: initSchema.extraProps,
      parent: parent,
      packageName: initSchema.packageName,
      children: initSchema.children.map((child) =>
        useEngineStore.getState().createNode(child)
      ),
      setProps: (prop) => {
        set(state => ({
          props: {
            ...state.props,
            prop
          }
        }))
      }
    }));
  }

  get componentSpec() {
    const { packageName } = this.useStore.getState();
    const result = useDesignerStore
      .getState()
      .componentSpecMap.get(packageName);
    if (!result) {
      throw `不存在 ${packageName}`;
    }
    return result;
  }

  get lastChild(): Node<NodeSchema> | undefined {
    return this.children[this.children.length - 1];
  }

  get childrenSize(): number {
    return this.useStore.getState().children.length;
  }

  get parent() {
    return this.useStore.getState().parent;
  }
  set parent(value) {
    this.useStore.setState({ parent: value });
  }

  get children() {
    return this.useStore.getState().children;
  }
  set children(children) {
    this.useStore.setState({ children });
  }

  get settingEntry(): SettingTopEntry {
    if(this._settingEntry) {
      return this._settingEntry
    }
    this._settingEntry = new SettingTopEntry(this)
    return this._settingEntry
  }

  export(): NodeSchema {
    return {
      id: this.id,
      componentName: this.componentName,
      packageName: this.useStore.getState().packageName,
      isContainer: this.isContainer,
      props: this.useStore.getState().props,
      extraProps: this.useStore.getState().extraProps,
      containerType: this.containerType,
      children: this.useStore
        .getState()
        .children.map((child) => child.export()),
      isFormControl: this.isFormControl,
    };
  }

  inertChildAtIndex = (node: Node, index: number) => {
    node.parent = this;
    this.children.splice(index, 0, node);
  };

  getChildAtIndex = (index: number): Node | undefined => {
    return this.children[index];
  };

  delChild = (child: Node) => {
    this.children = this.children.filter((item) => item !== child);
  };
  getProp = (propName: string, createIfNone = true) => {
    const { props, setProps } = this.useStore.getState();
    let prop = { propName: props[propName] };
    if(createIfNone ) {
      prop = {
        propName: undefined
      }
      setProps(prop)
    }
    return prop
  };
  getExtraProp = (propName: string, createIfNone = true) => {
    const { props, setProps } = this.useStore.getState();
    let prop = { propName: props[propName] };
    if(createIfNone ) {
      prop = {
        propName: undefined
      }
      setProps(prop)
    }
    return prop
  }
}
