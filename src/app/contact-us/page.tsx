import React from "react";
import { generateSEO } from "@/config/seo/seo.utils";

export const metadata = {
  ...generateSEO({ title: "Contact", path: "/contact-us" }),
  // This local route is still a placeholder; the footer links to the studio.
  robots: { index: false, follow: true },
};

const ContactUs: React.FC = () => {
  return <div>ContactUs</div>;
};

export default ContactUs;
