"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteStartup } from "@/app/actions";
import { Trash2 } from "lucide-react";
import { showProgressToast } from "@/components/ProgressToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteStartupButton = ({ startupId }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Reset confirmation state when modal opens
  const handleOpenChange = (open) => {
    if (!isDeleting) {
      setIsOpen(open);
      if (open) setIsConfirmed(false);
    }
  };

  const handleDelete = () => {
    if (!isConfirmed) return;
    
    setIsDeleting(true);
    setIsOpen(false); // Modal foran band ho jayega
    
    showProgressToast(
      "Deleting startup...", 
      "Startup deleted successfully!", 
      "Failed to delete startup.",
      async () => {
        const result = await deleteStartup(startupId);
        if (result.status === "SUCCESS") {
          setIsDeleting(false);
          // Hard redirect to home page to avoid Next.js router 404 race condition
          window.location.href = "/";
          return result;
        } else {
          setIsDeleting(false);
          return result;
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger 
        disabled={isDeleting}
        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all text-sm disabled:opacity-50"
      >
        <Trash2 size={16} />
        {isDeleting ? "Deleting..." : "Delete"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] border-0 shadow-2xl p-6 rounded-3xl gap-0">
        <DialogHeader className="flex flex-col items-center mb-2">
          <DialogTitle className="text-2xl font-bold text-black text-center mt-2">Delete Pitch?</DialogTitle>
          <DialogDescription className="text-center text-slate-500 text-[15px] mt-2">
            This pitch will be permanently removed. You can't undo this action.
          </DialogDescription>
        </DialogHeader>
        
        <label className="flex items-start space-x-3 mt-4 mb-6 bg-red-50 p-4 rounded-xl border border-red-100 cursor-pointer hover:bg-red-100/50 transition-colors">
          <input 
            type="checkbox" 
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-5 h-5 mt-0.5 text-red-600 rounded border-red-300 focus:ring-red-500 cursor-pointer accent-red-500 shrink-0" 
          />
          <span className="text-[15px] font-medium leading-snug text-red-900 cursor-pointer select-none">
            I understand that this action is irreversible.
          </span>
        </label>

        <div className="flex gap-3 w-full">
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting} 
            className="flex-1 rounded-full border border-gray-200 hover:bg-gray-50 text-black font-semibold py-3 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className={`flex-1 rounded-full text-white font-semibold py-3 transition-all ${!isConfirmed ? 'bg-red-300 cursor-not-allowed opacity-70' : 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-200'}`}
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStartupButton;
