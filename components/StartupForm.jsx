'use client';
import React, { useActionState, useState, useEffect } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { createStartUp } from '@/app/actions';
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const StartupForm = () => {
  const [state, formAction, isPending] = useActionState(createStartUp, { error: {}, status: "INITIAL" });
  const [pitch, setPitch] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (state.status === "SUCCESS") {
      toast.success("Startup submitted successfully!");
      router.push(`/startup/${state._id}`);
    } else if (state.status === "ERROR") {
      const errorMsg = typeof state.error === 'object' 
        ? state.error.general || "Please check the form for errors."
        : state.error || "An error occurred while submitting.";
      toast.error(errorMsg);
    }
  }, [state, router]);

  return (
    <form action={formAction} className='startup-form'>
        <div>
          <label htmlFor="title" className='startup-form_label'>Title</label>
          <Input id='title' placeholder="Startup Title" name='title' required className='startup-form_input'/>
          {state?.error?.title && <p className='startup-form_error'>{state.error.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className='startup-form_label'>Description</label>
          <Textarea id='description' placeholder="Startup Description" name='description' required className='startup-form_textarea'/>
          {state?.error?.description && <p className='startup-form_error'>{state.error.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className='startup-form_label'>Category</label>
          <Input id='category' placeholder="Startup Category (Tech, Health, Education...)" name='category' required className='startup-form_input'/>
          {state?.error?.category && <p className='startup-form_error'>{state.error.category}</p>}
        </div>

        <div>
          <label htmlFor="link" className='startup-form_label'>Image URL</label>
          <Input id='link' type="url" placeholder="Startup Image URL" name='link' required className='startup-form_input'/>
          {state?.error?.link && <p className='startup-form_error'>{state.error.link}</p>}
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
          {state?.error?.pitch && <p className='startup-form_error'>{state.error.pitch}</p>}
        </div>

        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
    </form>
  )
}

export default StartupForm