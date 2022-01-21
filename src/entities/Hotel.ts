import {  Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    image: string;

    @OneToMany(() => Room, (room: Room) => room.hotel, { eager: true })
    room: Room[];

    static async getAll() {
      const hotels = await this.find();
      return this.getAcomodationsTypes(hotels);
    }

    static getAcomodationsTypes(hotels: Hotel[]) {
      return hotels.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        vacancies: hotel.room.reduce((sum, li) => sum + li.max_occupation - li.enrollment.length, 0),
      }));
    }
}
