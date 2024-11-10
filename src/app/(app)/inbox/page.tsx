'use client'
import LeftSlidebar from '@/components/inbox/LeftSlidebar'
import InboxRightSlidebar from '@/components/inbox/InboxRightSlidebar'
import React, { useEffect, useState } from 'react'
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { StreamChat } from 'stream-chat';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import '../../../utils/inbox.css'
import DateSpaerator from '@/components/inbox/DateSpaerator';
import CustomChannelHeader from '@/components/inbox/CustomChannelHeader';

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

const Page = () => {

  const [connected, setConnected] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>(undefined);
  const [activeChannel, setActiveChannel] = useState(null);
  const filters = { members: { $in: [client.userID!] } };
  const sort = { last_message_at: -1 };
  const {data:session} = useSession()
  const user:User = session?.user as User
  const userId=user?._id

    useEffect(()=>{
      async function fetchToken() {
        try {
          const response = await fetch('/api/v1/get-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
          });
  
          const { token } = await response.json();
          await client.connectUser(
            {
              id: userId!,
              username:user?.username,
              avatar:user?.avatar
            },
            token
          );
          console.log("USer connected",token);
          setConnected(true);
        } catch (error) {
          console.error('Error connecting to Stream Chat:', error);
        }
      }
  
      fetchToken();

      return () => {
        if (connected) {
          client.disconnectUser();
          console.log("Disconnected",userId);
        }
      };
    },[user,userId])

  return (
    <Chat client={client}>
          <section className="w-full flex gap-2">

          <ChannelList
            filters={filters}
            options={{ state: true, presence: true }}
            sort={sort}
            List={(listProps) => (
              <LeftSlidebar
                {...listProps}
              />
            )}
          />         

          <Channel
          DateSeparator={DateSpaerator}
          HeaderComponent={CustomChannelHeader}
          >
            <Window>
              <MessageList/>
              <MessageInput />
            </Window>
          </Channel>
          </section>
    </Chat>

  )
}

export default Page



// create channel 
// client.create ('messaging',id,{
//   name:'',
//   members:[],
//   data:{
//     imgUrl:,
//   }
// })