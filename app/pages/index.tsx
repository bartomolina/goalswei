import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>WAGMI - Home</title>
        <meta name="description" content="WAGMI" />
      </Head>
      <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header>
            <h1>Achieve your goals.<br />Support awesome devs.</h1>
          </header>
          <main></main>
        </div>
      </div>
    </>
  );
}
