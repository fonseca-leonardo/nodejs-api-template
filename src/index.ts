import 'dotenv/config';

import HttpServer from '@shared/infra/http';

async function main() {
  const api = new HttpServer();

  const server = await api.init();

  server.listen(process.env.PORT, () => {
    console.log(
      `#### Server started on port ${process.env.PORT} and enviroment ${process.env.ENVIROMENT} ####`,
    );
  });
}

main();
