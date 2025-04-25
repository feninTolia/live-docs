import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <Button variant="secondary">Click</Button>
      <Link href="/documents/1">
        <Button variant="destructive">Document 1</Button>
      </Link>
    </main>
  );
}
