import { useRouter } from "next/router";
import Notes from "../page"; // Adjust the path according to your directory structure

const NotePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Notes />;
};

export default NotePage;
