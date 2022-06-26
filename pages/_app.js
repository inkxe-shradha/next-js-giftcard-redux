import * as React from "react";
import PropTypes from "prop-types";
import "../styles/globals.scss";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme/theme";
import createEmotionCache from "../theme/createEmotionCache";
import { wrapper, store } from "../stores/store";
import { Provider } from "react-redux";
import Layout from "../components/layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/authentication/AuthWrapper";
import { getSession } from "next-auth/react";
import App from "next/app";
// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={props.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="description" content="Gift cards for your friends" />
          <meta
            name="keywords"
            content="gift cards, gift, cards, gift card, giftcards, giftcard, gift cards for friends"
          />
          <meta name="author" content="Gift Cards" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, 
                consistent, and simple baseline to
                build upon. */}

          <CssBaseline />
          <Provider store={store}>
            <AuthWrapper
              session={props.session ? props.session : { user: null }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthWrapper>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

// Set up
MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  const session = await getSession(context);

  return {
    ...appProps,
    session,
  };
};

export default wrapper.withRedux(MyApp);
