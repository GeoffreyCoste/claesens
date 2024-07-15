import {
    calculateDaysSince
} from "@/utils/calculateDaySince";

export const counters = [{
        value: 10,
        label: 'années dans le e-commerce',
    },
    {
        value: 5,
        label: 'années en agence',
    },
    {
        value: 4,
        label: 'années en freelance',
    },
    {
        value: calculateDaysSince('1988-04-07'),
        label: 'jours passés sur terre',
    },
];