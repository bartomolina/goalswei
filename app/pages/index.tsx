import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
      <title>WAGMI - Home</title>
        <meta name="description" content="Art Blocks x B.M." />
      </Head>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Achieve your goals</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            Hello!!
          </div>
        </div>
      </main>
    </>
  );
}
