"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SubmissionState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export const NewsletterBlock = () => {
  const [email, setEmail] = useState("");
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmission({ status: "loading", message: "" });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email.includes("@")) {
      setSubmission({
        status: "success",
        message: "Thank you for subscribing! 🎉",
      });
      setEmail("");
    } else {
      setSubmission({
        status: "error",
        message: "Please enter a valid email address.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-gray-200 dark:border-gray-800 shadow-xl"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center"
        >
          <Mail className="w-6 h-6 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Stay Updated
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get the latest updates straight to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300"
            disabled={
              submission.status === "loading" || submission.status === "success"
            }
          />
        </div>

        <Button
          type="submit"
          disabled={
            submission.status === "loading" || submission.status === "success"
          }
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {submission.status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : submission.status === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {submission.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3 rounded-lg text-sm ${
              submission.status === "success"
                ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            }`}
          >
            <div className="flex items-center space-x-2">
              {submission.status === "success" ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{submission.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
