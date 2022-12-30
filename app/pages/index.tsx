import Head from "next/head";
import Image from "next/image";
import weightsPic from "../public/weights.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>WAGMI - Home</title>
        <meta name="description" content="WAGMI" />
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <header className="pt-20">
            <h1 className="text-7xl text-white">
              <span className="inline-block bg-black p-4">Just</span>
              <br />
              <span className="inline-block bg-black p-4">F*cking</span>
              <br />
              <span className="inline-block bg-black p-4">Do</span>
              <br />
              <span className="inline-block bg-black p-4">It.</span>
            </h1>
          </header>
          <main></main>
        </div>
      </div>
    </>
  );
}
