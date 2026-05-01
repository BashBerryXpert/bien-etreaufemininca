import { Link, useLocation } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/guides", label: "Nos Guides" },
  { to: "/a-propos", label: "À propos" },
  { to: "/journal", label: "Le Journal" },
];

export const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-narrow flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl tracking-tight text-primary-deep">Bien-être au Féminin</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">par Chantal · Naturopathe & Herboriste</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm tracking-wide transition-smooth hover:text-primary",
                location.pathname === l.to ? "text-primary font-medium" : "text-foreground/80"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <CartDrawer />
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container-narrow py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-base py-2 text-foreground/90">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
