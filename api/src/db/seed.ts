import { dataSource } from "./client";
import { Lang } from "../langs/lang.entities";
import langs from "../../data/langs.json";

(async() => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  console.log("Hello")

  try {
    await queryRunner.startTransaction()
    await queryRunner.query('DELETE FROM repo_languages_lang');
    await queryRunner.query('DELETE FROM lang');
    await queryRunner.query('DELETE FROM repo');
    await queryRunner.query('DELETE FROM status');
    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name="status" OR name="lang"');

    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.name = el.name;

        return await lang.save();
      })
    )
    console.log(savedlangs)


    await queryRunner.commitTransaction();

  } catch (error) {
    console.log(error)
    await queryRunner.rollbackTransaction();
  }

})()