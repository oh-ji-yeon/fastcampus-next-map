import { PrismaClient } from "@prisma/client";
import * as data from "../src/data/store_data.json";

const prisma = new PrismaClient();

async function seedData() {
  data?.["DATA"]?.map(async (store) => {
    // data에 DATA를 가져와 배열을 맵핑하면서 원하는 필드만 추가
    const storeData = {
      // storeData 정리
      phone: store?.tel_no,
      address: store?.rdn_code_nm,
      lat: store?.y_dnts,
      lng: store?.x_cnts,
      name: store?.upso_nm,
      category: store?.bizcnd_code_nm,
      storeType: store?.cob_code_nm,
      foodCertifyName: store?.crtfc_gbn_nm,
    };

    // storeData 생성
    const res = await prisma.store.create({
      data: storeData,
    });
    console.log(res);
  });
}

async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
