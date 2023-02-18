import {useSession, signIn, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
// import {connectToDatabase} from "../../util/mongodb";

export default async function Component() {
  const router = useRouter();
  const {data: session} = useSession();
  console.log(session);

  // const {db} = await connectToDatabase();
  // let response = await db.collection("accounts").findOne({account: account});
  // console.log(response);

  // if (session && session.admin) {
  //   router.push("/admin");
  // }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
