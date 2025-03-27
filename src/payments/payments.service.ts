import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {
    // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    //   apiVersion: '2023-10-16',
    // });
  }

  async processDeposit({
    userId,
    amount,
    bookingId,
  }: {
    userId: string;
    amount: number;
    bookingId?: string | null;
  }) {
    try {
      // Retrieve user's payment method or default card
      // const paymentMethod = await this.stripe.paymentMethods.list({
      //   customer: userId,
      //   type: 'card',
      // });
      // // Create payment intent
      // const paymentIntent = await this.stripe.paymentIntents.create({
      //   amount: Math.round(amount * 100), // Convert to cents
      //   currency: 'usd',
      //   customer: userId,
      //   payment_method: paymentMethod.data[0].id,
      //   confirm: true,
      //   metadata: {
      //     bookingId: bookingId || 'pending',
      //     type: 'deposit',
      //   },
      // });
      // return {
      //   transactionId: paymentIntent.id,
      //   status: paymentIntent.status,
      // };
    } catch (error) {
      throw new BadRequestException(`Payment failed: ${error.message}`);
    }
  }
  async create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: createPaymentDto,
    });
  }

  async findAll() {
    return this.prisma.payment.findMany({
      include: {
        user: { select: { username: true, email: true } },
        booking: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: { select: { username: true, email: true } },
        booking: true,
      },
    });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.payment.delete({
      where: { id },
    });
  }
}
