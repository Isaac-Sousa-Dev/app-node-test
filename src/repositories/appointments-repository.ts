import { Appointment } from "../entities/appointment";

export interface AppointmentsRepository {
    create(appointment: Appointment): Promise<void>
    findOverlappingAppointment(startAt: Date, endsAt: Date): Promise<Appointment | null>
}