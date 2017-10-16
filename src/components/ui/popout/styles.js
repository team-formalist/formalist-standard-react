import { css } from 'emotion'
import { colours, popovers, typography } from "../styles";

export const positioner = css`
  position: absolute;
  height: 0;
  width: 0;
  z-index: 10000;
`

export const container = css`
  ${typography.normal};
  ${typography.sans};
  ${colours.whiteBackground};
  ${popovers.popover};
  border-radius: 3px;
  position: absolute;
`

export const containerLeft = css`
  right: 0;
  top: 0;
`

export const containerRight = css`
  left: 0;
  top: 0;
`

export const containerTop = css`
  bottom: 0;
  left: 0;
  transform: translateX(-50%);
`

export const containerBottom = css`
  top: 0;
  left: 0;
  transform: translateX(-50%);
`

/**
 * Arrow is separate to avoid overflow issues
 */
export const containerArrow = css`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  &:after,
  &:before {
    border-color: transparent;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
`

export const containerArrowLeft = css`
  left: -1px;
  top: 1.2rem;
  &:before {
    border-left-color: ${colours.values.greyLight};
    border-width: 6px;
    margin-top: -1px;
  }
  &:after {
    border-left-color: ${colours.values.white};
    border-width: 5px;
  }
`

export const containerArrowRight = css`
  top: 1.2rem;
  margin-left: -9px;
  &:before {
    border-right-color: ${colours.values.greyLight};
    border-width: 6px;
    margin-left: -2px;
    margin-top: -1px;
  }
  &:after {
    border-right-color: ${colours.values.white};
    border-width: 5px;
  }
`

export const containerArrowTop = css`
  margin-top: -1px;
  left: 50%;
  top: 100%;
  &:before {
    border-top-color: ${colours.values.greyLight};
    border-width: 6px;
    margin-left: -6px;
  }
  &:after {
    border-top-color: ${colours.values.white};
    border-width: 5px;
    margin-left: -5px;
  }
`

export const containerArrowBottom = css`
  bottom: 100%;
  left: 50%;
  top: -11px;
  &:before {
    border-bottom-color: ${colours.values.greyLight};
    border-width: 6px;
    margin-left: -6px;
  }
  &:after {
    border-bottom-color: ${colours.values.white};
    border-width: 6px;
    margin-left: -6px;
    margin-top: 2px;
  }
`