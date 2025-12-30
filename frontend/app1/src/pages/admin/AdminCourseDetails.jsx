import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import CourseDetails from "../CourseDetails";

function AdminCourseDetails() {
  const { id } = useParams();

  return (
    <AdminLayout>
      <CourseDetails isAdmin={true} />
    </AdminLayout>
  );
}

export default AdminCourseDetails;
