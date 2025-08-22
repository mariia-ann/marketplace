const orders = [
    {
        id: 1,
        orderNumber: 123456789,
        date: "11.07.2025",
        time: "15:42",

        orderStatus: {
            status: "Доставлено",
            statusDate: "10.07.2025 | 02:40",
            tracking: [
                {
                    dateTracking: "10.07.2025",
                    timeTracking: "18:30",
                    nameTracking: "Отримано",
                    isLast: true,
                },
                {
                    dateTracking: "08.07.2025",
                    timeTracking: "22:00",
                    nameTracking: "Передано в доставку",
                    isLast: false,
                },
                {
                    dateTracking: "01.07.2025",
                    timeTracking: "14:27",
                    nameTracking: "Доставляється",
                    isLast: false,
                },
                {
                    dateTracking: "20.06.2025",
                    timeTracking: "18:45",
                    nameTracking: "Продавець відправив \nзамовлення в службу доставки",
                    isLast: false,
                },
                {
                    dateTracking: "19.06.2025",
                    timeTracking: "09:27",
                    nameTracking: "Продавець обробляє \nзамовлення",
                    isLast: false,
                },
                {
                    dateTracking: "19.06.2025",
                    timeTracking: "02:30",
                    nameTracking: "Ви створили замовлення",
                    isLast: false,
                },
            ]
        },

        orderList: {
            items: [
                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: "Брюки жіночі 9873 Сірі",
                    articul: 9000000018541,
                    seller: "Назва Продавця",
                    color: "black",
                    size: "M",
                    quantity: 1,
                    price: 1500,
                },
                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: 'Кросівки',
                    articul: 789012,
                    seller: 'Adidas',
                    color: 'white',
                    size: '42',
                    quantity: 1,
                    price: 2499,
                },
                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: 'Кросівки',
                    articul: 789012,
                    seller: 'Adidas',
                    color: 'white',
                    size: '42',
                    quantity: 1,
                    price: 2499,
                },

                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: 'Кросівки',
                    articul: 789012,
                    seller: 'Adidas',
                    color: 'white',
                    size: '42',
                    quantity: 1,
                    price: 2499,
                },
            ]
        },

        orderDetail: {
            numberTTN: "204503234523",
            recipient: "Катерина Коновалова",
            phone: "+380 99 876-54-32",
            deliveryMethod: "Самовивіз з Нової Пошти",
            addressDelivery: "Київ, Відділення № 131, просп. Академіка Палладіна, 20",
        },

        paymentDetail: {
            status: 'Сплачено',
            paymentMethod: 'Карткою онлайн',
            paymentOrder: 2500,
            paymentDelivery: 0,
            amount: 2500,
        }
    },

    //Order №2
    {
        id: 2,
        orderNumber: 65378259824,
        date: "07.07.2025",
        time: "02:43",

        orderStatus: {
            status: "Обробляється продавцем",
            statusDate: "07.07.2025 | 14:30",
            tracking: [
                {
                    dateTracking: "10.07.2025",
                    timeTracking: "18:30",
                    nameTracking: "Отримано",
                    isLast: true,
                },
                {
                    dateTracking: "08.07.2025",
                    timeTracking: "22:00",
                    nameTracking: "Передано в доставку",
                    isLast: false,
                },
                {
                    dateTracking: "01.07.2025",
                    timeTracking: "14:27",
                    nameTracking: "Доставляється",
                    isLast: false,
                },
                {
                    dateTracking: "20.06.2025",
                    timeTracking: "18:45",
                    nameTracking: "Продавець відправив \nзамовлення в службу доставки",
                    isLast: false,
                },
                {
                    dateTracking: "19.06.2025",
                    timeTracking: "09:27",
                    nameTracking: "Продавець обробляє \nзамовлення",
                    isLast: false,
                },
                {
                    dateTracking: "19.06.2025",
                    timeTracking: "02:30",
                    nameTracking: "Ви створили замовлення",
                    isLast: false,
                },
            ]
        },

        orderList: {
            items: [
                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: "Брюки жіночі 9873 Сірі",
                    articul: 9000000018541,
                    seller: "Назва Продавця",
                    color: "black",
                    size: "M",
                    quantity: 1,
                    price: 1500,
                },
                {
                    image: require("@/assets/images/reviews/product-review.png"),
                    title: 'Кросівки',
                    articul: 789012,
                    seller: 'Adidas',
                    color: '#000000',
                    size: '42',
                    quantity: 1,
                    price: 2499,
                }
            ]
        },


        orderDetail: {
            numberTTN: "204503234523",
            recipient: "Катерина Коновалова",
            phone: "+380 99 876-54-32",
            deliveryMethod: "Самовивіз з Нової Пошти",
            addressDelivery: "Київ, Відділення № 131, просп. Академіка Палладіна, 20",
        },

        paymentDetail: {
            status: 'Сплачено',
            paymentMethod: 'Карткою онлайн',
            paymentOrder: 2500,
            paymentDelivery: 0,
            amount: 2500,
        }
    },
];
export default orders;