import { css } from 'emotion'

export const fonts = {
  families: {
    sans: `'Work Sans', 'Helvetica', sans-serif`,
    mono: `'Inconsolata', monospace`,
    fallback: `'Helvetica', sans-serif`
  },
  weights: {
    sansBold: "700"
  },
  sizes: {
    xSmall: "1.1rem",
    small: "1.3rem",
    normal: "1.4rem",
    large: "1.8rem",
    xLarge: "2rem"
  }
}

export const sans = css`
  font-family: ${fonts.families.sans};
`

export const sansBold = css`
  ${sans};
  font-weight: ${fonts.weights.sansBold};
`

/**
 * Monospace: Inconsolata
 */

export const mono = css`
  font-family: ${fonts.families.mono};
`

/**
 * Monospace: Inconsolata
 */

export const fallback = css`
  font-family: ${fonts.families.fallback};
`

/* Line height */

export const lineHeightNormal = css`
  line-height: 1.3;
`

/* Sizes */
export const xsmall = css`
  font-size: ${fonts.sizes.xSmall};
`

export const small = css`
  font-size: ${fonts.sizes.small};
`

export const normal = css`
  font-size: ${fonts.sizes.normal};
`

export const large = css`
  font-size: ${fonts.sizes.large};
`

export const xlarge = css`
  font-size: ${fonts.sizes.xLarge};
`

/* Misc */
export const uppercase = css`
  text-transform: uppercase;
`

/* Headers */

export const headerSmallCaps = css`
  ${sansBold};
  ${xsmall};
  ${uppercase};
  letter-spacing: 0.12em
`