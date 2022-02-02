import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../lib/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://embed.tawk.to/61ed3eecb9e4e21181bb6ab1/1fq3brjn5"
            id="ChatTalk"
            async
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
