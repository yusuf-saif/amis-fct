import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type ContentStorageType = "news" | "events" | "resources" | "notifications" | "gallery" | "enquiries";

const bucket = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const endpoint = process.env.S3_ENDPOINT;
const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL?.replace(/\/+$/, "");
const uploadPrefix = process.env.S3_UPLOAD_PREFIX?.replace(/^\/+|\/+$/g, "") ?? "";
const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";

const client =
  bucket && region && accessKeyId && secretAccessKey
    ? new S3Client({
        region,
        endpoint: endpoint || undefined,
        forcePathStyle,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      })
    : null;

function withPrefix(key: string) {
  return uploadPrefix ? `${uploadPrefix}/${key}` : key;
}

function encodeKey(key: string) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function isObjectStorageEnabled() {
  return Boolean(client && bucket && publicBaseUrl);
}

export function buildSchoolStorageKey(fileName: string) {
  return withPrefix(`schools/${fileName}`);
}

export function buildContentStorageKey(type: ContentStorageType, fileName: string) {
  return withPrefix(`content/${type}/${fileName}`);
}

function buildStorageUrl(key: string) {
  if (!publicBaseUrl) {
    throw new Error("S3_PUBLIC_BASE_URL must be configured for object storage uploads.");
  }

  return `${publicBaseUrl}/${encodeKey(key)}`;
}

export async function uploadObject(key: string, body: Buffer, contentType: string, cacheControl = "public, max-age=31536000, immutable") {
  if (!client || !bucket) {
    throw new Error("Object storage is not configured.");
  }

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    }),
  );

  return buildStorageUrl(key);
}

export async function deleteObjectByKey(key: string) {
  if (!client || !bucket) {
    return;
  }

  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

export async function readObjectByKey(key: string) {
  if (!client || !bucket) {
    return null;
  }

  try {
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    if (!response.Body) {
      return null;
    }

    return {
      body: Buffer.from(await response.Body.transformToByteArray()),
      contentType: response.ContentType ?? "application/octet-stream",
    };
  } catch {
    return null;
  }
}

export function resolveObjectKeyFromUrl(url: string) {
  if (!publicBaseUrl) {
    return null;
  }

  try {
    const base = new URL(publicBaseUrl);
    const asset = new URL(url);

    if (base.origin !== asset.origin) {
      return null;
    }

    const basePath = base.pathname.replace(/\/+$/, "");
    if (!asset.pathname.startsWith(`${basePath}/`)) {
      return null;
    }

    return decodeURIComponent(asset.pathname.slice(basePath.length + 1));
  } catch {
    return null;
  }
}
