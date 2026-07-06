import Image from "next/image";
import { PERSON_DATA, THEME } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi/normalize";


const PersonCard = ({ person }: { person: PERSON_DATA }) => {
  return (
    <div className="flex w-fit flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: "200px", minHeight: "260px" }}
      >
        <Image
          src={getStrapiMediaUrl(person.image)}
          alt={person.image.alternativeText ?? ''}
          fill
          className="object-cover object-top transition-transform duration-300 hover:scale-105"
          sizes="200px"
        />
      </div>
      <div className="flex flex-col gap-1" style={{ maxWidth: "200px" }}>
        <h3 className="text-brand-accent font-bold txt-lead leading-[160%]">
          {person.name}
        </h3>
        <p className="text-brand-text/70 txt-body leading-[160%] font-normal">
          {person.title}
        </p>
        <p className="text-brand-text/70 txt-body leading-[160%] font-normal">
          {person.subtitle}
        </p>
      </div>
    </div>
  );
}

const PeopleList = ({ people, theme }: { people: PERSON_DATA[], theme: THEME }) => {
  return (
    <section className="px-6 py-12" data-company={theme}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-8 justify-start">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleList;