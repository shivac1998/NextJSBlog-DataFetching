import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import shiva from "../public/images/shiva.png";

const name = "Shiva Chemburkar";
export const siteTitle = "Next.js Blog Site";

export default function Layout({ children, home }) {
  const NotHome = () => {
    if (!home) {
      return (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src={shiva}
              className={utilStyles.borderCircle}
              height={450}
              width={150}
              alt=""
            />
            <h1 className={utilStyles.heading3Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src={shiva}
                className={utilStyles.borderCircle}
                height={275}
                width={120}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
      <NotHome />
    </div>
  );
}
