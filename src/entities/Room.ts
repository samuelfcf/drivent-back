import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
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
  
    @ManyToMany(() => Enrollment, (enrollment: Enrollment) => enrollment.room)
    enrollment: Enrollment;
  
    static async list(hotelId: number) {
      const rooms = await this.find({
        where: { hotelId },
        order: { id: "ASC" },
      });
  
      return rooms;
    }
   
    static async getByRoomId(id: number) {
      const room = await this.findOne({ where: { id }, relations: ["hotel"] });
      return room;
    }
}
