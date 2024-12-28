import type { FC } from 'react';
import {css} from '@emotion/react'

interface Props {
  text: string
}
export const EmptyComponent: FC<Props> = (props) => {
  return (
    <div
      css={css`
        color: #999;
        text-align: center;
        padding: 20px 0;
      `}
    >
      {props.text}
    </div>
  )
}
