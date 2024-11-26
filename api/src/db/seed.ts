import { dataSource } from "./client";

import { Lang } from "../langs/lang.entities";
import langs from "../../data/langs.json";

import { Status } from "../status/status.entities";
import status from "../../data/status.json";

import { Repo } from "../repos/repo.entities";
import repos from "../../data/repos.json";
import repoLang from "../../data/repoLang.json"

(async() => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  console.log("Starting seeder")

  try {
    // await queryRunner.startTransaction()
    // await queryRunner.query('DELETE FROM repo_languages_lang');
    // await queryRunner.query('DELETE FROM lang');
    // await queryRunner.query('DELETE FROM repo');
    // await queryRunner.query('DELETE FROM status');
    // await queryRunner.query('DELETE FROM sqlite_sequence WHERE name="status" OR name="lang"');
    await queryRunner.startTransaction();
    await queryRunner.query("TRUNCATE repo_languages_lang CASCADE");
    await queryRunner.query("TRUNCATE lang CASCADE");
    await queryRunner.query("TRUNCATE repo CASCADE");
    await queryRunner.query("TRUNCATE status CASCADE");
    // await queryRunner.query(`ALTER SEQUENCE lang_id_seq RESTART WITH 1;`);
    // await queryRunner.query(`ALTER SEQUENCE status_id_seq RESTART WITH 1;`);

    console.log("Truncate DONE");
    await queryRunner.commitTransaction();

    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.name = el.name;

        return await lang.save();
      })
    )
    console.info("Langs saved");
    //console.log(savedlangs)

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.name;

        return await status.save();
      })
    )

    //console.log(savedStatus)
    console.info("Status saved");
    // const savedRepos = 
    await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        // // const status = savedStatus.find((st) => st.id === el.isPrivate) as Status;
        // // repo.status = status;
        // const status = savedStatus.find(
        //   (st) => st.id === el.isPrivate
        // ) as Status;
        repo.status = savedStatus[0];

        const mylangs = savedlangs.filter((svLg) => {
          console.log("repoID", el.id)
          const associatedlang = repoLang.filter(lgbyrep => lgbyrep.repo_id === el.id);
          console.log("A", associatedlang)
          const langLabel = langs.filter(lg => associatedlang.some((assolg) => assolg.lang_id === lg.id))
          return langLabel.some(lgLabel => lgLabel.name === svLg.name)
        })
        repo.languages = mylangs;
        repo.isFavorite = false;

        return await repo.save();
      })
    )

    //console.log(savedRepos)

    // await queryRunner.commitTransaction();
    console.info("Seeder is DONE");
    await dataSource.destroy();
    return;

  } catch (error) {
    console.log(error)
    await queryRunner.rollbackTransaction();
  }

})()