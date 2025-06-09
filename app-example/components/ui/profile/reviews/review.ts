import { ImageSourcePropType } from "react-native";

interface AddressCardProps {
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
}

export const mockReview: AddressCardProps = {
  title: "Брюки жіночі 9873 Сірі",
  articul: 9000000018541,
  seller: "Назва Продавця",
  image: require("@/assets/images/reviews/product-review.png"),
  price: 1500,
  size: "M",
  quantity: 1,
  confirmed: true,
  rating: 4.9,
  response:
    "Брюки чудової якості — тканина приємна до тіла та гарно дихає. Сидять ідеально, повністю відповідають розмірній сітці та фото на сайті. Дуже задоволена покупкою, рекомендую!",
};