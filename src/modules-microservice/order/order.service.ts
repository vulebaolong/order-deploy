import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { EMAIL_SERVICE } from 'src/common/constant/rabbit-mq.constant';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderNew = await this.prisma.orders.create({
      data: {
        userId: createOrderDto.userId,
        foodId: createOrderDto.foodId,
      },
      include: {
        Foods: true,
        Users: true,
      },
    });

    // emit: không quan trọng kết quả trả về (fire and forget)
    // @EventPartern()
    this.client.emit("createEmail", orderNew)

    console.log({ createOrderDto, orderNew });

    return true;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
