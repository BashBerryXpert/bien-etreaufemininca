import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const benefits = [
  "Comprenez ce qui se passe dans votre corps, sans jargon",
  "Des gestes simples à intégrer dans votre quotidien",
  "Une approche naturelle, validée et bienveillante",
  "Téléchargement immédiat — accessible à vie",
];

const ProductPage = () => {
  useCartSync();
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    fetchProductByHandle(handle).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) document.title = `${p.title} | Bien-être au Féminin`;
    });
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-narrow py-20 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-narrow py-20 text-center">
          <p className="text-muted-foreground mb-4">Guide introuvable.</p>
          <Button asChild><Link to="/guides">Retour aux guides</Link></Button>
        </div>
      </div>
    );
  }

  const variant = product.variants.edges[0]?.node;
  const image = product.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Ajouté à votre panier", { description: product.title, position: "top-center" });
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container-narrow py-12">
        <Link to="/guides" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Tous les guides
        </Link>

        <div className="grid md:grid-cols-2 gap-14">
          <div className="relative">
            <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden shadow-elegant">
              {image && (
                <img src={image.url} alt={image.altText ?? product.title} className="w-full h-full object-cover" />
              )}
            </div>
            <span className="absolute top-4 left-4 bg-background/95 text-foreground text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
              Guide numérique
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Bien-être au Féminin</span>
            <h1 className="font-serif text-3xl md:text-4xl text-primary-deep leading-tight text-balance">
              {product.title}
            </h1>
            <div className="mt-5 font-serif text-3xl text-primary-deep">
              {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </div>

            <div className="mt-7 prose prose-sm max-w-none text-foreground/80 leading-relaxed">
              <p>{product.description || "Un guide pensé pour vous accompagner avec bienveillance dans cette nouvelle étape de votre vie."}</p>
            </div>

            <ul className="mt-7 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3">
              <Button onClick={handleAdd} size="lg" className="h-13 text-base" disabled={isLoading || !variant}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ajouter à mon panier"}
              </Button>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5"><Download className="h-3.5 w-3.5 text-primary" /> Téléchargement instantané</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Paiement sécurisé</span>
                <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-primary" /> Support en français</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-primary-soft/40 rounded-sm border border-primary-soft">
              <p className="font-serif text-base text-primary-deep mb-2">Pour qui est ce guide ?</p>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Pour les femmes du Québec qui souhaitent une information claire, professionnelle et
                rassurante pour traverser leurs transitions hormonales avec confiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
