import StringSetter from './setter/StringSetter';
import BooleanSetter from './setter/BooleanSetter';
import NumberSetter from './setter/NumberSetter';
import SelectSetter from './setter/SelectSetter';
import TextAreaSetter from './setter/TextAreaSetter';
import TextSetter from './setter/TextSetter';
import JsonSetter from './setter/JsonSetter';
import LifeCyclesPanelPlugin from './plugin/LifeCycle';
import InterceptorsPlugin from './plugin/Interceptor';
import ComponentsPanePlugin from './plugin/ComponentsPannel';
import SchemaPanePlugin from './plugin/SchemaPane';

export const defaultSetter  = [
  StringSetter,
  BooleanSetter,
  NumberSetter,
  SelectSetter,
  TextAreaSetter,
  TextSetter,
  JsonSetter
]

export const defaultPlugin = [
  LifeCyclesPanelPlugin,
  InterceptorsPlugin,
  ComponentsPanePlugin,
  SchemaPanePlugin,
]
