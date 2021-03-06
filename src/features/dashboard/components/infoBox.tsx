import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./infoBox.css";

interface infoBoxProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
  active: boolean;
  isRed?: boolean;
  total: number;
  cases: number;
}

const InfoBox = ({
  title,
  total,
  isRed,
  active,
  cases,
  ...props
}: infoBoxProps) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
