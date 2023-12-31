import { signIn, signOut, useSession } from "next-auth/react";
import { Quicksand } from "next/font/google";
import Head from "next/head";
import { api } from "~/utils/api";
import { enqueueSnackbar } from "notistack";

export const quicksand = Quicksand({
  subsets: ["latin"],
});
export default function Home() {
  const user = useSession()
  console.log(user);
  
  return (
    <>
      <Head>
        <title>Clear</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
      </div>
    </>
  );
}
