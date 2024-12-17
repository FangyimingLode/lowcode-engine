import type { ComponentType } from 'react';

export interface Panel {
  type: string
  name: string
  content: ComponentType
  area: 'left' | 'right' | 'top' | 'bottom'
}
