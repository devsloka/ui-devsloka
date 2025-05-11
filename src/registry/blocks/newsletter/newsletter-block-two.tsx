"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface SubscriptionState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export function NewsletterBlockTwo() {
  const [email, setEmail] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscription({ status: "loading", message: "" });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email.includes("@")) {
      setSubscription({
        status: "success",
        message: "Thank you for subscribing! Check your email to confirm.",
      });
      setEmail("");
    } else {
      setSubscription({
        status: "error",
        message: "Please enter a valid email address.",
      });
    }
  };

  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute h-[800px] w-[800px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              viewport={{ once: true }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
            >
              <Mail className="h-10 w-10 text-primary" />
            </motion.div>
            <h2 className="text-base font-semibold leading-7 text-primary">
              Newsletter
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              Stay in the loop
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get the latest updates, news, and exclusive offers delivered
              directly to your inbox.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="mt-12"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-lg blur-lg transition duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              />
              <div className="relative flex items-center overflow-hidden rounded-lg border bg-background/80 backdrop-blur-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={subscription.status === "loading"}
                />
                <button
                  type="submit"
                  disabled={subscription.status === "loading"}
                  className="group relative overflow-hidden px-6 py-4 transition-colors hover:bg-primary/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-medium">Subscribe</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                  />
                </button>
              </div>
            </div>

            {/* Subscription Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: subscription.status !== "idle" ? 1 : 0,
                y: subscription.status !== "idle" ? 0 : 10,
              }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              {subscription.status === "loading" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full"
                />
              )}
              {subscription.status === "success" && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-green-500">
                    {subscription.message}
                  </span>
                </>
              )}
              {subscription.status === "error" && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-red-500">
                    {subscription.message}
                  </span>
                </>
              )}
            </motion.div>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center gap-4 text-sm text-muted-foreground"
          >
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No spam, unsubscribe at any time
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Join 10,000+ subscribers
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Weekly newsletter with exclusive content
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
