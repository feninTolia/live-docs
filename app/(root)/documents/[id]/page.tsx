'use client';
import { Editor } from '@/components/editor/Editor';
import Header from '@/components/Header';
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from '@clerk/nextjs';

type Props = {};

const DocumentPage = (props: Props) => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">Untitled 1</p>
        </div>

        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Editor />
    </div>
  );
};

export default DocumentPage;
