import {  Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    max_occupation: number; // pode excluir
    
    @Column()
    image: string;

    @Column()
    total_rooms: number;

    @OneToMany(() => Room, (room: Room) => room.hotel)
    room: Room[];

    static async getAll() {
      return await this.find();
    }
}
