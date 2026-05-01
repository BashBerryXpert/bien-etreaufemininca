import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { LeadMagnetDialog } from "@/components/LeadMagnetDialog";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";
import { useCartSync } from "@/hooks/useCartSync";
import heroImage from "@/assets/hero-woman.jpg";
import portrait from "@/assets/chantal-portrait.jpg";
import texture from "@/assets/texture-herbs.jpg";
import tisane1 from "@/assets/tisane-1.jpeg";
import tisane2 from "@/assets/tisane-2.jpeg";
import tisane3 from "@/assets/tisane-3.jpeg";
import tisane4 from "@/assets/tisane-4.jpeg";
import tisane5 from "@/assets/tisane-5.jpeg";
import { ArrowRight, Sparkles, HeartPulse, Sun, ShieldCheck, Quote, CheckCircle2, Gift, Leaf } from "lucide-react";
import { toast } from "sonner";

const struggles = [
  {
    icon: HeartPulse,
    title: "Fatigue & énergie",
    desc: "Retrouvez votre vitalité grâce à une approche naturelle adaptée à votre physiologie.",
  },
  {
    icon: Sun,
    title: "Équilibre hormonal",
    desc: "Apaisez les variations naturelles de votre corps avec des gestes simples du quotidien.",
  },
  {
    icon: Sparkles,
    title: "Sommeil & sérénité",
    desc: "Stabilisez vos émotions et redécouvrez des nuits réparatrices, en douceur.",
  },
];

const tisaneImages = [tisane5, tisane1, tisane2, tisane3, tisane4];

const Index = () => {
  useCartSync();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Bien-être au Féminin | Santé naturelle pour toutes les femmes";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Guides naturels de Chantal, naturopathe et herboriste, pour toutes les femmes en quête de santé globale. Tisanes, équilibre hormonal et solutions douces.");
    fetchProducts(20, "-title:DON'T -title:HAY -title:MENOPAUSE -title:'master of your body'").then((p) => {
      // Keep only the two French guides we want to feature
      const allowed = ["ménopause", "rhume des foins"];
      const filtered = p.filter((prod) => {
        const t = prod.node.title.toLowerCase();
        return allowed.some((kw) => t.includes(kw));
      });
      setProducts(filtered);
      setLoading(false);
    });
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email },
      });
      if (error || (data as { error?: string })?.error) {
        throw new Error(error?.message || (data as { error?: string }).error);
      }
      toast.success("Merci !", { description: "Votre guide gratuit arrive dans votre boîte courriel.", position: "top-center" });
      setEmail("");
    } catch (err) {
      toast.error("Une erreur est survenue", { description: (err as Error).message || "Veuillez réessayer." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LeadMagnetDialog />

      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <div className="space-y-7">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-primary font-medium">
              Pour toutes les femmes en quête de santé globale
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance text-primary-deep">
              Retrouvez votre équilibre,<br />
              <em className="italic font-normal">naturellement.</em>
            </h1>
            <p className="text-lg text-foreground/75 max-w-md leading-relaxed">
              Une approche éducative, accessible et profondément rassurante — guidée par la naturopathie
              et l'herboristerie — pour traverser chaque étape de votre vie avec confiance et sérénité.
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
              <span>Téléchargement immédiat · Paiement sécurisé · Support francophone</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 rounded-sm blur-2xl" aria-hidden />
            <img
              src={heroImage}
              alt="Femme sereine au cœur de la nature, profitant d'un moment de bien-être"
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
            À chaque étape de la vie, votre corps mérite douceur et écoute.
          </h2>
          <p className="mt-4 text-foreground/70 leading-relaxed">
            La méthode bienveillante de Chantal s'adresse aux signaux que votre corps vous envoie —
            pour toutes les femmes, à tout âge.
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
              {products.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LEAD MAGNET — 5 TISANES */}
      <section className="py-24 relative">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-card rounded-sm shadow-elegant overflow-hidden">
            <div className="grid grid-cols-2 gap-2 p-3 bg-primary-soft">
              <img
                src={tisane5}
                alt="Recette illustrée Tisane Anti-Stress Camomille & Mélisse"
                loading="lazy"
                className="col-span-2 w-full h-full object-cover rounded-sm aspect-[4/3]"
              />
              {[tisane1, tisane2, tisane3, tisane4].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Aperçu de la recette de tisane anti-stress ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-sm aspect-square"
                />
              ))}
            </div>
            <div className="p-8 md:p-12">
              <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.3em] uppercase text-primary mb-3">
                <Gift className="h-3.5 w-3.5" /> Cadeau gratuit
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary-deep text-balance leading-tight">
                Téléchargez mon Guide Gratuit : 5 Tisanes Anti-Stress
              </h2>
              <p className="mt-4 text-foreground/75 leading-relaxed">
                Apprenez à préparer des infusions apaisantes (Camomille, Mélisse, Lavande,
                Verveine, Tilleul...) pour calmer votre esprit naturellement.
              </p>
              <form onSubmit={handleNewsletter} className="mt-6 flex flex-col sm:flex-row gap-3">
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
              <div className="flex flex-wrap gap-5 mt-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 5 recettes illustrées</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 100% gratuit</span>
                <span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-primary" /> Plantes douces & naturelles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="py-24 container-narrow">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="relative order-2 md:order-1">
            <img
              src={portrait}
              alt="Portrait de Chantal, naturopathe et herboriste"
              loading="lazy"
              width={1024}
              height={1280}
              className="rounded-sm shadow-elegant w-full max-w-md mx-auto h-[560px] object-cover"
            />
            <div className="absolute -bottom-5 -right-2 md:right-12 bg-card px-5 py-3 rounded-sm shadow-soft text-xs tracking-widest uppercase">
              <span className="text-primary">Naturopathe</span> & Herboriste
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Votre guide</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary-deep text-balance">
              Chantal — une approche maternelle, jamais culpabilisante.
            </h2>
            <Quote className="h-7 w-7 text-accent" />
            <p className="text-lg text-foreground/80 leading-relaxed italic font-serif">
              « Maman de quatre enfants et aujourd'hui grand-maman, j'ai consacré ma vie à soigner ma
              famille avec les richesses de la nature. Mon souhait : partager ces solutions douces et
              éprouvées avec vous, peu importe votre étape de vie. »
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/a-propos">Découvrir mon parcours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TEXTURE NEWSLETTER STRIP */}
      <section className="py-16 relative overflow-hidden">
        <img src={texture} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-warm opacity-90" />
        <div className="container-narrow relative text-center max-w-2xl">
          <h2 className="font-serif text-2xl md:text-3xl text-primary-deep">
            Rejoignez une communauté bienveillante de femmes inspirées par la nature.
          </h2>
          <p className="mt-3 text-foreground/70">
            Conseils saisonniers, recettes de plantes et inspirations livrés avec douceur.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
