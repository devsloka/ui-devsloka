"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative mb-4 overflow-hidden rounded-2xl border-2 border-transparent",
        isOpen
          ? "bg-primary/5 dark:bg-primary/10"
          : "bg-background/80 dark:bg-background/20",
        "transition-all duration-300 ease-in-out hover:border-primary/30"
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_60%)]" />

      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-6 w-6 items-center justify-center text-primary"
          >
            <ChevronRight size={18} />
          </motion.div>
          <h3 className="text-lg font-medium text-foreground">{question}</h3>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pl-[3.75rem] text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
    </div>
  );
};

export function FAQBlockTwo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "What makes your platform different from competitors?",
      answer:
        "Our platform stands out with its intuitive design, powerful automation capabilities, and industry-leading security measures. We've built our solution based on a decade of customer feedback, resulting in features that directly address real-world challenges. Additionally, our dedicated support team and comprehensive documentation ensure you're never left without assistance.",
    },
    {
      question: "Do you offer custom solutions for enterprise clients?",
      answer:
        "Yes, we provide tailored enterprise solutions designed to meet the specific needs of large organizations. Our enterprise package includes dedicated account management, custom integration development, advanced security features, and personalized training sessions. We work closely with your team to ensure our platform aligns perfectly with your business processes and objectives.",
    },
    {
      question: "How often do you release new features?",
      answer:
        "We follow a continuous improvement model with major feature releases every quarter. Our development roadmap is heavily influenced by customer feedback, and we prioritize updates that deliver the most value. All customers receive early access to beta features, and enterprise clients can request specific enhancements to support their unique requirements.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer multi-tiered support options to meet different needs. All plans include 24/7 email support and access to our extensive knowledge base. Premium plans add priority response times, dedicated support channels, and regular check-in calls. Enterprise clients receive a dedicated support team familiar with their specific implementation.",
    },
    {
      question: "Can I integrate your platform with my existing tools?",
      answer:
        "Absolutely. Our platform offers native integrations with over 100 popular business tools across categories like CRM, marketing, analytics, and project management. For specialized needs, our robust API and webhook system allow for custom integrations. Our documentation includes detailed guides for common integration scenarios, and our support team is available to assist with complex setups.",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-16">
      <BackgroundGradient />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Support Center
          </p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Questions & Answers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto max-w-2xl text-center text-muted-foreground"
        >
          Browse through our frequently asked questions to find quick answers to
          common inquiries about our platform and services.
        </motion.p>
      </motion.div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground">
          Still have questions? We&apos;re here to help.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
        >
          Contact Support
        </motion.button>
      </motion.div>
    </div>
  );
}
