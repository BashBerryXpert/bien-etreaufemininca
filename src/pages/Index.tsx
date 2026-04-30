import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartSync } from "@/hooks/useCartSync";
import heroImage from "@/assets/hero-woman.jpg";
import portrait from "@/assets/chantal-portrait.jpg";
import texture from "@/assets/texture-herbs.jpg";
import { ArrowRight, Sparkles, HeartPulse, Sun, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const struggles = [
  {
    icon: HeartPulse,
    title: "Fatigue persistante",
    desc: "Retrouvez votre énergie grâce à une approche nutritionnelle adaptée à votre nouvelle physiologie.",
  },
  {
    icon: Sun,
    title: "Bouffées de chaleur",
    desc: "Apaisez naturellement les variations hormonales avec des gestes simples du quotidien.",
  },
  {
    icon: Sparkles,
    title: "Humeur et sommeil",
    desc: "Stabilisez vos émotions et redécouvrez des nuits réparatrices, en douceur.",
  },
];

const Index = () => {
  useCartSync();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Bien-être au Féminin | Ménopause sereine au Québec";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Guides et programmes de Chantal Brisson pour traverser la ménopause avec sérénité. Approche naturelle, bienveillante, expertise québécoise.");
    fetchProducts(12).then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Merci !", { description: "Votre checklist arrive dans votre boîte courriel.", position: "top-center" });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <div className="space-y-7">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-medium">Pour les femmes du Québec · 45–65 ans</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance text-primary-deep">
              Retrouvez l'équilibre hormonal,<br />
              <em className="italic font-normal">naturellement.</em>
            </h1>
            <p className="text-lg text-foreground/75 max-w-md leading-relaxed">
              Une approche éducative, accessible et profondément rassurante pour traverser la ménopause
              avec confiance, énergie et sérénité.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/guides">Découvrir les Solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link to="/a-propos">Rencontrer Chantal</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Téléchargement immédiat · Paiement sécurisé · Support en français</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-sm blur-2xl" aria-hidden />
            <img
              src={heroImage}
              alt="Femme sereine bénéficiant d'un moment de bien-être à la lumière naturelle"
              width={1536}
              height={1024}
              className="relative rounded-sm shadow-elegant w-full h-[500px] md:h-[580px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM/SOLUTION */}
      <section className="py-24 container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Vous reconnaître</span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3 text-primary-deep text-balance">
            Vos défis ne sont pas une fatalité.
          </h2>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            La méthode bienveillante de Chantal Brisson s'adresse aux signaux que votre corps vous envoie.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {struggles.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-sm p-8 shadow-card-soft hover:shadow-elegant transition-smooth">
              <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center mb-5">
                <Icon className="h-5 w-5 text-primary-deep" />
              </div>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-warm">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-primary">Nos guides phares</span>
              <h2 className="font-serif text-3xl md:text-4xl mt-3 text-primary-deep">Des solutions concrètes</h2>
            </div>
            <Link to="/guides" className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1">
              Voir tous nos guides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[0, 1].map((i) => (
                <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-sm" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground">No products found</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {products.slice(0, 2).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-24 container-narrow">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={portrait}
              alt="Portrait de Chantal Brisson, mentor en bien-être féminin"
              loading="lazy"
              width={1024}
              height={1280}
              className="rounded-sm shadow-elegant w-full max-w-md mx-auto h-[560px] object-cover"
            />
            <div className="absolute -bottom-5 -right-2 md:right-12 bg-card px-5 py-3 rounded-sm shadow-soft text-xs tracking-widest uppercase">
              <span className="text-primary">15+ ans</span> d'accompagnement
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Votre mentor</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary-deep text-balance">
              Chantal Brisson — une approche bienveillante, jamais culpabilisante.
            </h2>
            <Quote className="h-7 w-7 text-accent" />
            <p className="text-lg text-foreground/80 leading-relaxed italic font-serif">
              « Mon engagement : vous offrir une information claire, validée et profondément humaine.
              Vous méritez de vivre cette transition non pas comme une perte, mais comme une renaissance. »
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/a-propos">Découvrir mon parcours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER LEAD MAGNET */}
      <section className="py-20 relative overflow-hidden">
        <img src={texture} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-warm opacity-90" />
        <div className="container-narrow relative">
          <div className="bg-card rounded-sm p-10 md:p-14 shadow-elegant max-w-3xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Cadeau gratuit</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-3 mb-4 text-primary-deep text-balance">
              Votre Checklist Équilibre Hormonal en 5 jours
            </h2>
            <p className="text-foreground/70 max-w-lg mx-auto mb-7">
              Recevez gratuitement les 5 gestes essentiels que toute femme devrait connaître pour
              soutenir son équilibre hormonal au naturel.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse courriel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-background"
              />
              <Button type="submit" size="lg" className="h-12 px-6 whitespace-nowrap">
                Recevoir gratuitement
              </Button>
            </form>
            <div className="flex justify-center gap-6 mt-6 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 100% gratuit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Désinscription en 1 clic</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
