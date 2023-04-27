import { prisma } from '@/config';

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function getBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function updateBooking(bookingId: number, roomId: number, userId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
      userId,
    },
  });
}

const bookingsRepository = {
  createBooking,
  getBookingByUserId,
  updateBooking,
};

export default bookingsRepository;
