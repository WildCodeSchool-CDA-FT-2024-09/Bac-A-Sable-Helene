
BEGIN;

DROP TABLE IF EXISTS "repo", "status", "commentary", "language";

CREATE TABLE IF NOT EXISTS "status" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"label" TEXT NOT NULL,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "language" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"name" TEXT NOT NULL,
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "repo" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"title" TEXT NOT NULL,
"url" TEXT NOT NULL,
"language_id" posit_int NOT NULL REFERENCES "language"("id"),
"status_id" posit_int NOT NULL REFERENCES "status"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "commentary" (
"id" INTEGER PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
"description" TEXT NOT NULL,
"repo_id" posit_int NOT NULL REFERENCES "repo"("id"),
"created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
"updated_at" TIMESTAMPTZ
);

COMMIT;