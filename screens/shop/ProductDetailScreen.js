import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import Colors from '../../constants/Colors'
import Font from '../../constants/Font'
import * as cartAction from '../../store/actions/cart'

const ProductDetailScreen = props => {

  const dispatch = useDispatch()

  const productId = props.route.params.productId
  const seletedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: seletedProduct.imageUrl }} />
      <View style={styles.actions}>
      <Button color={Colors.primary} title="Add To Cart" onPress={() => {
          dispatch(cartAction.addToCart(seletedProduct))
       }} />
      </View>
      <Text style={styles.price}>$ {seletedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{seletedProduct.description}</Text>
    </ScrollView>
  );
};

//navigation ssettings
export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle
  };
};

const styles = StyleSheet.create({
   image:{
        width:'100%',
        height:300
   },
   price:{
     fontSize:20,
     color:'#888',
     textAlign:'center',
     marginVertical:20,
     fontFamily:Font.opensansbold
   },
   description:{
     fontSize:14,
     textAlign:'center',
     marginHorizontal:20,
     fontFamily:Font.opensansreguler
   },
   actions:{ 
      marginVertical:10,
      alignItems:'center' 
   }
});

export default ProductDetailScreen;
