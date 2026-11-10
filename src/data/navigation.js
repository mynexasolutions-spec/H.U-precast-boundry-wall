export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/products", hasMenu: true },
  { label: "Applications", href: "/applications" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const quickLinks = navLinks.map(({ label, href }) => ({ label, href }));
