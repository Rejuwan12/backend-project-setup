import app from './app';
import { server } from './app/config';
import mongoose from 'mongoose';



async function main() {
  await mongoose.connect(server.database_url as string);

  app.listen(server.port, () => {
    console.log(`Example app listening on port ${server.port}`);
  });
}

main();
