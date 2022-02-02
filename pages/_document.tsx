import Document, { Html, Head, Main, NextScript } from "next/document";
import { useAmp } from "next/amp";

import { GA_TRACKING_ID } from "../lib/gtag";
import AmpAnalytics from "../components/amp/AmpAnalytics";

function AmpWrap({ ampOnly, nonAmp }: any) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

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
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* AMP - Google Analytics */}
          <AmpWrap
            ampOnly={
              <AmpAnalytics
                type="googleanalytics"
                script={{
                  vars: {
                    account: GA_TRACKING_ID,
                    gtag_id: GA_TRACKING_ID,
                    config: {
                      [GA_TRACKING_ID]: { groups: "default" },
                    },
                  },
                  triggers: {
                    trackPageview: {
                      on: "visible",
                      request: "pageview",
                    },
                  },
                }}
              />
            }
          />

          {/* Non-AMP - Google Analytics */}
          <AmpWrap
            nonAmp={
              <>
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
                      gtag('config', '${GA_TRACKING_ID}');
                    `,
                  }}
                />
              </>
            }
          />
        </body>
      </Html>
    );
  }
}
