import { describe, expect, it } from "vitest";
import { createAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../test/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const sut = new createAppointment(
            appointmentsRepository
        )

        const startAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-11');

        expect(sut.execute({
            customer: 'Isaac Sousa',
            endsAt,
            startAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlapping dates', async () => {
        const startAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-15');

        const appointmentsRepository = new InMemoryAppointmentsRepository()
        const sut = new createAppointment(
            appointmentsRepository
        )

        await sut.execute({
            customer: 'Isaac Sousa',
            startAt,
            endsAt
        })

        expect(sut.execute({
            customer: 'Isaac Sousa',
            startAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'Isaac Sousa',
            startAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-12')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'Isaac Sousa',
            startAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-17')
        })).rejects.toBeInstanceOf(Error)

        expect(sut.execute({
            customer: 'Isaac Sousa',
            startAt: getFutureDate('2022-08-11'),
            endsAt: getFutureDate('2022-08-12')
        })).rejects.toBeInstanceOf(Error)
    })
})