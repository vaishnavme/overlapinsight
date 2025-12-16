import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Analyze mutual fund overlap and common holdings between schemes. Compare fund portfolios and avoid over-diversification with our free overlap calculator tool."
        />
        <meta
          name="keywords"
          content="mutual fund overlap, portfolio analysis, fund comparison, investment diversification, stock overlap calculator"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mutual Fund Overlap Calculator" />
        <meta
          property="og:description"
          content="Compare mutual fund portfolios and find common holdings to make better investment decisions."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_FE_URL} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
