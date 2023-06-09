"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [ copied, setCopied ] = useState("");

  const handleCopy = () => {
     setCopied(post.prompt);
     // copy text into clipboard
     navigator.clipboard.writeText(post.prompt);
     setTimeout(() => setCopied(""), 3000);
  }
 
  return (
    <div className="prompt_card">
      <div className="flex flex-col items-start gap-5">
       <div className="flex justify-between items-start gap-5">
          <Image
            src={ post.creator.image }
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
             <h3 className="font-satoshi font-semibold text-gray-900">
              { post.creator.username}
              </h3>
             <p className="font-inter text-sm text-gray-500"> 
               { post.creator.email }
              </p>
          </div>

         <div className="copy_btn">
           { <Image 
                 src= { copied === post.prompt 
                        ? "/assets/icons/tick.svg" 
                        : "/assets/icons/copy.svg"
                      }
                 alt= { copied === post.prompt 
                        ? "tick icon"
                        : 'copy icon'
                      }
                 width={15}
                 height={15}
                 onClick={ handleCopy }
                 />
           }
         </div>
       </div>
       <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
       <p
          className='font-inter text-sm blue_gradient cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
        {post.tag}
      </p>
       </div>

       { session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
            <p 
               className="font-inter text-sm green_gradient cursor-pointer"
               onClick={() => handleEdit(post)}
            >
               Edit
           </p>
           <p 
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDelete(post)}
           >
              Delete
           </p>
          </div>
        )
       }
    </div>
  )
};

export default PromptCard;
