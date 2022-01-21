import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
  
import Hotel from "./Hotel";
import Enrollment from "./Enrollment";
  
  @Entity("rooms")
export default class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    number: string;
  
    @Column()
    max_occupation: number;
    
    @Column()
    hotelId: number;
  
    @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.room)
    hotel: Hotel;
  
    @OneToMany(() => Enrollment, (enrollment: Enrollment) => enrollment.room, { eager: true })
    enrollment: Enrollment[];
  
    static async list(hotelId: number) {
      const rooms = await this.find({
        where: { hotelId },
        order: { id: "ASC" },
      });
  
      return rooms;
    }
   
    static async getByRoomId(id: number) {
      const room = await this.findOne({ where: { id }, relations: ["hotel"] });
      return {
        hotelName: room.hotel.name,
        hotelImage: room.hotel.image,
        roomMaxOccupation: room.max_occupation,
        roomCurOccupation: room.enrollment.length,
        roomNumber: room.number
      };
    }
}

