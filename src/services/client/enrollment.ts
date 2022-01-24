import EnrollmentData from "@/interfaces/enrollment";
import Enrollment from "@/entities/Enrollment";

export async function createNewEnrollment(enrollmentData: EnrollmentData) {
  const enrollment = await Enrollment.createOrUpdate(enrollmentData);  
  return enrollment;
}

export async function getEnrollmentWithAddress(userId: number) {
  return await Enrollment.getByUserId(userId);
}
