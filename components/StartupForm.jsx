'use client';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { createStartUp } from '@/app/actions';
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { showProgressToast } from './ProgressToast';

const StartupForm = () => {
  const [errors, setErrors] = useState({});
  const [pitch, setPitch] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    
    showProgressToast(
      "Submitting your startup...",
      "Startup submitted successfully!",
      "Failed to submit startup",
      async () => {
        const result = await createStartUp({ error: {}, status: "INITIAL" }, formData);
        
        if (result.status === "SUCCESS") {
          setIsPending(false);
          router.push(`/startup/${result._id}`);
          return result;
        } else if (result.status === "ERROR") {
          setIsPending(false);
          if (typeof result.error === 'object') {
            setErrors(result.error);
          }
          // Ensure we return a string error message to the toast
          return { 
            ...result, 
            error: typeof result.error === 'object' 
              ? (result.error.general || "Please check the form for errors.") 
              : result.error 
          };
        }
        return result;
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className='startup-form'>
        <div>
          <label htmlFor="title" className='startup-form_label'>Title</label>
          <Input id='title' placeholder="Startup Title" name='title' required className='startup-form_input'/>
          {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className='startup-form_label'>Description</label>
          <Textarea id='description' placeholder="Startup Description" name='description' required className='startup-form_textarea'/>
          {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className='startup-form_label'>Category</label>
          <Input id='category' placeholder="Startup Category (Tech, Health, Education...)" name='category' required className='startup-form_input'/>
          {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="link" className='startup-form_label'>Image URL</label>
          <Input id='link' type="url" placeholder="Startup Image URL" name='link' required className='startup-form_input'/>
          {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
          
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: 'hidden' }}
            textareaProps={{
              placeholder: 'Briefly describe your idea and what problem it solves',
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          <input type="hidden" name="pitch" value={pitch} />
          {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>

        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
    </form>
  )
}

export default StartupForm