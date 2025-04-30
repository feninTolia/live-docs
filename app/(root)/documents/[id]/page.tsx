import CollaborativeRoom from '@/components/CollaborativeRoom';
import { getDocument } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { RoomData } from '@liveblocks/node';
import { redirect } from 'next/navigation';

const DocumentPage = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  const room = (await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  })) as RoomData;

  if (!room) {
    redirect('/');
  }

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.[0].includes('room:write')
      ? 'editor'
      : 'viewer',
  }));

  console.log(
    '----- -----',
    room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]
  );

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.[0].includes('room:write')
    ? 'editor'
    : 'viewer';

  return (
    <div className="flex w-full flex-col items-center ">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata as RoomMetadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </div>
  );
};

export default DocumentPage;
