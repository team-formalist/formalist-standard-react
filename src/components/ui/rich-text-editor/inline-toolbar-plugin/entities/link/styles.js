import { css } from "emotion";
import { buttons, colours, typography } from "../../../../styles";

export const displayWrapper = css`
  display: flex;
`;

export const handlerUrl = css`
  ${typography.mono};
  ${colours.primaryColor};
  max-width: 25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  &:hover {
    color: ${colours.values.error};
    text-decoration: underline;
  }
`;

export const field = css`
  display: flex;
  align-items: center;
  min-width: 35rem;
  margin-bottom: 0.5rem;
`;

export const fieldCheckbox = css`
  margin-left: 4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const label = css`
  ${typography.small};
  text-align: right;
  padding-right: 1rem;
  width: 4rem;
`;

export const actions = css`
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
  margin-left: 4rem;
`;

export const saveButton = css`
  ${buttons.small};
  ${buttons.buttonHighlight};
`;

export const editButton = css`
  ${colours.highlightColor};
  margin-left: 1.2rem;
  margin-right: 0.8rem;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${colours.values.error};
  }
`;

export const removeButton = css`
  visibility: inherit;
`;

export const removeText = css`
  display: none;
`;

export const removeX = css`
  ${colours.errorColor};
  ${typography.fallback};
  ${typography.large};
  display: inline-block;
  line-height: 1rem;
  &:hover {
    color: ${colours.values.primary};
  }
`;
