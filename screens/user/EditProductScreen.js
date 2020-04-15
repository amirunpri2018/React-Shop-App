import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Alert
} from "react-native";
import Font from "../../constants/Font";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI//HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as proudctsActions from "../../store/actions/products";

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [titleIsValid,settitleIsValid]=useState(false)
  const [imageUrl, setimageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if(!titleIsValid){
       Alert.alert('Wrong Input','Please Check the error in the form',[
         {text:'Okay'}
        ])
       return;
    }
    if (editedProduct) {
      dispatch(
        proudctsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        proudctsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price,titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleChangeHandler = text =>{
       if(text.trim().length > 0){
          settitleIsValid(true)
       }else{
          settitleIsValid(false)
       }
       setTitle(text)
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onEndEditing={()=>{
              console.log('Onendediting')
            }}
            onSubmitEditing={()=>{
              console.log('onsubmiting')
            }}
          />
          {!titleIsValid && <Text>Pleas enter a valid title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setimageUrl(text)}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType='decimal-pad'
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitfn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitfn}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: Font.opensansbold,
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
