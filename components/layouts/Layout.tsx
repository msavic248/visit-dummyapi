//style imports
import { Inter } from '@next/font/google'

//component imports
import Nav from "../common/Nav";
import Footer from "../common/Footer";

//library imports
import Head from 'next/head';
import { ReactNode } from 'react';


const inter = Inter({ subsets: ['latin'] })

interface Props {
    children?: ReactNode
    title?: string
}

//layout to add Head, Nav and Footer to each page,
//takes in title prop with default as home, important to set title for accessibility
const Layout = ({children, title="Home - Milos Savic"}: Props) => {
  return (
    <div className={inter.className}>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Visit - Dummy API application created by Milos Savic" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <main>{children}</main>
        <Footer 
          fullName="Milos Savic"
          gitHubLink="https://github.com/msavic248"
          linkedInLink="https://www.linkedin.com/in/milos-savic-86690a211/"
        />
    </div>
  )
}

export default Layout;
