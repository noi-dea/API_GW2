import "dotenv/config";

const {
  MONGO_URI,
  JWT_SECRET,
  SENDGRID_API_KEY,
  BASE_URL,
  SENDGRID_TEMPLATE_ID_VERIFY,
  FROM_EMAIL,
} = process.env;

if (
  !MONGO_URI ||
  !JWT_SECRET ||
  !SENDGRID_API_KEY ||
  !BASE_URL ||
  !SENDGRID_TEMPLATE_ID_VERIFY ||
  !FROM_EMAIL
) {
  throw new Error("ENV is missing!");
}

export {
  MONGO_URI,
  JWT_SECRET,
  SENDGRID_API_KEY,
  BASE_URL,
  SENDGRID_TEMPLATE_ID_VERIFY,
  FROM_EMAIL,
};
