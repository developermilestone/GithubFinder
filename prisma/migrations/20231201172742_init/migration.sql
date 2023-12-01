-- CreateTable
CREATE TABLE "FavoriteRepository" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "repositoryId" TEXT NOT NULL,
    "nameWithOwner" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL
);
