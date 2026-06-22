import { HeroSlide, HeroSlider } from '@/components/strapi-shared/HeroSlider';
import { SectionHeader } from '@/components/strapi-shared/SectionHeader';

export const HERO_SLIDER_SAMPLE_DATA: HeroSlide[] = [
  {
    id: 1,
    badge: "Energy & Metals",
    title: "A leading global industrial and energy company",
    description:
      "Operating two business Sectors: Energy and Metals that are highly interconnected and complementary, enabling synergies that unlock hidden value for the Company and significantly amplify its performance.",
    buttonText: "About METLEN",
    buttonLink: "/about",
    image: {
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=920&q=80",
      alternativeText: "Energy industrial facility at dusk",
    },
  },
  {
    id: 2,
    badge: "Sustainability",
    title: "Committed to a greener and more sustainable future",
    description:
      "We are investing heavily in renewable energy sources and cutting-edge technologies to reduce our carbon footprint and lead the transition to a cleaner world.",
    buttonText: "Our ESG Strategy",
    buttonLink: "/sustainability",
    image: {
      url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=920&q=80",
      alternativeText: "Wind turbines in a green field",
    },
  },
  {
    id: 3,
    badge: "Innovation",
    title: "Pioneering technologies that shape tomorrow's industry",
    description:
      "From advanced metallurgy to smart grid solutions, our R&D teams push boundaries every day to deliver innovative products and services across global markets.",
    buttonText: "Explore Innovation",
    buttonLink: "/innovation",
    image: {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=920&q=80",
      alternativeText: "High-tech industrial machinery",
    },
  },
  {
    id: 4,
    badge: "Global Reach",
    title: "Operating across 35+ countries with 25,000+ people",
    description:
      "Our diverse and talented workforce spans every continent, working together to deliver exceptional value for our customers, shareholders, and communities worldwide.",
    buttonText: "Meet Our People",
    buttonLink: "/careers",
    image: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=920&q=80",
      alternativeText: "Modern corporate headquarters skyline",
    },
  },
];
const DynamicPage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  return (
    <div>
      <HeroSlider slides={HERO_SLIDER_SAMPLE_DATA} />
      {/* <SectionHeader /> */}
    </div>
  );
};

export default DynamicPage;