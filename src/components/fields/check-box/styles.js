import { css } from 'emotion'
import * as shared from "../shared-styles";
import { colours, typography } from "../../ui/styles";

export const base = css`
  composes: ${shared.base};
`

export const baseInline = css`
  composes: ${shared.baseInline};
`

export const header = css`
  baseInline & {
    padding-top: 0;
  }
`