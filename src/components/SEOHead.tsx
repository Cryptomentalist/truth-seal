import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string; // absolute URL or path starting with "/"
}

const BASE_URL = "https://konstelacja.org";
const DEFAULT_IMAGE = "/og/home.jpg";

const SEOHead = ({ title, description, path, type = "website", image }: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = `${title} — Constellation.love`;
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const img = image || DEFAULT_IMAGE;
    const absoluteImg = img.startsWith("http") ? img : `${BASE_URL}${img}`;

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${BASE_URL}${path}`);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", absoluteImg);
    setMeta("property", "og:image:width", "1216");
    setMeta("property", "og:image:height", "640");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteImg);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);
  }, [title, description, path, type, image]);

  return null;
};

export default SEOHead;
