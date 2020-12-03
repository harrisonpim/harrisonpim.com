import { RichText } from "prismic-reactjs";
import { formatYear } from "../date";
import Block from "./block";

export default function Projects({ data }) {
  const renderedProjects = data.data.body.map((project) => (
    <div>
      <div>
        {RichText.asText(project.primary.title)},{" "}
        {formatYear(project.primary.date)}
      </div>
      <div>{RichText.asText(project.primary.description)}</div>
    </div>
  ));

  return <Block heading="Notable Projects" data={renderedProjects} />;
}
