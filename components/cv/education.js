import { RichText } from "prismic-reactjs";
import { customLink } from "../../prismic/helpers";
import { linkResolver } from "../../prismic/resolvers";
import { formatYear } from "../date";
import Block from "./block";

export default function Education({ data }) {
  const renderedEducation = data.data.body.map((school, idx) => (
    <div className="pb-2" key={idx}>
      <div className="text-base inline-block">
        {RichText.asText(school.primary.name)}
      </div>
      <div className="text-base block lg:inline-block lg:float-right">
        {formatYear(school.primary["start-date"])}-
        {formatYear(school.primary["end-date"])}
      </div>
      <div className="text-xs">
        <RichText
          render={school.primary.qualifications}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </div>
    </div>
  ));
  return <Block heading="Education" data={renderedEducation} />;
}
