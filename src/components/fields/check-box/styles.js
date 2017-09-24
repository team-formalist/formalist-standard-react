import { css } from 'emotion'
import * as fields from "../field-styles";

export const base = css`
  composes: ${fields.base};
`

export const baseInline = css`
  composes: ${fields.baseInline};
`

export const header = css`
  baseInline & {
    padding-top: 0;
  }
`