import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Truck,
  RotateCcw,
  Loader2,
  AlertTriangle,
  Tag,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { getProductById, getProducts } from "../../services/productService.js";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductData = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch main product details via GET /api/products/:id
      const data = await getProductById(id);
      const mainProduct = data.product;
      setProduct(mainProduct);

      // Set initial active image for gallery
      const imagesList =
        mainProduct.images && mainProduct.images.length > 0
          ? mainProduct.images
          : [
              mainProduct.thumbnail ||
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            ];
      setSelectedImage(imagesList[0]);

      // 2. Fetch related products in the same category
      if (mainProduct.category) {
        try {
          const relatedData = await getProducts({
            category: mainProduct.category,
            limit: 4,
          });
          const filtered = (relatedData.products || []).filter(
            (p: any) => p._id !== mainProduct._id
          );
          setRelatedProducts(filtered);
        } catch {
          setRelatedProducts([]);
        }
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to load product details";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] flex flex-col justify-between">
        <Navbar />
        <main className="pt-32 pb-16 px-4 max-w-6xl mx-auto w-full flex-1 flex flex-col items-center justify-center">
          <div className="glass-panel p-12 rounded-3xl flex flex-col items-center gap-4 text-center max-w-md w-full animate-pulse border border-white/80">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <h2 className="text-xl font-extrabold text-purple-950">
              Loading Product Information...
            </h2>
            <p className="text-xs text-slate-500">
              Retrieving AI insights & pricing telemetry
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] flex flex-col justify-between">
        <Navbar />
        <main className="pt-32 pb-16 px-4 max-w-6xl mx-auto w-full flex-1 flex flex-col items-center justify-center">
          <div className="glass-panel p-10 rounded-3xl flex flex-col items-center gap-4 text-center max-w-md w-full border border-white/80">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Product Not Found
            </h2>
            <p className="text-xs text-slate-600">{error || "The requested product does not exist."}</p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/discover")}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              pixelAccent
            >
              Return to Swipe Deck
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [
          product.thumbnail ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E1B4B] flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto w-full flex-1">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-xs font-extrabold text-purple-950 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </button>

        {/* Main Product Display Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Featured Image Display */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-slate-100 border border-white/60">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="pixel" pixelStar>
                  {product.category}
                </Badge>
                {product.discountPercentage > 0 && (
                  <Badge variant="pink" className="bg-pink-500 text-white font-bold">
                    {product.discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Selection Bar */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {galleryImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === img
                        ? "border-purple-600 ring-2 ring-purple-300 shadow-md scale-105"
                        : "border-white/80 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Metadata & Buy Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand & Stock */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                  {product.brand}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    product.stock > 0
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-rose-100 text-rose-800 border border-rose-200"
                  }`}
                >
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                {product.title}
              </h1>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-700 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating || 4.8}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  ({product.reviewsCount || 24} customer reviews)
                </span>
              </div>

              {/* Price & Savings Display */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-black text-purple-950">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.sourceStore && (
                  <span className="ml-auto text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-full border border-purple-200">
                    Store: {product.sourceStore}
                  </span>
                )}
              </div>

              {/* AI Reasoning Insight Box */}
              <div className="p-4 rounded-2xl bg-purple-100/70 border border-purple-200/80 mb-6 flex items-start gap-3 shadow-inner">
                <div className="p-2 rounded-xl bg-purple-300/80 text-purple-950 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-purple-950 mb-1">
                    AI Match Insight
                  </h4>
                  <p className="text-xs text-purple-900 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Tags List */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mb-6">
                  {product.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3 text-purple-400" />
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-purple-100">
              <a
                href={product.affiliateLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                  pixelAccent
                >
                  Buy Now at Store
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Related AI Recommendations
              </h2>
              <Badge variant="pixel">SAME CATEGORY</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel: any) => (
                <Link
                  key={rel._id}
                  to={`/product/${rel._id}`}
                  className="glass-panel p-4 rounded-2xl border border-white/80 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full rounded-xl overflow-hidden mb-3 bg-slate-100">
                      <img
                        src={
                          rel.images && rel.images.length > 0
                            ? rel.images[0]
                            : rel.thumbnail ||
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                        }
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase text-purple-700">
                      {rel.brand}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-purple-900">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-100">
                    <span className="font-black text-base text-purple-950">
                      ${rel.price}
                    </span>
                    <span className="text-xs font-bold text-purple-700 group-hover:underline">
                      View Item →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
