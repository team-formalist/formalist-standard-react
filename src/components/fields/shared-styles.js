import { css } from 'emotion'

export const base = css`
  margin-bottom: 1.6em;
`

export const baseInline = css`
  display: flex;
`

export const header = css`
  baseInline & {
    flex: 1;
    padding-top: 1rem;
    padding-right: 1rem;
    text-align: right;
  }
`

export const display = css`
  baseInline & {
    flex: 2;
  }
`
