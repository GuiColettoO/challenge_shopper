import sequelize from '../../@shared/infrastructure/db/sequelize/database.service';
import app from './express';

async function setupApp() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    const port: number = Number(process.env.PORT || 8080);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Erro ao configurar a aplicação', error);
    process.exit(1);
  }
}

setupApp();
