"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const faqs = [
    {
      question: "How do I get started with your platform?",
      answer:
        "Getting started is easy! Simply sign up for an account, choose your plan, and follow our quick setup guide. You'll be up and running in minutes.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Yes, you can change your plan at any time. When you upgrade, you'll be charged the prorated difference. When you downgrade, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial on all our plans. No credit card is required to start your trial.",
    },
    {
      question: "How does billing work?",
      answer:
        "We offer both monthly and annual billing options. Annual plans come with a 20% discount. You can pay using all major credit cards or PayPal.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide email support for all customers. Pro and Enterprise plans also include priority support with faster response times. Enterprise customers get access to phone support and a dedicated account manager.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll still have access to your plan until the end of your current billing period.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background" ref={ref}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              FAQs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Find answers to common questions about our platform, pricing, and
              features.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={itemVariants}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <Button>
            Contact Support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
