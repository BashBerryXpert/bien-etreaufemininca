import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary-deep text-primary-foreground mt-24">
      <div className="container-narrow py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-serif text-2xl mb-3">Bien-être au Féminin</h3>
          <p className="text-sm opacity-80 max-w-sm leading-relaxed">
            L'accompagnement bienveillant de Chantal Brisson pour les femmes du Québec qui traversent
            la ménopause et les transitions hormonales avec sérénité.
          </p>
          <p className="mt-6 text-xs opacity-60 tracking-widest uppercase">Expertise québécoise</p>
        </div>
        <div>
          <h4 className="font-serif text-base mb-4">Explorer</h4>
          <ul className="space-y-2 text-sm opacity-85">
            <li><Link to="/guides" className="hover:opacity-100 hover:underline underline-offset-4">Nos Guides</Link></li>
            <li><Link to="/a-propos" className="hover:opacity-100 hover:underline underline-offset-4">À propos de Chantal</Link></li>
            <li><Link to="/journal" className="hover:opacity-100 hover:underline underline-offset-4">Le Journal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-base mb-4">Confiance</h4>
          <ul className="space-y-2 text-sm opacity-85">
            <li>Paiement sécurisé</li>
            <li>Téléchargement instantané</li>
            <li>Support francophone</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-narrow py-5 text-xs opacity-60 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Bien-être au Féminin · Chantal</span>
          <span>Conçu avec bienveillance pour toutes les femmes</span>
        </div>
      </div>
    </footer>
  );
};
