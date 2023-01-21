import styles from '@/styles/Nav.module.css';
import Link from 'next/link';

export default function Nav() {


    return (
    <nav>
        <div className={styles.navbar}>
            <Link href="/">
                Home
            </Link>
            <Link href="/create">
                Create Post
            </Link>
        </div>
    </nav>
    )
}