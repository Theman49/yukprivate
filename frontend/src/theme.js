import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      400: "#8EE4D9", //hover
      500: "#69D3CF", //base
      700: "#4CB0B5", //pressed
    },
    bgcyan: "#E3FCF2",
    black: "#121010",
    gray: "#667085",
  },
  fonts: {
    body: "Plus Jakarta Sans",
    heading: "Plus Jakarta Sans",
  },
  components: {
    Heading: {
      color: "black",
    },
    Text: {
      color: "black",
    },
  },
  breakpoints: {
    sm: "425px"
  }
});
