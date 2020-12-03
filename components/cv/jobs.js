import { RichText } from "prismic-reactjs";
import { customLink } from "../../prismic/helpers";
import { linkResolver } from "../../prismic/resolvers";
import Block from "./block";
import { formatYear } from "../date";

export default function Jobs({ data }) {
  const renderedJobs = data.data.body.map((job) => (
    <div>
      <div>
        {RichText.asText(job.primary.title)},{" "}
        {RichText.asText(job.primary.employer)}
      </div>
      <div>
        {formatYear(job.primary["start-date"])}-
        {formatYear(job.primary["end-date"])}
      </div>
      <div>
        <RichText
          render={job.primary.responsibilities}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </div>
    </div>
  ));
  return <Block heading="Jobs" data={renderedJobs} />;
}
