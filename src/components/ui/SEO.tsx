import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function SEO({ 
  title, 
  description = "Kunal B - ML Engineer building AI products with sub-100ms latency. Shipped to 3M+ users.",
  keywords = ["ML Engineer", "AI Products", "FastAPI", "React", "TypeScript", "Bangalore"],
  image = "/og-image.jpg",
  url = "https://kunalis.me"
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Kunal B`;
    
    // Update meta tags
    const metaTags = {
      description,
      keywords: keywords.join(', '),
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': 'website',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:creator': '@kunal_b',
    };
    
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kunal B",
      "jobTitle": "ML Engineer",
      "url": url,
      "sameAs": [
        "https://github.com/kunalb",
        "https://twitter.com/kunal_b",
        "https://linkedin.com/in/kunalb"
      ],
      "knowsAbout": ["Machine Learning", "AI", "React", "TypeScript", "FastAPI"]
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, url]);
  
  return null;
}