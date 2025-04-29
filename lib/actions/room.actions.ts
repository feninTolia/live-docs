'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from '../liveblocks';
import { RoomAccesses } from '@liveblocks/node';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled Document',
    };

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      //TODO: this should be set to the default access for all users
      defaultAccesses: ['room:write'],
    });

    revalidatePath('/');

    return parseStringify(room);
  } catch (error) {
    console.log('Error creating document:', error);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    //TODO: this should be enabled when we have a way to check if the user is logged in
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error('You do not have access to this document');
    // }

    return parseStringify(room);
  } catch (error) {
    console.log('Error getting document:', error);
  }
};

export const updateDocument = async ({
  roomId,
  title,
}: {
  roomId: string;
  title: string;
}) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log('Error updating document:', error);
  }
};
