'use client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ActiveCollaborators from './ActiveCollaborators';
import { Editor } from './editor/Editor';
import Header from './Header';
import Loader from './Loader';
import { Input } from './ui/input';
import { UserSection } from './UserSection';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  currentUserType,
  users,
}: CollaborativeRoomProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = async (title: string) => {
    try {
      setLoading(true);

      if (title === roomMetadata.title) {
        setEditing(false);
        return;
      }

      const updatedDocument = await updateDocument({
        roomId,
        title: title.trim(),
      });

      if (updatedDocument) {
        setDocumentTitle(updatedDocument.metadata.title);
        setEditing(false);
      }
    } catch (error) {
      console.log('Error updating title:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTitleHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    updateTitle(documentTitle);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        updateTitle(documentTitle);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [documentTitle]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  className="document-title-input"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                />
              ) : (
                <p className="document-title">{documentTitle}</p>
              )}
              {currentUserType === 'editor' && !editing && (
                <Image
                  src={'/assets/icons/edit.svg'}
                  alt="edit"
                  height={24}
                  width={24}
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">saving...</p>}
            </div>
            <div className="flex w-full  flex-1 justify-end items-center gap-2 sm:gap-3">
              <ActiveCollaborators />
              <UserSection />
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
