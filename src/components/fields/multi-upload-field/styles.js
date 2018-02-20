import uid from "uid";
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
  flex: 1;
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

export const listItem__body = uid(10); // Empty placeholder class

export const progress__bar = css`
  ${colours.highlightBackground};
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

export const validationMessages = uid(10); // Empty placeholder class

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
  display: flex;
  align-items: center;
`;

// Default render template

export const copyUrl = css`
  position: relative;
`;

export const copyUrlField = css`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export const copyUrlButton = css`
  position: relative;
  outline: none;
  &:active,
  &:focus {
    outline: none;
  }
`;

export const copyUrlButtonCopied = css``;

export const copyUrlButtonText = css`
  ${colours.darkBlendBackground};
  ${colours.whiteColor};
  border-radius: 0.3rem;
  padding: 5px 10px 7px;
  position: absolute;
  left: 50%;
  transform: translate(-45px, 8px);
  bottom: 100%;
  bottom: calc(100% + 10px);
  pointer-events: none;
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: 100ms;
  transition-delay: 50ms;
  width: 90px;
  &:before {
    border-color: transparent;
    border: solid transparent;
    border-top-color: ${colours.values.darkBlend};
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: -6px;
    left: 50%;
    top: 100%;
  }
  .${copyUrlButton}:hover & {
    opacity: 1;
    transform: translate(-45px, 0);
  }
`;

export const copyIconPrimary = css`
  .${copyUrlButton}:hover & {
    stroke: ${colours.values.error};
  }
  .${copyUrlButtonCopied}:hover & {
    fill: ${colours.values.error};
  }
`;

export const copyIconSecondary = css`
  .${copyUrlButton}:hover & {
    opacity: 1;
    fill: ${colours.values.error};
  }
`;
