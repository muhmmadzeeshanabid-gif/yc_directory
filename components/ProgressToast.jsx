"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

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
      
      // small delay to show 100% bar before swapping UI to success
      setTimeout(() => {
        if (!isMounted) return;
        if (result && result.status === "ERROR") {
          setStatus("error");
          setErrorText(result.error || errorMessage);
          setTimeout(() => toast.dismiss(t), 4000);
        } else {
          setStatus("success");
          setTimeout(() => toast.dismiss(t), 3000);
        }
      }, 300);
    }).catch((error) => {
      if (!isMounted) return;
      clearInterval(progressInterval);
      setProgress(100);
      setStatus("error");
      setErrorText("An unexpected error occurred");
      setTimeout(() => toast.dismiss(t), 4000);
    });
    } // Close the if(!hasRunRef.current) block

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run ONLY once on mount

  // Notice the single unified card container so it's technically the exact same card visually
  return (
    <div className="w-[356px] max-w-[90vw] bg-white border border-gray-100 shadow-xl rounded-2xl p-4 flex flex-col gap-3 pointer-events-auto">
      {status === "success" && (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <CheckCircle2 className="text-green-500 size-5" />
          </div>
          <span className="text-[15px] font-semibold text-gray-900">{successMessage}</span>
        </div>
      )}
      
      {status === "error" && (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <XCircle className="text-red-500 size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] font-bold text-red-600">Failed!</span>
            <p className="text-sm text-red-500/80">{errorText}</p>
          </div>
        </div>
      )}

      {status === "loading" && (
        <>
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin size-5 text-black shrink-0" />
            <span className="text-[15px] font-semibold text-gray-900">{message}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-black transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
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
  ), { duration: Infinity }); // Infinity so it doesn't close while loading
};
