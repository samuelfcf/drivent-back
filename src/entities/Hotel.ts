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

    @OneToMany(() => Room, (room: Room) => room.hotel)
    room: Room[];

    static async getAll() {
      return await this.find();
    }
}
