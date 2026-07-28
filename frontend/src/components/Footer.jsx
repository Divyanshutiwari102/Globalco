import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CareerHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;