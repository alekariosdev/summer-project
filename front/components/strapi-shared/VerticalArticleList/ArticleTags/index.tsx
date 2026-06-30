import Badge from "@/components/common/Badge";

const TagBadge = ({ label }: { label: string }) => {
  return (
    <Badge
      label={label}
      className="rounded-full border-gray-300 bg-white/60 pr-2 pl-0 py-0
                 text-[11px] font-normal text-gray-600 hover:bg-white/60"
      textClassName="text-gray-600 hover:text-gray-600/80"
    />
  );
}

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <TagBadge key={tag} label={tag} />
      ))}
    </div>
  );
}

export default TagList;