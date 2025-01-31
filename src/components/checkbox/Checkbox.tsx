import { View, Text, Pressable } from 'react-native'
import React from 'react'

const Checkbox = () => {
    const [isActive, setisActive] = React.useState(false)
  return (
    <Pressable onPress={()=>setisActive(!isActive)} style={{justifyContent: 'center', alignItems: 'center',padding:4,borderRadius:5, backgroundColor:isActive?'#f0f0f0':'#fff', borderWidth:1, borderColor:isActive?'#f0f0f0':'#fff'}}>		
      <View></View>
    </Pressable>
  )
}

export default Checkbox