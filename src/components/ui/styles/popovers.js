import { css } from "emotion";
import * as colours from "./colours";

export const popover = css`
  ${colours.whiteBackground};
  ${colours.greyLightBorder};
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12),
    inset 0px 2px 0px 0px rgba(20, 15, 10, 0.06);
`;
