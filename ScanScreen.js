import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import scanner from '../assets/scanner.jpg';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
            buttonState:"normal"
        }
    }
    getCameraPermission=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
buttonState:"clicked"
        })
    }
    handleBarCodeScanner=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:"normal"
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned= this.state.scanned;
const buttonState=this.state.buttonState;
if(buttonState==="clicked"&&hasCameraPermissions){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        />

    )
}
else if(buttonState==="normal"){
    return(
        <View style={styles.container}>
            
            <Image
            source={scanner}
            style={{ width: 200, height: 200, marginLeft: 2,marginTop:-100 }
            }
            />
            <Text style={styles.displayText}>
            {
                hasCameraPermissions===true?this.state.scannedData:"request Camera Permission"
            }
            </Text>

            <TouchableOpacity style={styles.scanButton} 
            onPress={this.getCameraPermission}>
                <Text style={styles.displayText}>Scan QR Code</Text>
            </TouchableOpacity>
        </View>
    )
}
}
        
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center", 
        alignItems:"center"
    },
    displayText:{
        fontSize:15,
        textDecorationLine:"underline"
    },
    scanButton:{
        backgroundColor:"blue",
padding:10,
margin:10
    }
})