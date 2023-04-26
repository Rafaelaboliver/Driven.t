import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

const bookingsRepository = {
  createBooking,
};

export default bookingsRepository;
