"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Zari Work: A Timeless Tradition",
      excerpt: "Explore the intricate craft of zari embroidery and its rich history in Indian textiles.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "May 15, 2023",
      content: `
        <p>Zari work, a form of embroidery that involves using fine gold or silver threads to create intricate patterns, has been an integral part of Indian textile tradition for centuries. The word "Zari" is derived from the Persian word "Zar" meaning gold, highlighting its historical connection to the use of precious metals in fabric decoration.</p>
        
        <h2>Historical Significance</h2>
        <p>The art of Zari embroidery dates back to the Mughal era in India, where it was patronized by royal courts. Historical records indicate that during the reign of Emperor Akbar, Zari work flourished and became a symbol of luxury and opulence. The craftsmen, known as "Zardozi" artisans, were highly respected and their skills were passed down through generations.</p>
        
        <p>Initially, real gold and silver were used in creating Zari threads. The process involved wrapping thin strips of metal around a silk thread core. This made the garments not only visually stunning but also quite valuable due to the precious metals used.</p>
        
        <h2>The Crafting Process</h2>
        <p>The traditional process of creating Zari threads is meticulous and requires exceptional skill:</p>
        
        <ol>
          <li><strong>Metal Preparation:</strong> Pure gold or silver is drawn into extremely thin wires.</li>
          <li><strong>Flattening:</strong> These wires are then flattened to create ribbon-like strips.</li>
          <li><strong>Thread Creation:</strong> The metal strips are carefully wrapped around a silk thread core.</li>
          <li><strong>Embroidery:</strong> Skilled artisans use these threads to create patterns on fabric using various stitching techniques.</li>
        </ol>
        
        <p>Modern Zari often uses copper wire electroplated with gold or silver, making it more affordable while maintaining the lustrous appearance.</p>
        
        <h2>Regional Variations</h2>
        <p>Different regions in India have developed their unique styles of Zari work:</p>
        
        <ul>
          <li><strong>Banarasi Zari:</strong> Known for its dense, intricate patterns often featuring floral and paisley motifs.</li>
          <li><strong>Kanchipuram Zari:</strong> Characterized by bold, geometric patterns and temple designs.</li>
          <li><strong>Lucknowi Zari:</strong> Features delicate, subtle patterns that often depict nature-inspired themes.</li>
          <li><strong>Gujarati Zari:</strong> Recognized for its vibrant colors and mirror work combined with Zari embroidery.</li>
        </ul>
        
        <h2>Contemporary Relevance</h2>
        <p>While traditional Zari work continues to be valued for bridal and ceremonial wear, contemporary designers have been reimagining this ancient craft for modern fashion. Today, Zari work can be found not only on sarees and lehengas but also on contemporary outfits, accessories, and home décor items.</p>
        
        <p>The versatility of Zari has allowed it to transcend time and remain relevant in today's fashion landscape. Designers are experimenting with combining Zari with other embroidery techniques and applying it to non-traditional fabrics, creating fusion pieces that honor the heritage while embracing innovation.</p>
        
        <h2>Preserving the Craft</h2>
        <p>Despite its beauty and cultural significance, traditional Zari work faces challenges in the modern era. The rise of machine-made alternatives and changing consumer preferences have impacted the livelihoods of artisans who specialize in hand-crafted Zari embroidery.</p>
        
        <p>Several organizations and government initiatives are working to preserve this art form by providing training, financial support, and market access to artisans. By choosing authentic Zari work, consumers can play a role in supporting these skilled craftspeople and ensuring that this magnificent tradition continues to thrive.</p>
        
        <p>The next time you admire a beautifully embroidered saree or lehenga with golden threads catching the light, take a moment to appreciate the centuries of tradition, skill, and artistry that have gone into creating that piece of wearable art.</p>
      `,
    },
    {
      id: 2,
      title: "Understanding Different Types of Silk Sarees",
      excerpt: "From Banarasi to Kanjivaram: A comprehensive guide to the various silk sarees of India.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "April 28, 2023",
      content: `
        <p>Silk sarees represent the pinnacle of Indian textile craftsmanship, combining luxurious fabric with intricate weaving techniques that have been perfected over centuries. Each region in India has developed its distinctive style of silk saree, reflecting local cultural influences, available resources, and artistic sensibilities.</p>
        
        <h2>Kanchipuram (Kanjivaram) Silk</h2>
        <p>Originating from the temple town of Kanchipuram in Tamil Nadu, these sarees are known for their durability, vibrant colors, and heavy zari work. Traditional Kanchipuram sarees feature contrasting borders and pallus (the decorative end piece), often depicting temple motifs, checks, stripes, and floral patterns.</p>
        
        <p>The weaving technique involves interlocking the body, border, and pallu separately using a three-shuttle system. This creates a saree that can last for generations and is often passed down as an heirloom. The silk used is mulberry silk, known for its lustrous quality.</p>
        
        <h2>Banarasi Silk</h2>
        <p>From the ancient city of Varanasi (formerly Banaras), these sarees are synonymous with bridal wear across India. Characterized by their gold and silver brocade or zari work, Banarasi sarees feature intricate designs inspired by Mughal motifs such as intertwining floral and foliate patterns.</p>
        
        <p>There are several varieties of Banarasi silk sarees:</p>
        <ul>
          <li><strong>Katan:</strong> Made from pure silk threads</li>
          <li><strong>Organza:</strong> Known for its sheer texture with zari work</li>
          <li><strong>Georgette:</strong> Lightweight with a crinkled texture</li>
          <li><strong>Shattir:</strong> Features a check pattern created during weaving</li>
        </ul>
        
        <h2>Mysore Silk</h2>
        <p>Known for their subtle elegance, Mysore silk sarees from Karnataka are lightweight and lustrous. They typically feature a solid color with simple zari borders and pallus. The Karnataka Silk Industries Corporation, established by the Maharaja of Mysore in 1912, continues to be a major producer of these sarees.</p>
        
        <p>Mysore silk is known for its pure gold zari work and the use of high-quality mulberry silk, making these sarees both comfortable for everyday wear and suitable for special occasions.</p>
        
        <h2>Paithani Silk</h2>
        <p>Originating from Paithan in Maharashtra, these sarees are distinguished by their unique weaving technique where the design is created without using extra threads. The pallu often features peacock motifs and oblique square designs called "bangdi mor" (bangle and peacock).</p>
        
        <p>Traditional Paithani sarees use very fine silk and real gold thread. The border and pallu are woven with oblique designs in bright colors against contrasting backgrounds, creating a tapestry-like effect.</p>
        
        <h2>Patola Silk</h2>
        <p>From Gujarat, Patola sarees are among the most difficult and time-consuming to create. They use a double ikat technique where both warp and weft threads are tie-dyed before weaving, creating geometric patterns that appear identical on both sides of the fabric.</p>
        
        <p>A single Patola saree can take up to six months to complete, making them extremely valuable. Traditional motifs include flowers, birds, animals, and human figures arranged in grid patterns.</p>
      `,
    },
    {
      id: 3,
      title: "The Evolution of Kurti Designs Through Decades",
      excerpt: "How the humble kurti transformed from traditional wear to contemporary fashion statement.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "March 12, 2023",
      content: `
        <p>The kurti, a versatile upper garment that has become a staple in women's wardrobes across India and beyond, has a fascinating evolutionary journey. From its humble origins as practical daily wear to its current status as a fashion statement, the kurti has continuously adapted to changing times while maintaining its essential character.</p>
        
        <h2>Origins and Traditional Forms</h2>
        <p>The kurti's origins can be traced back to ancient India, where it evolved from the "kurta" - a loose shirt-like garment worn by both men and women. Traditional kurtis were simple, straight-cut garments designed primarily for comfort in India's warm climate. They typically extended to the mid-thigh or knee and were paired with loose pants or leggings.</p>
        
        <p>In its early form, the kurti was characterized by:</p>
        <ul>
          <li>Simple, straight cuts with minimal tailoring</li>
          <li>Regional variations in sleeve length, neckline, and embellishments</li>
          <li>Natural fabrics like cotton and silk</li>
          <li>Subtle embroidery or print work specific to different regions</li>
        </ul>
        
        <h2>1950s-1960s: Post-Independence Influence</h2>
        <p>Following India's independence, there was a renewed interest in traditional clothing as a symbol of national identity. During this period, kurtis maintained their traditional silhouette but began incorporating more elaborate embroidery techniques like chikankari, mirror work, and appliqué.</p>
        
        <p>The influence of Bollywood stars like Nargis and Madhubala helped popularize elegant, tailored kurtis paired with churidar pants or wide-legged palazzos. The necklines became more varied, with round, V-shaped, and keyhole designs gaining popularity.</p>
        
        <h2>1970s-1980s: Fusion Beginnings</h2>
        <p>The 1970s marked the beginning of Indo-Western fusion in kurti design. Influenced by global fashion trends like the hippie movement, kurtis began to feature:</p>
        <ul>
          <li>More experimental silhouettes, including A-line cuts</li>
          <li>Vibrant, psychedelic prints inspired by Western fashion</li>
          <li>Bell sleeves and wider hemlines</li>
          <li>Bolder color combinations and contrasting borders</li>
        </ul>
        
        <p>By the 1980s, the kurti had become more structured, with shoulder pads and tailored fits reflecting the power dressing trend of the era. Designer boutiques began offering high-end kurtis with intricate embellishments for special occasions.</p>
      `,
    },
    {
      id: 4,
      title: "Embroidery Techniques: Chikankari, Phulkari, and Gota Patti",
      excerpt: "Discover the unique embroidery styles that define Indian ethnic wear.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "February 5, 2023",
      content: `
        <p>India's rich textile heritage is adorned with numerous embroidery techniques that have been perfected over centuries. Among these, Chikankari, Phulkari, and Gota Patti stand out for their distinctive styles, cultural significance, and the exceptional skill required to create them. Each of these embroidery forms tells a story of regional identity, artistic expression, and the meticulous craftsmanship that has been passed down through generations.</p>
        
        <h2>Chikankari: The Delicate White Embroidery of Lucknow</h2>
        
        <h3>Historical Background</h3>
        <p>Chikankari originated in the city of Lucknow in Uttar Pradesh during the Mughal era. Historical accounts suggest that it was introduced by Nur Jehan, the wife of Emperor Jahangir, in the 17th century. The word "chikan" is derived from the Persian word "chikin" or "chikeen" meaning a kind of embroidered fabric.</p>
        
        <h3>Technique and Process</h3>
        <p>Chikankari is traditionally done on lightweight fabrics such as muslin, cotton, silk, chiffon, and georgette. The process involves several stages:</p>
        
        <ol>
          <li><strong>Block Printing:</strong> The design is first printed on the fabric using wooden blocks dipped in temporary dye.</li>
          <li><strong>Embroidery:</strong> Skilled artisans embroider over the printed pattern using white thread.</li>
          <li><strong>Washing:</strong> The fabric is washed to remove the temporary dye, leaving only the white embroidery.</li>
          <li><strong>Finishing:</strong> The fabric is starched and pressed to enhance the appearance of the embroidery.</li>
        </ol>
        
        <h3>Distinctive Stitches</h3>
        <p>Chikankari employs over 32 different types of stitches, each with its unique texture and effect. Some of the most common include:</p>
        
        <ul>
          <li><strong>Tepchi:</strong> A running stitch used for outlining</li>
          <li><strong>Bakhiya:</strong> A very fine back stitch that creates a ridge-like effect</li>
          <li><strong>Hool:</strong> An eyelet stitch that creates small perforations</li>
          <li><strong>Jali:</strong> A network of fine stitches creating a mesh-like appearance</li>
          <li><strong>Murri:</strong> Tiny knot-like stitches that resemble grains of rice</li>
          <li><strong>Phanda:</strong> A knot stitch used for creating floral motifs</li>
        </ul>
      `,
    },
    {
      id: 5,
      title: "Sustainable Fashion: Eco-friendly Fabrics in Indian Wear",
      excerpt: "How traditional Indian textiles are leading the way in sustainable fashion practices.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "January 20, 2023",
      content: `
        <p>Long before "sustainability" became a global fashion buzzword, Indian textile traditions were inherently eco-friendly, utilizing natural fibers, dyes, and production methods that minimized environmental impact. Today, as the fashion industry grapples with its environmental footprint, traditional Indian textiles offer valuable lessons in sustainable practices.</p>
        
        <h2>Natural Fibers: The Foundation of Eco-friendly Fashion</h2>
        
        <h3>Cotton</h3>
        <p>India has a rich history of cotton cultivation dating back thousands of years. Traditional varieties like Desi cotton are naturally pest-resistant and require less water compared to modern hybrid varieties. Regions like Gujarat and Maharashtra are known for organic cotton farming that avoids harmful pesticides and chemical fertilizers.</p>
        
        <p>Handloom cotton fabrics like Khadi, promoted by Mahatma Gandhi during the independence movement, are produced without electricity using hand-operated spinning wheels (charkhas) and looms. This not only reduces carbon emissions but also creates employment opportunities in rural communities.</p>
        
        <h3>Silk</h3>
        <p>While conventional silk production involves boiling silkworm cocoons with the worms inside, India has developed more humane alternatives:</p>
        
        <ul>
          <li><strong>Ahimsa Silk (Peace Silk):</strong> Allows the silkworm to complete its lifecycle and emerge from the cocoon before the silk is harvested</li>
          <li><strong>Eri Silk:</strong> Produced from open-ended cocoons, allowing the moth to emerge naturally</li>
          <li><strong>Tussar Silk:</strong> Harvested from wild silkworms that feed on forest trees, promoting biodiversity</li>
        </ul>
        
        <h3>Wool</h3>
        <p>Traditional wool production in regions like Kashmir and Himachal Pradesh involves hand-shearing sheep during appropriate seasons without harming the animals. The wool is then hand-processed, spun, and woven into fabrics like Pashmina and Kullu shawls.</p>
        
        <h2>Natural Dyes: Colors from Nature</h2>
        <p>Long before synthetic dyes were invented, Indian textiles were renowned for their vibrant colors derived from plants, minerals, and even insects. These natural dyes are biodegradable and non-toxic, making them environmentally friendly alternatives to chemical dyes.</p>
        
        <p>Some traditional natural dyes include:</p>
        
        <ul>
          <li><strong>Indigo:</strong> Extracted from the Indigofera plant, producing the famous blue color seen in many Indian textiles</li>
          <li><strong>Madder:</strong> Derived from the roots of the Rubia plant, creating various shades of red</li>
          <li><strong>Turmeric:</strong> Yields a bright yellow color</li>
          <li><strong>Pomegranate:</strong> Produces earthy browns and yellows</li>
          <li><strong>Iron:</strong> Used as a mordant to create blacks and grays</li>
        </ul>
      `,
    },
    {
      id: 6,
      title: "Styling Guide: Pairing Accessories with Ethnic Wear",
      excerpt: "Tips and tricks to elevate your ethnic outfit with the perfect accessories.",
      image: "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg?height=400&width=600",
      date: "December 8, 2022",
      content: `
        <p>The right accessories can transform a simple ethnic outfit into a stunning ensemble. Indian accessories are as diverse and rich in tradition as the garments themselves, offering countless possibilities for personal expression. This guide will help you navigate the world of ethnic accessories and create harmonious, eye-catching looks.</p>
        
        <h2>Jewelry: The Cornerstone of Ethnic Styling</h2>
        
        <h3>Necklaces</h3>
        <p>The neckline of your outfit should guide your choice of necklace:</p>
        
        <ul>
          <li><strong>Round or Scoop Neck:</strong> Chokers, collar necklaces, or layered pieces work beautifully</li>
          <li><strong>V-Neck:</strong> V-shaped pendants or longer necklaces that echo the neckline</li>
          <li><strong>High Neck:</strong> Long pendant necklaces or statement earrings with minimal neck pieces</li>
          <li><strong>Boat Neck:</strong> Chokers or short necklaces that sit above the neckline</li>
        </ul>
        
        <p>Traditional necklace styles to consider include:</p>
        
        <ul>
          <li><strong>Kundan:</strong> Glass stones set in gold foil, often with meenakari work on the reverse</li>
          <li><strong>Temple Jewelry:</strong> Featuring motifs inspired by South Indian temples</li>
          <li><strong>Polki:</strong> Uncut diamonds set in gold</li>
          <li><strong>Jadau:</strong> Gemstones embedded in gold with meenakari work</li>
          <li><strong>Hasli:</strong> Rigid, collar-like necklaces</li>
        </ul>
        
        <h3>Earrings</h3>
        <p>Consider your hairstyle and face shape when selecting earrings:</p>
        
        <ul>
          <li><strong>Updos or Short Hair:</strong> Showcase statement earrings like chandbalis or jhumkas</li>
          <li><strong>Open Hair:</strong> Studs or smaller earrings that won't get tangled</li>
          <li><strong>Round Face:</strong> Elongated designs like danglers</li>
          <li><strong>Oval Face:</strong> Most styles work well</li>
          <li><strong>Square Face:</strong> Round or oval-shaped earrings to soften angles</li>
        </ul>
        
        <h3>Bangles and Bracelets</h3>
        <p>The sleeve length of your outfit determines your bracelet options:</p>
        
        <ul>
          <li><strong>Sleeveless:</strong> Stack multiple bangles or wear a statement cuff</li>
          <li><strong>Quarter Sleeves:</strong> Thin bangles or a delicate bracelet</li>
          <li><strong>Full Sleeves:</strong> Skip wrist jewelry or choose a single thin bangle</li>
        </ul>
        
        <p>Traditional options include glass bangles, gold kada (rigid bangles), and intricate cuffs.</p>
      `,
    },
  ]

  const togglePost = (id: number) => {
    if (expandedPost === id) {
      setExpandedPost(null)
    } else {
      setExpandedPost(id)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-light tracking-wide md:text-4xl">Blog</h1>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative aspect-[4/3] md:w-1/3 md:min-w-[300px]">
                <Image src={post.image || "https://images.jdmagicbox.com/comp/ahmedabad/g6/079pxx79.xx79.161215233802.s9g6/catalogue/vanshika-creation-raipur-ahmedabad-women-kurti-manufacturers-58c6n2vxj4-250.jpg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <p className="mb-2 text-sm text-neutral-500">{post.date}</p>
                  <h2 className="mb-2 text-xl font-medium">{post.title}</h2>
                  <p className="mb-4 text-neutral-600">{post.excerpt}</p>
                </div>
                <Button
                  variant="ghost"
                  className="flex w-fit items-center text-sm font-medium text-primary"
                  onClick={() => togglePost(post.id)}
                >
                  {expandedPost === post.id ? (
                    <>
                      Show Less <ChevronDown className="ml-1 h-4 w-4 rotate-180 transform" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded content */}
            {expandedPost === post.id && (
              <div className="border-t border-neutral-200 p-5">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

