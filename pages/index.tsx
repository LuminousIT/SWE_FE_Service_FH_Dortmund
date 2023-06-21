import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "@roketid/windmill-react-ui";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <p>Hello, if you get here, you're not supposed to be here.</p>
      <Link href="/example/login" passHref={true}>
        <Button block className="mt-4">
          Click here to Login
        </Button>
      </Link>
    </div>
  );
};

export default Home;
