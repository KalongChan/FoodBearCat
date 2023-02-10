import Layout from "../components/Layout/Layout";
import {store} from "../store/store";
import {Provider} from "react-redux";

import "../styles/globals.css";

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
