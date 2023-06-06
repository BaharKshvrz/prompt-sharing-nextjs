"use client";

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useEffect, useState } from 'react'

const MyProfile = () => {
  const router = useRouter();
  const [ posts, setPosts ] = useState([]);
  const { data: session } = useSession();

  // Fetch user's posts
  useEffect(() => {
     const fetchPosts = async() => {
        const response = await fetch(`api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
     }
     if(session?.user.id) fetchPosts();
  }, []);


   const handleEdit = (post) => {
       router.push(`/update-prompt?id=${post._id}`)
   }

   const handleDelete = async (post) => {
        const promptId = post._id.toString();
        const hasConfirmed = confirm("Are you sure to delete the post?");

        if (hasConfirmed) {
           try {
            const response = await fetch(`/api/prompt/${promptId}`, {
               method: 'DELETE',
            });
            
            const filterdPosts = posts.filter(post => post._id !== promptId);
            setPosts(filterdPosts);

           } catch (error) {
            console.log(error)
           }
        } else {
          console.log('hasConfirmed no:', promptId)
        }

   }
   
  return (
    <div>
     <Profile
         name={session?.user.name}
         desc="Welcome to personalized page"
         data= {posts}
         handleEdit= {handleEdit}
         handleDelete= {handleDelete}
     />
    </div>
  )
}

export default MyProfile
