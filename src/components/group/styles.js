import { css } from 'emotion'
import { breakpoints, colours, typography } from "../ui/styles";

export const group = css``

export const label = css`
  ${typography.headerSmallCaps};
  margin-bottom: 1.8rem;
`

export const groupItems = css`
  display: flex;
  @media(${breakpoints.small}) {
    display: block;
  }
`

export const item = css`
  flex: 1;
  margin-left: 1rem;
  margin-right: 1rem;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media(${breakpoints.small}) {
    margin-left: 0;
    margin-right: 0;
  }
`