-- CreateTable
CREATE TABLE "FavoriteRepository" (
    "id" SERIAL NOT NULL,
    "repositoryId" TEXT NOT NULL,
    "nameWithOwner" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavoriteRepository_pkey" PRIMARY KEY ("id")
);
