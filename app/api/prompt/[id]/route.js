import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// READ
export const GET = async (request, {params}) => {
   try {
     await connectToDB();
     const prompt = await Prompt.findById(params.id).populate('creator');

     if (!prompt) {
        return new Response('Post not found!', { status: 404 });
     }
     return new Response(JSON.stringify(prompt), { status: 200 });

   } catch (error) {
     return new Response('Failed to get prompt.');
   }
}

// PATCH
export const PATCH = async(request, {params}) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response('Post not found!', { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save();

        return new Response('Successfully updated the Post!', { status: 200})
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
}

// DELETE
export const DELETE = async(request, {params}) => {
  try {
   await connectToDB();

   // Find the prompt by ID and remove it
   await Prompt.findByIdAndRemove(params.id);
   return new Response('Successfully deleted the Post!', { status: 200})
  } catch (error) {
     return new Response("Error Deleting Prompt", { status: 500 });
  }
}