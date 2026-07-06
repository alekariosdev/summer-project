import SlidesetArticleLists from "./SlidesetArticleLists";
import type { SLIDESET_LIST_DATA } from "@/lib/types";

const SlidesetAticles = (data: SLIDESET_LIST_DATA) => {
  const slides = data.slides?.articles ?? [];
  const cards = data.cards?.articles ?? [];

  if (!slides.length && !cards.length) return null;

  return (
    <div className="w-full py-10 bg-brand-accent" data-company={data.theme}>
      <SlidesetArticleLists
        data={data}
        slides={slides}
        cards={cards}
      />
    </div>
  );
};

export default SlidesetAticles;
