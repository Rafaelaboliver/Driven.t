import { Booking, Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

async function getHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function getHotelById(id: number): Promise<Hotel> {
  return prisma.hotel.findFirst({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

async function getHotelRoom(id: number): Promise<
  Room & {
    Booking: Booking[];
  }
> {
  return prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      Booking: true,
    },
  });
}

const hotelsRepository = {
  getHotels,
  getHotelById,
  getHotelRoom,
};

export default hotelsRepository;
