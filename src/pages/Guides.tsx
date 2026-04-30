import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { useCartSync } from "@/hooks/useCartSync";
import { Sparkles } from "lucide-react";

const Guides = () => {
  useCartSync();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Nos Guides d'Accompagnement | Bien-être au Féminin";
    fetchProducts(24).then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-hero py-20">
        <div className="container-narrow text-center max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Collection</span>
          <h1 className="font-serif text-4xl md:text-5xl mt-3 text-primary-deep text-balance">
            Nos Guides d'Accompagnement
          </h1>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Faire le premier pas vers son bien-être est déjà une victoire. Choisissez le compagnon qui
            vous parle aujourd'hui — et avancez à votre rythme.
          </p>
        </div>
      </section>

      <section className="container-narrow py-16">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] bg-secondary animate-pulse rounded-sm" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="h-10 w-10 text-primary/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Guides;
