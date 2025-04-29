import AddDocumentBtn from '@/components/AddComponentBtn';
import Header from '@/components/Header';
import { UserSection } from '@/components/UserSection';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const Home = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/sign-in');
  }

  const documents = [];

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <span>Notifications</span>
          <Suspense fallback={null}>
            <UserSection />
          </Suspense>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div>p</div>
      ) : (
        <div className="document-list-empty">
          <Image
            src={'/assets/icons/doc.svg'}
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
            priority
          />
          <Suspense fallback={<div>Loading...</div>}>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </Suspense>
        </div>
      )}
    </main>
  );
};

export default Home;
