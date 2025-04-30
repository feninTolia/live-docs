'use client';
import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';
import {
  ResolveMentionSuggestionsArgs,
  ResolveUsersArgs,
} from '@liveblocks/client';
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from '@liveblocks/react/suspense';
import { ReactNode, useCallback } from 'react';

const resolveUsers = async ({ userIds }: ResolveUsersArgs) =>
  getClerkUsers({ userIds });

const Providers = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  const resolveMentionSuggestions = useCallback(
    async ({ text, roomId }: ResolveMentionSuggestionsArgs) =>
      getDocumentUsers({
        roomId,
        text,
        currentUserId: clerkUser?.emailAddresses[0].emailAddress,
      }),
    [clerkUser?.emailAddresses]
  );

  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Providers;
