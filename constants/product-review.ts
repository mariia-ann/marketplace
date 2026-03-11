import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';

//for now using this Object, when you have API connectivity, just map the API data with this object, so it can direct fetch
export const productDetailsData = {
  productName: 'Жіночі черевики на підборах з натуральної шкіри',
  productPrice: '4200 ₴',
  productDescription: `Жіночі демісезонні чоботи MALETSKIY "Botki" - комфорт та стиль на кожен день! Ці елегантні жіночі чоботи від MALETSKIY ідеально підійдуть для весняно-осіннього сезону, поєднуючи в собі вишуканий дизайн та неперевершений комфорт. Виготовлені з високоякісної натуральної шкіри та доповнені м'якими замшевими вставками, вони стануть незамінним елементом вашого гардеробу.`,
  productFeatures: [
    {
      title: `Матеріал`,
      data: `Натуральна високоякісна шкіра в поєднанні з м'якими замшевими вставками`,
    },
    {
      title: `Дизайн`,
      data: `Класичний силует "ботфорти" з елегантною пряжкою та функціональною блискавкою додає чоботам сучасного та стильного вигляду`,
    },
    {
      title: `Підошва`,
      data: ` Міцна гумова підошва з глибоким протектором забезпечує відмінне зчеплення з поверхнею та стійкість на будь-якій дорозі, а також додає зручності при ходьбі`,
    },
    {
      title: `Каблук`,
      data: `Стійкий, помірно високий каблук (під дерево)`,
    },
    {
      title: `Комфорт`,
      data: `Зручна колодка та м'яка внутрішня підкладка`,
    },
    {
      title: `Практичність`,
      data: `Бічна блискавка полегшує взування та знімання чобіт. Регульована пряжка дозволяє адаптувати модель до індивідуальних особливостей ноги`,
    },
  ],
  productDiscountedPrice: '3600 ₴',
  productRating: '4.5',
  productTotalNumberofrating: '12',
  productReviews: '',
  productId: '9000000076543',
  inStock: true,
  productColors: [
    {
      color: '#C58351',
      available: true,
    },
    {
      color: '#A15221',
      available: true,
    },
    {
      color: '#523E37',
      available: true,
    },
    {
      color: '#272726',
      available: true,
    },
    {
      color: '#303E4D',
      available: false,
    },
  ],
  productSize: [
    {
      size: 36,
      available: true,
    },
    {
      size: 37,
      available: true,
    },
    { size: 38, available: true },
    { size: 39, available: true },
    { size: 40, available: false },
    { size: 41, available: false },
    { size: 42, available: false },
    { size: 43, available: true },
    { size: 44, available: true },
    { size: 45, available: true },
    { size: 46, available: true },
  ],
  productInformation: [
    {
      brandName: 'Матеріал',
      value:
        'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit',
    },
    {
      title: 'Таблиця розмірів',
      link: '/profile/product-review/table-of-sizes',
    },
    {
      title: 'Оплата',
      cardOffers: [
        {
          cardIcon: CUSTOM_ICON_REF.CreditCard,
          name: 'Оплата карткою онлайн',
          description: 'Повертаємо гроші при відмові від посилки',
        },
        {
          cardIcon: CUSTOM_ICON_REF.Wallet,
          name: 'Післяплата',
          description: `У відділенні Нової Пошти`,
        },
      ],
    },
  ],
  productsReviews: [
    {
      customerName: 'Іван Іваненко',
      date: '2024-05-01',
      rating: 4.0,
      description:
        'Якість товару відповідає опису, швидка доставка. Рекомендую!',
      isConfirmedPurchase: true,
      images: [
        'https://example.com/review1_image1.jpg',
        'https://example.com/review1_image2.jpg',
        'https://example.com/review1_image3.jpg',
        'https://example.com/review1_image4.jpg',
      ],
      likes: 12,
      dislikes: 2,
      commentCount: 3,
      comments: [
        {
          commenterName: 'Петро Петров',
          commentDate: '2024-05-02',
          commentText: 'Дякую за відгук! Чи підійшов розмір?',
        },
        {
          commenterName: 'Іван Іваненко',
          commentDate: '2024-05-03',
          commentText: 'Так, розмір підійшов і товар дуже зручний.',
        },
      ],
    },
    {
      customerName: 'Олена Коваль',
      date: '2024-04-28',
      rating: 5.0,
      description:
        'Прекрасний сервіс та відмінна якість. Дуже задоволена покупкою!',
      isConfirmedPurchase: false,
      images: ['https://example.com/review2_image1.jpg'],
      likes: 20,
      dislikes: 1,
      commentCount: 5,
      comments: [
        {
          commenterName: 'Марія Марченко',
          commentDate: '2024-04-29',
          commentText: 'Дякую за відгук! Чи швидко доставили?',
        },
        {
          commenterName: 'Олена Коваль',
          commentDate: '2024-04-30',
          commentText:
            'Так, доставка була дуже швидкою, отримала товар за 2 дні.',
        },
      ],
    },
  ],
};
