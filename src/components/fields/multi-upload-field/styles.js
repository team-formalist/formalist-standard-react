import { css } from "emotion";
import * as fields from "../field-styles";
import { colours, typography } from "../../ui/styles";

export const base = css`
  ${fields.base};
`;

export const baseInline = css`
  ${fields.baseInline};
`;

export const header = css`
  ${fields.header};
`;

export const parent = css`
  position: relative;
`;

export const listItem = css`
  ${colours.greyLightColor};
  ${typography.small};
  ${typography.sans};
  box-sizing: border-box;
  position: relative;
  width: 100%;
`;

export const previewItem = css`
  ${listItem};
  background: greyTint;
  border-radius: 0.25em;
  overflow: hidden;
  height: 40px;
`;

export const previewItem__details = css`
  padding-left: 5px;
`;

export const listItem__img = css`
  img {
    background-color: #fff;
    box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    display: inline-block;
    height: 40px;
    margin-right: 20px;
    padding: 2px;
    width: auto;
    position: relative;
    z-index: 2;
  }
  .${previewItem} & {
    img {
      height: 30px;
    }
  }
`;

export const listItem__title = css`
  ${typography.lineHeightNormal};
  overflow: hidden;
  white-space: nowrap;
  line-height: 40px;
  a {
    color: ${colours.values.highlight};
  }
`;

export const progress__title = css`
  ${listItem__title};
  color: ${colours.values.white};
`;

export const listItem__body = css``;

export const progress__bar = css`
  compose ${colours.highlightBackground}
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  transition: width 0.5s ease-in-out;
  width: 0;
  z-index: 1;
  overflow: hidden;
`;

export const validationMessages = css``;

export const validationMessage = css`
  ${typography.sans};
  ${typography.normal};
  ${colours.errorColor};
  ${colours.errorLightBackground};
  margin-bottom: 5px;
  padding: 8px 50px 8px 8px;
  position: relative;
  z-index: 1;
`;

export const remove = css`
  ${colours.primaryColor};
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition-duration: 100ms;
  transition-property: color;
  z-index: 2;
  &:focus,
  &:hover {
    color: ${colours.values.error};
  }
`;

export const removeText = css`
  display: none;
`;

export const removeX = css`
  ${typography.fallback};
  ${typography.large};
  &:hover {
    color: ${colours.values.error};
  }
`;

export const align_middle = css`
  display: table;
`;

export const align_middle__content = css`
  display: table-cell;
  vertical-align: middle;
  margin-top: -2px;
`;
