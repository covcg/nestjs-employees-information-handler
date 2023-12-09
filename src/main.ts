import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
  if (process.env.NODE_ENV === 'local') {
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  }
}
bootstrap();
