'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react';
import ActiveCollaborators from './ActiveCollaborators';
import { Editor } from './editor/Editor';
import Header from './Header';
import Loader from './Loader';
import { UserSection } from './UserSection';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">Untitled 1</p>
            </div>
            <div className="flex w-full  flex-1 justify-end items-center gap-2 sm:gap-3">
              <ActiveCollaborators />
              <UserSection />
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
