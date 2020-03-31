import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.avaliableProducts);

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Product"
};

export default ProductOverviewScreen;
