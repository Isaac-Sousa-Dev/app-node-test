import { expect, test } from 'vitest'
import { Appointment } from './appointment'
import { getFutureDate } from '../test/utils/get-future-date';

test('create an appointment', () => {
    const startAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-11');

    startAt.setDate(startAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2);

    const appointment = new Appointment({
        customer: 'Isaac Sousa',
        startAt,
        endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('Isaac Sousa')
})

test('cannot create appointment with end date before start date', () => {
    const startAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-09');

    startAt.setDate(startAt.getDate() + 2)
    endsAt.setDate(endsAt.getDate() - 1)

    expect(() => {
    return new Appointment({
        customer: 'Isaac Sousa',
        startAt,
        endsAt
    })
   }).toThrow()
})

test('cannot create appointment with end date before now', () => {
    const startAt = new Date();
    const endsAt = new Date();

    startAt.setDate(startAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 3);

   expect(() => {
    return new Appointment({
        customer: 'Isaac Sousa',
        startAt,
        endsAt
    })
   }).toThrow()
})