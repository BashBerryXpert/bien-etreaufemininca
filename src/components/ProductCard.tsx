import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Props {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: Props) => {
  const { node } = product;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Ajouté à votre panier", { description: node.title, position: "top-center" });
    setOpen(true);
  };

  return (
    <Link
      to={`/guide/${node.handle}`}
      className="group flex flex-col bg-card rounded-sm overflow-hidden shadow-card-soft hover:shadow-elegant transition-smooth"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-soft">
            <BookOpen className="h-16 w-16 text-primary/40" />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-background/95 text-foreground text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
          Guide numérique
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl leading-tight mb-2 text-balance">{node.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-1">{node.description || "Un accompagnement bienveillant pour retrouver l'équilibre."}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-serif text-2xl text-primary-deep">
            {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
          </span>
          <Button onClick={handleAdd} disabled={isLoading || !variant} size="sm" variant="default">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ajouter"}
          </Button>
        </div>
      </div>
    </Link>
  );
};
