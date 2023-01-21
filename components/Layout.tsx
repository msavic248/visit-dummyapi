import Head from 'next/head';
import { ReactNode } from 'react';
import { Inter } from '@next/font/google'
import Nav from "./Nav";

const inter = Inter({ subsets: ['latin'] })

interface Props {
    // any props that come into the component
    children?: ReactNode
    title?: string
}

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
    </div>
  )
}

export default Layout;
