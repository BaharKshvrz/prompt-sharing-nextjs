import Link from "next/link";

const Form = ({ type, submitting, post, setPost, handleSubmit}) => {
  return (
     <section className="w-full max-w-full flex flex-col">
       <h1 className="head_text text-left">
         <span className="blue_gradient">{type} Post</span>
       </h1>
       <p className="desc text-left max-w-md">
          {type} and share amazing post
        </p>  

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-4xl flex flex-col gap-7 glassmorphism">
          <label htmlFor="prompt">
            <span className="font-satoshi font-semibold text-base text-gray-70">
              Your API Post
            </span>
          </label>
          <textarea 
            value={post.prompt}
            onChange= {(e) => setPost({...post, prompt: e.target.value})}
            placeholder="Write your post"
            required
            className="form_textarea"
            name="prompt"
          />

           <label htmlFor="tag">
            <span className="font-satoshi font-semibold text-base text-gray-70">
              Tags <span className="font-normal">( #web, #development, ...)</span>
            </span>
          </label>
          <input 
            value={post.tag}
            onChange= {(e) => setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            className="form_input"
            name="tag"
          /> 

          <div className="flex items-center justify-center mx-3 mb-5 gap-4">
              <Link href="/" className="text-gray-500 text-sm">
                Cancel
              </Link>
              <button 
               type="submit"
               disabled={submitting}
               className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
               >
               {submitting ? `${type}ing ...`: type}
              </button>
          </div>
        </form>
     </section>
  )
};

export default Form;
