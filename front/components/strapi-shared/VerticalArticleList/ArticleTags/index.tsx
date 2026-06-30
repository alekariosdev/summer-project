import Badge from "@/components/common/Badge";
import { TAG_DATA } from "@/lib/types";

const TagBadge = ({ label }: { label: string }) => {
  return (
    <Badge
      label={label}
      className="rounded-md bg-[#0A22401A] pr-2 pl-0 py-0
                 txt-caption font-normal text-brand-text"
      textClassName="txt-caption font-weight-semibold text-brand-text py-1 px-2"
    />
  );
}

const TagList = ({ tags }: { tags: TAG_DATA[] }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <TagBadge key={tag.id} label={tag.name} />
      ))}
    </div>
  );
}

export default TagList;