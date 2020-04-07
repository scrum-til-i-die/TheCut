import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    camWrapper: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      width: "100%"
    },
    preview: {
        height,
        width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    buttonContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'white',
      },
      circleInside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D91E18',
        
      },
      content: {
        width,
        position: 'absolute',
        top: 0,
        right: -height+100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      hidden: {
        display: 'none'
      },
      timer: {
        marginTop: 20,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        alignItems: 'center',
      }
});