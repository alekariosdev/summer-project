import { CONTENT_DATA } from "@/lib/types";

const Content = ({ body, theme }: CONTENT_DATA) => {
  if (!body) return null;

  console.log('theme', theme);
  return (
    <div
      data-company={theme}
      className="strapi-content"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
};

export default Content;