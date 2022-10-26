import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileForm from "../../components/profile/ProfileForm";

const ProfilePage = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<Session | null>(session);

  useEffect(() => {
    if (!userSession) {
      getSession().then((session) => {
        console.log("ses: ", session);
        if (!session) {
          router.push("/login");
        } else {
          setUserSession(session);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }, [router, userSession]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <ProfileForm session={userSession} />;
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};