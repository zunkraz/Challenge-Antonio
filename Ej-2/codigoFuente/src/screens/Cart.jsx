import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, {useEffect,useState} from 'react'
import clientAxios from '../../axios';
import { useSelector } from 'react-redux';

const Cart = () => {
  const reducer = useSelector(state => state.mainReducer); 
  const [pizzas, setPizzas] = useState([])
  
  const deletePizza = async (id) => {
    try {
      const response = await clientAxios.delete('/orders/'+id)
      setPizzas(pizzas.filter(e => e.Order_ID !== id))
     
    } catch (error) {
      console.log(error.response)
    }
  }
  const getPizzas = async () => {
    try {
      const response = await clientAxios('/orders')
       setPizzas(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
     getPizzas()
  },[pizzas]);
  const renderPizzas = (arr) => {
    
    return arr.map(e => <View style={styles.item} key={e.Order_ID}>
      <View>
        <Text style={styles.textOne}>{e.Flavor}</Text>
        <Text style={styles.textOne}>Tamaño: {e.Size}</Text>
        <Text style={styles.textOne}>Mesa: #{e.Table_No}</Text>
      </View>
      <Pressable onPress={() => deletePizza(e.Order_ID)} style={styles.btn}><Text style={styles.textTwo}>Eliminar</Text></Pressable>
    </View>)
  };
  
  return (
    <View>
      <ScrollView style={{height:400, marginBottom:20}}>
      {pizzas.length ? renderPizzas(pizzas) : <Text style={{textAlign:'center', fontSize:25, marginVertical:15}}>Sin pedidos todavía</Text>}
      </ScrollView>
      
        <Pressable style={styles.btnSubmit}><Text style={styles.btnSubmitText}>Pagar</Text></Pressable>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    marginVertical:10,
    justifyContent:'space-around',
    backgroundColor:'#e1e1e6',
    paddingVertical:15,
    borderRadius:10,
    width:'90%',
    alignSelf:'center'
  },
  textOne:{
    color:"#ea523a",
    fontSize:20
  },
  textTwo:{
    color:"#FFF",
    fontSize:20
  },
  btn:{
    backgroundColor:'#ea523a',
    padding:5,
    borderRadius:5,
    height:40
  },
  btnSubmit:{
    backgroundColor:"#ea523a",
    borderRadius:10,
    paddingVertical:8,
    alignItems:'center',
    width:'80%',
    alignSelf:'center'
  },
  btnSubmitText:{
    color:'#FFF',
    fontSize:25
  },
})