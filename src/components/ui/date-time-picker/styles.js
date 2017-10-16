import { css } from 'emotion'
import { breakpoints } from "../styles";

export const base = css`
  display: flex;
  @media(${breakpoints.small}) {
    display: block;
  }
`

export const datePicker = css`
  flex: 1;
  margin-right: 1rem;
  @media(${breakpoints.small}) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`

export const timePicker = css`
  flex: 1;
  margin-left: 1rem;
  @media(${breakpoints.small}) {
    margin-left: 0;
    margin-right: 0;
  }
`