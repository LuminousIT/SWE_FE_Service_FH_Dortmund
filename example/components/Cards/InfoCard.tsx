import { ReactSVGElement } from "react";
import { Card, CardBody } from "@roketid/windmill-react-ui";

interface IInfoCard {
  title: string;
  value: string;
  extraTitle?: string;
  extraValue?: string | number;
  children?: ReactSVGElement;
}

function InfoCard({
  title,
  value,
  extraTitle,
  extraValue,
  children,
}: IInfoCard) {
  return (
    <Card>
      <CardBody className="flex items-center">
        {children}
        <div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {value}
            </p>
          </div>
          {extraTitle && (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {extraTitle}
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {extraValue}
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
