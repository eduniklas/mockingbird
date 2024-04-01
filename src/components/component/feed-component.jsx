"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { database } from '@/lib/firebase';
import { InputTweetComponent } from "./input-tweet-component";


export function FeedComponent() {
  const [data, setData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  
  useEffect(()  => {
    // async function GetTweets() {
    //   const tweets = await fetchTweetsAndUserData();
    //   setData(tweets)
    // }
    // GetTweets()
    async function fetchTweetsAndUserData() {
      const tweetsRef = query(ref(database, 'tweets'), orderByChild('createdAt'));
      
      onValue(tweetsRef, (snapshot) => {
        const tweets = snapshot.val();
        
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
          const users = snapshot.val();
    
          const combinedData = Object.keys(tweets).map((key) => {
            const tweet = tweets[key];
            const user = users[tweet.userId];
            return {
              ...tweet,
              user
            };
          });
          combinedData.reverse()
          setData(combinedData)
        });
      });
    }
    fetchTweetsAndUserData();
  },[])
  
  const HandleComment = () => {
    
  }

  const HandleRetweet = () => {
    setIsRetweeted(!isRetweeted)
  }
  
  const HandleLike = () => {
    setIsLiked(!isLiked)
  }

  if(!data){
    return <h2 className="flex flex-col items-center p-10">Loading...</h2>
  }

  return (
    <div>
      <InputTweetComponent/>
      <main className="flex flex-col min-h-screen items-center justify-between ">
        <section className="flex flex-col border-x border-gray-800 items-center px-4 sm:px-6">
          {data?.map((key, id) =>
            <div key={id} className="flex items-start flex-col">
               <div >
                <div className="flex items-start space-x-2 p-2 m-2">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="64"
                    src={key?.user?.avatar}
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover",
                    }}
                    width="64"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h1 className="font-bold text-xl">{key?.user?.full_name}</h1>
                      <p className="text-gray-500">@{key?.user?.username}</p>
                    </div>
                    <p className="text-gray-500 line-clamp-7 mb-3 ms-1 dark:text-white whitespace-pre-wrap w-96">
                      {key?.content}<br/>
                      {/* {key.metadata.mentions}<br/>{key.metadata.hashtags} */}
                    </p>
                    {key.added_image != null &&
                      <img
                      alt="Image"
                      className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                      height={250}
                      src={key?.added_image}
                      width={384}
                      />
                    }
                    <div className="flex items-center gap-1 mt-1">
                      <Button onClick={HandleComment} variant={"link"}><MessageSquareIcon className="w-6 h-6" /></Button>
                      <Button onClick={HandleRetweet} variant={"link"}><RetweetIcon isRetweeted={isRetweeted} className="w-6 h-6" /></Button>
                      <Button onClick={HandleLike} variant={"link"}><HeartIcon isLiked={key?.metadata?.liked_by?.userId.includes("u123456")} className="w-6 h-6" /></Button>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{key?.metadata?.favorite_count}</span>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}


function HeartIcon(isLiked) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isLiked.isLiked ? 'red' : 'none'}
      stroke={isLiked.isLiked ? 'red' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function MessageSquareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}


function ArrowUpCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  )
}

function RetweetIcon(isRetweeted) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 576 512"
      fill={isRetweeted.isRetweeted ? 'green' : '#fafafa'}
      stroke={isRetweeted.isRetweeted ? 'red' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7
          0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3
          0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 
          96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6
          19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9
          6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"
      />
    </svg>
  )
}