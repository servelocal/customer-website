import Button from '@/components/Button';
import Link from 'next/link';
import styles from './page.module.scss';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import ActivitiesCard from '@/components/ActivitiesCard';

export default async function PlaygroundPage() {
  return (
    <main>
      <h1>Play with your components</h1>
      <div className={styles.buttonsContainer}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>

        <Link href="/notFoundExmple">
          <Button>Not Found</Button>
        </Link>

        <Button icon={<FaArrowLeftLong />} iconPosition="left">
          Icon Left
        </Button>
        <Button icon={<FaArrowRightLong />} iconPosition="right">
          Icon Right
        </Button>

        <Button
          className={styles.button}
          icon={<IoClose />}
          ariaLabel="close"
        ></Button>

        <div className={styles.serviceList}>
          <h2>Activites card list</h2>

          <ActivitiesCard />
        </div>
      </div>
    </main>
  );
}
