import * as Yup from "yup";

export const AddStatusValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Status name is required")
    .min(2, "Status name must be at least 2 characters long")
    .max(50, "Status name must be at most 50 characters long"),
  color: Yup.string()
    .required("Status color is required")
    .matches(/^#[0-9A-F]{6}$/i, "Status color must be a valid hex color code"),
  description: Yup.string().max(
    200,
    "Description must be at most 200 characters long"
  ),
  sequence: Yup.string()
    .required("Sequence is required")
    .matches(/^[0-9]+$/, "Sequence must be a number"),
});
