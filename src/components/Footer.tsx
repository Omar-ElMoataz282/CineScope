function Footer() {
  return (
    <footer className="border-t border-gray-400">
      <div className="py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} CineScope. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
