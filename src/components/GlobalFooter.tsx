import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Product",
    links: [
      { text: "Pricing", href: "/pricing" },
      { text: "About", href: "/about" }, // Added About link
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "#" }, // Placeholder link
      { text: "X/Twitter", href: "#" }, // Placeholder link
    ],
  },
  {
    title: "Support",
    links: [
      { text: "Contact Us", href: "/contact" }, // New link
      { text: "Help & Support", href: "/support" }, // Existing link
      { text: "Report a Bug", href: "/report-bug" }, // Existing link
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms of Service", href: "#" }, // Placeholder link
      { text: "Privacy Policy", href: "#" }, // Placeholder link
    ],
  },
];

export const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 pt-12 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="text-xs hover:text-brand-hover transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-gray-900 text-center space-y-2">
          <p className="text-[10px] sm:text-xs text-gray-500">
            StackBuzz © 2025 StackBuzz. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600 max-w-3xl mx-auto">
            Built with ❤️ for creators. StackBuzz is an independent third-party
            analytics tool and is not affiliated with, endorsed by, or sponsored
            by Substack, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};