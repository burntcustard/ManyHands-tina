import type { Template } from "tinacms";
import { Icon, iconSchema } from "../util/icon";
import toKebabCase from "../util/to-kebab-case";

export const HowItWorksItem = ({ data, tinaField, index }) => (
  <li className="max-w-2xs">
    <div
      className="mx-auto flex justify-center items-center"
      data-tinafield={tinaField}
    >
      {data.icon && (
        <Icon
          tinaField={`${tinaField}.icon`}
          data={{ icon: data.icon }}
          className="w-auto h-20 tablet:h-24"
        />
      )}
    </div>
    {data.title && (
      <h3
        data-tinafield={`${tinaField}.title`}
        className="font-medium mt-4 mb-1"
      >
        {index + 1}. {data.title}
      </h3>
    )}
    {data.text && (
      <p data-tinafield={`${tinaField}.text`}>
        {data.text}
      </p>
    )}
  </li>
);

export const HowItWorks = ({ data, parentField }) => (
  <section
    id={toKebabCase(data.heading)}
    className="px-4 my-24 desktop:my-32 text-center"
  >
    <h2
      className="h2 mb-8 tablet:mb-10 desktop:mb-12"
      data-tinafield={`${parentField}.heading`}
    >
      {data.heading}
    </h2>

    {data.items && (
      <ol className="flex flex-col gap-8 tablet:flex-row desktop:text-2xl justify-center items-center tablet:items-stretch">
        {data.items.map((block, i) => (
          <HowItWorksItem
            tinaField={`${parentField}.items.${i}`}
            data={block}
            index={i}
            key={i}
          />
        ))}
      </ol>
    )}
  </section>
);

const defaultItem = {
  title: "New How It Works Items",
  text: "This is where you might talk about how things work, if this wasn't just filler text.",
  icon: "tina",
};

export const howItWorksBlockSchema: Template = {
  name: "howItWorks",
  label: "How It Works",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      heading: "How it works",
      items: [defaultItem, defaultItem, defaultItem],
    },
  },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "object",
      label: "How It Works Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultItem,
        },
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
