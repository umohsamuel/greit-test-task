import { PropertyListing } from "../../types";
import Card from "./base.card";

type Props = {
  projects: PropertyListing[];
};

function CardGrid({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project._id}
          project={project.generalInfo}
          images={project.images}
        />
      ))}
    </div>
  );
}

export default CardGrid;
