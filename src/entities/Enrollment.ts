import CpfNotAvailableError from "@/errors/CpfNotAvailable";
import EnrollmentData from "@/interfaces/enrollment";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import Address from "@/entities/Address";
import Room from "./Room";
import User from "./User";

@Entity("enrollments")
export default class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @Column({ nullable: true })
  roomId: number;

  @OneToOne(() => Address, (address) => address.enrollment, { eager: true })
  address: Address;

  @ManyToOne(() => Room, (room: Room) => room.enrollment)
  @JoinColumn()
  room: Room;

  @OneToOne(() => User, (user) => user.enrollment)
  @JoinColumn()
  user: User;

  populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;
    this.address ||=  Address.create();
    
    const { address } = this;

    address.cep = data.address.cep;
    address.street = data.address.street;
    address.city = data.address.city;
    address.number = data.address.number;
    address.state = data.address.state;
    address.neighborhood = data.address.neighborhood;
    address.addressDetail = data.address.addressDetail;
  }

  static async createOrUpdate(data: EnrollmentData) {
    let enrollment = await this.findOne({ where: { cpf: data.cpf } });

    if(enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf);
    }

    enrollment = await this.findOne({ where: { userId: data.userId } });

    enrollment ||= Enrollment.create();
    enrollment.populateFromData(data);
    await enrollment.save();

    enrollment.address.enrollmentId = enrollment.id;
    await enrollment.address.save();
    return enrollment;
  }

  static async saveNewBooking(userId: number, roomId: number) {
    const previousBooking = await this.getByUserId(userId);
    previousBooking.roomId = roomId;
    await previousBooking.save();
  }

  static async getByUserId(userId: number) {
    return await this.findOne({ userId });
  }
}
