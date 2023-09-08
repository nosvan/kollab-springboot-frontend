import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { store } from 'state/redux/store';
import { Provider } from 'react-redux';

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<AppProps>;
  pageProps: AppProps;
}) {
  return (
    <>
      <Head>
        <title>kollab</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
