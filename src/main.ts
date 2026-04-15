import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RABBIT_MQ_URL } from './common/constant/app.constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_MQ_URL!],
      queue: 'order_queue',
      queueOptions: {
        durable: false,
      },
      socketOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: 'order-on',
          },
        },
      },
    },
  });
  await app.listen();
}
bootstrap();
