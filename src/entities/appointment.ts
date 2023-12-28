export interface AppointmentProps {
    startAt: Date,
    endsAt: Date,
    customer: string
}

export class Appointment {
    private props: AppointmentProps

    get customer () {
        return this.props.customer
    }

    get startAt () {
        return this.props.startAt
    }

    get endAt () {
        return this.props.endsAt
    }

    constructor(props: AppointmentProps) {
        const { startAt, endsAt } = props

        if(startAt <= new Date()){
            throw new Error ('Invalid start date');
        }

        if(endsAt <= startAt) {
            throw new Error ('Invalid end date');
        }
        this.props = props
    }
}