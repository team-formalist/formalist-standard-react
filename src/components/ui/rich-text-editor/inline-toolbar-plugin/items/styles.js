import { css } from "emotion";
import { colours, typography } from "../../../styles";

export const list = css`
  display: flex;
  padding-left: 0.4em;
  padding-right: 0.4em;
`;

export const button = css`
  ${colours.greyMidColor};
  display: block;
  padding: 0.8em 0.4em;
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
  font-weight: normal;
`;
