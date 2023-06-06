"use client";

import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'

const UpdatePrompt = () => {
 const {data: sesstion} = useSession();  
 const router = useRouter();
 const searchParam = useSearchParams();
 const promptId = searchParam.get('id');
 
 const [ submitting, setSubmitting ] = useState(false);
 const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
 });


{/* Fetch current post */}
useEffect(() => {
   const fetchPrompt = async() => {
       const response =  await fetch(`/api/prompt/${promptId}`);
       const data = await response.json();
       setPost({prompt: data.prompt, tag: data.tag});
   }
   fetchPrompt();
}, []);


{/* Update current post */}
const updatePrompt = async(e) => {
  e.preventDefault();

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          id: post._id,
        })
      })

    if (response.ok) {
        router.push('/');
    }   
    } catch (error) {
      console.log(error);
    }
}

  return (
     <Form
        type="Edit"
        submitting={submitting}
        post={post}
        setPost={setPost}
        handleSubmit={updatePrompt}
     />
  )
}

export default UpdatePrompt
