import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-16 py-1">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()}  Weather Monitoring App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
