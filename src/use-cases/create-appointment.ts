import { Appointment } from "../entities/appointment"
import { AppointmentsRepository } from "../repositories/appointments-repository"

interface CreateAppointmentRequest {
    customer: String,
    startAt: Date,
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class createAppointment {
    constructor(
        private appointmentsRepository: AppointmentsRepository
    ) {}

    async execute({ customer, startAt, endsAt }: CreateAppointmentRequest ): Promise<CreateAppointmentResponse> {

        const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
            startAt,
            endsAt
        )

        if(overlappingAppointment) {
            throw new Error('Another appoitment overlaps this appointment dates')
        }

        const appointment = new Appointment({
            customer,
            startAt,
            endsAt
        })

        await this.appointmentsRepository.create(appointment)

        return appointment
    }
}