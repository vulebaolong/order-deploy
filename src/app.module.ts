import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules-microservice/order/order.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { RabbitMqModule } from './modules-system/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [OrderModule, PrismaModule, RabbitMqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
