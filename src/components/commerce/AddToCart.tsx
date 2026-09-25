"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/store/cart";
import type { ProductSlug } from "@/data/products";

export function AddToCart({ slug, color }: { slug: ProductSlug; color: string }) {
  const add = useCart((s) => s.add);
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Button
        onClick={() => {
          add(slug);
          router.push("/cart");
        }}
      >
        Buy now
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          add(slug);
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
      >
        {added ? "Added to cart" : "Add to cart"}
      </Button>
      {added && (
        <ButtonLink href="/cart" variant="ghost" style={{ color }}>
          View cart →
        </ButtonLink>
      )}
    </div>
  );
}
