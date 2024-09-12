import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import { db } from "../config/database";
// FOR TEST PURPOSES ON;Y

export const PASSWORD = "Tester@admin.1";
export const createRandomUser = async () => {
  return await db.user.create({
    data: {
      email: faker.internet.email(),
      firstName: faker.internet.displayName(),
      lastName: faker.internet.displayName(),
      password: {
        create: {
          content: await bcryptjs.hash(PASSWORD, 10),
        },
      },
    },
  });
};

export const getRandomUserInfo = () => {
  return {
    email: faker.internet.email(),
    firstName: faker.internet.displayName(),
    lastName: faker.internet.displayName(),
    password: PASSWORD,
  };
};

export const getRandomStoreInfo = () => {
  return {
    image: faker.image.urlPicsumPhotos(),
    name: faker.commerce.productName(),
    focus: faker.lorem.lines(1),
    portfolio: faker.internet.domainName(),
    bio: faker.lorem.lines(2),
    social: [faker.internet.domainName()],
    custodianAccountAgreement: true,
  };
};
