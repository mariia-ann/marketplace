import Colors from '@/constants/Colors';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React from 'react';
import { Text, View, Image } from 'react-native';

interface FeedbackCardsProps {
  customerName: string;
  date: string;
  rating: number;
  description: string;
  isConfirmedPurchase?: boolean;
  images?: string[];
  likes?: number;
  dislikes?: number;
  commentCount?: number;
  comments?: any[];
}

function FeedbackCards(props: FeedbackCardsProps) {
  const {
    customerName,
    isConfirmedPurchase,
    date,
    description,
    rating,
    commentCount,
    dislikes,
    images,
    likes,
  } = props;

  const iconSizeThumbs = 25;
  const iconSizeSealCheck = 35;
  const iconSizeComment = 30;
  const imageContainerSize = 120;
  return (
    <View
      style={{
        marginBottom: 15,
        backgroundColor: Colors.white,
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#00000060',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        padding: 15,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>{customerName}</Text>
        <Text>{date}</Text>
      </View>
      {isConfirmedPurchase && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.SealCheck}
            baseStyle={{
              width: iconSizeSealCheck,
              height: iconSizeSealCheck,
              color: '#8E6CEF',
            }}
          />
          <Text style={{ paddingLeft: 10 }}>Підтверджена покупка</Text>
        </View>
      )}
      {rating && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Star}
            baseStyle={{ width: 16, height: 16, color: Colors.yellow }}
          />
          <Text style={{ paddingLeft: 5, fontWeight: 'bold' }}>
            {rating.toFixed(1)}
          </Text>
        </View>
      )}
      <Text style={{ marginTop: 10 }}>{description}</Text>
      {images && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}
        >
          {images.slice(0, 2).map((image, index) => (
            <View
              key={index}
              style={{
                width: imageContainerSize,
                height: imageContainerSize,
                backgroundColor: '#f0f0f0',
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
              />
            </View>
          ))}
        </View>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingTop: 10,
          paddingBottom: 10,
          borderColor: '#e0e0e0',
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 15,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.ThumbsDown}
            baseStyle={{
              width: iconSizeThumbs,
              height: iconSizeThumbs,
              color: Colors.blackMain,
            }}
          />
          <Text style={{ paddingLeft: 5 }}>{dislikes}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.ThumbsUp}
            baseStyle={{
              width: iconSizeThumbs,
              height: iconSizeThumbs,
              color: Colors.blackMain,
            }}
          />
          <Text style={{ paddingLeft: 5 }}>{likes}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          borderColor: '#e0e0e0',
          borderTopWidth: 1,
        }}
      >
        <SvgIcons
          name={CUSTOM_ICON_REF.WriteCommentIcon}
          baseStyle={{
            width: iconSizeComment,
            height: iconSizeComment,
            color: Colors.blackMain,
          }}
        />
        <Text style={{ color: Colors.softPurple, fontSize: 15 }}>
          коментарів: ({commentCount})
        </Text>
      </View>
    </View>
  );
}

export default FeedbackCards;
