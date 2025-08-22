import { Comment } from "@/src/types/Comment";
import { ImageSourcePropType } from "react-native";

interface ProductReview
{
  title: string;
  articul: number;
  seller: string;
  image: ImageSourcePropType;
  price: number;
  size: string;
  quantity: number;
  confirmed: boolean;
  rating: number;
  response: string;
  comments?: Comment[];
}

export const mockReview: ProductReview = {
  title: "Брюки жіночі 9873 Сірі",
  articul: 9000000018541,
  seller: "Назва Продавця",
  image: require( "@/assets/images/reviews/product-review.png" ),
  price: 1500,
  size: "M",
  quantity: 1,
  confirmed: true,
  rating: 4.9,
  response:
    "Брюки чудової якості — тканина приємна до тіла та гарно дихає. Сидять ідеально, повністю відповідають розмірній сітці та фото на сайті. Дуже задоволена покупкою, рекомендую!",
  comments: [
    {
      author: "Продавець",
      date: "20.04.2025",
      comment:
        "Щиро дякуємо за відгук! Нам надзвичайно приємно, що ви задоволені покупкою — ми справді стараємося створювати якісні речі, які приносять радість нашим клієнтам. Будемо раді бачити вас знову!",
      answers: [],
    },
    {
      author: "Оксана В.",
      date: "20.04.2025",
      comment:
        "Чи не сідає тканина після прання? Цікавлюсь, бо теж планую замовити 😊",
      answers: [
        {
          author: "Катерина",
          date: "22.04.2025",
          answer:
            "Я вже кілька разів прала — тканина зовсім не сіла, вигляд залишився такий самий. Дотримувалась рекомендацій: прала при 30°C і без сушарки. Брюки досі як нові, дуже задоволена покупкою 😊",
        },
      ],
    },
  ],
};
