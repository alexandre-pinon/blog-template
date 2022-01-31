// Metadata
export const appName = process.env.APP_NAME

// DB
export const mongoURI = process.env.MONGOOSE_URI

// GCS
export const bucketName = process.env.GCP_BUCKET_NAME

const envFullyLoaded = appName && mongoURI && bucketName

if (!envFullyLoaded)
  throw new Error('One or more environment variable(s) is(are) missing! Please check your .env file!')
