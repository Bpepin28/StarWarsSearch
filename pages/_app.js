import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
