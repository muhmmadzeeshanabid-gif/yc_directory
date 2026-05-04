"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";

const ProgressToastUI = ({ t, message, successMessage, errorMessage, actionFn }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [errorText, setErrorText] = useState("");
  const hasRunRef = React.useRef(false);

  useEffect(() => {
    let isMounted = true;
    
    // Start fake progress up to 90% immediately
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) return 90;
        return p + 2; // fill up fast initially
      });
    }, 50);

    // Run action immediately so it's super fast, but only ONCE
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      actionFn().then((result) => {
        if (!isMounted) return;
        clearInterval(progressInterval);
        setProgress(100); // instantly fill the bar
        
        setTimeout(() => {
          if (!isMounted) return;
          if (result && result.status === "ERROR") {
            setStatus("error");
            // If the error object has a generic general message, use that, otherwise use the specific string, otherwise fallback.
            let errStr = errorMessage;
            if (typeof result.error === 'string') {
              errStr = result.error;
            } else if (result.error && typeof result.error === 'object') {
              errStr = Object.values(result.error).join(", ") || result.error.general || errorMessage;
            }
            setErrorText(errStr);
            // We do NOT automatically close the error toast, so the user can read it.
          } else {
            setStatus("success");
            // Successfully done, close after 3 seconds
            setTimeout(() => toast.dismiss(t), 3000);
          }
        }, 100);
      }).catch((error) => {
        if (!isMounted) return;
        clearInterval(progressInterval);
        setProgress(100);
        setStatus("error");
        setErrorText("An unexpected error occurred");
      });
    } // Close the if(!hasRunRef.current) block

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run ONLY once on mount

  return (
    <div className="w-[356px] max-w-[90vw] bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden relative pointer-events-auto flex flex-col">
      
      {/* Top Loading Line */}
      <div className="h-[4px] w-full bg-gray-100 shrink-0">
        <div 
          className={`h-full transition-all duration-75 ease-linear ${
            status === "success" ? "bg-green-500" : 
            status === "error" ? "bg-red-500" : 
            "bg-primary-500"
          }`}
          style={{ width: status === "error" ? "100%" : `${progress}%` }}
        />
      </div>

      <div className="p-4 flex flex-col relative">
        {/* Close Button (Only for errors so user can close it manually) */}
        {status === "error" && (
          <button 
            onClick={() => toast.dismiss(t)} 
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="size-4 text-gray-400" />
          </button>
        )}

        <div className="flex items-start gap-3">
          {/* Icon Area - Fixed size to prevent layout jumping */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            status === "success" ? "bg-green-50" : 
            status === "error" ? "bg-red-50" : 
            "bg-gray-50"
          }`}>
            {status === "loading" && <Loader2 className="animate-spin text-black size-5" />}
            {status === "success" && <CheckCircle2 className="text-green-500 size-5" />}
            {status === "error" && <XCircle className="text-red-500 size-5" />}
          </div>
          
          {/* Text Area */}
          <div className="flex flex-col pt-1 pr-4">
            <span className={`text-[15px] font-semibold ${
              status === "error" ? "text-red-600" : "text-gray-900"
            }`}>
              {status === "loading" && message}
              {status === "success" && successMessage}
              {status === "error" && "Action Failed"}
            </span>
            
            {status === "error" && (
              <p className="text-sm text-red-500 mt-1 leading-snug">
                {errorText}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const showProgressToast = (message, successMessage, errorMessage, actionFn) => {
  toast.custom((t) => (
    <ProgressToastUI 
      t={t}
      message={message}
      successMessage={successMessage}
      errorMessage={errorMessage}
      actionFn={actionFn}
    />
  ), { duration: Infinity }); // Infinity so it doesn't close while loading or showing error
};
