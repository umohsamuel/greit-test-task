import { Bath, Bed, MapPin, SquareStack } from "lucide-react";
import { GeneralInfo, Image } from "../../types";
import { formatAmount } from "../../utils";
import { ImageSlider } from "../sliders";
import { useLocationDetails } from "../../hooks";
import { useMemo } from "react";

type Project = GeneralInfo;

type Props = {
  project: Project;
  images: Image[];
};

function Card({ project, images }: Props) {
  const { location, isLoading } = useLocationDetails({
    longitude: project.coordinates.longitude,
    latitude: project.coordinates.latitude,
  });

  const detailsInfo = useMemo(
    () => [
      {
        icon: <Bed size={16} color="#6a7282" />,
        value: `${project.rooms} Beds`,
      },
      {
        icon: <Bath size={16} color="#6a7282" />,
        value: `${project.bathrooms} Baths`,
      },
      {
        icon: <SquareStack size={16} color="#6a7282" />,
        value: `${project.size} sqft`,
      },
    ],
    [project.rooms, project.bathrooms, project.size]
  );

  return (
    <div className="border border-solid text-black border-black/20 p-2 rounded-2xl shadow-2xl bg-white overflow-hidden">
      <ImageSlider images={images} />

      <div className="py-4 px-3">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">{project.name}</label>
            <div className="flex items-center  gap-2">
              <MapPin size={18} color="black" />
              <span className="text-sm font-medium">
                {isLoading ? "Loading..." : location}
              </span>
            </div>
          </div>
          <span className="font-medium text-base text-red-500">
            {formatAmount(project.price)}
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-gray-300/70 gap-4 mt-4">
          {detailsInfo.map((info, index) => (
            <DetailsItem key={index} icon={info.icon} value={info.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;

const DetailsItem = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-xs font-medium text-gray-500">{value}</span>
  </div>
);
