import { css } from "emotion";
import { colours, typography } from "../../../styles";

export const container = css`
  ${colours.greyLightBorder};
  border-style: solid;
  border-right-width: 1px;
  margin-right: -1px;
  flex: 1;
`;

export const list = css`
  padding-top: 0.8em;
  padding-bottom: 0.8em;
`;

export const button = css`
  ${colours.greyMidColor};
  display: block;
  padding: 0.4em 0.8em;
  text-align: center;
`;

export const buttonActive = css`
  ${colours.primaryColor};
  ${typography.sansBold};
`;

export const iconWrapper = css`
  display: flex;
  align-items: center;
  fill: ${colours.values.greyMid};
  height: 16px;
  width: 16px;
  margin-left: auto;
  margin-right: auto;
  svg {
    margin-left: auto;
    margin-right: auto;
  }
`;
export const iconWrapperActive = css`
  fill: ${colours.values.primary};
`;
