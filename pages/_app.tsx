import "../styles/globals.css";
import "../assets/scss/style.scss";
import type { AppProps } from "next/app";
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import { store, persistor } from "../redux/store";
import { ClearCacheProvider } from "react-clear-cache";
import "react-multi-carousel/lib/styles.css";
import { Provider } from "react-redux";
import Layout from "../layouts/Layout";
import { ToastProvider } from "react-toast-notifications";
import { PersistGate } from 'redux-persist/integration/react'
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import * as gtag from '../lib/gtag'

require('isomorphic-fetch');

NProgress.configure({
  minimum: 0.5,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
  height: 15
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClearCacheProvider duration={5000}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <ToastProvider placement="bottom-left">
          <Layout
            headerContainerClass="container-fluid"
            headerPaddingClass="header-padding-1"
            headerTop="visible"
          > 
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
        </PersistGate>
      </Provider>
    </ClearCacheProvider>
  );
}

export default MyApp;
