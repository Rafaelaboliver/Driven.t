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

async function checkBookingWithIdAndUserId(id: number, userId: number) {
  return prisma.booking.findFirst({
    where: {
      id,
      userId,
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
  checkBookingWithIdAndUserId,
  updateBooking,
};

export default bookingsRepository;
