import {useRouter} from "next/router";
import {useEffect} from "react";

const WebPanel = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/menus");
  }, []);
  return <div></div>;
};
export default WebPanel;
