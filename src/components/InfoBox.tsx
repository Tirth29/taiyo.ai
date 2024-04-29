import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface InfoBoxProps {
  title: string;
  cases: number;
  active: boolean;
  isRed: boolean;
  isRed1: boolean;
  total: number;
  onClick?: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  cases,
  active,
  isRed,
  isRed1,
  total,
  onClick,
}: InfoBoxProps) => {
  return (
    <Card
      onClick={onClick}
      className={`flex-1 rounded-lg cursor-pointer ${
        active ? "border-t-4 border-green-500" : ""
      } ${isRed1 ? "border-red-500" : ""} ${
        isRed ? "border-red-600" : ""
      } m-5 w-60 lg:w-auto `}
    >
      <CardContent>
        <Typography color="textSecondary" className="text-base">
          {title}
        </Typography>
        <h2
          className={`text-lg font-semibold ${
            isRed1 ? "text-red-500" : "text-green-500"
          }`}
        >
          {cases}
        </h2>
        <Typography color="textSecondary" className="text-sm font-bold mt-3">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
