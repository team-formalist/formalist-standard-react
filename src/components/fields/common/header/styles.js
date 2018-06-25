import { css } from "emotion";
import { colours, typography } from "../../../ui/styles";

export const base = css`
  margin-bottom: 1rem;
`;

export const label = css`
  cursor: pointer;
  margin-right: 1rem;
`;

export const hint = css`
  ${colours.greyLightColor};
  ${typography.small};
  ${typography.sans};
`;

export const error = css`
  ${colours.errorColor};
`;
