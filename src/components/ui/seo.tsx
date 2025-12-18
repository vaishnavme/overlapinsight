import { app_name } from "@/lib/constants";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  siteName?: string;
  locale?: string;
  twitterHandle?: string;
}

const SEO = (props: SEOProps) => {
  const {
    title = `${app_name} - Mutual Fund Overlap Calculator`,
    description = "Analyze mutual fund overlap and common holdings. Compare portfolios to avoid over-diversification with our free calculator tool.",
    canonical = process.env.NEXT_PUBLIC_FE_URL,
    keywords = "mutual fund overlap, portfolio overlap, fund comparison, mutual fund analyzer, investment overlap calculator, fund holdings, portfolio diversification",
    author = app_name,
    image = `${process.env.NEXT_PUBLIC_FE_URL}/og-image.jpg`,
    imageAlt = "OverlapInsight - Mutual Fund Overlap Calculator",
    type = "website",
    noIndex = false,
    noFollow = false,
    siteName = app_name,
    locale = "en_US",
  } = props;

  const robotsContent = `${noIndex ? "noindex" : "index"},${
    noFollow ? "nofollow" : "follow"
  }`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={robotsContent} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#ffb900" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={imageAlt} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content={imageAlt} />
        </>
      )}

      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default SEO;
