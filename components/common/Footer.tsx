//styles imports
import styles from './Footer.module.css';

//library imports
import Link from 'next/link';
import Image from 'next/image';


interface Props {
    fullName: string
    gitHubLink: string
    linkedInLink: string
}

export default function Footer({fullName, gitHubLink, linkedInLink}: Props) {

    return (
        <footer>
            <div className={styles.footer}>
                <small>Created by {fullName}</small>
                <ul>
                    <Link href={gitHubLink} target="_blank">
                        <Image 
                            src="/github-mark.png"
                            alt="GitHub logo"
                            width={32}
                            height={32}
                        />
                        GitHub
                    </Link>
                    <Link href={linkedInLink} target="_blank">
                        <Image 
                            src="/linkedInLogo.png"
                            alt="LinkedIn logo"
                            width={32}
                            height={32}
                        />
                        LinkedIn
                    </Link>
                </ul>
            </div>
        </footer>
    )
}