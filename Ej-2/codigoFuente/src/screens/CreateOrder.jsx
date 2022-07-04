import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  FlatList,
  Image,
  Pressable,
  Alert
} from 'react-native'
import React, { useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import carouselItem from '../utils/carousel.json';
import { send_order_redux } from '../reducer/actionReducer';
const {width, height} = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';
import clientAxios from '../../axios';



export default function CreateOrder() {
  const dispatch = useDispatch();
  const reducer = useSelector(state => state.mainReducer); 
  const viewabilityConfig = {
    waitForInteraction: false,
      viewAreaCoveragePercentThreshold: 100
  }
  const [tableNo, setTableNo] = useState(Math.floor(Math.random()*20));
  const [initialState, setInitialState] = useState(null);
  const [sizeSelected, setSizeSelected] = useState({
    one:true,
    two:false,
    three:false
  });
  const [qtyPizza, setQtyPizza] = useState(1)
  const [order, setOrder] = useState({
    orderId:null,
    name:null,
    qty:0,
    size:null,
    price:0
  });
  const [price,setPrice] = useState(5)
  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
  let size = sizeSelected.one ? '10 inch' : 
  sizeSelected.two ? '15 inch' : '25 inch';
  try {
    console.log(reducer.token ? 'existe el token' : 'no existe el token')
      const config = {
        headers: {
          Authorization:`Bearer ${reducer.token}`
        }
      }
      const response = await clientAxios.post('/orders',{Size:size,
        Crust:'Normal',
        Table_No:tableNo,
        Flavor:order.name},
        config)
      Alert.alert(
        'Pedido guardado con éxito, revise su carrito',
        "",
        [
          { text: "OK", onPress: () => console.log('200')} 
        ]
      )
    } catch (error) {
      console.log('entro en errores')
      let errors = error.response.data;
      if(errors.status === 409){
        Alert.alert(
          'Pedido ya cargado',
          "",
          [
            { text: "OK", onPress: () => console.log('200')} 
          ]
        )
      }
    }
  }
  //handle events
  const handleChange = (e) => {
   if(e === 1){
    setSizeSelected({
      one:true,
      two:false,
      three:false
    });
    setPrice(initialState.price);
   }else if(e === 2){
    setSizeSelected({
      one:false,
      two:true,
      three:false
    });
    setPrice(initialState.price*1.5)
   }else if(e === 3){
    setSizeSelected({
      one:false,
      two:false,
      three:true
    });
    setPrice(initialState.price*2.5);
   }
   setQtyPizza(1);
   return;
  };
  const handleQty = (e) => {
    let val = sizeSelected.one ? 1 : sizeSelected.two ? 1.5 : 2.5;
    if(e === 'plus'){
      setQtyPizza(qtyPizza +1);
      setPrice(initialState.price*(qtyPizza+1)*val);
    };
    if(e === 'minus'){
      setQtyPizza(qtyPizza-1);
      setPrice(initialState.price*(qtyPizza-1)*val);

    };
  }
 
  //items
  const renderItems = ({item}) => {
    return <Pressable 
    onPress={() => console.log(item.id)}
    activeOpacity={1}
    >
      <Image source={{uri:item.uri}} style={styles.img} />
      <Text style={styles.namePizza}>{item.title}</Text>
    </Pressable>
  }
  let flatListRef = useRef();
  //read the index in slider
  const [currentIndex,setCurrentIndex] = useState(0)
  const onViewRef = useRef( changed => {
    // setPrice(changed.viewableItems[0].price)
    let value = changed.viewableItems[0];
    value && setInitialState(value.item)
    value && setPrice(value.item.price)
    value && setOrder({...order,name:value.item.title});
    value && setQtyPizza(1);
    value && setSizeSelected({
      one:true,
      two:false,
      three:false
    });
   
  })

  return (
    <>
    <StatusBar
      backgroundColor="white"
      barStyle='dark-content'
    />
        <View style={styles.container}>
          <Text style={styles.title}>
            Desliza y escoge tu pizza
          </Text>
          <Text style={styles.title}> Mesa #{tableNo}</Text>
          {/* Carrusel */}
          <FlatList 
            data={carouselItem}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            style={styles.carousel}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            ref={(ref) => {flatListRef.current = ref}}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewRef.current}
            />
            
          
          {/* sizes Btns */}
          <View style={styles.buttonsContainer}>
            <Pressable 
            style={sizeSelected.one ? styles.btnSelected : styles.btn} 
            onPress={() => handleChange(1)}>
              <Text 
                style={sizeSelected.one ? styles.btnTextSelected : styles.btnTextNoSelected}
              >
                10"
              </Text>
            </Pressable>

            <Pressable 
            style={sizeSelected.two ? styles.btnSelected : styles.btn} 
            onPress={() => handleChange(2)}>
              <Text 
                style={sizeSelected.two ? styles.btnTextSelected : styles.btnTextNoSelected}
              >
                15"
              </Text>
            </Pressable>

            <Pressable 
            style={sizeSelected.three ? styles.btnSelected : styles.btn} 
            onPress={() => handleChange(3)}>
              <Text 
                style={sizeSelected.three ? styles.btnTextSelected : styles.btnTextNoSelected}
              >
                25"
              </Text>
            </Pressable>
          </View>
          {/* Qty */}
          <View style={{width:'80%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
            {/* qty */}
            <View style={styles.buttonsContainerQty}>
              
              <Pressable 
              style={styles.btn} 
              onPress={() => handleQty('plus')}
              >
                <Text style={styles.btnTextNoSelected}>+</Text>
              </Pressable>
              
              <Text style={{fontSize:30}}>{qtyPizza}</Text>
              
              <Pressable 
              style={styles.btn} 
              onPress={qtyPizza > 1 ? (() => handleQty('minus')) : null}
              >
                <Text style={styles.btnTextNoSelected}>-</Text>
              </Pressable>

          </View>
            {/* price */}
            <Text style={{fontSize:25, color:"#ea523a", fontWeight:'bold'}}>${price}</Text>
          </View>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text style={styles.btnSubmitText}>Añadir al carrito</Text>
          </TouchableOpacity>
          
        </View>
     
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:700,
    backgroundColor:"#FFF",
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    color:"#000",
    fontWeight:'bold',
    fontSize:20,
    marginBottom:20
  },
  btnSubmit:{
    backgroundColor:"#ea523a",
    borderRadius:13,
    paddingVertical:8,
    alignItems:'center',
    width:'80%'
  },
  btnSubmitText:{
    color:'#FFF',
    fontSize:25
  },
  btn:{
    borderRadius:13,
    padding:5,
    alignItems:'center',
  },
  btnSelected:{
    backgroundColor:"#ea523a",
    padding:8,
    borderRadius:10
  },
  btnNoSelected:{
    backgroundColor:"#FFF",
  },
  btnTextSelected:{
    color:"#FFF",
    fontSize:30,
  },
  btnTextNoSelected:{
    color:"#ea523a",
    fontSize:30,
    textAlign:'center',
    backgroundColor:'transparent'
  },
  field:{
    width:'80%',
  },
  buttonsContainer:{
    flexDirection:'row',
    backgroundColor:'#efebe76c',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10,
    borderRadius:10,
    width:'70%'
  },
  buttonsContainerQty:{
    flexDirection:'row',
    backgroundColor:'#efebe76c',
    justifyContent:'space-around',
    alignItems:'center',
    marginVertical:5,
    borderRadius:10,
    width:'50%'
  },
  img:{
    height:200,
    width,
    resizeMode:'cover',

   },
  carousel:{
    maxHeight:250,
    marginVertical:10,
    backgroundColor:"#ea523a"
  },
  namePizza:{
    fontSize:25,
    textAlign:'center',
    color:'#FFF'
  }
})