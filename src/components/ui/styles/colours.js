import { css } from 'emotion'

export const values = {
  white: "#fff",
  greyLight: "#ccc",
  greyMid: "#999",
  greyTint: "#f1f1f1",
  primary: "#333",
  error: "#eb4d5c",
  errorLight: "#fff4f5",
  highlight: "#7fc2ea",
  highlightLight: "#dff1fc",
  highlightDark: "#3980ab",
  darkBlend: "rgba(0,0,0,0.9)",
  lightBlend: "rgba(0,0,0,0.2)"
};

export const whiteColor = css`
  color: ${values.white};
`

export const whiteBackground = css`
  background-color: ${values.white};
`

export const whiteBorder = css`
  border-color: ${values.white};
`

/* Greys */

export const greyLightColor = css`
  color: ${values.greyLight};
`

export const greyLightBackground = css`
  background-color: ${values.greyLight};
`

export const greyLightBorder = css`
  border-color: ${values.greyLight};
`

export const greyMidColor = css`
  color: ${values.greyMid};
`

export const greyMidBackground = css`
  background-color: ${values.greyMid};
`

export const greyMidBorder = css`
  border-color: ${values.greyMid};
`

export const greyTintBackground = css`
  background-color: ${values.greyTint};
`

export const greyTintBorder = css`
  border-color: ${values.greyTint};
`

/* Primary */

export const primaryColor = css`
  color: ${values.primary};
`

export const primaryBackground = css`
  background-color: ${values.primary};
`

export const primaryBorder = css`
  border-color: ${values.primary};
`

/* Error */
export const errorColor = css`
  color: ${values.error};
`

export const errorBackground = css`
  background-color: ${values.error};
`

export const errorBorder = css`
  border-color: ${values.error};
`

export const errorLightBackground = css`
  background-color: ${values.errorLight};
`

/* Highlight */

export const highlightColor = css`
  color: ${values.highlight};
`

export const highlightBorder = css`
  border-color: ${values.highlight};
`

export const highlightBackground = css`
  background-color: ${values.highlight};
`

export const highlightLightColor = css`
  color: ${values.highlightLight};
`

export const highlightLightBorder = css`
  border-color: ${values.highlightLight};
`

export const highlightLightBackground = css`
  background-color: ${values.highlightLight};
`

export const highlightDarkColor = css`
  color: ${values.highlightDark};
`

export const highlightDarkBorder = css`
  border-color: ${values.highlightDark};
`

export const highlightDarkBackground = css`
  background-color: ${values.highlightDark};
`

/* Blends */

export const darkBlendBackground = css`
  background-color: ${values.darkBlend};
`

export const darkBlendColor = css`
  color: ${values.darkBlend};
`

export const lightBlendBackground = css`
  background-color: ${values.lightBlend};
`

export const lightBlendColor = css`
  color: ${values.lightBlend};
`
