export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-6 text-black">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        <p className="text-sm">&copy; {currentYear} SideQuest. All rights reserved.</p>
        <ul className="mt-4 flex space-x-4 md:mt-0">
          <li>
            <a href="/privacy-policy" className="text-sm hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-sm hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="text-sm hover:underline">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
