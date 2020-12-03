import { RichText } from "prismic-reactjs";
import { customLink } from "../../prismic/helpers";
import { linkResolver } from "../../prismic/resolvers";
import { formatYear } from "../date";
import Block from "./block";

export default function Education({ data }) {
  const renderedEducation = data.data.body.map((school) => (
    <div>
      <div>{RichText.asText(school.primary.name)}</div>
      <div>
        {formatYear(school.primary["start-date"])}-
        {formatYear(school.primary["end-date"])}
      </div>
      <div>
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
