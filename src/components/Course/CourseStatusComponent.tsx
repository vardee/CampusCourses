import React from "react";
import { translateCourseStatus } from "../../helpers/validators/translator";

interface Props {
  status: string;
}

const CourseStatusComponent: React.FC<Props> = ({ status }) => {
  const translatedStatus = translateCourseStatus(status);
  return <>{translatedStatus}</>;
};

export default CourseStatusComponent;
